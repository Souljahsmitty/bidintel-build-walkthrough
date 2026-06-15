# Build From Zero

This is the beginner-safe build companion. The video explains the system; this guide tells you exactly what to create, where to run commands, what output to expect, and how to recover when something breaks.

Canonical API route: `POST /chat/ask`. Older names such as `/rag/ask` or `/assistant/query` should be treated as historical aliases, not the course path.

## Module 0 - Install And Verify Tools

Start state: a Mac or workstation with no project folder yet.

Run in Terminal:

```bash
git --version
docker --version
python3 --version
node --version
npm --version
```

Expected output: every command prints a version. Python should be 3.11 or newer.

Screenshot target: terminal showing all versions.

Common failure: Docker command works but Docker engine is not running.

Fix: open Docker Desktop and wait until it says running.

## Module 1 - Create Project Tree

Start state: tools installed.

Run in Terminal where you keep projects:

```bash
mkdir bidintel-ai
cd bidintel-ai
mkdir -p backend/app/api backend/app/services backend/app/scripts frontend/src/pages frontend/src/lib infra docs sample_data tests
git init
printf "# BIDINTEL AI\n" > README.md
```

Expected output:

```text
Initialized empty Git repository
```

Verify:

```bash
find . -maxdepth 3 -type d | sort
```

Screenshot target: terminal showing the folder tree.

Common failure: creating files in the wrong folder.

Fix: run `pwd`. It should end with `bidintel-ai`.

## Module 2 - Add Local Docker Services

Start state: project tree exists.

Create `docker-compose.yml` in the project root:

```yaml
services:
  db:
    image: pgvector/pgvector:pg16
    container_name: bidintel-db
    environment:
      POSTGRES_DB: bidintel
      POSTGRES_USER: bidintel
      POSTGRES_PASSWORD: bidintelpass
    ports:
      - "5432:5432"
    volumes:
      - bidintel_db:/var/lib/postgresql/data

  phoenix:
    image: arizephoenix/phoenix:latest
    container_name: bidintel-phoenix
    ports:
      - "6006:6006"

volumes:
  bidintel_db:
```

Run from project root:

```bash
docker compose up -d
docker ps
```

Expected output: containers named `bidintel-db` and `bidintel-phoenix` are running.

Screenshot target: terminal `docker ps`, plus browser at `http://localhost:6006`.

Common failure: port already allocated.

Fix: stop the conflicting local service or change the left side of the port mapping.

## Module 3 - Create FastAPI Health Route

Start state: Docker services running.

Create `backend/requirements.txt`:

```text
fastapi
uvicorn[standard]
pydantic
sqlalchemy
psycopg[binary]
python-multipart
boto3
pytest
```

Create `backend/app/main.py`:

```python
from fastapi import FastAPI

app = FastAPI(title="BIDINTEL AI API")

@app.get("/health")
def health():
    return {"ok": True}
```

Run from project root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Expected output:

```text
Uvicorn running on http://127.0.0.1:8000
```

Open:

```text
http://localhost:8000/docs
http://localhost:8000/health
```

Expected JSON:

```json
{"ok": true}
```

Screenshot target: Swagger UI.

Common failure: `ModuleNotFoundError: app`.

Fix: run uvicorn from the `backend` folder, not project root.

## Module 4 - Add Auth Mock And /auth/me

Start state: health route works.

Create `backend/app/auth.py`:

```python
from dataclasses import dataclass

@dataclass
class CurrentUser:
    email: str
    role: str
    tenant_id: str
    access_groups: list[str]

def get_current_user():
    return CurrentUser(
        email="adam.davis@bidintel.ai",
        role="proposal_writer",
        tenant_id="tenant_demo",
        access_groups=["Proposal_Team", "Capture_Team"],
    )
```

Create `backend/app/api/auth_api.py`:

```python
from fastapi import APIRouter, Depends
from app.auth import CurrentUser, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me")
def me(user: CurrentUser = Depends(get_current_user)):
    return user.__dict__
```

Edit `backend/app/main.py`:

```python
from fastapi import FastAPI
from app.api.auth_api import router as auth_router

app = FastAPI(title="BIDINTEL AI API")
app.include_router(auth_router)

@app.get("/health")
def health():
    return {"ok": True}
```

Open:

```text
http://localhost:8000/auth/me
```

Expected JSON includes `role`, `tenant_id`, and `access_groups`.

Screenshot target: browser JSON or Swagger response.

Common failure: router import error.

Fix: make sure `backend/app/api/__init__.py` exists. If not, create an empty file.

## Module 5 - Create Frontend Mock

