# Bee developer friction log

## F1 — Hardware-gated developer mode

- **Task:** Start a Bee CLI integration before receiving a Bee device.
- **Steps:** Installed the Bee app and looked for Developer Mode; reviewed the CLI and hackathon FAQ.
- **Expected:** A developer sandbox or synthetic account could expose the documented event stream.
- **Actual:** Developer Mode requires a Bee device to be paired; the CLI itself requires a Bee account.
- **Severity:** Critical for early prototyping.
- **Workaround:** Built a privacy-safe fixture that mirrors the documented `new-utterance` and todo event envelopes, then isolated the live adapter behind the same interface.
- **Suggestion:** Provide a first-party sandbox token and replayable sample stream with explicit synthetic-data labeling.

## F2 — Stateful correction examples are missing

- **Task:** Determine how a later utterance should be linked to an earlier todo or commitment.
- **Steps:** Reviewed the CLI commands and stream payloads for conversations and todos.
- **Expected:** Stable provenance or `supersedes` metadata between conversation-derived actions.
- **Actual:** Public examples explain events individually but do not demonstrate correction lineage across conversations.
- **Severity:** Important.
- **Workaround:** BeeLoop maintains its own source IDs, versions and confidence threshold.
- **Suggestion:** Add an end-to-end example: conversation → suggested todo → later correction → safe update of the same todo.

## F3 — No schema validator or replay tool

- **Task:** Test edge cases such as duplicates, disconnects, cancellations and speaker corrections.
- **Expected:** A CLI command to validate and replay saved event fixtures.
- **Actual:** The public docs describe payloads, but there is no obvious conformance/replay utility.
- **Severity:** Important.
- **Workaround:** Added deterministic fixtures and automated state-machine tests.
- **Suggestion:** Ship `bee dev replay <fixture.json>` and `bee dev validate <fixture.json>`.
