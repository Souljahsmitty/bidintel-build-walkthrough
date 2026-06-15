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
    "code": "Architecture part: answer engine.\nSource: BIDINTEL_Build_Bible_Click_by_Click_v1.pdf, system map and RAG pipeline.\n\nWhere you build it:\nLocal machine first, inside backend/app/services and backend/app/api.\n\nRequest path:\nBrowser / Analyst UI\n-> frontend/src/lib/api.ts\n-> POST /chat/ask\n-> backend/app/api/chat_api.py\n-> backend/app/auth.py gets tenant_id + access_groups\n-> backend/app/services/retrieval.py fetches evidence\n-> backend/app/services/prompt_builder.py builds grounded prompt\n-> backend/app/services/llm_bedrock.py calls Bedrock or MockLLM\n-> backend/app/services/evaluator.py scores answer\n-> backend/app/services/guardrails.py blocks unsafe output\n-> backend/app/audit.py writes audit row\n\nImplementation order:\n1. Build local FastAPI route.\n2. Use MockLLM until local retrieval works.\n3. Add Bedrock only after evidence + citations work.\n4. Deploy backend container to AWS ECS after local tests pass.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Chunking",
    "skin": "diagram",
    "visual": "Chunking splits a big document into small overlapping passages. A token is a small piece of text. Overlap repeats a little text between chunks so we do not cut an idea in half. Analogy: Cutting a book into index cards with a few repeated lines.",
    "narration": "Chunking. Chunking splits a big document into small overlapping passages. A token is a small piece of text. Overlap repeats a little text between chunks so we do not cut an idea in half. Think of it this way: Cutting a book into index cards with a few repeated lines.",
    "code": "Architecture part: document ingestion.\n\nWhere code goes:\nbackend/app/services/chunking.py\nbackend/app/api/documents_api.py calls it after text extraction.\n\nBuild steps:\n1. Upload document from frontend/src/pages/DocumentsPage.tsx.\n2. Backend saves the file or object metadata.\n3. extract_text.py returns plain text.\n4. chunking.py splits into overlapping chunks.\n5. vector_store.py stores chunks with tenant_id, document_id, page_number, access_groups.\n\nBible rule:\nChunks are the searchable RAG unit. They must keep metadata so retrieval can cite pages and enforce access.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Embedding / Vector",
    "skin": "diagram",
    "visual": "An embedding is a list of numbers that captures meaning. A vector is that list of numbers. Analogy: Giving every sentence GPS coordinates in meaning space.",
    "narration": "Embedding / Vector. An embedding is a list of numbers that captures meaning. A vector is that list of numbers. Think of it this way: Giving every sentence GPS coordinates in meaning space.",
    "code": "Architecture part: semantic search representation.\n\nLocal first:\nbackend/app/services/embeddings.py can use MockEmbeddingClient for repeatable tests.\n\nAWS production:\nbackend/app/services/embeddings.py calls Amazon Bedrock Titan Embeddings through boto3.\n\nWhere credentials come from:\nLocal: AWS profile or mock mode.\nAWS ECS: the ECS task role supplies temporary credentials. Do not put AWS keys in React.\n\nEnvironment:\nBEDROCK_EMBED_MODEL_ID=amazon.titan-embed-text-v2:0\nLOCAL_MOCK_LLM=false",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Vector Search",
    "skin": "diagram",
    "visual": "Vector search finds chunks whose meaning is close to the question, even if the exact words differ. Analogy: Detective number two matches suspects by behavior.",
    "narration": "Vector Search. Vector search finds chunks whose meaning is close to the question, even if the exact words differ. Think of it this way: Detective number two matches suspects by behavior.",
    "code": "Architecture part: retrieval.py vector side.\n\nWhere code goes:\nbackend/app/services/vector_store.py\nbackend/app/services/retrieval.py\n\nDatabase:\nPostgreSQL + pgvector stores embedding vectors.\n\nQuery shape:\nSELECT chunk_text, page_number, document_id\nFROM document_chunks\nWHERE tenant_id = :tenant_id\n  AND is_active = true\n  AND access group is allowed\nORDER BY embedding <=> :query_embedding\nLIMIT :top_k;\n\nEducator note:\nVector search finds meaning. It should still be filtered before the model sees anything.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "BM25",
    "skin": "diagram",
    "visual": "BM25 is classic keyword search. It rewards exact word matches, useful word frequency, and sensible document length. Analogy: Detective number one matches suspects by exact name.",
    "narration": "BM25. BM25 is classic keyword search. It rewards exact word matches, useful word frequency, and sensible document length. Think of it this way: Detective number one matches suspects by exact name.",
    "code": "Architecture part: keyword side of hybrid retrieval.\n\nWhere code goes:\nbackend/app/services/bm25_search.py\nbackend/app/services/retrieval.py calls it.\n\nWhy it exists:\nVector search may miss exact contract terms, policy names, clause numbers, or response times.\n\nDatabase support:\ndocument_chunks.search_vector tsvector\nGIN index on search_vector\n\nBible rule:\nUse BM25/full-text search together with vector search, then fuse rankings.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Hybrid Search",
    "skin": "diagram",
    "visual": "Hybrid search runs keyword search and meaning search together because each catches evidence the other can miss. Analogy: Two detectives compare notes.",
    "narration": "Hybrid Search. Hybrid search runs keyword search and meaning search together because each catches evidence the other can miss. Think of it this way: Two detectives compare notes.",
    "code": "Architecture part: retrieval.py orchestration.\n\nBuild order:\n1. Implement bm25_search().\n2. Implement vector_search().\n3. Call both from retrieve().\n4. Merge with reciprocal rank fusion.\n5. Rerank the fused shortlist.\n\nWhy:\nContracts need exact words and semantic similarity.\nExample: \"15-minute P1 response\" must match exact SLA language, not just similar support text.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "RRF",
    "skin": "diagram",
    "visual": "Reciprocal Rank Fusion merges ranked lists using 1 divided by k plus rank. With k equals 60, first place gives 1/(60+1), or 0.01639. Analogy: The sergeant promotes any suspect both detectives flagged. RRF is not the reranker.",
    "narration": "RRF. Reciprocal Rank Fusion merges ranked lists using 1 divided by k plus rank. With k equals 60, first place gives 1/(60+1), or 0.01639. Think of it this way: The sergeant promotes any suspect both detectives flagged. RRF is not the reranker.",
    "code": "Architecture part: ranking fusion.\n\nWhere code goes:\nbackend/app/services/rrf.py\n\nWhat it does:\nRRF combines BM25 rank and vector rank by position, not incompatible raw scores.\n\nImplementation:\ndef reciprocal_rank_fusion(result_lists, k=60):\n    scores = {}\n    for results in result_lists:\n        for rank, item in enumerate(results, start=1):\n            scores[item[\"id\"]] = scores.get(item[\"id\"], 0) + 1 / (k + rank)\n    return sorted_items_by_score\n\nThen retrieval.py sends the fused shortlist to reranker.py.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Reranker",
    "skin": "diagram",
    "visual": "A reranker deeply reviews the shortlisted chunks against the question and keeps the best few. Analogy: The lead detective interviews the suspects.",
    "narration": "Reranker. A reranker deeply reviews the shortlisted chunks against the question and keeps the best few. Think of it this way: The lead detective interviews the suspects.",
    "code": "Architecture part: final evidence ordering.\n\nWhere code goes:\nbackend/app/services/reranker.py\n\nPrototype:\nSimpleReranker can score overlap and requirement terms.\n\nUpgrade:\nReplace with a cross-encoder, Cohere Rerank, or an AWS/Bedrock-compatible reranker later.\n\nWhy:\nThe LLM should receive the best evidence, not just the first raw vector hits.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Context Builder",
    "skin": "diagram",
    "visual": "The context builder assembles selected chunks, source IDs, and page numbers into the package sent to the model. Analogy: The briefing folder handed to the prosecutor.",
    "narration": "Context Builder. The context builder assembles selected chunks, source IDs, and page numbers into the package sent to the model. Think of it this way: The briefing folder handed to the prosecutor.",
    "code": "Architecture part: prompt assembly.\n\nWhere code goes:\nbackend/app/services/prompt_builder.py\n\nInputs:\nquestion\ntop chunks\ndocument_id\npage_number\nchunk_text\n\nOutput:\nAn evidence-only prompt that says:\n- answer only from retrieved evidence\n- cite sources\n- say what is missing\n- do not invent facts\n\nThis is the context engineering step before Bedrock.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "LLM / Amazon Bedrock / Claude",
    "skin": "diagram",
    "visual": "A large language model writes the answer. Amazon Bedrock is AWS's managed way to call models like Claude. Analogy: The prosecutor argues only from the case file.",
    "narration": "LLM / Amazon Bedrock / Claude. A large language model writes the answer. Amazon Bedrock is AWS's managed way to call models like Claude. Think of it this way: The prosecutor argues only from the case file.",
    "code": "Architecture part: model call.\nThis is not where you write code in AWS. You write code locally in the backend, then deploy the backend container to AWS.\n\nLocal file:\nbackend/app/services/llm_bedrock.py\n\nLocal development:\n1. Start with MockLLM to prove /chat/ask works.\n2. Add BedrockLLM using boto3 after retrieval and citations work.\n3. Test locally with AWS credentials or keep mock mode on.\n\nAWS console prerequisite:\nAmazon Bedrock -> Model access -> enable Claude and Titan Embeddings.\n\nAWS runtime:\nECS task role has bedrock:InvokeModel.\nboto3 reads temporary credentials from the role.\n\nNever do this:\nDo not call Bedrock directly from React.\nDo not put AWS keys in frontend code.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Guardrails",
    "skin": "diagram",
    "visual": "Guardrails are checks that block prompt injection and unsupported answers before the user sees them. Analogy: The courtroom rules of evidence.",
    "narration": "Guardrails. Guardrails are checks that block prompt injection and unsupported answers before the user sees them. Think of it this way: The courtroom rules of evidence.",
    "code": "Architecture part: safety gate before and after model.\n\nWhere code goes:\nbackend/app/services/guardrails.py\n\nBefore retrieval/model:\ncheck_prompt_injection(question)\nblock requests like \"ignore previous instructions\" or requests for restricted payroll records.\n\nAfter model:\ncheck_answer_support(answer, chunks)\nblock or flag answers that are not supported by retrieved evidence.\n\nAWS upgrade:\nBedrock Guardrails can be added, but the backend still keeps app-specific checks and audit logging.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Evaluator / LLM-as-a-Judge",
    "skin": "diagram",
    "visual": "An evaluator grades the answer after it is written. LLM-as-a-judge means using another AI to grade the first AI. Analogy: Internal Affairs reviews the case.",
    "narration": "Evaluator / LLM-as-a-Judge. An evaluator grades the answer after it is written. LLM-as-a-judge means using another AI to grade the first AI. Think of it this way: Internal Affairs reviews the case.",
    "code": "Architecture part: quality gate.\n\nWhere code goes:\nbackend/app/services/evaluator.py\nbackend/app/api/eval_api.py\n\nWhat it checks:\nDoes the answer use the retrieved evidence?\nDid retrieval find enough context?\nIs the answer relevant to the question?\n\nBuild order:\n1. lightweight evaluator for local tests\n2. RAGAS batch evaluation\n3. dashboard or stored rag_eval_runs table\n4. human review for low scores",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "RAGAS",
    "skin": "diagram",
    "visual": "RAGAS is a library for batch-scoring RAG quality metrics like faithfulness and context recall. Analogy: The performance report.",
    "narration": "RAGAS. RAGAS is a library for batch-scoring RAG quality metrics like faithfulness and context recall. Think of it this way: The performance report.",
    "code": "Architecture part: batch RAG evaluation.\n\nWhere code goes:\nbackend/app/services/ragas_eval.py\nbackend/app/scripts/run_eval.py\n\nInput record:\nquestion\nanswer\ncontexts\nground_truth\n\nMetrics:\nfaithfulness\nanswer_relevancy\ncontext_precision\ncontext_recall\n\nWorkflow:\nRun /chat/ask on test questions, save outputs, run RAGAS, store results in rag_eval_runs, then fix chunking/retrieval/prompt if scores are low.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Phoenix / Observability / Tracing",
    "skin": "diagram",
    "visual": "Phoenix records each step, timing, and metadata. A trace is the timeline of one request. A span is one step in that timeline. Analogy: The command-center dashboard.",
    "narration": "Phoenix / Observability / Tracing. Phoenix records each step, timing, and metadata. A trace is the timeline of one request. A span is one step in that timeline. Think of it this way: The command-center dashboard.",
    "code": "Architecture part: observability.\n\nWhere it runs locally:\ndocker compose up -d starts Phoenix on http://localhost:6006.\n\nWhere code goes:\nbackend/app/observability/phoenix.py\nbackend/app/main.py initializes tracing.\n\nTrace spans to show:\nauth.verify_user\ndocuments.ingest\nretrieval.bm25\nretrieval.vector\nprompt.build_context\nbedrock.invoke_model\nragas.evaluate\naudit.write\n\nAWS note:\nCloudWatch logs service health. Phoenix shows AI pipeline traces.",
    "duration": 22,
    "codeMode": "literal"
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
    "code": "Architecture part: system of record.\n\nLocal:\nDocker runs PostgreSQL with pgvector:\ndocker compose up -d\n\nWhere schema goes:\nbackend/app/schema.sql or migrations folder.\n\nStores:\ntenants\nusers\ndocuments\ndocument_versions\ndocument_chunks\naccess_groups\naudit_logs\nrag_eval_runs\n\nProduction:\nUse RDS/Aurora PostgreSQL when deploying to AWS.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "pgvector",
    "skin": "diagram",
    "visual": "pgvector adds vector storage and similarity search to PostgreSQL. Analogy: A meaning-coordinate cabinet inside the records office.",
    "narration": "pgvector. pgvector adds vector storage and similarity search to PostgreSQL. Think of it this way: A meaning-coordinate cabinet inside the records office.",
    "code": "Architecture part: vector database inside PostgreSQL.\n\nWhere schema goes:\nbackend/app/schema.sql\n\nSQL:\nCREATE EXTENSION IF NOT EXISTS vector;\nCREATE INDEX idx_chunks_embedding_hnsw\nON document_chunks USING hnsw (embedding vector_cosine_ops);\n\nWhy:\nBidIntel needs SQL metadata, access filters, audit joins, and vector similarity in one database.",
    "duration": 22,
    "codeMode": "literal"
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
    "code": "Architecture part: repeatable local services and AWS packaging.\n\nLocal:\ndocker-compose.yml starts PostgreSQL + pgvector and Phoenix.\nYou still run FastAPI and Vite from your terminal while developing.\n\nCommands:\ndocker compose up -d\ncd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000\ncd frontend && npm run dev\n\nAWS transfer:\nBuild backend Docker image locally or in CI.\nPush image to ECR.\nECS pulls image from ECR and runs it as a Fargate task.\n\nYou do not SSH into an AWS server and type code there.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "FastAPI / Swagger Docs",
    "skin": "diagram",
    "visual": "FastAPI is the Python web API framework. Swagger at /docs lets you click and test endpoints. Analogy: The service desk and its interactive menu.",
    "narration": "FastAPI / Swagger Docs. FastAPI is the Python web API framework. Swagger at /docs lets you click and test endpoints. Think of it this way: The service desk and its interactive menu.",
    "code": "Architecture part: backend API.\n\nWhere code goes:\nbackend/app/main.py\nbackend/app/api/*.py\n\nRun locally:\ncd backend\npython3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\nuvicorn app.main:app --reload --port 8000\n\nOpen:\nhttp://localhost:8000/docs\n\nSwagger is where you test endpoints before wiring React.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "React / Vite",
    "skin": "diagram",
    "visual": "React builds the browser interface. Vite runs the local frontend quickly. Analogy: The analyst's control room.",
    "narration": "React / Vite. React builds the browser interface. Vite runs the local frontend quickly. Think of it this way: The analyst's control room.",
    "code": "Architecture part: user interface.\n\nWhere code goes:\nfrontend/src/pages/*.tsx\nfrontend/src/components/*.tsx\nfrontend/src/lib/api.ts\n\nRun locally:\ncd frontend\nnpm install\nnpm run dev\nopen http://localhost:5173\n\nAWS hosting:\nSet VITE_API_BASE=https://api.bidintel.ai\nnpm run build\nUpload frontend/dist to S3\nServe S3 through CloudFront.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "IAM Role / Temporary Credentials",
    "skin": "diagram",
    "visual": "An IAM role grants AWS permissions to the backend. Temporary credentials are short-lived credentials AWS provides automatically. Analogy: A time-limited badge, not a permanent key.",
    "narration": "IAM Role / Temporary Credentials. An IAM role grants AWS permissions to the backend. Temporary credentials are short-lived credentials AWS provides automatically. Think of it this way: A time-limited badge, not a permanent key.",
    "code": "Architecture part: AWS service permissions, not human login.\n\nHuman login:\nIAM Identity Center groups and app assignments.\n\nBackend AWS permissions:\nIAM role attached to ECS task.\n\nWhere to configure:\nAWS Console -> IAM -> Roles -> Create role -> AWS service -> ECS Task\nRole name: bidintel-backend-role\n\nPolicy allows:\nbedrock:InvokeModel\nsecretsmanager:GetSecretValue\ns3:GetObject / PutObject for approved bucket\nlogs:CreateLogStream / PutLogEvents\n\nCode does not store AWS keys. boto3 gets temporary credentials from the ECS task role.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "S3 / Secrets Manager / ECS Task",
    "skin": "diagram",
    "visual": "S3 stores files, Secrets Manager stores secrets, and an ECS task runs the backend container. Analogy: Storage room, locked safe, and assigned worker.",
    "narration": "S3 / Secrets Manager / ECS Task. S3 stores files, Secrets Manager stores secrets, and an ECS task runs the backend container. Think of it this way: Storage room, locked safe, and assigned worker.",
    "code": "Architecture part: AWS deployment.\n\nS3:\nStores frontend static files and uploaded documents, depending on bucket.\n\nSecrets Manager:\nStores DATABASE_URL, SESSION_SECRET, SSO metadata URL, model IDs.\n\nECS Task:\nRuns backend Docker image from ECR.\n\nBuild transfer:\nLocal backend code -> docker build -> docker push to ECR -> ECS task definition image URI -> ECS service deploy.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "CloudTrail / CloudWatch",
    "skin": "diagram",
    "visual": "CloudTrail records AWS API actions. CloudWatch stores logs and metrics. Analogy: Security camera and operations dashboard.",
    "narration": "CloudTrail / CloudWatch. CloudTrail records AWS API actions. CloudWatch stores logs and metrics. Think of it this way: Security camera and operations dashboard.",
    "code": "Architecture part: AWS audit and operations.\n\nCloudWatch:\nECS container logs, errors, latency, health checks.\n\nCloudTrail:\nAWS API activity: role changes, secret reads, S3 access, Bedrock invoke events where supported.\n\nBidIntel app audit:\nbackend/app/audit.py records user query, role, retrieved chunks, eval, guardrail result.\n\nYou need both cloud logs and app-level audit rows.",
    "duration": 22,
    "codeMode": "literal"
  },
  {
    "chapter": "Original Build - Concept Cards",
    "title": "Multi-tenancy / tenant_id / Access Groups / ATO",
    "skin": "diagram",
    "visual": "Multi-tenancy separates customers with tenant_id. Access groups limit documents. ATO means Authority to Operate, a formal production security approval. Analogy: Separate courtrooms, locked evidence rooms, and final authorization.",
    "narration": "Multi-tenancy / tenant_id / Access Groups / ATO. Multi-tenancy separates customers with tenant_id. Access groups limit documents. ATO means Authority to Operate, a formal production security approval. Think of it this way: Separate courtrooms, locked evidence rooms, and final authorization.",
    "code": "Architecture part: security boundary.\n\nWhere code goes:\nbackend/app/auth.py creates CurrentUser with tenant_id and access_groups.\nbackend/app/services/retrieval.py filters by tenant and access group before returning chunks.\n\nRule:\nNever retrieve all chunks and ask the LLM to behave.\n\nATO honesty:\nThis tutorial is a working prototype/build guide, not a certified production ATO package. Production needs security review.",
    "duration": 22,
    "codeMode": "literal"
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
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Identity Center Is The Login Control Plane",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Dashboard</span><span>Settings</span><span>Users</span><span>Groups</span><span>Applications</span><span>AWS accounts</span></aside><main><div class=\"aws-top\"><span>AWS Console / IAM Identity Center / Dashboard</span><strong>IAM Identity Center</strong></div><h2>Turn on the identity layer before wiring code</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Step 1</h3><p>Enable IAM Identity Center for the AWS account or organization.</p></section><section class=\"aws-card\"><h3>Step 2</h3><p>Choose identity source: built-in directory, Active Directory, Okta, or Microsoft Entra ID.</p></section><section class=\"aws-card\"><h3>Step 3</h3><p>Create the BidIntel application so users can sign in from the app.</p></section><section class=\"aws-card\"><h3>Step 4</h3><p>Assign groups to the app and map claims into the token/assertion.</p></section></div></main></div>",
    "narration": "The beginner mistake is thinking IAM is one thing. For BidIntel there are two identity systems: IAM Identity Center handles human login, groups, and app assignments. The backend IAM role handles AWS service calls. Start in IAM Identity Center because this is where the login and role recognition begin.",
    "code": "Official AWS concepts used here:\n- IAM Identity Center can connect customer managed SAML or OAuth/OIDC applications.\n- IAM Identity Center lets you assign users and groups access to applications.\n- Attribute mappings populate SAML assertions or app identity attributes.\n- Attributes for access control can support ABAC-style decisions.\n\nBidIntel tutorial decision:\nUse IAM Identity Center for human sign-in.\nUse app groups/claims for BidIntel roles.\nUse backend code to enforce route, document, and audit authorization.\nUse a separate ECS task IAM role for AWS service calls.",
    "codeMode": "literal",
    "duration": 34
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Create BidIntel Access Groups",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Dashboard</span><span>Users</span><span>Groups</span><span>Applications</span><span>Settings</span></aside><main><div class=\"aws-top\"><span>IAM Identity Center / Groups / Create group</span><strong>IAM Identity Center</strong></div><h2>Groups become BidIntel roles and document access</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Proposal_Writer</h3><p>Can ask RAG questions, draft answers, and view assigned opportunities.</p></section><section class=\"aws-card\"><h3>Manager</h3><p>Can approve bid/no-bid decisions, review scores, and manage team workflows.</p></section><section class=\"aws-card\"><h3>Auditor</h3><p>Read-only access to audit logs, citations, guardrail blocks, and exports.</p></section><section class=\"aws-card\"><h3>Elevated_Admin</h3><p>Can manage users, data sources, policies, and emergency access.</p></section></div></main></div>",
    "narration": "This screen is where the roles become concrete. Create groups that match the business permissions you need: Proposal Writer, Manager, Auditor, and Elevated Admin. These group names later become token claims and backend authorization rules.",
    "code": "Click path:\nAWS Console -> IAM Identity Center -> Groups -> Create group\n\nCreate these groups:\n1. BidIntel_Proposal_Writer\n2. BidIntel_Manager\n3. BidIntel_Auditor\n4. BidIntel_Elevated_Admin\n\nGroup naming rule:\nUse stable machine-readable names.\nDo not name groups after individual users.\n\nBidIntel role map:\nBidIntel_Proposal_Writer -> role=proposal_writer\nBidIntel_Manager -> role=manager\nBidIntel_Auditor -> role=auditor\nBidIntel_Elevated_Admin -> role=admin, elevated=true",
    "codeMode": "literal",
    "duration": 34
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Add Users And Assign Groups",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Users</span><span>Groups</span><span>Applications</span><span>Assignments</span><span>Settings</span></aside><main><div class=\"aws-top\"><span>IAM Identity Center / Users / Add user</span><strong>IAM Identity Center</strong></div><h2>User membership decides what BidIntel recognizes</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Adam Davis</h3><p>Groups: BidIntel_Proposal_Writer, Capture_Team.</p></section><section class=\"aws-card\"><h3>Maria Manager</h3><p>Groups: BidIntel_Manager, Proposal_Team, Capture_Team.</p></section><section class=\"aws-card\"><h3>Avery Auditor</h3><p>Groups: BidIntel_Auditor.</p></section><section class=\"aws-card\"><h3>Emergency Admin</h3><p>Groups: BidIntel_Elevated_Admin. Require MFA and approval.</p></section></div></main></div>",
    "narration": "On the Users screen, add the person and assign groups. This is what makes the app recognize different roles. A user can be a proposal writer, manager, auditor, or elevated admin because their Identity Center group membership appears in the login token.",
    "code": "Click path:\nIAM Identity Center -> Users -> Add user\nEnter:\n  Username: adam.davis@bidintel.ai\n  Email: adam.davis@bidintel.ai\n  First name: Adam\n  Last name: Davis\n  Display name: Adam Davis\n\nAssign groups:\n  BidIntel_Proposal_Writer\n  Capture_Team\n\nManager example:\n  maria.manager@bidintel.ai\n  groups = [\"BidIntel_Manager\", \"Proposal_Team\", \"Capture_Team\"]\n\nAuditor example:\n  avery.auditor@bidintel.ai\n  groups = [\"BidIntel_Auditor\"]\n\nElevated access example:\n  emergency.admin@bidintel.ai\n  groups = [\"BidIntel_Elevated_Admin\"]\n  require MFA and ticket/approval workflow",
    "codeMode": "literal",
    "duration": 38
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Create The BidIntel Application",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Applications</span><span>Customer managed</span><span>Add application</span><span>Configuration</span><span>Assignments</span></aside><main><div class=\"aws-top\"><span>IAM Identity Center / Applications / Add application</span><strong>IAM Identity Center</strong></div><h2>Register BidIntel as the app users sign into</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Display name</h3><p>BidIntel AI Command Center.</p></section><section class=\"aws-card\"><h3>Protocol</h3><p>Use SAML 2.0 or OIDC/OAuth depending on the app auth library.</p></section><section class=\"aws-card\"><h3>Start URL</h3><p>https://app.bidintel.ai/login or CloudFront URL.</p></section><section class=\"aws-card\"><h3>Callback</h3><p>https://api.bidintel.ai/auth/callback for backend token exchange.</p></section></div></main></div>",
    "narration": "This is the application registration screen. You add BidIntel as a customer-managed app, choose SAML or OIDC, and enter the application URLs. In a production build, the frontend login redirects here, then the callback returns to the backend so the backend can create the app session.",
    "code": "Click path:\nIAM Identity Center -> Applications -> Add application\nChoose:\n  Customer managed application\n  SAML 2.0 or OAuth/OIDC app\n\nFields to enter:\n  Display name: BidIntel AI Command Center\n  Description: Contract capture intelligence workspace\n  Application start URL: https://app.bidintel.ai/login\n  Relay state or redirect URL: https://api.bidintel.ai/auth/callback\n  Audience / entity ID: bidintel-ai\n\nLocal/dev values:\n  Frontend URL: http://localhost:5173/login\n  Backend callback: http://localhost:8000/auth/callback\n\nProduction values:\n  Frontend URL: CloudFront distribution or custom domain\n  Backend callback: ALB/App Runner/ECS API URL",
    "codeMode": "literal",
    "duration": 42
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Map Identity Attributes Into Claims",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Application details</span><span>Attribute mappings</span><span>Assignments</span><span>Actions</span><span>Edit attribute mapping</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Actions / Edit attribute mapping</span><strong>IAM Identity Center</strong></div><h2>Claims are how the backend knows role and access</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>email</h3><p>Maps to user.email. Used for display and audit rows.</p></section><section class=\"aws-card\"><h3>groups</h3><p>Maps group membership. Used for role and access_groups.</p></section><section class=\"aws-card\"><h3>tenant_id</h3><p>Maps the customer/workspace boundary.</p></section><section class=\"aws-card\"><h3>department/access_level</h3><p>Optional ABAC attributes for policy and audit decisions.</p></section></div></main></div>",
    "narration": "This is the missing wiring screen. In the BidIntel app details, choose Actions, then Edit attribute mapping. Add mappings for email, subject, groups, tenant id, and access level. The backend reads those claims and turns them into the CurrentUser object.",
    "code": "Click path:\nIAM Identity Center -> Applications -> BidIntel AI Command Center\nActions -> Edit attribute mapping\nAdd new attribute mapping\n\nRecommended app attributes:\n  subject       -> ${user:subject}\n  email         -> ${user:email}\n  display_name  -> ${user:name}\n  groups        -> ${user:groups}\n  tenant_id     -> ${user:custom:tenant_id}\n  department    -> ${user:department}\n  access_level  -> ${user:custom:access_level}\n\nBidIntel claim contract:\n{\n  \"sub\": \"00u-user-id\",\n  \"email\": \"adam.davis@bidintel.ai\",\n  \"groups\": [\"BidIntel_Proposal_Writer\", \"Capture_Team\"],\n  \"tenant_id\": \"tenant_demo\",\n  \"access_level\": \"standard\"\n}\n\nWhy it matters:\nThe backend cannot enforce manager/auditor/elevated rules unless the login token carries stable identity and group claims.",
    "codeMode": "literal",
    "duration": 44
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Assign Groups To The BidIntel App",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Application details</span><span>Assignments</span><span>Assign users and groups</span><span>Groups</span><span>Review</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Assign users and groups</span><strong>IAM Identity Center</strong></div><h2>Only assigned groups can open the app</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Assign Proposal Writers</h3><p>Can use dashboard, documents, assistant, proposal scoring.</p></section><section class=\"aws-card\"><h3>Assign Managers</h3><p>Can approve decisions, manage reviews, see team scoring.</p></section><section class=\"aws-card\"><h3>Assign Auditors</h3><p>Can open audit logs and exports, but cannot change content.</p></section><section class=\"aws-card\"><h3>Assign Elevated Admins</h3><p>Limited emergency/admin access; require MFA and audit.</p></section></div></main></div>",
    "narration": "After the app exists, assign groups to it. This is separate from merely creating groups. If Auditor is not assigned to the BidIntel app, the auditor cannot sign into BidIntel. If assigned, the backend still restricts what the auditor can do.",
    "code": "Click path:\nIAM Identity Center -> Applications -> BidIntel AI Command Center\nAssignments tab -> Assign users and groups -> Groups\n\nAssign:\n  BidIntel_Proposal_Writer\n  BidIntel_Manager\n  BidIntel_Auditor\n  BidIntel_Elevated_Admin\n\nAccess meaning:\nAssigned to app = can authenticate into BidIntel.\nGroup claim = backend knows what permissions to grant.\nBackend policy = final authority for APIs, documents, and audit logs.\n\nDo not rely on frontend navigation alone.\nFrontend hides buttons.\nBackend blocks unauthorized API calls.",
    "codeMode": "literal",
    "duration": 38
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Frontend Login Button To Backend Session",
    "skin": "diagram",
    "visual": "<div class=\"diagram-grid\"><div class=\"node hot\">1. Click AWS IAM Identity Center</div><div class=\"node hot\">2. Redirect to Identity Center</div><div class=\"node \">3. User signs in with MFA</div><div class=\"node \">4. Identity Center returns token/assertion</div><div class=\"node \">5. Backend callback verifies token</div><div class=\"node hot\">6. Backend creates session cookie</div><div class=\"node hot\">7. Frontend calls /auth/me</div><div class=\"node hot\">8. UI renders allowed pages</div></div>",
    "narration": "This is the login flow as a builder should understand it. The React login button redirects to Identity Center. The backend callback verifies the token or assertion, maps groups to roles, creates a secure session, and the frontend calls auth me to know which pages to show.",
    "code": "# frontend/src/pages/LoginPage.tsx\nfunction loginWithIdentityCenter() {\n  window.location.href = API_BASE + \"/auth/login/aws-sso\";\n}\n\n# backend/app/api/auth_api.py\n@router.get(\"/auth/login/aws-sso\")\ndef login():\n    return RedirectResponse(identity_center_authorize_url())\n\n@router.get(\"/auth/callback\")\ndef callback(code: str):\n    token = exchange_code_for_token(code)\n    claims = verify_identity_token(token)\n    user = map_claims_to_current_user(claims)\n    session_id = create_session(user)\n    response = RedirectResponse(settings.frontend_url)\n    response.set_cookie(\n        \"bidintel_session\",\n        session_id,\n        httponly=True,\n        secure=True,\n        samesite=\"lax\",\n    )\n    return response\n\n@router.get(\"/auth/me\")\ndef me(user=Depends(get_current_user)):\n    return user",
    "codeMode": "literal",
    "duration": 42
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Map Groups To BidIntel Roles",
    "skin": "editor",
    "visual": "Identity Center groups\n  -> token claims\n  -> role map\n  -> permissions\n  -> API enforcement\n  -> document retrieval filter",
    "narration": "The backend needs an explicit role map. Manager, Auditor, Proposal Writer, and Elevated Admin are not vague labels. They become deterministic permissions the API checks on every request.",
    "code": "# backend/app/authz.py\nGROUP_ROLE_MAP = {\n    \"BidIntel_Proposal_Writer\": \"proposal_writer\",\n    \"BidIntel_Manager\": \"manager\",\n    \"BidIntel_Auditor\": \"auditor\",\n    \"BidIntel_Elevated_Admin\": \"admin\",\n}\n\nROLE_PERMISSIONS = {\n    \"proposal_writer\": {\n        \"dashboard:read\",\n        \"documents:upload\",\n        \"documents:read_assigned\",\n        \"rag:ask\",\n        \"proposal_score:run\",\n    },\n    \"manager\": {\n        \"dashboard:read\",\n        \"documents:read_team\",\n        \"rag:ask\",\n        \"proposal_score:run\",\n        \"bid_decision:approve\",\n        \"reviews:assign\",\n    },\n    \"auditor\": {\n        \"audit:read\",\n        \"audit:export\",\n        \"documents:read_citations_only\",\n    },\n    \"admin\": {\n        \"users:manage\",\n        \"data_sources:manage\",\n        \"policies:manage\",\n        \"audit:read\",\n        \"audit:export\",\n    },\n}\n\ndef map_claims_to_current_user(claims: dict) -> CurrentUser:\n    groups = claims.get(\"groups\", [])\n    roles = [GROUP_ROLE_MAP[g] for g in groups if g in GROUP_ROLE_MAP]\n    role = highest_role(roles)\n    return CurrentUser(\n        user_id=claims[\"sub\"],\n        email=claims[\"email\"],\n        tenant_id=claims[\"tenant_id\"],\n        role=role,\n        access_groups=groups,\n        permissions=ROLE_PERMISSIONS[role],\n        elevated=(\"BidIntel_Elevated_Admin\" in groups),\n    )",
    "codeMode": "literal",
    "duration": 48
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Authorization Matrix For Pages And APIs",
    "skin": "browser",
    "visual": "<div class=\"web\"><div class=\"panel\"><h2>BidIntel Permission Matrix</h2><table class=\"matrix\"><tr><th>Area</th><th>Proposal Writer</th><th>Manager</th><th>Auditor</th><th>Elevated Admin</th></tr><tr><td>Dashboard</td><td>Read own/team</td><td>Read team</td><td>No</td><td>Read all</td></tr><tr><td>Documents</td><td>Upload/read assigned</td><td>Read team</td><td>Citations only</td><td>Manage all</td></tr><tr><td>RAG Ask</td><td>Yes</td><td>Yes</td><td>No</td><td>Admin test only</td></tr><tr><td>Proposal Score</td><td>Run</td><td>Run/approve</td><td>Read audit only</td><td>Manage policy</td></tr><tr><td>Audit Logs</td><td>No</td><td>Team review</td><td>Read/export</td><td>Read/export</td></tr></table></div></div>",
    "narration": "A tutorial needs this matrix because it teaches what the roles actually do. Proposal writers can work documents and ask questions. Managers can approve and review team work. Auditors read audit evidence. Elevated admins manage policy and data source settings.",
    "code": "# docs/AUTHORIZATION_MATRIX.md\n| Permission | Proposal Writer | Manager | Auditor | Elevated Admin |\n|---|---|---|---|---|\n| dashboard:read | own/team | team | no | all |\n| documents:upload | yes | no | no | yes |\n| documents:read | assigned | team | citations only | all |\n| rag:ask | yes | yes | no | admin test only |\n| proposal_score:run | yes | yes | no | yes |\n| bid_decision:approve | no | yes | no | yes |\n| audit:read | no | team summary | yes | yes |\n| audit:export | no | no | yes | yes |\n| users:manage | no | no | no | yes |\n\nDesign rule:\nEvery row must be enforced in backend dependencies or service methods.\nThe frontend matrix is helpful, but it is not security.",
    "codeMode": "literal",
    "duration": 44
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Backend Blocks Unauthorized APIs",
    "skin": "editor",
    "visual": "Button visibility is UX.\nBackend permission checks are security.",
    "narration": "This is the part that keeps the system honest. Every protected endpoint depends on require permission. If an auditor tries to call proposal scoring directly, the backend returns forbidden even if the frontend button is hidden.",
    "code": "# backend/app/security/permissions.py\nfrom fastapi import HTTPException, Depends\n\ndef require_permission(permission: str):\n    def checker(user: CurrentUser = Depends(get_current_user)):\n        if permission not in user.permissions:\n            raise HTTPException(status_code=403, detail=\"Not authorized\")\n        return user\n    return checker\n\n# backend/app/api/proposal_score_api.py\n@router.post(\"/proposal-score/run\")\ndef run_score(\n    req: ScoreRequest,\n    user=Depends(require_permission(\"proposal_score:run\")),\n):\n    return scoring_engine.run(req, user)\n\n# backend/app/api/audit_api.py\n@router.get(\"/audit/events\")\ndef audit_events(\n    user=Depends(require_permission(\"audit:read\")),\n):\n    return audit_service.list_events(user)\n\n# backend/app/api/admin_api.py\n@router.post(\"/admin/users\")\ndef create_user(\n    user=Depends(require_permission(\"users:manage\")),\n):\n    return admin_service.create_user(user)",
    "codeMode": "literal",
    "duration": 42
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Document Retrieval Filters By Tenant And Access Group",
    "skin": "editor",
    "visual": "RAG security check:\ntenant_id match\nAND document access group overlap\nAND role permission allows retrieval\nBEFORE prompt is built",
    "narration": "Authorization has to reach the retrieval layer. The RAG pipeline filters chunks by tenant and document access groups before any text is inserted into the Bedrock prompt. This prevents an auditor, manager, or writer from accidentally retrieving documents outside their lane.",
    "code": "# backend/app/retrieval.py\ndef retrieve(db, user, question: str, q_emb: list[float]):\n    if \"rag:ask\" not in user.permissions:\n        raise Forbidden(\"User cannot ask RAG questions\")\n\n    return db.execute(\"\"\"\n        SELECT c.id, c.document_id, c.chunk_text, c.page, c.embedding\n        FROM chunks c\n        JOIN documents d ON d.id = c.document_id\n        WHERE d.tenant_id = :tenant_id\n          AND d.allow_ai_retrieval = true\n          AND d.access_groups && :access_groups\n        ORDER BY bm25_rank(c.chunk_text, :question)\n        LIMIT :top_k\n    \"\"\", {\n        \"tenant_id\": user.tenant_id,\n        \"access_groups\": user.access_groups,\n        \"question\": question,\n        \"top_k\": settings.rag_top_k,\n    }).all()\n\nManager example:\n  access_groups = [\"BidIntel_Manager\", \"Proposal_Team\", \"Capture_Team\"]\n\nAuditor example:\n  access_groups = [\"BidIntel_Auditor\"]\n  permissions do not include rag:ask, so retrieval never runs.\n\nAdmin example:\n  elevated admin can manage sources but should not bypass tenant isolation.",
    "codeMode": "literal",
    "duration": 50
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Elevated Access Needs Extra Guardrails",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Users</span><span>Groups</span><span>Applications</span><span>Assignments</span><span>Audit</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Elevated_Admin assignment</span><strong>IAM Identity Center + BidIntel Admin</strong></div><h2>Elevated access is rare, logged, and time-bound</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>MFA</h3><p>Require MFA for Elevated_Admin users.</p></section><section class=\"aws-card\"><h3>Separate group</h3><p>Use BidIntel_Elevated_Admin, not a broad catch-all group.</p></section><section class=\"aws-card\"><h3>Break-glass</h3><p>Use ticket number, reason, time limit, and approval.</p></section><section class=\"aws-card\"><h3>Audit</h3><p>Log every admin route and policy change.</p></section></div></main></div>",
    "narration": "Elevated access should be treated as break-glass access, not normal manager access. Require MFA, a separate group, a reason, a ticket, a time limit, and an audit row for every policy or user change.",
    "code": "# backend/app/security/elevation.py\ndef require_elevated_admin(user=Depends(get_current_user)):\n    if not user.elevated:\n        raise HTTPException(status_code=403, detail=\"Elevated access required\")\n    if not user.mfa:\n        raise HTTPException(status_code=403, detail=\"MFA required\")\n    if not active_elevation_ticket(user.user_id):\n        raise HTTPException(status_code=403, detail=\"Approval ticket required\")\n    write_audit(\n        user=user,\n        action=\"elevated_access.used\",\n        result=\"allowed\",\n    )\n    return user\n\nConsole setup:\nIAM Identity Center -> Groups -> BidIntel_Elevated_Admin\nAssignments -> BidIntel app -> add BidIntel_Elevated_Admin\nSettings -> MFA -> require MFA\n\nBackend setup:\nAdmin endpoints require both:\n  users:manage permission\n  require_elevated_admin dependency",
    "codeMode": "literal",
    "duration": 44
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Auditor Access Is Read Only",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Applications</span><span>Assignments</span><span>Groups</span><span>Audit</span><span>Exports</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Auditor assignment</span><strong>IAM Identity Center + BidIntel Audit</strong></div><h2>Auditors see evidence, not working documents</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Group</h3><p>BidIntel_Auditor.</p></section><section class=\"aws-card\"><h3>Allowed</h3><p>Audit logs, guardrail blocks, citations, exports.</p></section><section class=\"aws-card\"><h3>Blocked</h3><p>Upload documents, ask RAG, score proposals, edit users.</p></section><section class=\"aws-card\"><h3>Purpose</h3><p>Compliance review without operational write access.</p></section></div></main></div>",
    "narration": "Auditor access is a separate teaching path. The auditor logs in through the same Identity Center app, but the backend grants only audit read and export permissions. The auditor should not ask the AI questions or mutate proposal data.",
    "code": "Auditor test user:\n  email = avery.auditor@bidintel.ai\n  groups = [\"BidIntel_Auditor\"]\n  role = \"auditor\"\n  permissions = [\"audit:read\", \"audit:export\", \"documents:read_citations_only\"]\n\nExpected results:\nGET /auth/me -> 200 role=auditor\nGET /audit/events -> 200\nGET /audit/export -> 200\nPOST /documents/upload -> 403\nPOST /chat/ask -> 403\nPOST /proposal-score/run -> 403\nPOST /admin/users -> 403\n\nUI behavior:\nShow Audit Logs.\nHide Documents upload.\nHide AI Assistant ask box.\nHide Proposal Scoring run button.\nStill show source citations in audit detail.",
    "codeMode": "literal",
    "duration": 42
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Manager Access Can Approve But Not Administer",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Applications</span><span>Assignments</span><span>Groups</span><span>Approvals</span><span>Reviews</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Manager assignment</span><strong>IAM Identity Center + BidIntel Manager</strong></div><h2>Managers approve workflow, not infrastructure</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Group</h3><p>BidIntel_Manager plus team access groups.</p></section><section class=\"aws-card\"><h3>Allowed</h3><p>Team dashboard, scoring review, bid decisions, review assignments.</p></section><section class=\"aws-card\"><h3>Blocked</h3><p>User admin, IAM policy changes, data source policy changes.</p></section><section class=\"aws-card\"><h3>Data scope</h3><p>Only tenant and team documents matching access groups.</p></section></div></main></div>",
    "narration": "Manager is not the same as elevated admin. A manager can approve decisions and review team scoring, but cannot manage users, IAM, data sources, or global policies unless they are also in the elevated admin group.",
    "code": "Manager test user:\n  email = maria.manager@bidintel.ai\n  groups = [\"BidIntel_Manager\", \"Proposal_Team\", \"Capture_Team\"]\n  role = \"manager\"\n\nExpected allowed:\nGET /dashboard -> 200\nPOST /chat/ask -> 200 if document groups match\nPOST /proposal-score/run -> 200\nPOST /bid-decision/approve -> 200\nPOST /reviews/assign -> 200\n\nExpected blocked:\nPOST /admin/users -> 403\nPOST /admin/data-sources -> 403\nPATCH /security/policies -> 403\n\nManager rule:\nManager can approve work.\nManager cannot become system owner by default.",
    "codeMode": "literal",
    "duration": 40
  },
  {
    "chapter": "IAM Deep Dive - Authorization Build",
    "title": "Test The IAM Wiring End To End",
    "skin": "terminal",
    "visual": "$ curl /auth/me as proposal writer\n$ curl /auth/me as manager\n$ curl /auth/me as auditor\n$ curl /audit/events as auditor\n$ curl /chat/ask as auditor\n403 Not authorized",
    "narration": "The tutorial should end this section with proof commands. Create one user per role, sign in, call auth me, then test the API matrix. The important proof is not that the buttons hide. The proof is that the backend returns 403 for unauthorized role and permission combinations.",
    "code": "# Manual proof checklist\n1. Sign in as adam.davis@bidintel.ai\n   Expect role=proposal_writer\n   POST /chat/ask -> 200\n   GET /audit/events -> 403\n\n2. Sign in as maria.manager@bidintel.ai\n   Expect role=manager\n   POST /bid-decision/approve -> 200\n   POST /admin/users -> 403\n\n3. Sign in as avery.auditor@bidintel.ai\n   Expect role=auditor\n   GET /audit/events -> 200\n   POST /chat/ask -> 403\n   POST /proposal-score/run -> 403\n\n4. Sign in as emergency.admin@bidintel.ai\n   Expect role=admin and elevated=true\n   MFA required\n   active approval ticket required\n   all admin actions audit logged\n\n# Automated test sketch\npytest backend/tests/test_authz_matrix.py\n\nDone condition:\nEvery role has a green allowed-path test and a red blocked-path test.",
    "codeMode": "literal",
    "duration": 44
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
    "chapter": "Docs-Backed Click Path - IAM Identity Center",
    "title": "Open The Exact AWS IAM Identity Center Area",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Dashboard</span><span>Users</span><span>Groups</span><span>Applications</span><span>Settings</span><span>AWS accounts</span></aside><main><div class=\"aws-top\"><span>AWS Console search bar / IAM Identity Center / Dashboard</span><strong>IAM Identity Center</strong></div><h2>Start here for human login, not IAM Roles</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>1. Console search</h3><p>Type IAM Identity Center and open the service.</p></section><section class=\"aws-card\"><h3>2. Dashboard</h3><p>If not enabled, choose Enable and confirm your identity source.</p></section><section class=\"aws-card\"><h3>3. Left nav</h3><p>You will use Users, Groups, Applications, and Settings.</p></section><section class=\"aws-card\"><h3>4. Do not start in IAM Roles</h3><p>IAM Roles are for AWS services. Identity Center is for people logging in.</p></section></div></main></div>",
    "narration": "This is the first missing tutorial step. In the AWS console search box, open IAM Identity Center. That is where user login, groups, app assignment, and claims are configured. Do not start in IAM Roles when you are wiring the login page.",
    "code": "Source basis:\nAWS IAM Identity Center docs: customer managed applications, application assignments, and attribute mappings.\n\nClick path:\nAWS Console\n-> Search: IAM Identity Center\n-> Open IAM Identity Center\n-> Dashboard\n\nIf disabled:\n-> Enable\n-> Choose identity source\n   - Identity Center directory for a simple tutorial\n   - External IdP like Microsoft Entra ID or Okta for real company SSO\n\nScreens used next:\nUsers\nGroups\nApplications\nSettings -> Attributes for access control\n\nMental model:\nIAM Identity Center = human login and groups.\nIAM Roles = backend service permissions.\nYou need both, but they are different screens.",
    "codeMode": "literal",
    "duration": 36
  },
  {
    "chapter": "Docs-Backed Click Path - IAM Identity Center",
    "title": "Groups Screen: Create The Roles Users Will Carry",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Dashboard</span><span>Users</span><span>Groups</span><span>Applications</span><span>Settings</span></aside><main><div class=\"aws-top\"><span>Groups / Create group</span><strong>IAM Identity Center</strong></div><h2>Enter the groups exactly, then attach users</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Group name</h3><p>BidIntel_Proposal_Writer</p></section><section class=\"aws-card\"><h3>Group name</h3><p>BidIntel_Manager</p></section><section class=\"aws-card\"><h3>Group name</h3><p>BidIntel_Auditor</p></section><section class=\"aws-card\"><h3>Group name</h3><p>BidIntel_Elevated_Admin</p></section></div></main></div>",
    "narration": "On the Groups screen, click Create group and enter the actual role groups. These are the strings the backend will later map into permissions. This is where manager, auditor, and elevated access become real.",
    "code": "Click path:\nIAM Identity Center\n-> Groups\n-> Create group\n\nEnter:\nGroup name: BidIntel_Proposal_Writer\nDescription: Can upload assigned documents, ask RAG questions, and run proposal scoring.\n\nRepeat:\nGroup name: BidIntel_Manager\nDescription: Can review team work, approve bid decisions, and assign reviews.\n\nRepeat:\nGroup name: BidIntel_Auditor\nDescription: Read-only access to audit evidence, guardrail results, citations, and exports.\n\nRepeat:\nGroup name: BidIntel_Elevated_Admin\nDescription: Emergency/admin access to users, data sources, and security policies.\n\nWhere this appears in code:\nbackend/app/authz.py\nGROUP_ROLE_MAP = {\n  \"BidIntel_Proposal_Writer\": \"proposal_writer\",\n  \"BidIntel_Manager\": \"manager\",\n  \"BidIntel_Auditor\": \"auditor\",\n  \"BidIntel_Elevated_Admin\": \"admin\",\n}",
    "codeMode": "literal",
    "duration": 44
  },
  {
    "chapter": "Docs-Backed Click Path - IAM Identity Center",
    "title": "Applications Screen: Add BidIntel As A Custom App",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Applications</span><span>Customer managed</span><span>Add application</span><span>Configuration</span><span>Assignments</span></aside><main><div class=\"aws-top\"><span>Applications / Customer managed / Add application</span><strong>IAM Identity Center</strong></div><h2>This is where the login button points</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Customer managed</h3><p>Choose Add application under the Customer managed tab.</p></section><section class=\"aws-card\"><h3>Setup preference</h3><p>Choose I have an application I want to set up.</p></section><section class=\"aws-card\"><h3>Application type</h3><p>Choose SAML 2.0 for the tutorial path, or OIDC if your auth library supports it.</p></section><section class=\"aws-card\"><h3>Next</h3><p>Then enter BidIntel application properties and callback URLs.</p></section></div></main></div>",
    "narration": "Now go to Applications. Choose the Customer managed tab, add an application, choose that you have an app to set up, and pick SAML 2.0 for the tutorial path. This is the Identity Center app your BidIntel login button ultimately talks to.",
    "code": "Click path from AWS docs:\nIAM Identity Center\n-> Applications\n-> Customer managed tab\n-> Add application\n-> Setup preference: I have an application I want to set up\n-> Application type: SAML 2.0\n-> Next\n\nFields to enter:\nDisplay name: BidIntel AI Command Center\nDescription: Contract capture intelligence workspace\nApplication start URL:\n  Local: http://localhost:5173/login\n  Production: https://app.bidintel.ai/login\n\nWhere this goes in code:\nfrontend/src/pages/LoginPage.tsx\n  Login button sends user to backend auth start endpoint.\n\nbackend/app/api/auth_api.py\n  /auth/login/aws-sso redirects to Identity Center.\n  /auth/callback receives the result and creates the app session.",
    "codeMode": "literal",
    "duration": 48
  },
  {
    "chapter": "Docs-Backed Click Path - IAM Identity Center",
    "title": "Configuration Screen: Paste ACS, Entity, And Metadata Values",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Application details</span><span>Configuration</span><span>Attribute mappings</span><span>Assignments</span><span>Actions</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Configuration</span><strong>IAM Identity Center</strong></div><h2>These fields connect AWS SSO to your backend callback</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>ACS URL</h3><p>https://api.bidintel.ai/auth/saml/acs</p></section><section class=\"aws-card\"><h3>Entity ID</h3><p>bidintel-ai or https://api.bidintel.ai/saml/metadata</p></section><section class=\"aws-card\"><h3>Start URL</h3><p>https://app.bidintel.ai/login</p></section><section class=\"aws-card\"><h3>Metadata</h3><p>Download/copy IAM Identity Center metadata for backend verification.</p></section></div></main></div>",
    "narration": "This is where the tutorial needs to slow down. The ACS or callback URL is the backend endpoint that receives the login response. The Entity ID identifies your BidIntel app. The metadata URL or file is saved so your backend can verify Identity Center signatures.",
    "code": "Screen:\nIAM Identity Center -> Applications -> BidIntel AI Command Center -> Configuration\n\nEnter application values:\nApplication ACS URL:\n  Local: http://localhost:8000/auth/saml/acs\n  Production: https://api.bidintel.ai/auth/saml/acs\n\nApplication SAML audience / Entity ID:\n  bidintel-ai\n  or https://api.bidintel.ai/saml/metadata\n\nApplication start URL:\n  Local: http://localhost:5173/login\n  Production: https://app.bidintel.ai/login\n\nDownload/copy:\nIAM Identity Center SAML metadata file or metadata URL\n\nPut it here:\nbackend/secrets/aws_sso_metadata.xml\nor Secrets Manager value:\n  bidintel/prod/aws-sso-metadata-url\n\nBackend env:\nAWS_SSO_ENTITY_ID=bidintel-ai\nAWS_SSO_ACS_URL=https://api.bidintel.ai/auth/saml/acs\nAWS_SSO_METADATA_URL=<copied from Identity Center>",
    "codeMode": "literal",
    "duration": 54
  },
  {
    "chapter": "Docs-Backed Click Path - IAM Identity Center",
    "title": "Attribute Mapping Screen: Put Claims In The Token",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Application details</span><span>Actions</span><span>Edit attribute mapping</span><span>Add new attribute mapping</span><span>Save changes</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Actions / Edit attribute mapping</span><strong>IAM Identity Center</strong></div><h2>This is the screen that wires roles into the app</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>subject</h3><p>Maps the stable user id.</p></section><section class=\"aws-card\"><h3>email</h3><p>Maps the user email for session and audit.</p></section><section class=\"aws-card\"><h3>groups</h3><p>Maps group membership for role recognition.</p></section><section class=\"aws-card\"><h3>tenant/access</h3><p>Maps tenant_id and access_level when available.</p></section></div></main></div>",
    "narration": "Open the BidIntel app, choose Actions, then Edit attribute mapping. Click Add new attribute mapping for each claim. This is how manager, auditor, and elevated admin group names reach your backend.",
    "code": "Click path from AWS docs:\nIAM Identity Center\n-> Applications\n-> BidIntel AI Command Center\n-> Actions\n-> Edit attribute mapping\n-> Add new attribute mapping\n\nEnter mappings:\nApplication attribute: subject\nMaps to this string value or user attribute: ${user:subject}\n\nApplication attribute: email\nMaps to: ${user:email}\n\nApplication attribute: display_name\nMaps to: ${user:name}\n\nApplication attribute: groups\nMaps to: ${user:groups}\n\nApplication attribute: tenant_id\nMaps to: ${user:custom:tenant_id}\n\nApplication attribute: access_level\nMaps to: ${user:custom:access_level}\n\nThen:\nSave changes.\n\nWhere code reads this:\nbackend/app/auth.py\n  claims = verify_saml_or_oidc_token(...)\n  groups = claims[\"groups\"]\n  user = map_claims_to_current_user(claims)\n\nWhat to test:\nSign in as auditor.\n/auth/me should return:\n  role: auditor\n  groups: [\"BidIntel_Auditor\"]",
    "codeMode": "literal",
    "duration": 58
  },
  {
    "chapter": "Docs-Backed Click Path - IAM Identity Center",
    "title": "Assignments Screen: Let Groups Use The App",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Application details</span><span>Assignments</span><span>Assign users and groups</span><span>Groups</span><span>Review</span></aside><main><div class=\"aws-top\"><span>Applications / BidIntel / Assign users and groups</span><strong>IAM Identity Center</strong></div><h2>Creating groups is not enough; assign them to BidIntel</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Assign users/groups</h3><p>Choose Assign users and groups.</p></section><section class=\"aws-card\"><h3>Groups tab</h3><p>Select the BidIntel groups.</p></section><section class=\"aws-card\"><h3>Review</h3><p>Confirm Proposal Writer, Manager, Auditor, Elevated Admin.</p></section><section class=\"aws-card\"><h3>Test</h3><p>Unassigned users should not be able to sign in.</p></section></div></main></div>",
    "narration": "This is another common missing step. Creating groups does not grant access to the app. In the BidIntel application, open Assignments, choose Assign users and groups, select the groups, and save. Then test each group.",
    "code": "Click path:\nIAM Identity Center\n-> Applications\n-> BidIntel AI Command Center\n-> Assignments\n-> Assign users and groups\n-> Groups tab\n\nSelect:\n[x] BidIntel_Proposal_Writer\n[x] BidIntel_Manager\n[x] BidIntel_Auditor\n[x] BidIntel_Elevated_Admin\n\nClick:\nAssign users\n\nValidation:\nUser not assigned to app -> cannot open BidIntel.\nUser assigned to app but has Auditor group -> can sign in but backend permits only audit actions.\nUser assigned to app with Manager group -> can approve reviews but cannot manage users.\n\nBackend still enforces:\nbackend/app/security/permissions.py\nbackend/app/retrieval.py",
    "codeMode": "literal",
    "duration": 46
  },
  {
    "chapter": "Docs-Backed Click Path - Backend Hosting",
    "title": "ECR Screen: Where The Backend Image Goes",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Private registry</span><span>Repositories</span><span>Create repository</span><span>View push commands</span><span>Images</span></aside><main><div class=\"aws-top\"><span>ECR / Repositories / Create repository / bidintel-backend</span><strong>Amazon ECR</strong></div><h2>Store the FastAPI Docker image here first</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Create repository</h3><p>Name: bidintel-backend.</p></section><section class=\"aws-card\"><h3>View push commands</h3><p>Copy the docker login, tag, and push commands.</p></section><section class=\"aws-card\"><h3>Image URI</h3><p>Copy the final ECR image URI for ECS task definition.</p></section><section class=\"aws-card\"><h3>Version tag</h3><p>Use :latest for tutorial, commit SHA for real releases.</p></section></div></main></div>",
    "narration": "For AWS hosting, start with ECR. The FastAPI backend becomes a Docker image, and ECR is where you push it. The ECS task definition later asks for the ECR image URI.",
    "code": "Click path:\nAWS Console\n-> Search: ECR\n-> Repositories\n-> Create repository\n\nFields:\nVisibility: Private\nRepository name: bidintel-backend\nImage tag mutability: Mutable for tutorial, Immutable for production\nEncryption: AES-256 or KMS\n\nClick:\nCreate repository\nView push commands\n\nRun locally:\naws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com\ndocker build -t bidintel-backend ./backend\ndocker tag bidintel-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/bidintel-backend:latest\ndocker push <account>.dkr.ecr.us-east-1.amazonaws.com/bidintel-backend:latest\n\nCopy this for ECS:\n<account>.dkr.ecr.us-east-1.amazonaws.com/bidintel-backend:latest",
    "codeMode": "literal",
    "duration": 54
  },
  {
    "chapter": "Docs-Backed Click Path - Backend Hosting",
    "title": "Secrets Manager: Where DATABASE_URL And SSO Metadata Go",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Secrets</span><span>Store a new secret</span><span>Secret type</span><span>Configure secret</span><span>Review</span></aside><main><div class=\"aws-top\"><span>Secrets Manager / Store a new secret</span><strong>AWS Secrets Manager</strong></div><h2>Backend secrets live here, not in React</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Secret type</h3><p>Other type of secret.</p></section><section class=\"aws-card\"><h3>Key/value</h3><p>DATABASE_URL, SSO metadata URL, JWT/session secret.</p></section><section class=\"aws-card\"><h3>Name</h3><p>bidintel/prod/backend.</p></section><section class=\"aws-card\"><h3>ECS task</h3><p>Inject secret values into container environment.</p></section></div></main></div>",
    "narration": "Secrets Manager is where backend-only values go. Do not put DATABASE_URL, session keys, SSO metadata, or Bedrock config in React. Store them as a secret, then reference that secret from the ECS task definition.",
    "code": "Click path:\nAWS Console\n-> Search: Secrets Manager\n-> Store a new secret\n-> Other type of secret\n\nKey/value:\nDATABASE_URL=postgresql://bidintel:...@rds-endpoint:5432/bidintel\nAWS_SSO_METADATA_URL=https://portal.sso.us-east-1.amazonaws.com/saml/metadata/...\nSESSION_SECRET=<generate strong random value>\nBEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20240620-v1:0\nEMBEDDING_MODEL_ID=amazon.titan-embed-text-v2:0\n\nSecret name:\nbidintel/prod/backend\n\nWhere code reads it:\nbackend/app/config.py\n\nWhere AWS injects it:\nECS -> Task definitions -> Container -> Environment -> Secrets",
    "codeMode": "literal",
    "duration": 52
  },
  {
    "chapter": "Docs-Backed Click Path - Backend Hosting",
    "title": "ECS Task Definition: Paste Image URI And Env Vars",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Clusters</span><span>Task definitions</span><span>Create</span><span>Container</span><span>Environment</span></aside><main><div class=\"aws-top\"><span>ECS / Task definitions / Create new task definition</span><strong>Amazon ECS</strong></div><h2>This is where the backend container is configured</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Launch type</h3><p>AWS Fargate.</p></section><section class=\"aws-card\"><h3>Task role</h3><p>bidintel-backend-role.</p></section><section class=\"aws-card\"><h3>Container image</h3><p>Paste ECR image URI.</p></section><section class=\"aws-card\"><h3>Port mapping</h3><p>Container port 8000 for FastAPI.</p></section></div></main></div>",
    "narration": "In ECS, create a task definition. Paste the ECR image URI, set port 8000 for FastAPI, choose the backend IAM role as the task role, and add environment variables and Secrets Manager references.",
    "code": "Click path:\nAWS Console\n-> Search: ECS\n-> Task definitions\n-> Create new task definition\n\nTask settings:\nLaunch type: AWS Fargate\nTask definition family: bidintel-backend\nTask role: bidintel-backend-role\nTask execution role: ecsTaskExecutionRole\nCPU/Memory: 0.5 vCPU / 1 GB for tutorial\n\nContainer:\nName: api\nImage URI: <ECR URI copied from ECR>\nEssential: yes\nPort mappings:\n  Container port: 8000\n  Protocol: TCP\n\nEnvironment:\nAPP_ENV=prod\nAWS_REGION=us-east-1\nLOCAL_MOCK_LLM=false\nFRONTEND_URL=https://app.bidintel.ai\n\nSecrets:\nDATABASE_URL -> Secrets Manager bidintel/prod/backend:DATABASE_URL\nSESSION_SECRET -> Secrets Manager bidintel/prod/backend:SESSION_SECRET\nAWS_SSO_METADATA_URL -> Secrets Manager bidintel/prod/backend:AWS_SSO_METADATA_URL",
    "codeMode": "literal",
    "duration": 60
  },
  {
    "chapter": "Docs-Backed Click Path - Backend Hosting",
    "title": "ECS Service And Load Balancer: Make The API Reachable",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Clusters</span><span>Services</span><span>Create service</span><span>Networking</span><span>Load balancing</span></aside><main><div class=\"aws-top\"><span>ECS / Clusters / Services / Create</span><strong>Amazon ECS</strong></div><h2>Run the task behind an Application Load Balancer</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Cluster</h3><p>Create or select bidintel-prod.</p></section><section class=\"aws-card\"><h3>Service</h3><p>Use task definition bidintel-backend.</p></section><section class=\"aws-card\"><h3>Networking</h3><p>Choose VPC, subnets, security group.</p></section><section class=\"aws-card\"><h3>Load balancer</h3><p>Application Load Balancer routes HTTPS to container port 8000.</p></section></div></main></div>",
    "narration": "A task definition is only a template. To run it, create an ECS service on Fargate and attach an Application Load Balancer. The ALB URL becomes your backend API base URL.",
    "code": "Click path:\nECS\n-> Clusters\n-> Create cluster or select bidintel-prod\n-> Services\n-> Create\n\nService fields:\nLaunch type: Fargate\nTask definition: bidintel-backend\nService name: bidintel-api\nDesired tasks: 1 for tutorial, 2+ for production\n\nNetworking:\nVPC: your app VPC\nSubnets: public subnets for ALB, private subnets for tasks if configured\nSecurity group:\n  ALB allows HTTPS 443 from internet\n  ECS task allows port 8000 only from ALB security group\n\nLoad balancing:\nType: Application Load Balancer\nListener: 443 HTTPS\nTarget group: bidintel-api-tg\nHealth check path: /health\n\nCopy after creation:\nALB DNS name:\nhttps://<alb-name>.<region>.elb.amazonaws.com\n\nPut it in frontend build:\nVITE_API_BASE=https://api.bidintel.ai",
    "codeMode": "literal",
    "duration": 64
  },
  {
    "chapter": "Docs-Backed Click Path - Frontend Hosting",
    "title": "S3 Bucket: Upload The Built React Frontend",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Buckets</span><span>Create bucket</span><span>Objects</span><span>Upload</span><span>Properties</span></aside><main><div class=\"aws-top\"><span>S3 / Buckets / Create bucket / Upload dist</span><strong>Amazon S3</strong></div><h2>The frontend is static files after npm run build</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Create bucket</h3><p>Name: bidintel-frontend-prod.</p></section><section class=\"aws-card\"><h3>Build frontend</h3><p>Set VITE_API_BASE to backend URL before npm run build.</p></section><section class=\"aws-card\"><h3>Upload</h3><p>Upload all files from frontend/dist.</p></section><section class=\"aws-card\"><h3>Private origin</h3><p>For production, keep bucket private and serve through CloudFront OAC.</p></section></div></main></div>",
    "narration": "For the frontend, run npm build locally or in CI, then upload the dist files to S3. The key detail is to set VITE_API_BASE to the hosted backend API before building.",
    "code": "Local build:\ncd frontend\necho \"VITE_API_BASE=https://api.bidintel.ai\" > .env.production\nnpm run build\n\nClick path:\nAWS Console\n-> Search: S3\n-> Buckets\n-> Create bucket\n\nFields:\nBucket name: bidintel-frontend-prod\nRegion: same region as app\nBlock public access: keep blocked for CloudFront OAC production path\nEncryption: SSE-S3 or SSE-KMS\n\nAfter bucket exists:\nOpen bucket\n-> Objects\n-> Upload\n-> Add files/folder\n-> Select all files inside frontend/dist\n-> Upload\n\nDo not upload:\nfrontend/src\nnode_modules\n.env files",
    "codeMode": "literal",
    "duration": 58
  },
  {
    "chapter": "Docs-Backed Click Path - Frontend Hosting",
    "title": "CloudFront: Create The Public Tutorial/App URL",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Distributions</span><span>Create distribution</span><span>Origins</span><span>Behaviors</span><span>Error pages</span></aside><main><div class=\"aws-top\"><span>CloudFront / Distributions / Create distribution</span><strong>Amazon CloudFront</strong></div><h2>Serve S3 frontend over HTTPS</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Origin</h3><p>Select the S3 bucket.</p></section><section class=\"aws-card\"><h3>Origin access</h3><p>Use Origin Access Control for private S3.</p></section><section class=\"aws-card\"><h3>Default root object</h3><p>index.html.</p></section><section class=\"aws-card\"><h3>Custom error</h3><p>Route 403/404 to /index.html for React routing.</p></section></div></main></div>",
    "narration": "CloudFront is the public HTTPS front door for the React app. Choose the S3 bucket as origin, create origin access control, set index dot html as the default root object, and add React routing error responses.",
    "code": "Click path:\nAWS Console\n-> Search: CloudFront\n-> Distributions\n-> Create distribution\n\nOrigin:\nOrigin domain: bidintel-frontend-prod.s3.<region>.amazonaws.com\nOrigin access: Origin access control settings\nCreate new OAC if prompted\n\nDefault cache behavior:\nViewer protocol policy: Redirect HTTP to HTTPS\nAllowed methods: GET, HEAD\n\nSettings:\nDefault root object: index.html\n\nError pages for React/Vite routing:\nCreate custom error response:\n  HTTP error code: 403\n  Response page path: /index.html\n  HTTP response code: 200\nCreate custom error response:\n  HTTP error code: 404\n  Response page path: /index.html\n  HTTP response code: 200\n\nCopy:\nCloudFront distribution domain name\nhttps://dxxxxxxxx.cloudfront.net\n\nUse this as:\nFRONTEND_URL in backend\nApplication start URL in IAM Identity Center",
    "codeMode": "literal",
    "duration": 64
  },
  {
    "chapter": "Docs-Backed Click Path - Bedrock And RAG",
    "title": "Bedrock Model Access: The Console Screen Before Code Works",
    "skin": "aws",
    "visual": "<div class=\"aws-console\"><aside><strong>AWS Console</strong><span>Overview</span><span>Model access</span><span>Foundation models</span><span>Inference</span><span>Monitoring</span></aside><main><div class=\"aws-top\"><span>Amazon Bedrock / Model access / Modify model access</span><strong>Amazon Bedrock</strong></div><h2>Enable the models before invoking them</h2><div class=\"aws-cards\"><section class=\"aws-card\"><h3>Model access</h3><p>Open Model access in Bedrock console.</p></section><section class=\"aws-card\"><h3>Claude</h3><p>Enable Anthropic Claude Sonnet.</p></section><section class=\"aws-card\"><h3>Titan</h3><p>Enable Amazon Titan Embeddings.</p></section><section class=\"aws-card\"><h3>IAM policy</h3><p>Backend role must allow InvokeModel on approved model ARNs.</p></section></div></main></div>",
    "narration": "Bedrock has a console gate. Open Bedrock, go to Model access, modify model access, enable Claude and Titan Embeddings, then make sure the ECS task role policy allows those model ARNs.",
    "code": "Click path:\nAWS Console\n-> Search: Amazon Bedrock\n-> Model access\n-> Modify model access\n\nSelect:\n[x] Anthropic Claude Sonnet\n[x] Amazon Titan Text Embeddings\n-> Submit / Save\nWait for status: Access granted\n\nPut model ids in:\nSecrets Manager -> bidintel/prod/backend\nBEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20240620-v1:0\nEMBEDDING_MODEL_ID=amazon.titan-embed-text-v2:0\n\nPut client code in:\nbackend/app/services/llm_bedrock.py\n\nThe backend container uses:\nECS task role: bidintel-backend-role\nIAM policy: bedrock:InvokeModel on approved model resources",
    "codeMode": "literal",
    "duration": 52
  },
  {
    "chapter": "Docs-Backed Click Path - RAGAS Phoenix Vector DB",
    "title": "Where RAGAS, Phoenix, And pgvector Fit",
    "skin": "diagram",
    "visual": "<div class=\"diagram-grid\"><div class=\"node hot\">Postgres + pgvector stores embeddings</div><div class=\"node \">BM25 and vector search retrieve chunks</div><div class=\"node \">Bedrock writes grounded answer</div><div class=\"node hot\">Phoenix traces each span</div><div class=\"node hot\">RAGAS scores faithfulness and recall</div><div class=\"node \">Audit log stores decision</div><div class=\"node \">CloudWatch stores service logs</div><div class=\"node \">Human reviews low scores</div></div>",
    "narration": "The tutorial also needs to show where RAGAS, Phoenix, and the vector database are wired. pgvector lives in PostgreSQL for embeddings and indexes. Phoenix traces the request path. RAGAS evaluates faithfulness, answer relevance, and context recall after the RAG answer is produced.",
    "code": "Vector DB code goes here:\nbackend/app/db/migrations/001_vectors.sql\n\nCREATE EXTENSION IF NOT EXISTS vector;\nCREATE TABLE chunks (\n  id uuid primary key,\n  document_id uuid not null,\n  chunk_text text not null,\n  embedding vector(1536),\n  access_groups text[] not null\n);\nCREATE INDEX chunks_embedding_hnsw\nON chunks USING hnsw (embedding vector_cosine_ops);\n\nPhoenix tracing code goes here:\nbackend/app/observability/phoenix.py\nbackend/app/main.py imports tracing setup\n\nTrace spans:\nauth.verify_user\nretrieval.bm25\nretrieval.vector\nprompt.build_context\nbedrock.invoke_model\nragas.evaluate\naudit.write\n\nRAGAS eval code goes here:\nbackend/app/evals/ragas_eval.py\n\nMetrics:\nfaithfulness\nanswer_relevancy\ncontext_recall\ncontext_precision\n\nRule:\nRAGAS and Phoenix are not AWS hosting screens.\nThey are local/backend observability and evaluation wiring that must appear in the tutorial flow.",
    "codeMode": "literal",
    "duration": 58
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Where You Actually Build: Local First, AWS Later",
    "skin": "diagram",
    "visual": "<div class=\"diagram-grid\"><div class=\"node hot\">1. Write code on your Mac</div><div class=\"node \">2. Run Postgres + Phoenix in Docker</div><div class=\"node \">3. Run FastAPI in terminal</div><div class=\"node \">4. Run React/Vite in terminal</div><div class=\"node \">5. Test Swagger + browser</div><div class=\"node \">6. Build backend Docker image</div><div class=\"node hot\">7. Push image to ECR</div><div class=\"node hot\">8. ECS runs it on AWS</div></div>",
    "narration": "This is the educator answer that was missing. You do not write the BidIntel code on an AWS server. You build and test it on your machine first. Docker runs the local database and Phoenix. Your backend and frontend run from local terminals. When it works, the backend is wrapped as a Docker image, pushed to ECR, and ECS runs that image.",
    "code": "Source basis:\nBIDINTEL Build Bible sections:\n2. Local install and zero-to-project setup\n4. Docker and environment files\n7. API routes\n12. Run, test, troubleshoot\n13. Deployment path\n\nThe correct beginner sequence:\n1. Create the project folder on your machine.\n2. Create backend/, frontend/, infra/, docs/, tests/.\n3. Start local database and Phoenix with docker compose.\n4. Run FastAPI locally on http://localhost:8000.\n5. Run React/Vite locally on http://localhost:5173.\n6. Use Swagger at http://localhost:8000/docs to test endpoints.\n7. Only after local tests pass, build a backend Docker image.\n8. Push that image to ECR.\n9. Create or update ECS task definition with the ECR image URI.\n10. Deploy ECS service behind a load balancer.\n11. Build frontend static files with VITE_API_BASE set to the hosted API.\n12. Upload frontend/dist to S3 and serve it with CloudFront.\n\nPlain English:\nLocal machine = where you write and test code.\nDocker Compose = local supporting services.\nECR = image storage.\nECS/Fargate = runs backend container in AWS.\nS3/CloudFront = hosts the frontend.",
    "codeMode": "literal",
    "duration": 62
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Exact Local Terminal Setup From Empty Folder",
    "skin": "terminal",
    "visual": "$ mkdir bidintel-ai\n$ cd bidintel-ai\n$ mkdir backend frontend docs data scripts infra tests\n$ git init\n$ docker compose up -d\n$ python3 -m venv .venv\n$ source .venv/bin/activate\n$ pip install -r backend/requirements.txt\n$ cd backend && uvicorn app.main:app --reload --port 8000\n# second terminal\n$ cd frontend && npm install && npm run dev",
    "narration": "A build tutorial should say where commands run. These are terminal commands on your local machine. The backend command runs from the backend folder. The frontend command runs from the frontend folder. Docker Compose runs from the project root where docker-compose dot yml lives.",
    "code": "Run location map:\n\nProject root:\n  /Users/adamsmith/Documents/New project/bidintel-ai\n\nTerminal 1 - project root:\n  docker compose up -d\n\nTerminal 2 - backend:\n  cd backend\n  ../.venv/bin/uvicorn app.main:app --reload --port 8000\n\nTerminal 3 - frontend:\n  cd frontend\n  npm install\n  npm run dev\n\nBrowser:\n  Swagger: http://localhost:8000/docs\n  App: http://localhost:5173\n  Phoenix: http://localhost:6006\n\nWhat each terminal means:\nDocker terminal keeps Postgres/pgvector and Phoenix running.\nBackend terminal serves Python API routes.\nFrontend terminal serves the React screen.\n\nDo not start with AWS.\nAWS comes after the local loop works.",
    "codeMode": "literal",
    "duration": 58
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Architecture Section To File Map",
    "skin": "browser",
    "visual": "<div class=\"panel\"><strong>Every architecture box must point to files</strong></div>\n<div class=\"panel\">Login / IAM -> frontend/src/pages/LoginPage.tsx + backend/app/auth.py</div>\n<div class=\"panel\">Document ingest -> DocumentsPage.tsx + documents_api.py + extract_text.py + chunking.py</div>\n<div class=\"panel\">RAG ask -> AssistantPage.tsx + chat_api.py + retrieval.py + prompt_builder.py</div>\n<div class=\"panel\">Scoring -> BidScore.tsx + bid_scoring.py + evaluator.py</div>\n<div class=\"panel\">Audit -> AuditPage.tsx + audit.py + CloudWatch/CloudTrail</div>",
    "narration": "The tutorial now treats architecture as a file map. If a section says RAG, it shows the React page, API route, service file, database table, and proof command. That is the difference between an overview and a build-along.",
    "code": "Build Bible system map translated into implementation map:\n\nFrontend routes:\nfrontend/src/pages/LoginPage.tsx\nfrontend/src/pages/DocumentsPage.tsx\nfrontend/src/pages/AssistantPage.tsx\nfrontend/src/pages/CompliancePage.tsx\nfrontend/src/pages/BidScore.tsx\nfrontend/src/pages/AuditPage.tsx\n\nFrontend API bridge:\nfrontend/src/lib/api.ts\n\nFastAPI routes:\nbackend/app/api/auth_api.py\nbackend/app/api/documents_api.py\nbackend/app/api/chat_api.py\nbackend/app/api/eval_api.py\nbackend/app/api/compliance_api.py\nbackend/app/api/bid_api.py\nbackend/app/api/audit_api.py\n\nCore services:\nbackend/app/services/extract_text.py\nbackend/app/services/chunking.py\nbackend/app/services/embeddings.py\nbackend/app/services/vector_store.py\nbackend/app/services/bm25_search.py\nbackend/app/services/retrieval.py\nbackend/app/services/rrf.py\nbackend/app/services/reranker.py\nbackend/app/services/prompt_builder.py\nbackend/app/services/llm_bedrock.py\nbackend/app/services/evaluator.py\nbackend/app/services/guardrails.py\n\nProof:\nOpen Swagger.\nCall each endpoint before trusting the frontend.",
    "codeMode": "literal",
    "duration": 64
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Docker Compose Is Local Infrastructure, Not The Cloud",
    "skin": "editor",
    "visual": "docker-compose.yml\n\nservices:\n  db:\n    image: pgvector/pgvector:pg16\n    ports: [\"5432:5432\"]\n\n  phoenix:\n    image: arizephoenix/phoenix:latest\n    ports: [\"6006:6006\"]",
    "narration": "Docker Compose is for the local development stack. It gives you a repeatable Postgres with pgvector and Phoenix without installing those services manually. This is not the AWS deploy yet; it is the training wheels that make local development predictable.",
    "code": "Create this in the project root:\ndocker-compose.yml\n\nservices:\n  db:\n    image: pgvector/pgvector:pg16\n    container_name: bidintel-db\n    environment:\n      POSTGRES_DB: bidintel\n      POSTGRES_USER: bidintel\n      POSTGRES_PASSWORD: bidintelpass\n    ports:\n      - \"5432:5432\"\n    volumes:\n      - bidintel_db:/var/lib/postgresql/data\n\n  phoenix:\n    image: arizephoenix/phoenix:latest\n    container_name: bidintel-phoenix\n    ports:\n      - \"6006:6006\"\n\nvolumes:\n  bidintel_db:\n\nRun from project root:\ndocker compose up -d\n\nVerify:\ndocker ps\nopen http://localhost:6006\n\nWhat happens later on AWS:\nPostgres moves to RDS/Aurora.\nPhoenix can run separately or be replaced by managed observability.\nBackend app moves to ECS.\nFrontend moves to S3/CloudFront.",
    "codeMode": "literal",
    "duration": 64
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Backend Dockerfile: The Wrapper That Moves To AWS",
    "skin": "editor",
    "visual": "backend/Dockerfile\n\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY app ./app\nCMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
    "narration": "This is the transfer answer. You do not copy Python files into AWS by hand. You wrap the backend in a Docker image. That image contains the code and dependencies. You push it to ECR. ECS pulls and runs it.",
    "code": "Create:\nbackend/Dockerfile\n\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY app ./app\nEXPOSE 8000\nCMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\nBuild locally from project root:\ndocker build -t bidintel-backend ./backend\n\nTest container locally:\ndocker run --rm -p 8000:8000 --env-file backend/.env bidintel-backend\nopen http://localhost:8000/health\n\nAWS transfer:\n1. Create ECR repository bidintel-backend.\n2. Tag local image with ECR URI.\n3. docker push to ECR.\n4. Paste ECR image URI into ECS task definition.\n\nThis is the \"how do I transfer it?\" path.",
    "codeMode": "literal",
    "duration": 66
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Frontend Build: Static Files Go To S3",
    "skin": "terminal",
    "visual": "$ cd frontend\n$ echo \"VITE_API_BASE=https://api.bidintel.ai\" > .env.production\n$ npm run build\n$ ls dist\n# index.html assets/ ...",
    "narration": "The React frontend does not run on the same kind of server as FastAPI. Vite builds static files. Those files go to S3, and CloudFront serves them over HTTPS. The frontend talks to the backend through VITE_API_BASE.",
    "code": "Local development:\ncd frontend\nnpm run dev\nopen http://localhost:5173\n\nProduction build:\ncd frontend\necho \"VITE_API_BASE=https://api.bidintel.ai\" > .env.production\nnpm run build\n\nOutput folder:\nfrontend/dist\n\nUpload to AWS:\nAWS Console -> S3 -> bidintel-frontend-prod -> Objects -> Upload\nSelect the contents of frontend/dist.\n\nThen:\nCloudFront distribution uses the S3 bucket as origin.\nDefault root object: index.html.\nCustom error responses 403 and 404 -> /index.html with 200 for React routes.\n\nImportant:\nDo not upload source files, node_modules, or .env secrets.\nOnly upload built static files.",
    "codeMode": "literal",
    "duration": 58
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Environment Variables: Local .env Versus AWS Secrets",
    "skin": "browser",
    "visual": "<div class=\"panel\"><strong>Local backend/.env</strong><br>DATABASE_URL points to localhost, mock mode can be on.</div>\n<div class=\"panel\"><strong>AWS Secrets Manager</strong><br>DATABASE_URL points to RDS, session secret and SSO metadata live here.</div>\n<div class=\"panel\"><strong>ECS Task Definition</strong><br>Injects env vars and secrets into backend container.</div>\n<div class=\"panel\"><strong>React .env.production</strong><br>Only public VITE_API_BASE belongs here.</div>",
    "narration": "A serious tutorial has to separate local config from AWS secrets. Local backend dot env is for development. AWS Secrets Manager is for production secrets. ECS injects those values into the container. React only gets public build-time config like the API base URL.",
    "code": "Local backend file:\nbackend/.env\n\nAPP_ENV=local\nDATABASE_URL=postgresql+psycopg://bidintel:bidintelpass@localhost:5432/bidintel\nAWS_REGION=us-east-1\nLOCAL_MOCK_LLM=true\n\nProduction secret:\nAWS Console -> Secrets Manager -> bidintel/prod/backend\n\nKeys:\nDATABASE_URL=postgresql://...rds.amazonaws.com:5432/bidintel\nSESSION_SECRET=<strong value>\nAWS_SSO_METADATA_URL=<Identity Center metadata URL>\nBEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20240620-v1:0\nEMBEDDING_MODEL_ID=amazon.titan-embed-text-v2:0\n\nECS task definition:\nEnvironment:\n  APP_ENV=prod\n  AWS_REGION=us-east-1\n  LOCAL_MOCK_LLM=false\nSecrets:\n  DATABASE_URL from Secrets Manager\n  SESSION_SECRET from Secrets Manager\n  AWS_SSO_METADATA_URL from Secrets Manager\n\nFrontend:\nfrontend/.env.production\nVITE_API_BASE=https://api.bidintel.ai",
    "codeMode": "literal",
    "duration": 64
  },
  {
    "chapter": "Educator Build-Along - Bible Gaps Filled",
    "title": "Proof Checklist: Could You Build It From This?",
    "skin": "diagram",
    "visual": "<div class=\"flow\"><div class=\"node \">Folder tree exists</div><div class=\"node \">Docker services run</div><div class=\"node \">DB schema applied</div><div class=\"node \">Swagger endpoints pass</div><div class=\"node \">React pages call API</div><div class=\"node hot\">RAG returns citations</div><div class=\"node hot\">Eval + audit rows exist</div><div class=\"node hot\">AWS deploy path tested</div></div>",
    "narration": "This is the audit standard I’m applying now. A viewer should be able to rebuild the project by following the page: create folders, run local services, write backend scripts, test endpoints, wire React, run RAG with citations, see audit and eval output, then transfer backend and frontend to AWS.",
    "code": "Tutorial completeness checklist:\n\nLocal build:\n[ ] project root and folder tree created\n[ ] docker-compose.yml starts pgvector and Phoenix\n[ ] backend/.env created\n[ ] schema/migrations applied\n[ ] seed data inserted\n[ ] FastAPI runs on :8000\n[ ] Swagger works\n[ ] frontend runs on :5173\n\nRAG build:\n[ ] document upload endpoint works\n[ ] chunks include tenant_id and access_groups\n[ ] BM25 search returns exact hits\n[ ] vector search returns semantic hits\n[ ] RRF fuses results\n[ ] prompt includes citations\n[ ] Bedrock or MockLLM returns answer\n[ ] guardrails and evaluator run\n[ ] audit row is written\n\nAWS build:\n[ ] Bedrock model access enabled\n[ ] IAM Identity Center app/groups/attributes/assignments configured\n[ ] backend IAM task role created\n[ ] Secrets Manager values created\n[ ] backend image pushed to ECR\n[ ] ECS task and service run backend\n[ ] frontend/dist uploaded to S3\n[ ] CloudFront serves app URL\n[ ] login and role tests pass",
    "codeMode": "literal",
    "duration": 66
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
