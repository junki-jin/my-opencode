# OpenCode configuration

Personal OpenCode configuration for agents, commands, skills, and provider/plugin setup. This repo is intended to live at `~/.config/opencode` and be used directly by the OpenCode CLI.

## Overview

- OpenCode config entrypoint in `opencode.json`.
- Agent, command, and skill definitions under `agents/`, `commands/`, and `skills/`.
- Plugin/provider setup for Antigravity auth, PTY, and model endpoints.

## Agents

No custom agents are configured in this repository.

## Skills

- `skills/git-commit-message-best-practices/`: drafting commit messages when committing.
- `skills/playwright-cli/`: browser automation via Playwright CLI, with references for session management, storage state, request mocking, tracing, video recording, test generation, and running code.
- `skills/deep-research/`: research pipeline with methodology, templates, validation scripts, and tests.
- `skills/skill-creator/`: skill authoring/packaging guidance with scripts and references.
- `skills/tavily-search/`: web search using Tavily's LLM-optimized search API.
- `skills/tavily-research/`: AI-synthesized research on any topic with citations.
- `skills/tavily-extract/`: content extraction from specific URLs via Tavily's extraction API.
- `skills/tavily-crawl/`: website crawling and saving pages as local markdown files.

## Commands

- `commands/git/commit.md`: commit staged changes when present; otherwise stage all changes before committing. Loads the `git-commit-message-best-practices` skill for message drafting.

## Prerequisites

- OpenCode CLI installed.
- Node.js or Bun available to install the optional plugin dependency listed in `package.json`.
- Provider credentials available for the enabled providers (Google/OpenAI/OpenCode/OpenRouter) and Antigravity if you use those models.

## Setup

```bash
git clone git@github.com:atk476/my-opencode.git ~/.config/opencode
```

Optional: install the plugin dependency used by the repo.

```bash
bun install
```

## Usage

- Start OpenCode as usual; it will read config from `~/.config/opencode`.
- Select models by provider/model id listed in `opencode.json`.
- Use commands and agents defined in `commands/` and `agents/`.

## Configuration

### Providers and models

Configured in `opencode.json`:

- `small_model`: `opencode/big-pickle`.
- `enabled_providers`: `google`, `openai`, `opencode`, `openrouter`.
- `provider.google.models`: Antigravity-wrapped Claude Opus 4.6 Thinking, Claude Sonnet 4.5 Thinking, Gemini 3 Pro, and Gemini 3 Flash with custom limits, modalities, and thinking variants.
- `provider.openai.whitelist`: `gpt-5.3-codex`, `gpt-5.3-codex-spark`, `gpt-5.2`.
- `provider.opencode.whitelist`: `big-pickle`, `minimax-m2.5-free`, `kimi-k2.5-free`.
- `provider.openrouter.whitelist`: `minimax/minimax-m2.5`, `x-ai/grok-4.1-fast`, `z-ai/glm-5`.

### Plugins

Configured in `opencode.json`:

- `opencode-antigravity-auth@latest`
- `opencode-pty@latest`

### MCP servers

No MCP servers are currently configured (`mcp` is empty).

### Tools

Configured in `opencode.json`:

- `tools.google_search`: `false`.

### Antigravity auth

Configured in `antigravity.json`:

- `quiet_mode`: `true`

## Directory layout

```
.
├── agents/                  # Agent personas and roles
├── commands/                # Custom commands
├── skills/                  # Reusable skills (e.g., commit messaging, Playwright, Tavily)
├── plugins/                 # Local plugin stubs (if needed)
├── tools/                   # Tool metadata or helper assets
├── AGENTS.md                # Agent behavior rules (currently empty)
├── antigravity.json         # Antigravity auth settings
├── opencode.json            # Main OpenCode config
├── package.json             # Plugin dependency
└── README.md
```

## Security notes

- `antigravity-accounts.json` contains account/token data and should stay local.
- Avoid committing any provider tokens, API keys, or account files to version control.
