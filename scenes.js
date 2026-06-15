const SCENES = [
  {
    "chapter": "Original Build - Welcome & Big Picture",
    "title": "What BidIntel Builds",
    "skin": "diagram",
    "visual": "BidIntel lets an analyst upload contract documents, ask questions, and receive answers with citations, bid scores, compliance rows, audit logs, and guardrails.",
    "narration": "Welcome. We are building BidIntel, a contract-intelligence assistant. The safest mental model is an open-book exam: the AI must use your documents and cite the page instead of guessing.",
    "code": "Open tutorial/index.html",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "RAG",
    "skin": "diagram",
    "visual": "Retrieval-Augmented Generation means we retrieve real evidence first, then ask the AI to answer from that evidence. Analogy: An open-book exam where the AI must cite the book.",
    "narration": "RAG. Retrieval-Augmented Generation means we retrieve real evidence first, then ask the AI to answer from that evidence. Think of it this way: An open-book exam where the AI must cite the book.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Chunking",
    "skin": "diagram",
    "visual": "Chunking splits a big document into small overlapping passages. A token is a small piece of text. Overlap repeats a little text between chunks so we do not cut an idea in half. Analogy: Cutting a book into index cards with a few repeated lines.",
    "narration": "Chunking. Chunking splits a big document into small overlapping passages. A token is a small piece of text. Overlap repeats a little text between chunks so we do not cut an idea in half. Think of it this way: Cutting a book into index cards with a few repeated lines.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Embedding / Vector",
    "skin": "diagram",
    "visual": "An embedding is a list of numbers that captures meaning. A vector is that list of numbers. Analogy: Giving every sentence GPS coordinates in meaning space.",
    "narration": "Embedding / Vector. An embedding is a list of numbers that captures meaning. A vector is that list of numbers. Think of it this way: Giving every sentence GPS coordinates in meaning space.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Vector Search",
    "skin": "diagram",
    "visual": "Vector search finds chunks whose meaning is close to the question, even if the exact words differ. Analogy: Detective number two matches suspects by behavior.",
    "narration": "Vector Search. Vector search finds chunks whose meaning is close to the question, even if the exact words differ. Think of it this way: Detective number two matches suspects by behavior.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "BM25",
    "skin": "diagram",
    "visual": "BM25 is classic keyword search. It rewards exact word matches, useful word frequency, and sensible document length. Analogy: Detective number one matches suspects by exact name.",
    "narration": "BM25. BM25 is classic keyword search. It rewards exact word matches, useful word frequency, and sensible document length. Think of it this way: Detective number one matches suspects by exact name.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Hybrid Search",
    "skin": "diagram",
    "visual": "Hybrid search runs keyword search and meaning search together because each catches evidence the other can miss. Analogy: Two detectives compare notes.",
    "narration": "Hybrid Search. Hybrid search runs keyword search and meaning search together because each catches evidence the other can miss. Think of it this way: Two detectives compare notes.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "RRF",
    "skin": "diagram",
    "visual": "Reciprocal Rank Fusion merges ranked lists using 1 divided by k plus rank. With k equals 60, first place gives 1/(60+1), or 0.01639. Analogy: The sergeant promotes any suspect both detectives flagged. RRF is not the reranker.",
    "narration": "RRF. Reciprocal Rank Fusion merges ranked lists using 1 divided by k plus rank. With k equals 60, first place gives 1/(60+1), or 0.01639. Think of it this way: The sergeant promotes any suspect both detectives flagged. RRF is not the reranker.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Reranker",
    "skin": "diagram",
    "visual": "A reranker deeply reviews the shortlisted chunks against the question and keeps the best few. Analogy: The lead detective interviews the suspects.",
    "narration": "Reranker. A reranker deeply reviews the shortlisted chunks against the question and keeps the best few. Think of it this way: The lead detective interviews the suspects.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Context Builder",
    "skin": "diagram",
    "visual": "The context builder assembles selected chunks, source IDs, and page numbers into the package sent to the model. Analogy: The briefing folder handed to the prosecutor.",
    "narration": "Context Builder. The context builder assembles selected chunks, source IDs, and page numbers into the package sent to the model. Think of it this way: The briefing folder handed to the prosecutor.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "LLM / Amazon Bedrock / Claude",
    "skin": "diagram",
    "visual": "A large language model writes the answer. Amazon Bedrock is AWS's managed way to call models like Claude. Analogy: The prosecutor argues only from the case file.",
    "narration": "LLM / Amazon Bedrock / Claude. A large language model writes the answer. Amazon Bedrock is AWS's managed way to call models like Claude. Think of it this way: The prosecutor argues only from the case file.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Guardrails",
    "skin": "diagram",
    "visual": "Guardrails are checks that block prompt injection and unsupported answers before the user sees them. Analogy: The courtroom rules of evidence.",
    "narration": "Guardrails. Guardrails are checks that block prompt injection and unsupported answers before the user sees them. Think of it this way: The courtroom rules of evidence.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Evaluator / LLM-as-a-Judge",
    "skin": "diagram",
    "visual": "An evaluator grades the answer after it is written. LLM-as-a-judge means using another AI to grade the first AI. Analogy: Internal Affairs reviews the case.",
    "narration": "Evaluator / LLM-as-a-Judge. An evaluator grades the answer after it is written. LLM-as-a-judge means using another AI to grade the first AI. Think of it this way: Internal Affairs reviews the case.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "RAGAS",
    "skin": "diagram",
    "visual": "RAGAS is a library for batch-scoring RAG quality metrics like faithfulness and context recall. Analogy: The performance report.",
    "narration": "RAGAS. RAGAS is a library for batch-scoring RAG quality metrics like faithfulness and context recall. Think of it this way: The performance report.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Phoenix / Observability / Tracing",
    "skin": "diagram",
    "visual": "Phoenix records each step, timing, and metadata. A trace is the timeline of one request. A span is one step in that timeline. Analogy: The command-center dashboard.",
    "narration": "Phoenix / Observability / Tracing. Phoenix records each step, timing, and metadata. A trace is the timeline of one request. A span is one step in that timeline. Think of it this way: The command-center dashboard.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Precision@K",
    "skin": "diagram",
    "visual": "Of the chunks we retrieved, precision asks how many were actually useful. Higher is better. Analogy: How many suspects on the shortlist truly mattered.",
    "narration": "Precision@K. Of the chunks we retrieved, precision asks how many were actually useful. Higher is better. Think of it this way: How many suspects on the shortlist truly mattered.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Recall@K",
    "skin": "diagram",
    "visual": "Of all useful chunks that exist, recall asks how many we found. Higher is better. For BidIntel, missing evidence is worse than extra evidence. Analogy: Did we find every witness who mattered.",
    "narration": "Recall@K. Of all useful chunks that exist, recall asks how many we found. Higher is better. For BidIntel, missing evidence is worse than extra evidence. Think of it this way: Did we find every witness who mattered.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "MRR",
    "skin": "diagram",
    "visual": "Mean Reciprocal Rank measures how early the first correct result appears. Higher is better. Analogy: How quickly the detective finds the first real lead.",
    "narration": "MRR. Mean Reciprocal Rank measures how early the first correct result appears. Higher is better. Think of it this way: How quickly the detective finds the first real lead.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "NDCG",
    "skin": "diagram",
    "visual": "NDCG checks whether the best chunks are ranked highest, not merely found somewhere. Higher is better. Analogy: Putting the strongest witness first.",
    "narration": "NDCG. NDCG checks whether the best chunks are ranked highest, not merely found somewhere. Higher is better. Think of it this way: Putting the strongest witness first.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Faithfulness",
    "skin": "diagram",
    "visual": "Faithfulness asks whether the answer stayed grounded in retrieved context. It is the hallucination detector and the most important BidIntel metric. Analogy: No claims outside the case file.",
    "narration": "Faithfulness. Faithfulness asks whether the answer stayed grounded in retrieved context. It is the hallucination detector and the most important BidIntel metric. Think of it this way: No claims outside the case file.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Answer Relevancy",
    "skin": "diagram",
    "visual": "Answer relevancy asks whether the answer actually responds to the question. Higher is better. Analogy: The witness answers the question asked.",
    "narration": "Answer Relevancy. Answer relevancy asks whether the answer actually responds to the question. Higher is better. Think of it this way: The witness answers the question asked.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Context Precision / Context Recall",
    "skin": "diagram",
    "visual": "Context precision asks how much retrieved context was useful. Context recall asks whether we brought all needed evidence. Analogy: A clean case folder versus a complete case folder.",
    "narration": "Context Precision / Context Recall. Context precision asks how much retrieved context was useful. Context recall asks whether we brought all needed evidence. Think of it this way: A clean case folder versus a complete case folder.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Answer Correctness",
    "skin": "diagram",
    "visual": "Answer correctness compares the answer to a known ground truth. Higher is better. Analogy: The final statement matches the verified answer key.",
    "narration": "Answer Correctness. Answer correctness compares the answer to a known ground truth. Higher is better. Think of it this way: The final statement matches the verified answer key.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Latency / Cost / Citation Coverage / Hallucination Rate",
    "skin": "diagram",
    "visual": "Operations metrics track speed, money, source coverage, and unsupported claims. Analogy: The dashboard that tells the team if the system is practical.",
    "narration": "Latency / Cost / Citation Coverage / Hallucination Rate. Operations metrics track speed, money, source coverage, and unsupported claims. Think of it this way: The dashboard that tells the team if the system is practical.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "PostgreSQL",
    "skin": "diagram",
    "visual": "PostgreSQL is the relational database where BidIntel stores users, documents, chunks, audits, and scores. Analogy: The courthouse records office.",
    "narration": "PostgreSQL. PostgreSQL is the relational database where BidIntel stores users, documents, chunks, audits, and scores. Think of it this way: The courthouse records office.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "pgvector",
    "skin": "diagram",
    "visual": "pgvector adds vector storage and similarity search to PostgreSQL. Analogy: A meaning-coordinate cabinet inside the records office.",
    "narration": "pgvector. pgvector adds vector storage and similarity search to PostgreSQL. Think of it this way: A meaning-coordinate cabinet inside the records office.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Full-text Search / tsvector",
    "skin": "diagram",
    "visual": "Full-text search turns text into searchable keywords. tsvector is PostgreSQL's search-ready form. Analogy: A professional index in the back of a book.",
    "narration": "Full-text Search / tsvector. Full-text search turns text into searchable keywords. tsvector is PostgreSQL's search-ready form. Think of it this way: A professional index in the back of a book.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "HNSW & GIN Indexes",
    "skin": "diagram",
    "visual": "HNSW speeds up vector search. GIN speeds up keyword search. Analogy: Fast filing systems for meaning and exact words.",
    "narration": "HNSW & GIN Indexes. HNSW speeds up vector search. GIN speeds up keyword search. Think of it this way: Fast filing systems for meaning and exact words.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Docker / Container / docker-compose",
    "skin": "diagram",
    "visual": "A container packages a service with its runtime. Docker runs containers. docker-compose starts multiple services together. Analogy: A labeled toolbox that opens the same way on every machine.",
    "narration": "Docker / Container / docker-compose. A container packages a service with its runtime. Docker runs containers. docker-compose starts multiple services together. Think of it this way: A labeled toolbox that opens the same way on every machine.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "FastAPI / Swagger Docs",
    "skin": "diagram",
    "visual": "FastAPI is the Python web API framework. Swagger at /docs lets you click and test endpoints. Analogy: The service desk and its interactive menu.",
    "narration": "FastAPI / Swagger Docs. FastAPI is the Python web API framework. Swagger at /docs lets you click and test endpoints. Think of it this way: The service desk and its interactive menu.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "React / Vite",
    "skin": "diagram",
    "visual": "React builds the browser interface. Vite runs the local frontend quickly. Analogy: The analyst's control room.",
    "narration": "React / Vite. React builds the browser interface. Vite runs the local frontend quickly. Think of it this way: The analyst's control room.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "IAM Role / Temporary Credentials",
    "skin": "diagram",
    "visual": "An IAM role grants AWS permissions to the backend. Temporary credentials are short-lived credentials AWS provides automatically. Analogy: A time-limited badge, not a permanent key.",
    "narration": "IAM Role / Temporary Credentials. An IAM role grants AWS permissions to the backend. Temporary credentials are short-lived credentials AWS provides automatically. Think of it this way: A time-limited badge, not a permanent key.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "S3 / Secrets Manager / ECS Task",
    "skin": "diagram",
    "visual": "S3 stores files, Secrets Manager stores secrets, and an ECS task runs the backend container. Analogy: Storage room, locked safe, and assigned worker.",
    "narration": "S3 / Secrets Manager / ECS Task. S3 stores files, Secrets Manager stores secrets, and an ECS task runs the backend container. Think of it this way: Storage room, locked safe, and assigned worker.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "CloudTrail / CloudWatch",
    "skin": "diagram",
    "visual": "CloudTrail records AWS API actions. CloudWatch stores logs and metrics. Analogy: Security camera and operations dashboard.",
    "narration": "CloudTrail / CloudWatch. CloudTrail records AWS API actions. CloudWatch stores logs and metrics. Think of it this way: Security camera and operations dashboard.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Multi-tenancy / tenant_id / Access Groups / ATO",
    "skin": "diagram",
    "visual": "Multi-tenancy separates customers with tenant_id. Access groups limit documents. ATO means Authority to Operate, a formal production security approval. Analogy: Separate courtrooms, locked evidence rooms, and final authorization.",
    "narration": "Multi-tenancy / tenant_id / Access Groups / ATO. Multi-tenancy separates customers with tenant_id. Access groups limit documents. ATO means Authority to Operate, a formal production security approval. Think of it this way: Separate courtrooms, locked evidence rooms, and final authorization.",
    "code": "Concept card: definition before code.",
    "duration": 10,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Mental Model",
    "title": "Pipeline Map",
    "skin": "diagram",
    "visual": "<div class=\"diagram-grid\"><div class=\"node hot\">Browser</div><div class=\"node\">FastAPI</div><div class=\"node\">Hybrid Retrieval</div><div class=\"node\">Answer + Citations</div></div>",
    "narration": "Here is the whole case flow. The browser asks FastAPI. FastAPI checks identity, retrieves only allowed evidence, builds the context, calls the model or mock model, evaluates the answer, applies guardrails, writes audit, and returns citations.",
    "code": "frontend/src/lib/api.ts -> backend/app/api/chat_api.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Set Up Your Machine",
    "title": "Prerequisites",
    "skin": "terminal",
    "visual": "$ python3 --version\n$ node --version\n$ docker --version\n$ git --version",
    "narration": "A terminal is just the command window where we ask the computer to run tools. We need Python, Node, Docker, and Git before building BidIntel.",
    "code": "python3 --version\nnode --version\ndocker --version\ngit --version",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Folder Structure",
    "title": "Project Skeleton",
    "skin": "terminal",
    "visual": "bidintel-ai/\n  backend/app/api\n  backend/app/services\n  frontend/src\n  infra\n  docs\n  tutorial",
    "narration": "The frontend is the analyst screen. The backend owns APIs and security. Services hold RAG logic. Infra explains AWS. Docs explain how to run and harden it.",
    "code": "find bidintel-ai -maxdepth 3 -type d",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Docker & Database",
    "title": "Start Postgres and Phoenix",
    "skin": "terminal",
    "visual": "$ docker compose up -d\nCreating bidintel-db\nCreating bidintel-phoenix",
    "narration": "Docker starts PostgreSQL with pgvector and Phoenix for observability. PostgreSQL stores records. pgvector stores meaning coordinates.",
    "code": "docker compose up -d",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Database Schema",
    "title": "Tables and Indexes",
    "skin": "editor",
    "visual": "CREATE TABLE document_chunks (...\n  embedding vector(1024),\n  search_vector tsvector,\n  is_active boolean\n);\nCREATE INDEX ... GIN;\nCREATE INDEX ... hnsw;",
    "narration": "The schema creates the evidence store. The critical table is document_chunks, because search retrieves chunks, not whole PDFs.",
    "code": "backend/app/schema.sql",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Documents In",
    "title": "Ingestion",
    "skin": "diagram",
    "visual": "<div class=\"diagram-grid\"><div class=\"node hot\">Extract Text</div><div class=\"node hot\">Chunk</div><div class=\"node hot\">Embed</div><div class=\"node hot\">Store</div></div>",
    "narration": "Document ingestion turns a PDF or text file into searchable evidence. Extract text, split into chunks, create embeddings, and store active chunks with page and section metadata.",
    "code": "backend/app/api/documents_api.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Keyword Search",
    "title": "BM25 Query",
    "skin": "editor",
    "visual": "bm25_search(db, tenant_id, access_groups, query, top_k)\n# exact-word detective\n# tenant and access groups filter first",
    "narration": "BM25 is our literal detective. It is great when the analyst uses exact words like submission requirements or due date.",
    "code": "backend/app/services/bm25_search.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Meaning Search",
    "title": "Vector Query",
    "skin": "editor",
    "visual": "vector_search(db, tenant_id, access_groups, query_embedding, top_k)\n# meaning detective\n# cosine similarity",
    "narration": "Vector search is the meaning detective. It can connect automobile to car, or cybersecurity incident response to breach handling.",
    "code": "backend/app/services/vector_store.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Hybrid + RRF",
    "title": "Merge Results",
    "skin": "editor",
    "visual": "score += 1 / (60 + rank)\n# first place = 0.01639\n# RRF is not reranking",
    "narration": "RRF merges the detective lists without trusting incompatible score scales. Rank position is enough. Shared candidates rise.",
    "code": "backend/app/services/rrf.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Reranker",
    "title": "Shortlist Review",
    "skin": "editor",
    "visual": "SimpleReranker().rerank(question, fused, top_n=5)",
    "narration": "The reranker is the deeper review. It looks at the question and shortlisted chunks and keeps the strongest evidence for the model.",
    "code": "backend/app/services/reranker.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Context & Model",
    "title": "Build Prompt",
    "skin": "editor",
    "visual": "Answer only from the evidence below.\nQuestion: ...\nEvidence:\n[S1] title page 7: ...",
    "narration": "Context engineering means arranging evidence so the model can answer safely. In local mode, MockLLM replaces Bedrock so you can run with no AWS keys.",
    "code": "backend/app/services/prompt_builder.py\nbackend/app/services/llm_bedrock.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Guardrails & Safety",
    "title": "Filter Before LLM",
    "skin": "diagram",
    "visual": "Never retrieve everything and ask the model to behave. Filter by tenant_id, active version, and access_groups before any chunk reaches the LLM.",
    "narration": "This is the most important security rule. The model never receives documents the user is not allowed to see.",
    "code": "backend/app/services/retrieval.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Evaluation",
    "title": "Did It Work?",
    "skin": "browser",
    "visual": "<div class=\"panel\"><strong>Faithfulness</strong><p>1.0</p></div><div class=\"panel\"><strong>Context recall</strong><p>0.90</p></div>",
    "narration": "Evaluation checks retrieval and answers. Faithfulness is number one for BidIntel because a confident unsupported answer is dangerous.",
    "code": "backend/app/services/evaluator.py\nbackend/app/services/ragas_eval.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Observability",
    "title": "Phoenix Traces",
    "skin": "browser",
    "visual": "<div class=\"panel\">Trace: /chat/ask</div><div class=\"panel\">retrieve: 42 ms</div><div class=\"panel\">evaluate: 8 ms</div>",
    "narration": "Observability records the request timeline. When something is slow or wrong, traces show which step caused it.",
    "code": "backend/app/services/observability.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Frontend",
    "title": "Button to API",
    "skin": "browser",
    "visual": "<div class=\"panel\"><textarea>What are the submission requirements?</textarea><button>Ask BidIntel</button></div><div class=\"panel\">Answer with source cards</div>",
    "narration": "The Assistant page sends the question through one API wrapper, waits for JSON, then renders the answer and source cards.",
    "code": "frontend/src/lib/api.ts\nfrontend/src/pages/AssistantPage.tsx",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Analyst Tools",
    "title": "Proposal Scoring Engine",
    "skin": "browser",
    "visual": "<div class=\"panel\">Requirement: 24/7 help desk with 15-minute P1 response</div><div class=\"panel\">Status: Partial · Score: 60 · Fix: add SLA table and escalation workflow</div>",
    "narration": "BidIntel is more than chat. RAG finds the evidence, then the proposal scoring engine grades compliance, technical strength, management, past performance, and price risk before returning a scorecard with fixes.",
    "code": "docs/PROPOSAL_SCORING_ENGINE.md\nbackend/app/services/bid_scoring.py\nbackend/app/api/bid_api.py",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Going to AWS",
    "title": "Eight Console Steps",
    "skin": "aws",
    "visual": "<h2>Bedrock, IAM, S3, Secrets, ECS, CloudTrail, CloudWatch, VPC endpoints</h2><button>Attach invoke-only policy</button>",
    "narration": "In AWS, the backend runs with an IAM role. No AWS keys go in the frontend. The Bedrock policy only permits the approved Claude and Titan models.",
    "code": "infra/aws-click-by-click.md\ninfra/iam-policy-bedrock.json",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Run End-to-End",
    "title": "Proof Commands",
    "skin": "terminal",
    "visual": "$ python backend/app/scripts/init_db.py\n$ python backend/app/scripts/seed_data.py\n$ uvicorn app.main:app --reload --port 8000\n$ npm run dev\n$ pytest backend/tests/test_app_acceptance.py -q\n5 passed",
    "narration": "This is the local proof path. Start the database, seed demo data, run FastAPI, run Vite, upload or use seeded documents, ask a question, and confirm sources plus audit.",
    "code": ".venv/bin/python -m pytest backend/tests/test_app_acceptance.py -q",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Troubleshooting & Maturity",
    "title": "Common Problems",
    "skin": "browser",
    "visual": "<div class=\"panel\">DB connection: check Docker and password.</div><div class=\"panel\">Bedrock AccessDenied: check model access and IAM.</div><div class=\"panel\">No chunks: check active version and access groups.</div>",
    "narration": "Common failures are ordinary. Check database connection, Bedrock permissions, CORS origins, active chunks, retrieval speed, and unsupported answers.",
    "code": "docs/BUILD_BIBLE.md",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Original Build - Final Recap",
    "title": "ADHD Short Version",
    "skin": "diagram",
    "visual": "Upload documents. Split into chunks. Search by words and meaning. Fuse with RRF. Rerank. Build context. Answer with citations. Evaluate. Guardrail. Audit.",
    "narration": "You went from zero to the full map. BidIntel is a secure evidence pipeline around an AI model, not a generic chatbot. The prototype works locally; production still needs cloud and security review.",
    "code": "README.md",
    "duration": 11,
    "codeMode": "refs"
  },
  {
    "chapter": "Bridge",
    "title": "Now Add The Product Walkthrough",
    "skin": "diagram",
    "visual": "<div class=\"diagram\"><div class=\"flow\"><div class=\"node hot\">Original build</div><div class=\"node\">RAG core</div><div class=\"node\">Frontend screens</div><div class=\"node\">AWS/IAM/Bedrock</div><div class=\"node hot\">One complete tutorial</div></div></div>",
    "narration": "The first half explains and builds the RAG system. The second half adds the product walkthrough: login, dashboard, document ingest, RAG ask, proposal scoring, RAGAS and Phoenix dashboards, AWS hosting, IAM, and Bedrock.",
    "code": "Combined tutorial copy:\nfile:///Users/adamsmith/Documents/New%20project/bidintel-ai/tutorial-complete/index.html\n\nThis page keeps the original build tutorial and appends the frontend/AWS/Bedrock/IAM walkthrough.\nThe original tutorial folder is not modified.",
    "codeMode": "literal",
    "duration": 14
  },
  {
    "chapter": "Granular PDF - Product Screens",
    "title": "Login Screen Matches The Real Product",
    "skin": "browser",
    "visual": "<div class=\"reference-shot\"><img src=\"assets/bidintel-login-reference.png\" alt=\"Reference login screen with AWS IAM Identity Center and Entra ID\" /><div class=\"shot-label\">Reference login screen with AWS IAM Identity Center and Entra ID</div></div>",
    "narration": "The tutorial needs to show what the app actually looks like. The login screen starts with the BidIntel command center and gives the user AWS IAM Identity Center or Microsoft Entra ID sign-in before the backend maps identity to role and groups.",
    "code": "Source screenshot:\n/Users/adamsmith/Downloads/Snip20260611_49.png\n\nFrontend route:\nfrontend/src/pages/LoginPage.tsx\n\nSSO buttons:\n- Continue with AWS IAM Identity Center\n- Continue with Microsoft Entra ID\n\nBackend contract:\nGET /auth/me\n\nReturned identity shape:\n{\n  \"email\": \"adam.davis@bidintel.ai\",\n  \"role\": \"proposal_writer\",\n  \"tenant_id\": \"tenant_demo\",\n  \"access_groups\": [\"Proposal_Team\", \"Capture_Team\"]\n}",
    "codeMode": "literal",
    "duration": 18
  },
  {
    "chapter": "Granular PDF - Product Screens",
    "title": "Document Ingest Screen Is The RAG Starting Point",
    "skin": "browser",
    "visual": "<div class=\"reference-shot\"><img src=\"assets/bidintel-documents-reference.png\" alt=\"Reference document upload, classification, metadata, and ingest screen\" /><div class=\"shot-label\">Reference document upload, classification, metadata, and ingest screen</div></div>",
    "narration": "The document screen is where RAG begins. The analyst uploads a solicitation or contract, adds classification and access groups, then the backend extracts text, chunks it, embeds it, stores metadata, and makes it available for retrieval.",
    "code": "Source screenshot:\n/Users/adamsmith/Downloads/Snip20260613_59.png\n\nFrontend route:\nfrontend/src/pages/DocumentsPage.tsx\n\nBackend flow:\nPOST /documents/upload\nPOST /documents/{doc_id}/classify\nPOST /documents/{doc_id}/ingest\n\nRAG pipeline:\n1. upload PDF\n2. extract text\n3. chunk document\n4. generate embeddings\n5. store metadata and access_groups\n6. make searchable by BM25 + vector retrieval",
    "codeMode": "literal",
    "duration": 20
  },
  {
    "chapter": "Granular PDF - Product Screens",
    "title": "Audit Logs Prove Guardrails And Accountability",
    "skin": "browser",
    "visual": "<div class=\"reference-shot\"><img src=\"assets/bidintel-audit-reference.png\" alt=\"Reference audit log screen with allowed, review, and blocked actions\" /><div class=\"shot-label\">Reference audit log screen with allowed, review, and blocked actions</div></div>",
    "narration": "The audit screen is not decoration. It proves every query, retrieval, model call, evaluation score, and blocked guardrail decision is recorded and exportable.",
    "code": "Source screenshot:\n/Users/adamsmith/Downloads/Snip20260613_58.png\n\nFrontend route:\nfrontend/src/pages/AuditLogsPage.tsx\n\nBackend endpoint:\nGET /audit/events\n\nAudit row fields:\n- time\n- user\n- role\n- query/action\n- retrieved document ids\n- model\n- eval score\n- guardrail result\n\nRetention:\nStore events for compliance review and export.",
    "codeMode": "literal",
    "duration": 18
  },
  {
    "chapter": "Granular PDF - Frontend Code Order",
    "title": "Five Frontend Files First",
    "skin": "editor",
    "visual": "frontend/index.html\nfrontend/src/style.css\nfrontend/src/lib/api.ts\nfrontend/src/pages/AssistantPage.tsx\nfrontend/src/pages/LoginPage.tsx",
    "narration": "The granular build starts with five frontend files. The HTML mount point loads React, CSS defines the command-center look, api.ts is the only bridge to Python, and the page components prove the click loop.",
    "code": "# frontend/index.html\n<!doctype html>\n<html>\n<head><meta charset=\"utf-8\"><title>BidIntel AI</title></head>\n<body>\n  <div id=\"root\"></div>\n  <script type=\"module\" src=\"/src/main.tsx\"></script>\n</body>\n</html>\n\n# frontend/src/style.css\nbody { margin:0; font-family:Inter,Arial,sans-serif; background:#0a111f; color:#eaf4ff; }\n.app-shell { display:flex; min-height:100vh; }\n.sidebar { width:240px; background:#0c1b2e; padding:20px; }\n.sidebar button.active { background:#1d7ff2; }\n.main { flex:1; padding:24px; }\ntextarea { width:100%; min-height:130px; background:#0c1b2e; color:#eaf4ff;\n  border:1px solid #2a4f77; border-radius:10px; padding:12px; }\n.card, .answer, .source { background:#0c1b2e; border:1px solid #244c70;\n  border-radius:12px; padding:16px; margin:10px 0; }",
    "codeMode": "literal",
    "duration": 22
  },
  {
    "chapter": "Granular PDF - Frontend Code Order",
    "title": "api.ts Is The Bridge From Browser To Python",
    "skin": "editor",
    "visual": "Browser click\n  -> frontend/src/lib/api.ts\n  -> HTTP JSON\n  -> FastAPI Python backend",
    "narration": "Every screen calls the backend through one API client. That makes local development and AWS cutover a single environment variable instead of a rewrite.",
    "code": "# frontend/src/lib/api.ts\nconst API_BASE = import.meta.env.VITE_API_BASE || \"http://localhost:8000\";\n\nexport async function apiGet(path: string) {\n  const res = await fetch(`${API_BASE}${path}`);\n  if (!res.ok) throw new Error(await res.text());\n  return res.json();\n}\n\nexport async function apiPost(path: string, body: unknown) {\n  const res = await fetch(`${API_BASE}${path}`, {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(body),\n  });\n  if (!res.ok) throw new Error(await res.text());\n  return res.json();\n}\n\n# Local .env\nVITE_API_BASE=http://localhost:8000\n\n# AWS cutover\nVITE_API_BASE=https://api.bidintel.com",
    "codeMode": "literal",
    "duration": 24
  },
  {
    "chapter": "Granular PDF - Frontend Code Order",
    "title": "Assistant Click Loop",
    "skin": "editor",
    "visual": "onClick Ask\n  -> apiPost(\"/chat/ask\", { question })\n  -> setAnswer(data)\n  -> React rerenders answer + sources",
    "narration": "This is the exact frontend loop: user types, clicks Ask, React calls FastAPI, saves the JSON result into state, and rerenders the answer plus source chunks.",
    "code": "# frontend/src/pages/AssistantPage.tsx\nimport { useState } from \"react\";\nimport { apiPost } from \"../lib/api\";\n\nexport function AssistantPage() {\n  const [question, setQuestion] = useState(\"\");\n  const [answer, setAnswer] = useState<any>(null);\n\n  async function ask() {\n    const data = await apiPost(\"/chat/ask\", { question });\n    setAnswer(data);\n  }\n\n  return (\n    <section>\n      <h1>AI Assistant</h1>\n      <textarea value={question} onChange={e => setQuestion(e.target.value)} />\n      <button onClick={ask}>Ask</button>\n      {answer && (\n        <div className=\"answer\">\n          <p>{answer.answer}</p>\n          {answer.sources?.map((s:any) =>\n            <div className=\"source\" key={s.id}>{s.chunk_text}</div>)}\n        </div>\n      )}\n    </section>\n  );\n}",
    "codeMode": "literal",
    "duration": 26
  },
  {
    "chapter": "Granular PDF - Backend Code Order",
    "title": "FastAPI Receives The Click",
    "skin": "editor",
    "visual": "POST /chat/ask\n  auth user\n  guardrails\n  embed question\n  retrieve allowed chunks\n  generate answer\n  write audit\n  return JSON",
    "narration": "The Python backend is where security and RAG actually happen. The frontend does not retrieve documents or call the model. FastAPI checks the user, filters retrieval by access group, builds the prompt, calls the LLM, writes the audit row, and returns JSON.",
    "code": "# backend/app/api/chat_api.py\n@router.post(\"/chat/ask\")\ndef ask(req: AskRequest, db=Depends(get_db),\n        user=Depends(get_current_user)):\n    if check_prompt_injection(req.question)[\"blocked\"]:\n        return {\"answer\": \"Blocked by guardrails.\"}\n\n    q_emb = embedder.embed(req.question)\n    chunks = retrieve(\n        db,\n        user.tenant_id,\n        req.question,\n        q_emb,\n        user.access_groups,\n        settings.rag_top_k,\n        settings.rag_rerank_top_n,\n    )\n    answer = llm.generate(build_prompt(req.question, chunks))\n    write_audit(db, user, \"chat.ask\", question=req.question, chunks=chunks)\n    return {\"answer\": answer, \"sources\": chunks}",
    "codeMode": "literal",
    "duration": 26
  },
  {
    "chapter": "Granular PDF - Login And Access",
    "title": "Login Maps To Groups, Not Just A UI Button",
    "skin": "editor",
    "visual": "SSO identity\n  -> /auth/me\n  -> CurrentUser\n  -> role + access_groups\n  -> retrieval SQL filter",
    "narration": "Login is not just a page. The SSO identity maps to role and access groups, and those groups are used on every retrieval query so unauthorized documents never reach the prompt.",
    "code": "# frontend/src/pages/LoginPage.tsx\nimport { apiGet } from \"../lib/api\";\n\nexport function LoginPage({ onLogin }: any) {\n  async function login() {\n    const user = await apiGet(\"/auth/me\");\n    onLogin(user);\n  }\n  return (<div className=\"login-card\">\n    <h1>BidIntel AI</h1>\n    <button onClick={login}>Continue with SSO</button>\n  </div>);\n}\n\n# frontend/src/components/ProtectedRoute.tsx\nexport function ProtectedRoute({ user, allow, children }: any) {\n  if (!user) return <LoginPage />;\n  if (allow && !allow.includes(user.role)) return <p>Not authorized.</p>;\n  return children;\n}\n\n# backend/app/auth.py\n@dataclass\nclass CurrentUser:\n    user_id: str\n    tenant_id: str\n    email: str\n    role: str\n    access_groups: list[str]\n\ndef get_current_user(x_bidintel_user: str | None = Header(None)) -> CurrentUser:\n    return CurrentUser(\n        user_id=\"...\",\n        tenant_id=\"...\",\n        email=x_bidintel_user,\n        role=\"proposal_writer\",\n        access_groups=[\"Proposal_Team\", \"Capture_Team\"],\n    )",
    "codeMode": "literal",
    "duration": 28
  },
  {
    "chapter": "Granular PDF - AWS Console Screens",
    "title": "AWS Home: The Services You Actually Open",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Recently visited</span><span>IAM Identity Center</span><span>Amazon Bedrock</span><span>ECR</span><span>ECS</span><span>S3</span><span>CloudFront</span><span>Secrets Manager</span><span>RDS</span></aside><main><div class=\"aws-top\"><span>Console Home / BidIntel deployment path</span><strong>AWS Console</strong></div><h2>Open these services in this order</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Identity</h3><p>IAM Identity Center or Cognito for user login.</p></section><section class=\"aws-card\"><h3>Model</h3><p>Amazon Bedrock model access for Claude and Titan embeddings.</p></section><section class=\"aws-card\"><h3>Backend</h3><p>ECR stores the image. ECS Fargate runs FastAPI.</p></section><section class=\"aws-card\"><h3>Frontend</h3><p>S3 hosts static files. CloudFront serves the site URL.</p></section><section class=\"aws-card\"><h3>Secrets/Data</h3><p>Secrets Manager, RDS PostgreSQL, and S3 document storage.</p></section></div></main></div>",
    "narration": "This is the AWS console mental map. For BidIntel you open Identity Center, Bedrock, IAM, Secrets Manager, RDS, S3, ECR, ECS, and CloudFront. The order matters because later screens depend on earlier credentials and roles.",
    "code": "AWS console service order:\n1. IAM Identity Center or Cognito\n2. Amazon Bedrock model access\n3. IAM backend task role and policy\n4. Secrets Manager for DATABASE_URL\n5. RDS PostgreSQL\n6. S3 document bucket\n7. ECR backend repository\n8. ECS Fargate service or App Runner\n9. S3 static frontend bucket\n10. CloudFront distribution",
    "codeMode": "literal",
    "duration": 24
  },
  {
    "chapter": "Granular PDF - AWS Console Screens",
    "title": "IAM Identity Center: User Login And Groups",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Dashboard</span><span>Users</span><span>Groups</span><span>Applications</span><span>Settings</span></aside><main><div class=\"aws-top\"><span>AWS Console / IAM Identity Center / Users and groups</span><strong>IAM Identity Center</strong></div><h2>Create users, groups, and the BidIntel app</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Enable</h3><p>Enable IAM Identity Center in the AWS account or organization.</p></section><section class=\"aws-card\"><h3>Groups</h3><p>Create Proposal_Team and Capture_Team groups.</p></section><section class=\"aws-card\"><h3>Users</h3><p>Add adam@firm.com and assign the right group memberships.</p></section><section class=\"aws-card\"><h3>Application</h3><p>Add custom SAML/OIDC app named BidIntel and set callback URL.</p></section></div></main></div>",
    "narration": "This is where the user's login starts. Create the groups in Identity Center, add users to the right groups, and connect BidIntel as a SAML or OIDC app so the backend can read group claims.",
    "code": "Click path:\nConsole -> IAM Identity Center -> Enable\nGroups -> Create group -> Proposal_Team\nGroups -> Create group -> Capture_Team\nUsers -> Add user -> adam@firm.com -> assign groups\nApplications -> Add application -> custom SAML/OIDC app\nConfigure redirect/callback URL for BidIntel\n\nBackend mapping:\nSSO group claims -> CurrentUser.access_groups\n\nSecurity rule:\nThe UI can hide pages, but the backend must enforce access_groups in retrieval.",
    "codeMode": "literal",
    "duration": 30
  },
  {
    "chapter": "Granular PDF - AWS Console Screens",
    "title": "Bedrock: Enable Claude And Titan",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Overview</span><span>Model access</span><span>Base models</span><span>Playgrounds</span><span>Inference profiles</span></aside><main><div class=\"aws-top\"><span>AWS Console / Amazon Bedrock / Model access</span><strong>Amazon Bedrock</strong></div><h2>Manage model access</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Claude Sonnet</h3><p>Status: Access granted</p></section><section class=\"aws-card\"><h3>Titan Embeddings</h3><p>Status: Access granted</p></section><section class=\"aws-card\"><h3>Model IDs</h3><p>Store IDs in environment variables. Do not store keys in the frontend.</p></section><section class=\"aws-card\"><h3>Runtime call</h3><p>FastAPI calls Bedrock Runtime using the ECS task role.</p></section></div></main></div>",
    "narration": "Bedrock access is a console step before code works. Open Amazon Bedrock, go to Model access, enable Anthropic Claude Sonnet and Amazon Titan Embeddings, then store only model IDs in the backend environment.",
    "code": "Click path:\nConsole -> Amazon Bedrock -> Model access -> Manage model access\nEnable:\n- Anthropic Claude Sonnet\n- Amazon Titan Embeddings\nSave and wait for Access granted\n\n# backend .env values\nAWS_REGION=us-east-1\nBEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20240620-v1:0\nEMBEDDING_MODEL_ID=amazon.titan-embed-text-v2:0\n\nRule:\nNo Bedrock call from React.\nNo AWS key in browser code.\nBackend calls Bedrock using the ECS task role.",
    "codeMode": "literal",
    "duration": 30
  },
  {
    "chapter": "Granular PDF - AWS Console Screens",
    "title": "IAM Role: Backend Service Permissions",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Users</span><span>User groups</span><span>Roles</span><span>Policies</span><span>Identity providers</span></aside><main><div class=\"aws-top\"><span>AWS Console / IAM / Roles / bidintel-backend-role</span><strong>IAM</strong></div><h2>Create the ECS task role</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Trusted entity</h3><p>AWS service: Elastic Container Service Task.</p></section><section class=\"aws-card\"><h3>Inline policy</h3><p>Allow only approved Bedrock model ARNs.</p></section><section class=\"aws-card\"><h3>Secrets</h3><p>Read database secret from Secrets Manager.</p></section><section class=\"aws-card\"><h3>S3</h3><p>Read/write only the BidIntel document bucket.</p></section></div></main></div>",
    "narration": "The backend needs its own AWS identity. Create an IAM role trusted by ECS tasks, attach least-privilege policy for the approved Bedrock models, and add only the S3 and Secrets permissions this service needs.",
    "code": "# infra/iam-policy-bedrock.json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Sid\": \"InvokeApprovedBedrockModels\",\n    \"Effect\": \"Allow\",\n    \"Action\": [\n      \"bedrock:InvokeModel\",\n      \"bedrock:InvokeModelWithResponseStream\"\n    ],\n    \"Resource\": [\n      \"arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0\",\n      \"arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v2:0\"\n    ]\n  }]\n}\n\nClick path:\nConsole -> IAM -> Roles -> Create role\nTrusted entity -> AWS service -> Elastic Container Service Task\nRole name -> bidintel-backend-role\nAttach inline Bedrock policy\nAdd Secrets Manager read permission\nAdd S3 document bucket permission",
    "codeMode": "literal",
    "duration": 34
  },
  {
    "chapter": "Granular PDF - AWS Console Screens",
    "title": "ECR And ECS: Host The FastAPI Backend",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Clusters</span><span>Task definitions</span><span>Services</span><span>ECR repositories</span><span>Load balancers</span></aside><main><div class=\"aws-top\"><span>AWS Console / ECR + ECS / BidIntel backend</span><strong>ECS Fargate</strong></div><h2>Containerize and run the Python API</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>ECR repository</h3><p>Create bidintel-backend and push Docker image.</p></section><section class=\"aws-card\"><h3>Task definition</h3><p>Image = ECR URI. Task role = bidintel-backend-role.</p></section><section class=\"aws-card\"><h3>Environment</h3><p>AWS_REGION, BEDROCK_MODEL_ID, DATABASE_URL secret.</p></section><section class=\"aws-card\"><h3>Service URL</h3><p>Attach Application Load Balancer and copy backend URL.</p></section></div></main></div>",
    "narration": "The backend is hosted as a container. Build the Docker image, push it to ECR, create an ECS Fargate task using the backend IAM role, pass environment variables and secrets, then expose it through a load balancer.",
    "code": "# Build locally\ndocker build -t bidintel-backend ./backend\n\n# AWS console path\nConsole -> ECR -> Create repository -> bidintel-backend\nCopy the push commands ECR shows\ndocker tag bidintel-backend <account>.dkr.ecr.us-east-1.amazonaws.com/bidintel-backend:latest\ndocker push <account>.dkr.ecr.us-east-1.amazonaws.com/bidintel-backend:latest\n\nConsole -> ECS -> Create cluster -> Fargate\nECS -> Task definitions -> Create\nImage = ECR URI\nTask role = bidintel-backend-role\nEnvironment:\n  AWS_REGION\n  BEDROCK_MODEL_ID\n  DATABASE_URL from Secrets Manager\nECS -> Create Service\nAttach Application Load Balancer\nCopy backend public URL",
    "codeMode": "literal",
    "duration": 34
  },
  {
    "chapter": "Granular PDF - AWS Console Screens",
    "title": "S3 And CloudFront: Host The Frontend",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>S3 buckets</span><span>CloudFront distributions</span><span>Origins</span><span>Behaviors</span><span>Invalidations</span></aside><main><div class=\"aws-top\"><span>AWS Console / S3 / CloudFront / BidIntel frontend</span><strong>S3 + CloudFront</strong></div><h2>Upload static build and serve it globally</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Build frontend</h3><p>Set VITE_API_BASE to the AWS backend URL, then npm run build.</p></section><section class=\"aws-card\"><h3>S3 bucket</h3><p>Create bidintel-frontend and upload dist/ files.</p></section><section class=\"aws-card\"><h3>CloudFront</h3><p>Create distribution with S3 as origin.</p></section><section class=\"aws-card\"><h3>Test</h3><p>Open CloudFront URL and verify login, upload, ask, score, audit.</p></section></div></main></div>",
    "narration": "The frontend is static HTML, CSS, and JavaScript after Vite builds it. Set the API base to the AWS backend URL, build the dist folder, upload it to S3, put CloudFront in front, and test the real hosted URL.",
    "code": "# Build frontend for AWS backend\ncd frontend\nVITE_API_BASE=https://api.bidintel.com npm run build\n\n# Console path\nConsole -> S3 -> Create bucket -> bidintel-frontend\nUpload frontend/dist/\n\nConsole -> CloudFront -> Create distribution\nOrigin = bidintel-frontend S3 bucket\nDeploy distribution\n\nFinal test:\nOpen CloudFront URL\nLogin with SSO\nUpload document\nAsk RAG question\nScore proposal\nCheck audit log",
    "codeMode": "literal",
    "duration": 30
  },
  {
    "chapter": "Granular PDF - AWS Console Screens",
    "title": "Secrets, RDS, And S3 Document Storage",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Secrets Manager</span><span>RDS</span><span>S3</span><span>KMS</span><span>CloudWatch</span></aside><main><div class=\"aws-top\"><span>AWS Console / Data services / BidIntel storage</span><strong>Secrets Manager + RDS + S3</strong></div><h2>Create the data layer before live deploy</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Secrets Manager</h3><p>Store DATABASE_URL and other backend-only secrets.</p></section><section class=\"aws-card\"><h3>RDS PostgreSQL</h3><p>Database for users, documents, chunks, scores, and audit events.</p></section><section class=\"aws-card\"><h3>pgvector</h3><p>Vector indexes for semantic retrieval.</p></section><section class=\"aws-card\"><h3>S3 documents</h3><p>Bucket for original uploaded contracts and solicitations.</p></section></div></main></div>",
    "narration": "The data layer is where the real system becomes durable. Store secrets in Secrets Manager, run PostgreSQL in RDS, enable vector retrieval, and keep uploaded documents in an S3 bucket controlled by backend IAM.",
    "code": "Console -> Secrets Manager\nCreate secret:\n  name = bidintel/prod/database-url\n  value = postgresql://...\n\nConsole -> RDS\nCreate PostgreSQL database\nEnable pgvector where supported\nRun migrations:\n  documents\n  chunks\n  embeddings\n  scores\n  audit_events\n\nConsole -> S3\nCreate bucket:\n  bidintel-documents-prod\nBackend IAM role:\n  read/write only this bucket\n\nRule:\nFrontend never receives DATABASE_URL or raw AWS credentials.",
    "codeMode": "literal",
    "duration": 30
  },
  {
    "chapter": "Granular PDF - Final Order",
    "title": "Final Build Order From The PDF",
    "skin": "diagram",
    "visual": "<div class=\"diagram-grid\"><div class=\"node hot\">1. Build 5 frontend files</div><div class=\"node hot\">2. Verify click loop</div><div class=\"node \">3. FastAPI /chat/ask</div><div class=\"node \">4. Login and access_groups</div><div class=\"node \">5. Enable Bedrock</div><div class=\"node \">6. IAM backend role</div><div class=\"node \">7. S3/RDS/Secrets</div><div class=\"node \">8. ECR/ECS backend</div><div class=\"node hot\">9. S3/CloudFront frontend</div><div class=\"node hot\">10. Flip live settings</div></div>",
    "narration": "This is the corrected granular order from the attached PDF. Build the frontend and click loop first, wire FastAPI, add login and group filters, then do Bedrock access, IAM, data services, backend hosting, frontend hosting, and finally flip from mock to live.",
    "code": "Final order, granular:\n1. Build the 5 frontend files on the mock.\n2. Verify the click loop.\n3. Implement FastAPI /chat/ask.\n4. Implement login and group-to-access mapping.\n5. Enable Bedrock model access.\n6. Create bidintel-backend-role and least-privilege policy.\n7. Create S3, RDS, and Secrets Manager entries.\n8. Push backend image to ECR and deploy ECS.\n9. Set up IAM Identity Center login and group claims.\n10. Build frontend with AWS VITE_API_BASE.\n11. Deploy frontend to S3 and CloudFront.\n12. Set LOCAL_MOCK_LLM=false.\n13. Test login, upload, RAG ask, score, audit, logs.",
    "codeMode": "literal",
    "duration": 28
  },
  {
    "chapter": "Frontend + AWS - Correct Build Order",
    "title": "Create The Local Project Skeleton",
    "visual": "<div class=\"terminal\">$ mkdir bidintel\n$ cd bidintel\n$ mkdir frontend backend infra docs\n\nfrontend = what the user clicks\nbackend = API and security brain\ndatabase = users, docs, chunks, audit, permissions\nAWS = hosting, identity, Bedrock, IAM roles</div>",
    "narration": "The build starts with the local folder structure, not AWS. First separate frontend, backend, infra, and docs so each layer has a clear responsibility.",
    "code": "mkdir bidintel\ncd bidintel\nmkdir frontend\nmkdir backend\nmkdir infra\nmkdir docs\n\nRule:\nBuild locally first.\nMock the frontend first.\nWire the backend second.\nAdd database and RAG after the screens are proven.",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Frontend First",
    "title": "Vite React App And Routes",
    "visual": "\n<div class=\"app-shell\">\n  <aside class=\"side\">\n    <strong>BidIntel AI</strong>\n    <span class=\"active\">Dashboard</span><span class=\"\">Documents</span><span class=\"\">Ask BidIntel</span><span class=\"\">Proposal Scoring</span><span class=\"\">Compliance</span><span class=\"\">Audit</span>\n  </aside>\n  <section class=\"content\"><h2>Frontend route map</h2><div class=\"cards\"><div class=\"card\">Login<strong>/login</strong></div><div class=\"card\">Dashboard<strong>/</strong></div><div class=\"card\">Documents<strong>/upload</strong></div><div class=\"card\">RAG Ask<strong>/assistant</strong></div></div><div class=\"grid2\"><div class=\"panel\">Proposal scoring: /bid-score</div><div class=\"panel\">Compliance matrix: /compliance</div></div></section>\n</div>",
    "narration": "Build the frontend first with mock data. The goal is to prove that login, navigation, upload, RAG ask, and scoring screens make sense before wiring AWS.",
    "code": "cd frontend\nnpm create vite@latest . -- --template react-ts\nnpm install\nnpm install axios react-router-dom lucide-react\n\nfrontend/src/App.tsx routes:\n/login -> Login\n/ -> Dashboard\n/upload -> Upload\n/assistant -> Assistant\n/bid-score -> BidScore\n/compliance -> ComplianceMatrix\n/audit -> AdminAudit",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Frontend First",
    "title": "API Client Is The Switch",
    "visual": "<div class=\"browser\"><div class=\"address\">frontend/src/api/client.ts</div><div class=\"web\"><div class=\"panel\">Local API: http://localhost:8000</div><div class=\"panel\">AWS API later: https://api.bidintel.com</div><div class=\"panel\">One client file means the UI does not need to know where the backend is hosted.</div></div></div>",
    "narration": "The frontend API client is the switch between local development and AWS. The frontend never calls the database or Bedrock directly.",
    "code": "// frontend/src/api/client.ts\nimport axios from \"axios\";\n\nexport const api = axios.create({\n  baseURL: import.meta.env.VITE_API_BASE_URL || \"http://localhost:8000\",\n  withCredentials: true,\n});\n\n// Local .env:\nVITE_API_BASE_URL=http://localhost:8000\n\n// AWS cutover:\nVITE_API_BASE_URL=https://api.bidintel.com",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Frontend Product Flow",
    "title": "Login Screen And Identity",
    "visual": "<div class=\"browser\"><div class=\"address\">http://localhost:5173/login</div><div class=\"web\"><div class=\"panel\"><h2>Sign in to BidIntel AI</h2><p>Continue with AWS IAM Identity Center</p><p>Continue with Microsoft Entra ID</p><button>Sign in as Proposal Writer</button></div><div class=\"panel\">Backend returns user, tenant, role, and groups.</div></div></div>",
    "narration": "The login screen is the first product screen. The frontend can show or hide pages, but the backend enforces real access by checking the user, tenant, role, and groups.",
    "code": "GET /auth/me\n\n{\n  \"user_id\": \"u_123\",\n  \"email\": \"analyst@agency.gov\",\n  \"tenant_id\": \"county_001\",\n  \"role\": \"analyst\",\n  \"groups\": [\"bidintel-analysts\"]\n}\n\nSecurity rule:\nFrontend display is convenience.\nBackend authorization is enforcement.",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Frontend Product Flow",
    "title": "Dashboard After Login",
    "visual": "\n<div class=\"app-shell\">\n  <aside class=\"side\">\n    <strong>BidIntel AI</strong>\n    <span class=\"active\">Dashboard</span><span class=\"\">Documents</span><span class=\"\">Ask BidIntel</span><span class=\"\">Proposal Scoring</span><span class=\"\">Compliance</span><span class=\"\">Audit</span>\n  </aside>\n  <section class=\"content\"><h2>Good morning, Adam</h2><div class=\"cards\"><div class=\"card\">Active opportunities<strong>12</strong></div><div class=\"card\">Bid / No-Bid pending<strong>5</strong></div><div class=\"card\">Compliance risks<strong>7</strong></div><div class=\"card\">Human review<strong>3</strong></div></div><div class=\"grid2\"><div class=\"panel\">Human Review Queue<br>DHS SOC draft - faithfulness 0.71</div><div class=\"panel\">Upcoming Deadlines<br>DHS Cyber Modernization due in 5 days</div></div></section>\n</div>",
    "narration": "After login, the user lands on the capture dashboard. This is where BidIntel stops feeling like a chatbot and starts feeling like a contract-intelligence workspace.",
    "code": "Existing frontend page:\nfrontend/src/pages/Dashboard.tsx\n\nRoute:\n/\n\nBackend call:\nGET /dashboard\n\nShows:\n- active opportunities\n- compliance risks\n- human review queue\n- deadlines\n- recent AI activity",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Frontend Product Flow",
    "title": "Document Ingest Screen",
    "visual": "\n<div class=\"app-shell\">\n  <aside class=\"side\">\n    <strong>BidIntel AI</strong>\n    <span class=\"\">Dashboard</span><span class=\"active\">Documents</span><span class=\"\">Ask BidIntel</span><span class=\"\">Proposal Scoring</span><span class=\"\">Compliance</span><span class=\"\">Audit</span>\n  </aside>\n  <section class=\"content\"><h2>Upload solicitation and proposal media</h2><div class=\"grid2\"><div class=\"panel\">Drop files: RFP.pdf, contract.docx, pricing.xlsx, past_performance.txt</div><div class=\"panel\">Metadata: tenant, classification, source type, access group</div></div><div class=\"panel\">Ingest path: extract text -> chunk -> embed -> store chunks -> audit upload</div></section>\n</div>",
    "narration": "The document screen is where contracts and supporting media enter the system. Every file is tagged with tenant, classification, source type, and access group before retrieval.",
    "code": "POST /documents/upload\n\nBackend ingestion:\n1. Verify logged-in user.\n2. Store document metadata.\n3. Extract text from the uploaded file.\n4. Split text into chunks.\n5. Create embeddings.\n6. Store chunks with tenant and access-group metadata.\n7. Write audit log.",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Backend And Database",
    "title": "FastAPI Doorway",
    "visual": "<div class=\"terminal\">uvicorn app.main:app --reload --port 8000\n\nRoutes:\n/auth/me\n/documents/upload\n/rag/ask or /assistant/query\n/bid/score-proposal\n/compliance/matrix\n/audit</div>",
    "narration": "FastAPI is the control layer. Every frontend click becomes an API request, and the backend decides identity, permissions, retrieval, model calls, and audit logging.",
    "code": "# backend/app/main.py\nfrom fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\n\nfrom app.routes import auth_routes, document_routes, rag_routes, scoring_routes\n\napp = FastAPI(title=\"BIDINTEL API\")\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\"http://localhost:5173\"],\n    allow_credentials=True,\n    allow_methods=[\"*\"],\n    allow_headers=[\"*\"],\n)\n\napp.include_router(auth_routes.router, prefix=\"/auth\")\napp.include_router(document_routes.router, prefix=\"/documents\")\napp.include_router(rag_routes.router, prefix=\"/rag\")\napp.include_router(scoring_routes.router, prefix=\"/scoring\")",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Backend And Database",
    "title": "PostgreSQL And pgvector Tables",
    "visual": "<div class=\"diagram\"><div class=\"flow\"><div class=\"node hot\">tenants</div><div class=\"node\">users</div><div class=\"node\">documents</div><div class=\"node\">chunks + vector</div><div class=\"node\">audit_logs</div></div></div>",
    "narration": "PostgreSQL stores the business truth: tenants, users, documents, chunks, embeddings, and audit logs. Tenant ID is the wall between organizations.",
    "code": "CREATE TABLE tenants (\n  tenant_id UUID PRIMARY KEY,\n  name TEXT NOT NULL\n);\n\nCREATE TABLE users (\n  user_id UUID PRIMARY KEY,\n  tenant_id UUID REFERENCES tenants(tenant_id),\n  email TEXT UNIQUE NOT NULL,\n  role TEXT NOT NULL\n);\n\nCREATE TABLE documents (\n  document_id UUID PRIMARY KEY,\n  tenant_id UUID REFERENCES tenants(tenant_id),\n  uploaded_by UUID REFERENCES users(user_id),\n  title TEXT NOT NULL,\n  classification TEXT,\n  source_type TEXT,\n  created_at TIMESTAMP DEFAULT now()\n);\n\nCREATE TABLE chunks (\n  chunk_id UUID PRIMARY KEY,\n  document_id UUID REFERENCES documents(document_id),\n  tenant_id UUID REFERENCES tenants(tenant_id),\n  chunk_text TEXT NOT NULL,\n  embedding vector(1536),\n  page_number INT\n);",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - RAG Product Flow",
    "title": "Ask BidIntel Screen",
    "visual": "\n<div class=\"app-shell\">\n  <aside class=\"side\">\n    <strong>BidIntel AI</strong>\n    <span class=\"\">Dashboard</span><span class=\"\">Documents</span><span class=\"active\">Ask BidIntel</span><span class=\"\">Proposal Scoring</span><span class=\"\">Compliance</span><span class=\"\">Audit</span>\n  </aside>\n  <section class=\"content\"><div class=\"chat\"><div><div class=\"bubble\">Find past proposal language for cybersecurity SOC modernization.</div><div class=\"answer\"><strong>BidIntel Assistant</strong><br>Our SOC modernization approach delivers 24/7 monitoring, automated triage, and Tier-1 to Tier-3 escalation, grounded in retrieved past performance.</div></div><aside class=\"panel\"><h2>Retrieved Context</h2><p>DHS_Cyber_Mod_RFP §C.3.1 · 0.95</p><p>Past_Performance_SOC #1 · 0.88</p><p>Phoenix trace: retrieve 38ms · rerank 52ms · LLM 910ms</p></aside></div></section>\n</div>",
    "narration": "The RAG screen shows the user question, the grounded answer, citations, and trace metadata. The backend filters evidence before Bedrock sees it.",
    "code": "POST /rag/ask\n\n{\n  \"question\": \"What contracts mention emergency communications?\"\n}\n\nBackend flow:\n1. Verify logged-in user.\n2. Get tenant_id and role.\n3. Search only allowed documents.\n4. Retrieve matching chunks.\n5. Rerank chunks.\n6. Build final context.\n7. Call Bedrock.\n8. Return answer with citations.\n9. Write audit log.",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - RAG Product Flow",
    "title": "Permission Filter Before Bedrock",
    "visual": "<div class=\"diagram\"><div class=\"flow\"><div class=\"node hot\">Login identity</div><div class=\"node hot\">tenant_id</div><div class=\"node hot\">role</div><div class=\"node\">allowed chunks</div><div class=\"node\">Bedrock prompt</div></div></div>",
    "narration": "The model does not decide what the user can see. Retrieval filters by tenant and permission before any chunk enters the Bedrock prompt.",
    "code": "# backend/app/permissions.py\ndef can_access_document(user, document):\n    if user[\"tenant_id\"] != document[\"tenant_id\"]:\n        return False\n\n    if user[\"role\"] == \"admin\":\n        return True\n\n    if user[\"role\"] == \"analyst\":\n        return document[\"classification\"] in [\"public\", \"internal\"]\n\n    if user[\"role\"] == \"viewer\":\n        return document[\"classification\"] == \"public\"\n\n    return False",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Proposal Scoring",
    "title": "Score Page With Example Findings",
    "visual": "\n<div class=\"app-shell\">\n  <aside class=\"side\">\n    <strong>BidIntel AI</strong>\n    <span class=\"\">Dashboard</span><span class=\"\">Documents</span><span class=\"\">Ask BidIntel</span><span class=\"active\">Proposal Scoring</span><span class=\"\">Compliance</span><span class=\"\">Audit</span>\n  </aside>\n  <section class=\"content\"><div class=\"score\"><div class=\"panel\"><p>Overall score</p><div class=\"gauge\">78</div><p>Recommendation: Improve Before Submit</p></div><div class=\"panel\"><h2>Weighted Score Breakdown</h2><p>Compliance 78</p><div class=\"bar\"><div class=\"fill\" style=\"--w:78%\"></div></div><p>Technical 82</p><div class=\"bar\"><div class=\"fill\" style=\"--w:82%\"></div></div><p>Management 74</p><div class=\"bar\"><div class=\"fill\" style=\"--w:74%\"></div></div><p>Past Performance 76</p><div class=\"bar\"><div class=\"fill\" style=\"--w:76%\"></div></div><p>Price Risk 68</p><div class=\"bar\"><div class=\"fill\" style=\"--w:68%\"></div></div><p><strong>Gap:</strong> 24/7 help desk is stated, but 15-minute P1 response needs SLA evidence.</p></div></div></section>\n</div>",
    "narration": "The scoring page turns retrieved evidence into proposal guidance. It shows weighted category scores, gaps, risk, and recommended fixes.",
    "code": "POST /bid/score-proposal\n\nOverall Score =\n  Compliance * 30%\n+ Technical * 30%\n+ Management * 15%\n+ Past Performance * 15%\n+ Price Risk * 10%\n\nExample finding:\nRequirement: 24/7 help desk with 15-minute P1 response\nStatus: Partial\nScore: 60\nFix: Add SLA table and escalation workflow.",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Evaluation And Observability",
    "title": "RAGAS Evaluation Mock Screen",
    "visual": "<div class=\"obs\"><div class=\"panel\"><h2>RAGAS Batch Metrics</h2><p>Faithfulness: 0.92</p><div class=\"bar\"><div class=\"fill\" style=\"--w:92%\"></div></div><p>Context Recall: 0.90</p><div class=\"bar\"><div class=\"fill\" style=\"--w:90%\"></div></div><p>Answer Relevancy: 0.88</p><div class=\"bar\"><div class=\"fill\" style=\"--w:88%\"></div></div></div><div class=\"panel\"><h2>Review Gate</h2><p>Any answer below threshold goes to human review.</p><p>Faithfulness is the most important metric because unsupported answers are dangerous.</p></div></div>",
    "narration": "RAGAS is the batch evaluation layer. The tutorial shows mock metrics so the viewer understands how faithfulness, context recall, and relevancy are checked.",
    "code": "# backend/app/services/ragas_eval.py\ndef run_ragas_batch() -> dict:\n    return {\n        \"faithfulness\": 0.92,\n        \"answer_relevancy\": 0.88,\n        \"context_precision\": 0.84,\n        \"context_recall\": 0.90,\n    }\n\nQuality gate:\n- low faithfulness -> human review\n- low context recall -> retrieval tuning\n- low answer relevancy -> prompt or reranker tuning",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Evaluation And Observability",
    "title": "Phoenix Trace Mock Screen",
    "visual": "<div class=\"obs\"><div class=\"panel\"><h2>Phoenix Trace: /rag/ask</h2><p>retrieve</p><div class=\"trace-row\"><span style=\"--w:12%;--c:#20c7b5\"></span></div><p>rerank</p><div class=\"trace-row\"><span style=\"--w:16%;--c:#244cec\"></span></div><p>bedrock invoke</p><div class=\"trace-row\"><span style=\"--w:72%;--c:#a64013\"></span></div></div><div class=\"panel\"><h2>Why it matters</h2><p>Traces show where latency, errors, or missing evidence happen.</p><p>CloudWatch is the AWS log layer; Phoenix is the AI request timeline.</p></div></div>",
    "narration": "Phoenix shows the AI request timeline: retrieval, reranking, model call, evaluation, and audit. It makes the system debuggable instead of mysterious.",
    "code": "Trace spans:\nrag.ask\n  auth.verify_user\n  retrieval.bm25\n  retrieval.vector\n  reranker.shortlist\n  prompt.build_context\n  bedrock.invoke_model\n  evaluator.faithfulness\n  audit.write\n\nLocal: Phoenix dashboard\nAWS: CloudWatch logs + metrics",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - AWS Build Order",
    "title": "Correct AWS Dependency Order",
    "visual": "<div class=\"aws\"><nav>AWS Console<br><br>Identity<br>Bedrock<br>IAM<br>Secrets<br>RDS<br>ECS<br>S3<br>CloudFront</nav><section><div class=\"panel\">1. Choose region</div><div class=\"panel\">2. IAM Identity Center or Cognito</div><div class=\"panel\">3. User groups</div><div class=\"panel\">4. Bedrock model access</div><div class=\"panel\">5. Backend IAM policy</div><div class=\"panel\">6. Backend service role</div><div class=\"panel\">7. Secrets Manager</div><div class=\"panel\">8. RDS PostgreSQL</div><div class=\"panel\">9. S3 uploads</div><div class=\"panel\">10. ECS/App Runner backend</div><div class=\"panel\">11. S3 + CloudFront frontend</div></section></div>",
    "narration": "AWS has a dependency order. Do identity first, model access second, IAM service role third, secrets and database fourth, backend fifth, and frontend cutover last.",
    "code": "Correct AWS dependency order:\n1. Choose AWS Region.\n2. Create IAM Identity Center or Cognito user login.\n3. Create user groups: admins, analysts, viewers.\n4. Enable Amazon Bedrock model access.\n5. Create IAM policy for backend service.\n6. Create backend IAM role.\n7. Create Secrets Manager secret.\n8. Create RDS PostgreSQL database.\n9. Create S3 bucket for uploaded documents.\n10. Deploy backend to ECS Fargate or App Runner.\n11. Deploy frontend to S3 + CloudFront.\n12. Update frontend VITE_API_BASE_URL.\n13. Test login, upload, RAG, logs, and audit.",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - AWS Build Order",
    "title": "Backend IAM Role Is Not User Role",
    "visual": "<div class=\"diagram\"><div class=\"flow\"><div class=\"node hot\">Human user role</div><div class=\"node\">controls document access</div><div class=\"node hot\">Backend IAM role</div><div class=\"node\">controls AWS service calls</div><div class=\"node\">Bedrock / S3 / Secrets</div></div></div>",
    "narration": "There are two kinds of permission. The human user's role controls which documents they can retrieve. The backend IAM role controls which AWS services the app can call.",
    "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\"bedrock:InvokeModel\"],\n      \"Resource\": \"*\"\n    },\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\"secretsmanager:GetSecretValue\"],\n      \"Resource\": \"*\"\n    },\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n      \"Resource\": \"arn:aws:s3:::bidintel-documents/*\"\n    }\n  ]\n}",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Bedrock Wiring",
    "title": "Backend Calls Bedrock, Frontend Never Does",
    "visual": "<div class=\"diagram\"><div class=\"flow\"><div class=\"node\">React UI</div><div class=\"node hot\">FastAPI</div><div class=\"node\">IAM role credentials</div><div class=\"node\">Bedrock Runtime</div><div class=\"node\">Answer + citations</div></div></div>",
    "narration": "Bedrock is backend only. The frontend calls FastAPI, FastAPI builds the prompt from allowed evidence, and the backend container uses its IAM role to invoke Bedrock.",
    "code": "# backend/app/bedrock_client.py\nimport boto3\nimport json\nimport os\n\nbedrock = boto3.client(\n    \"bedrock-runtime\",\n    region_name=os.getenv(\"AWS_REGION\")\n)\n\ndef call_bedrock(prompt: str) -> str:\n    response = bedrock.invoke_model(\n        modelId=os.getenv(\"BEDROCK_MODEL_ID\"),\n        body=json.dumps({\n            \"messages\": [{\"role\": \"user\", \"content\": prompt}],\n            \"max_tokens\": 1200\n        })\n    )\n    body = json.loads(response[\"body\"].read())\n    return body\n\nRules:\nNo AWS keys in frontend.\nNo Bedrock calls from React.\nBackend uses IAM role credentials.",
    "duration": 24,
    "codeMode": "literal"
  },
  {
    "chapter": "Frontend + AWS - Final System Map",
    "title": "What BidIntel Is",
    "visual": "<div class=\"diagram\"><div class=\"flow\"><div class=\"node hot\">Frontend</div><div class=\"node hot\">Backend API</div><div class=\"node\">Auth + permissions</div><div class=\"node\">Database retrieval</div><div class=\"node\">Bedrock + audit</div></div></div>",
    "narration": "The final message is simple. BidIntel is not just a chatbot. It is a secure evidence pipeline around an AI model, with frontend screens, backend enforcement, database retrieval, IAM, Bedrock, evaluation, and audit.",
    "code": "BIDINTEL =\nFrontend\n-> Backend API\n-> Auth verification\n-> Permission filter\n-> Database retrieval\n-> Reranking\n-> Context assembly\n-> Bedrock model call\n-> Answer with citations\n-> Evaluation\n-> Audit log\n\nBuild rule:\nLocal first.\nMock frontend first.\nBackend second.\nDatabase third.\nRAG fourth.\nAWS identity first.\nThen permissions.\nThen Bedrock.\nThen backend hosting.\nThen frontend hosting.\nThen test user access.",
    "duration": 24,
    "codeMode": "literal"
  }
];
