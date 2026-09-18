import { mergeCodexThreadConfigs } from "./plugin-thread-config.js";
import type { JsonObject } from "./protocol.js";

const CODEX_NATIVE_PROJECT_DOC_MAX_BYTES = 128 * 1024;

export function buildCodexProjectDocThreadConfig(
  config?: JsonObject,
  options?: {
    /** Suppress native project doc when context files are suppressed. */
    privacySuppressContextFiles?: boolean;
    /** Suppress native project doc when PII redaction is active (native
     *  Codex reads AGENTS.md directly and cannot apply PII filtering). */
    privacyPiiEnabled?: boolean;
  },
): JsonObject {
  const defaults: JsonObject = { project_doc_max_bytes: CODEX_NATIVE_PROJECT_DOC_MAX_BYTES };
  const merged = mergeCodexThreadConfigs(defaults, config) ?? defaults;
  // Privacy: enforce zero budget AFTER config merge so explicit thread
  // config overrides cannot defeat the suppression policy.
  if (options?.privacySuppressContextFiles || options?.privacyPiiEnabled) {
    return { ...merged, project_doc_max_bytes: 0 };
  }
  return merged;
}
