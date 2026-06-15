# Teacher Notes

## Where Students Usually Fail

- They do not know which terminal/folder to run commands in.
- Docker Desktop is not running.
- Python venv is created in the wrong folder.
- Node/npm version is too old.
- They open React before the backend is running.
- They upload a document but never verify chunks were created.
- They treat IAM Identity Center groups as enough and forget backend authorization checks.
- They put secrets or AWS keys in frontend code.
- They see Bedrock `AccessDenied` and do not know whether it is model access, IAM policy, or Region.
- They confuse app audit logs with CloudTrail/CloudWatch.
- They think the prototype equals production compliance.

## Coaching Moves

- Ask: "Where are you right now: project root, backend, frontend, browser, or AWS console?"
- Ask for the exact command and exact output.
- Make them prove each checkpoint before moving on.
- For RAG issues, inspect retrieved chunks before changing the prompt.
- For hallucinations, compare answer claims to retrieved context.
- For IAM issues, test `/auth/me` first, then route permissions, then retrieval filters.
- For AWS issues, inspect CloudWatch logs and the task role before changing code.

## Course Standard

Every module should have:

1. Start state
2. Do task
3. Expected output
4. Screenshot target
5. Failure case
6. Recovery path
7. Reflection question

The desired learner is not someone who recognizes the architecture. The desired learner can build, test, break, debug, and explain it.
