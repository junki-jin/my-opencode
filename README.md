# OpenCode Config Repo

Yes - this is your OpenCode configuration storage repository for `~/.config/opencode`.

## Purpose

- Store and version your OpenCode settings
- Keep reusable commands and skills in one place
- Restore your environment quickly on a new machine

## Core Files

- `opencode.json`: providers, models, plugins, tool toggles
- `commands/`: custom commands
- `skills/`: reusable skills

## Quick Start

```bash
git clone <your-repo-url> ~/.config/opencode
cd ~/.config/opencode
bun install
```

Run OpenCode normally; it will use this directory as its config.

## Security

- Never commit API keys or tokens
