# Lab: Evaluation

Goal: use RAGAS-style metrics to improve the system instead of guessing.

Do:

1. Create `eval_questions.csv` with question and ground truth.
2. Run each question through `POST /chat/ask`.
3. Save question, answer, contexts, and ground truth.
4. Run `backend/app/scripts/run_eval.py`.
5. Review low faithfulness, answer relevancy, context precision, and context recall.
6. Change one variable: chunking, retrieval, reranking, prompt, or guardrails.
7. Re-run evaluation.

Verify:

- Metrics are stored.
- Low scores point to a concrete fix.
- Re-run shows whether the fix helped.
