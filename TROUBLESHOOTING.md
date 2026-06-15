# Troubleshooting

| Symptom | Likely Cause | Fix | Verify |
|---|---|---|---|
| `docker compose up` fails | Docker Desktop not running | Open Docker Desktop, wait for ready state | `docker ps` works |
| Port 5432 already in use | Another Postgres is running | Stop local Postgres or change compose port | `docker compose up -d` succeeds |
| Phoenix not opening | Container not running or port conflict | Check `docker ps`; change port if needed | `http://localhost:6006` loads |
| `python: command not found` | macOS uses `python3` | Use `python3` | `python3 --version` |
| venv not active | Wrong terminal/session | Run `source .venv/bin/activate` | Prompt shows venv |
| `pip install` fails | Wrong Python version or missing build deps | Upgrade Python, retry in fresh venv | backend starts |
| `npm install` fails | Old Node or corrupted modules | Install Node LTS, delete `node_modules`, retry | `npm run dev` works |
| CORS error in browser | Backend does not allow Vite origin | Add `http://localhost:5173` to CORS origins | API call succeeds |
| Empty retrieval | No ingested chunks or wrong access group | Check document ingest and user groups | RAG answer has sources |
| Hallucinated answer | Prompt/evidence guardrail weak | Tighten `prompt_builder.py` and support checks | Faithfulness improves |
| AWS `AccessDenied` for Bedrock | ECS task role missing permission or model access disabled | Enable model access and attach Bedrock policy | Bedrock call succeeds |
| Bedrock model not found | Region/model ID mismatch | Use model available in chosen Region | Test invoke succeeds |
| ECS task keeps restarting | Bad env var, secret, port, or health check | Inspect CloudWatch logs and ECS events | Task is healthy |
| CloudFront shows 403/404 on routes | React SPA error responses missing | Add 403/404 -> /index.html with 200 | Refresh nested route works |

Rule: do not continue the course with a broken checkpoint. Fix, verify, then move on.