Start state: backend `/auth/me` works.

Run from project root:

```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
```

Create `frontend/src/lib/api.ts`:

```ts
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path: string, body: unknown) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

Create `frontend/src/App.tsx`:

```tsx
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "./lib/api";

export default function App() {
  const [me, setMe] = useState<any>(null);
  const [question, setQuestion] = useState("What are the P1 response requirements?");
  const [answer, setAnswer] = useState<any>(null);

  useEffect(() => { apiGet("/auth/me").then(setMe); }, []);

  async function ask() {
    setAnswer(await apiPost("/chat/ask", { question }));
  }

  return (
    <main style={{ fontFamily: "Arial", padding: 24 }}>
      <h1>BidIntel AI</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <textarea value={question} onChange={e => setQuestion(e.target.value)} />
      <br />
      <button onClick={ask}>Ask</button>
      <pre>{answer ? JSON.stringify(answer, null, 2) : "No answer yet"}</pre>
    </main>
  );
}
```

Run:

```bash
npm run dev
```

Expected output: Vite URL, usually `http://localhost:5173`.

Screenshot target: browser showing BidIntel AI page and `/auth/me` JSON.

Common failure: CORS error.

Fix: add CORS middleware in backend or use same origin proxy later.

## Module 6 - Add /chat/ask Mock

Start state: frontend can call `/auth/me`.

Create `backend/app/api/chat_api.py`:

```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.auth import CurrentUser, get_current_user

router = APIRouter(prefix="/chat", tags=["chat"])

class AskRequest(BaseModel):
    question: str

@router.post("/ask")
def ask(req: AskRequest, user: CurrentUser = Depends(get_current_user)):
    return {
        "answer": "Mock answer: this proves the frontend-to-FastAPI path works.",
        "sources": [],
        "evaluation": {"faithfulness": None},
        "guardrails": {"blocked": False},
        "user": user.email,
        "question": req.question,
    }
```

Edit `backend/app/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth_api import router as auth_router
from app.api.chat_api import router as chat_router

app = FastAPI(title="BIDINTEL AI API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(chat_router)

@app.get("/health")
def health():
    return {"ok": True}
```

Verify from browser app: click Ask.

Expected output: JSON answer appears in the frontend.

Screenshot target: frontend showing mock answer.

Common failure: `POST /chat/ask` 404.

Fix: confirm `app.include_router(chat_router)` exists and backend restarted.

## Module 7 - Add Documents, Chunking, And Local Retrieval

Start state: `/chat/ask` mock works.

Create `sample_data/DHS_RFP_mock.txt`:

```text
The contractor shall provide a 24/7 help desk.
Priority 1 incidents require a 15-minute response.
The proposal shall include escalation workflow and staffing plan.
```

Create `backend/app/services/chunking.py`:

```python
def chunk_text(text: str, size: int = 300, overlap: int = 60):
    chunks = []
    start = 0
    while start < len(text):
        end = min(len(text), start + size)
        chunks.append(text[start:end])
        if end == len(text):
            break
        start = max(0, end - overlap)
    return chunks
```

Create `backend/app/services/retrieval.py`:

```python
from pathlib import Path
from app.services.chunking import chunk_text

ROOT = Path(__file__).resolve().parents[3]
SAMPLE = ROOT / "sample_data" / "DHS_RFP_mock.txt"

def retrieve(question: str):
    text = SAMPLE.read_text()
    chunks = chunk_text(text)
    terms = set(question.lower().split())
    ranked = []
    for idx, chunk in enumerate(chunks):
        score = sum(1 for term in terms if term in chunk.lower())
        if score:
            ranked.append({"id": idx, "chunk_text": chunk, "score": score, "document_id": "DHS_RFP_mock"})
    return sorted(ranked, key=lambda x: x["score"], reverse=True)[:3]
```

Edit `backend/app/api/chat_api.py` to call retrieval:

```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.auth import CurrentUser, get_current_user
from app.services.retrieval import retrieve

router = APIRouter(prefix="/chat", tags=["chat"])

class AskRequest(BaseModel):
    question: str

@router.post("/ask")
def ask(req: AskRequest, user: CurrentUser = Depends(get_current_user)):
    chunks = retrieve(req.question)
    answer = "I found evidence. " + (chunks[0]["chunk_text"] if chunks else "No supporting evidence found.")
    return {
        "answer": answer,
        "sources": chunks,
        "evaluation": {"faithfulness": 1.0 if chunks else 0.0},
        "guardrails": {"blocked": False},
    }
```

Expected output for question `What is the P1 response?`: answer mentions 15-minute response and sources include `DHS_RFP_mock`.

