import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import {
  createKleinanzeigenTools,
  OPTIONAL_TOOL_NAMES,
  SIDE_EFFECT_TOOL_NAMES,
} from "./src/tools.js";

export default definePluginEntry({
  id: "kleinanzeigen-helper",
  name: "Kleinanzeigen Helper",
  description: "Typed tools for a local kleinanzeigen-bot setup with redacted output.",
  register(api) {
    const tools = createKleinanzeigenTools(api.pluginConfig ?? {});

    for (const tool of tools) {
      api.registerTool(
        tool,
        OPTIONAL_TOOL_NAMES.has(tool.name) ? { optional: true } : undefined,
      );
    }

    api.on(
      "before_tool_call",
      (event) => {
        if (!SIDE_EFFECT_TOOL_NAMES.has(event.toolName)) {
          return;
        }

        return {
          requireApproval: {
            title: "Run Kleinanzeigen account action",
            description:
              "Allow this local kleinanzeigen-bot operation to run with redacted output.",
            severity: "warning",
            timeoutMs: 120000,
            timeoutBehavior: "deny",
          },
        };
      },
      { priority: 80, timeoutMs: 5000 },
    );
  },
});
