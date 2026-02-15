import { tool } from "@opencode-ai/plugin"
import { env } from "bun"

const API_ENDPOINT = "https://mcp.tavily.com/mcp"
const API_KEY = env["TAVILY_API_KEY"] || "";
const DEFAULT_MAX_RESULTS = 10

function abortAfterAny(ms: number, ...signals: AbortSignal[]) {
  const controller = new AbortController()
  const id = globalThis.setTimeout(controller.abort.bind(controller), ms)
  const signal = AbortSignal.any([controller.signal, ...signals])
  return {
    signal,
    clearTimeout: () => globalThis.clearTimeout(id),
  }
}

export default tool({
  description: "Use this tool if WebSearchTool is not working",
  args: {
    query: tool.schema.string().max(400).describe("Search query"),
    maxResults: tool.schema.number().max(20).min(1).optional().describe("Number of search results to return"),
    searchDepth: tool.schema
      .enum(["ultra-fast", "fast", "basic", "advanced"])
      .optional()
      .describe("Search depth for the search"),
    timeRange: tool.schema.enum(["day", "week", "month", "year"]).optional().describe("Time range for the search"),
    startDate: tool.schema
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Start date in YYYY-MM-DD format"),
    endDate: tool.schema
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("End date in YYYY-MM-DD format"),
  },
  async execute({ query, maxResults = DEFAULT_MAX_RESULTS, searchDepth, timeRange, startDate, endDate }, context) {
    const { signal, clearTimeout } = abortAfterAny(25000, context.abort)

    try {
      const response = await fetch(API_ENDPOINT, {
        signal,
        method: "POST",
        headers: {
          Accept: "application/json, text/event-stream",
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "X-Client-Source": "claude-code-skill",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "tavily_search",
            arguments: {
              query,
              max_results: maxResults,
              search_depth: searchDepth,
              time_range: timeRange,
              start_date: startDate,
              end_date: endDate,
            },
          },
        }),
      })
      clearTimeout()

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Search error (${response.status}): ${errorText}`)
      }

      // Parse SSE response
      const responseText = await response.text()
      const lines = responseText.split("\n")
      for (const line of lines) {
        if (!line.startsWith("data: ")) {
          continue
        }
        const data = JSON.parse(line.substring(6))
        if (!data?.result?.content?.length) {
          continue
        }
        return data.result.content[0].text
      }
      return "No search results found. Please try a different query."
    } catch (error) {
      clearTimeout()
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Search request timed out")
      }
      throw error
    }
  },
})
