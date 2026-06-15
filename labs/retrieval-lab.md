# Lab: Retrieval Quality

Goal: understand BM25, vector search, RRF, and reranking by breaking and fixing retrieval.

Do:

1. Ingest a sample RFP.
2. Ask a question with an exact SLA term.
3. Record returned sources.
4. Set chunk overlap too low.
5. Re-ingest and ask again.
6. Compare context recall and citation coverage.

Verify:

- Exact terms are found by BM25/full-text search.
- Semantic paraphrases are found by vector search.
- RRF combines both result lists.
- Reranker improves final evidence ordering.
