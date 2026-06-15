# Build Checklist

Every row answers: where do I run it, what should happen, and what screenshot proves it.

| Step | Run Location | Command Or Action | Expected Output | Screenshot Target |
|---|---|---|---|---|
| Verify Git | Terminal anywhere | `git --version` | Version prints | terminal |
| Verify Docker | Terminal anywhere | `docker --version` | Version prints | terminal |
| Verify Python | Terminal anywhere | `python3 --version` | 3.11+ | terminal |
| Verify Node | Terminal anywhere | `node --version && npm --version` | Versions print | terminal |
| Start local services | Project root | `docker compose up -d` | Containers start | Docker Desktop or `docker ps` |
| Check containers | Project root | `docker ps` | `bidintel-db`, `bidintel-phoenix` | terminal |
| Open Phoenix | Browser | `http://localhost:6006` | Phoenix UI opens | browser |
| Backend venv | Backend folder | `python3 -m venv .venv && source .venv/bin/activate` | Prompt shows venv | terminal |
| Install backend | Backend folder | `pip install -r requirements.txt` | Packages installed | terminal |
| Run backend | Backend folder | `uvicorn app.main:app --reload --port 8000` | Uvicorn running | terminal |
| Open Swagger | Browser | `http://localhost:8000/docs` | FastAPI docs open | browser |
| Run frontend | Frontend folder | `npm install && npm run dev` | Vite local URL | terminal |
| Open frontend | Browser | `http://localhost:5173` | BidIntel UI opens | browser |
| Upload sample | Browser app | Documents -> upload sample RFP | Document ingested | Documents page |
| Ask RAG | Browser app | Assistant -> ask question | Answer + sources | Assistant page |
| Eval local | Backend folder | `python app/scripts/run_eval.py` | Metrics table/csv | terminal |
| Build backend image | Project root | `docker build -t bidintel-backend ./backend` | Image built | terminal |
| Push to ECR | Project root | ECR push commands | Image visible in ECR | AWS ECR repo |
| ECS deploy | AWS Console | ECS task/service | Running task healthy | ECS service |
| Build frontend prod | Frontend folder | `VITE_API_BASE=https://api.example.com npm run build` | `dist/` exists | terminal |
| Upload frontend | AWS Console | S3 upload `frontend/dist` | Objects in bucket | S3 bucket |
| CloudFront verify | Browser | CloudFront URL | App loads over HTTPS | browser |

If a step fails, stop and use `TROUBLESHOOTING.md` before continuing.