Screenshot target: frontend answer with source chunk.

Common failure: file not found.

Fix: verify `sample_data/DHS_RFP_mock.txt` exists at project root.

## Module 8 - Upgrade To Postgres, BM25, Vector, RRF, Reranker

Start state: file-based retrieval works.

Create database tables:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
  id SERIAL PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  document_id TEXT NOT NULL,
  chunk_text TEXT NOT NULL,
  search_vector tsvector,
  access_groups TEXT[] NOT NULL DEFAULT ARRAY['Proposal_Team']
);

CREATE INDEX idx_chunks_search ON document_chunks USING GIN(search_vector);
```

Build order:

1. Save chunks to `document_chunks`.
2. Add full-text search for BM25-style exact retrieval.
3. Add embedding column and pgvector search.
4. Add `rrf.py` to combine BM25 and vector ranks.
5. Add `reranker.py` to reorder the shortlist.
6. Keep tenant/access filters before retrieval returns chunks.

Expected output: `/chat/ask` returns ranked chunks from the database, not the text file.

Screenshot target: Swagger response with sources.

Common failure: empty chunks.

Fix: inspect database table before changing prompts.

## Module 9 - Add Prompt, Citations, Eval, Guardrails, Audit

Start state: database retrieval works.

Create files:

```text
backend/app/services/prompt_builder.py
backend/app/services/evaluator.py
backend/app/services/guardrails.py
backend/app/audit.py
```

Build rule:

The route `POST /chat/ask` must return:

```json
{
  "answer": "...",
  "sources": [{"document_id": "...", "chunk_text": "..."}],
  "evaluation": {"faithfulness": 0.9},
  "guardrails": {"blocked": false}
}
```

Expected output: answer has citations, eval score, guardrail status, and audit row.

Screenshot target: frontend answer plus audit log.

Common failure: answer claims facts not in sources.

Fix: change prompt first, then evaluator threshold, then retrieval.

## Module 10 - IAM Role Lab

Start state: local auth mock works.

Goal: replace mock identity with real or simulated claims.

Do:

1. Create Identity Center groups.
2. Map attributes: email, groups, tenant_id, access_level.
3. Assign groups to the app.
4. Backend maps groups to roles in `authz.py`.
5. Test `GET /auth/me`.
6. Test allowed and blocked routes.

Expected output:

```text
Auditor:
GET /audit -> 200
POST /documents/upload -> 403
POST /chat/ask -> 403 or read-only depending policy
```

Screenshot target: `/auth/me` and one 403 proof.

Common failure: groups appear in AWS but not token.

Fix: revisit Attribute mappings and Assignments in IAM Identity Center.

## Module 11 - Deploy Backend To ECS

Start state: backend works locally.

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Run locally:

```bash
docker build -t bidintel-backend ./backend
docker run --rm -p 8000:8000 --env-file backend/.env bidintel-backend
```

AWS sequence:

1. ECR -> Create repository `bidintel-backend`.
2. Run ECR push commands.
3. ECS -> Task definition -> paste ECR image URI.
4. Add env vars and Secrets Manager references.
5. ECS -> Service -> attach Application Load Balancer.
6. Health check path: `/health`.

Expected output: ECS service healthy and `https://api.../health` returns `{"ok":true}`.

Screenshot target: ECR image, ECS healthy service, ALB health check.

Common failure: Bedrock `AccessDenied`.

Fix: task role needs Bedrock invoke permission and Bedrock model access must be enabled.

## Module 12 - Deploy Frontend To S3 And CloudFront

Start state: hosted backend health endpoint works.

Run from `frontend`:

```bash
echo "VITE_API_BASE=https://api.bidintel.example" > .env.production
npm run build
ls dist
```

AWS sequence:

1. S3 -> Create private bucket.
2. Upload contents of `frontend/dist`.
3. CloudFront -> Create distribution.
4. Origin: S3 bucket.
5. Origin access: OAC.
6. Default root object: `index.html`.
7. Custom errors: 403 and 404 -> `/index.html` with 200.

Expected output: CloudFront URL loads the frontend and calls hosted backend.

Screenshot target: CloudFront URL showing BidIntel UI.

Common failure: refresh on nested route returns 403/404.

Fix: add SPA custom error responses.

## Module 13 - Final Capstone

Add a new bid scoring factor.

Required proof:

1. Code change.
2. Test or example request.
3. Before/after score.
4. Audit row.
5. Screenshot.

Done condition: you can explain the full path from user click to backend route to retrieval to model/eval/audit to frontend result.
