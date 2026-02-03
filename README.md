# OpenCode configuration

Personal OpenCode configuration for agents, commands, skills, and provider/plugin setup. This repo is intended to live at `~/.config/opencode` and be used directly by the OpenCode CLI.

## Overview

- OpenCode config entrypoint in `opencode.json`.
- Agent, command, and skill definitions under `agents/`, `commands/`, and `skills/`.
- Plugin/provider setup for Antigravity auth, PTY, and MCP endpoints.

## Agents

No custom agents are configured in this repository.

## Skills

- `skills/git-commit-message/`: drafting commit messages when committing.
- `skills/deep-research/`: research pipeline with methodology, templates, validation scripts, and tests.
- `skills/skill-creator/`: skill authoring/packaging guidance with scripts and references.

## Commands

- `commands/commit.md`: commit staged changes when present; otherwise stage all changes before committing.

## Prerequisites

- OpenCode CLI installed.
- Node.js or Bun available to install the optional plugin dependency listed in `package.json`.
- Provider credentials available for the enabled providers (Google/OpenAI/OpenRouter) and Antigravity if you use those models.

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

- `enabled_providers`: `google`, `openai`, `openrouter`.
- `provider.google.models`: Antigravity-wrapped Gemini 3 models with custom limits, modalities, and thinking variants.
- `provider.openai.whitelist`: `gpt-5.2-codex`, `gpt-5.2`.
- `provider.openrouter.whitelist`: `moonshotai/kimi-k2.5`, `x-ai/grok-4.1-fast`, `z-ai/glm-4.7`.

### Plugins

Configured in `opencode.json`:

- `opencode-antigravity-auth@latest`
- `opencode-pty@latest`

### MCP servers

Configured in `opencode.json`:

- `gh-grep` remote MCP at `https://mcp.grep.app`
- `tavily` remote MCP at `https://mcp.tavily.com/mcp`

### Tools

Configured in `opencode.json`:

- `tools.google_search`: `false`.

### Antigravity auth

Configured in `antigravity.json`:

- `account_selection_strategy`: `sticky`
- `pid_offset_enabled`: `true`
- `quiet_mode`: `true`

## Directory layout

```
.
├── agents/                  # Agent personas and roles
├── commands/                # Custom commands
├── skills/                  # Reusable skills (e.g., commit messaging)
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
