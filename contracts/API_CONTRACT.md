# API Contract

This is the single source of truth for frontend/backend wiring.

## Environment Variables

Backend:

```text
APP_ENV=local|prod
DATABASE_URL=postgresql+psycopg://...
AWS_REGION=us-east-1
LOCAL_MOCK_LLM=true|false
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20240620-v1:0
BEDROCK_EMBED_MODEL_ID=amazon.titan-embed-text-v2:0
RAG_TOP_K=10
RAG_RERANK_TOP_N=5
CORS_ORIGINS=http://localhost:5173,https://app.example.com
```

Frontend:

```text
VITE_API_BASE=http://localhost:8000
```

Production frontend:

```text
VITE_API_BASE=https://api.bidintel.example
```

## Routes

### GET /health

Response:

```json
{"ok": true}
```

### GET /auth/me

Response:

```json
{
  "email": "adam.davis@bidintel.ai",
  "role": "proposal_writer",
  "tenant_id": "tenant_demo",
  "access_groups": ["Proposal_Team", "Capture_Team"]
}
```

### POST /documents/upload

Request: multipart file plus metadata.

Response:

```json
{
  "document_id": "DOC-000123",
  "status": "embedded",
  "chunks": 42
}
```

### POST /chat/ask

Request:

```json
{
  "question": "What are the P1 response requirements?",
  "session_id": "optional-session-id"
}
```

Response:

```json
{
  "answer": "The requirement is ...",
  "sources": [
    {"id": "chunk-1", "document_id": "DOC-000123", "page_number": 7, "chunk_text": "..."}
  ],
  "evaluation": {"faithfulness": 0.91, "answer_relevancy": 0.88},
  "guardrails": {"blocked": false}
}
```

### POST /eval/run

Response:

```json
{"status": "queued", "message": "Run backend/app/scripts/run_eval.py for local batch eval."}
```

### POST /bid/score

Request:

```json
{"opportunity_id": "OPP-001"}
```

Response:

```json
{"score": 78, "recommendation": "review", "reasons": ["Strong past performance", "SLA gap"]}
```

### GET /audit

Response:

```json
{
  "events": [
    {"time": "2026-06-14T10:42:18Z", "user": "adam.davis", "action": "chat.ask", "guardrail": "ok"}
  ]
}
```
