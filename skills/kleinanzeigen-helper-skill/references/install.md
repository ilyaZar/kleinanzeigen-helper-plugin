## Prerequisites / Install

- Install and configure
  [kleinanzeigen-bot](https://github.com/Second-Hand-Friends/kleinanzeigen-bot)
  locally first.
- Install [KleinClaw](https://clawhub.ai/plugins/kleinclaw), then enable it:

  ```bash
  openclaw plugins install clawhub:kleinclaw
  openclaw plugins enable kleinclaw
  openclaw gateway restart
  ```

- Configure KleinClaw under `plugins.entries.kleinclaw.config`.
- Keep bot credentials, browser profiles, cookies, and full config files out of
  chat.
