# BeeLoop architecture

```text
Bee device / Apple Watch with Bee
              │
              ▼
@beeai/cli/lib createBeeClient()
  ├─ bee.api.me()              authentication check
  └─ bee.sse.streamJson()      new-utterance + todo events
              │
              ▼
Commitment engine
  ├─ identity matching
  ├─ new / duplicate / correction classification
  ├─ confidence + provenance
  └─ versioned dependency repair
              │
              ▼
Review card → approved Bee todo update
```

`server.mjs` imports and calls the official Bee CLI Node wrapper at runtime. When the local Bee CLI is installed and authenticated, `/api/status` calls `bee.api.me()` and `/api/bee/stream` calls `bee.sse.streamJson(...)`. Without a Bee login the UI remains in an explicitly labelled synthetic mode.

The repository never contains Bee credentials or real conversation data. The fixture under `sample-data/` is hand-authored and matches the public Bee stream envelope.
