import { mergeCodexThreadConfigs } from "./plugin-thread-config.js";
import type { JsonObject } from "./protocol.js";

const CODEX_NATIVE_PROJECT_DOC_MAX_BYTES = 128 * 1024;

export function buildCodexProjectDocThreadConfig(
  config?: JsonObject,
  options?: { privacySuppressContextFiles?: boolean },
): JsonObject {
  // Privacy: when context file suppression is enabled, disable native project
  // document loading so AGENTS.md doesn't bypass the privacy boundary.
  const maxBytes = options?.privacySuppressContextFiles ? 0 : CODEX_NATIVE_PROJECT_DOC_MAX_BYTES;
  const defaults: JsonObject = { project_doc_max_bytes: maxBytes };
  return mergeCodexThreadConfigs(defaults, config) ?? defaults;
}
