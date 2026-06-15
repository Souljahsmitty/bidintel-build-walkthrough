# BidIntel Frontend + AWS Walkthrough Chapters

00:00:00 Original Build - Welcome & Big Picture - What BidIntel Builds
00:00:06 Original Build - Concept Cards - RAG
00:00:16 Original Build - Concept Cards - Chunking
00:00:26 Original Build - Concept Cards - Embedding / Vector
00:00:36 Original Build - Concept Cards - Vector Search
00:00:46 Original Build - Concept Cards - BM25
00:00:56 Original Build - Concept Cards - Hybrid Search
00:01:06 Original Build - Concept Cards - RRF
00:01:16 Original Build - Concept Cards - Reranker
00:01:26 Original Build - Concept Cards - Context Builder
00:01:36 Original Build - Concept Cards - LLM / Amazon Bedrock / Claude
00:01:46 Original Build - Concept Cards - Guardrails
00:01:56 Original Build - Concept Cards - Evaluator / LLM-as-a-Judge
00:02:06 Original Build - Concept Cards - RAGAS
00:02:16 Original Build - Concept Cards - Phoenix / Observability / Tracing
00:02:26 Original Build - Concept Cards - Precision@K
00:02:36 Original Build - Concept Cards - Recall@K
00:02:46 Original Build - Concept Cards - MRR
00:02:56 Original Build - Concept Cards - NDCG
00:03:06 Original Build - Concept Cards - Faithfulness
00:03:16 Original Build - Concept Cards - Answer Relevancy
00:03:26 Original Build - Concept Cards - Context Precision / Context Recall
00:03:36 Original Build - Concept Cards - Answer Correctness
00:03:46 Original Build - Concept Cards - Latency / Cost / Citation Coverage / Hallucination Rate
00:03:56 Original Build - Concept Cards - PostgreSQL
00:04:06 Original Build - Concept Cards - pgvector
00:04:16 Original Build - Concept Cards - Full-text Search / tsvector
00:04:26 Original Build - Concept Cards - HNSW & GIN Indexes
00:04:36 Original Build - Concept Cards - Docker / Container / docker-compose
00:04:46 Original Build - Concept Cards - FastAPI / Swagger Docs
00:04:56 Original Build - Concept Cards - React / Vite
00:05:06 Original Build - Concept Cards - IAM Role / Temporary Credentials
00:05:16 Original Build - Concept Cards - S3 / Secrets Manager / ECS Task
00:05:26 Original Build - Concept Cards - CloudTrail / CloudWatch
00:05:36 Original Build - Concept Cards - Multi-tenancy / tenant_id / Access Groups / ATO
00:05:46 Original Build - Mental Model - Pipeline Map
00:05:52 Original Build - Set Up Your Machine - Prerequisites
00:06:03 Original Build - Folder Structure - Project Skeleton
00:06:14 Original Build - Docker & Database - Start Postgres and Phoenix
00:06:25 Original Build - Database Schema - Tables and Indexes
00:06:33 Original Build - Documents In - Ingestion
00:06:39 Original Build - Keyword Search - BM25 Query
00:06:50 Original Build - Meaning Search - Vector Query
00:07:01 Original Build - Hybrid + RRF - Merge Results
00:07:12 Original Build - Reranker - Shortlist Review
00:07:23 Original Build - Context & Model - Build Prompt
00:07:34 Original Build - Guardrails & Safety - Filter Before LLM
00:07:45 Original Build - Evaluation - Did It Work?
00:07:56 Original Build - Observability - Phoenix Traces
00:08:07 Original Build - Frontend - Button to API
00:08:18 Original Build - Analyst Tools - Proposal Scoring Engine
00:08:38 Original Build - Going to AWS - Eight Console Steps
00:08:49 Original Build - Run End-to-End - Proof Commands
00:09:00 Original Build - Troubleshooting & Maturity - Common Problems
00:09:11 Original Build - Final Recap - ADHD Short Version
00:09:17 Bridge - Now Add The Product Walkthrough
00:09:31 Granular PDF - Product Screens - Login Screen Matches The Real Product
00:09:49 Granular PDF - Product Screens - Document Ingest Screen Is The RAG Starting Point
00:10:09 Granular PDF - Product Screens - Audit Logs Prove Guardrails And Accountability
00:10:27 Granular PDF - Frontend Code Order - Five Frontend Files First
00:10:49 Granular PDF - Frontend Code Order - api.ts Is The Bridge From Browser To Python
00:11:13 Granular PDF - Frontend Code Order - Assistant Click Loop
00:11:39 Granular PDF - Backend Code Order - FastAPI Receives The Click
00:12:05 Granular PDF - Login And Access - Login Maps To Groups, Not Just A UI Button
00:12:33 Granular PDF - AWS Console Screens - AWS Home: The Services You Actually Open
00:12:57 Granular PDF - AWS Console Screens - IAM Identity Center: User Login And Groups
00:13:27 Granular PDF - AWS Console Screens - Bedrock: Enable Claude And Titan
00:13:57 Granular PDF - AWS Console Screens - IAM Role: Backend Service Permissions
00:14:31 Granular PDF - AWS Console Screens - ECR And ECS: Host The FastAPI Backend
00:15:05 Granular PDF - AWS Console Screens - S3 And CloudFront: Host The Frontend
00:15:35 Granular PDF - AWS Console Screens - Secrets, RDS, And S3 Document Storage
00:16:05 Granular PDF - Final Order - Final Build Order From The PDF
00:16:33 Frontend + AWS - Correct Build Order - Create The Local Project Skeleton
00:16:57 Frontend + AWS - Frontend First - Vite React App And Routes
00:17:21 Frontend + AWS - Frontend First - API Client Is The Switch
00:17:45 Frontend + AWS - Frontend Product Flow - Login Screen And Identity
00:18:09 Frontend + AWS - Frontend Product Flow - Dashboard After Login
00:18:33 Frontend + AWS - Frontend Product Flow - Document Ingest Screen
00:18:57 Frontend + AWS - Backend And Database - FastAPI Doorway
00:19:21 Frontend + AWS - Backend And Database - PostgreSQL And pgvector Tables
00:19:45 Frontend + AWS - RAG Product Flow - Ask BidIntel Screen
00:20:09 Frontend + AWS - RAG Product Flow - Permission Filter Before Bedrock
00:20:33 Frontend + AWS - Proposal Scoring - Score Page With Example Findings
00:20:57 Frontend + AWS - Evaluation And Observability - RAGAS Evaluation Mock Screen
00:21:21 Frontend + AWS - Evaluation And Observability - Phoenix Trace Mock Screen
00:21:45 Frontend + AWS - AWS Build Order - Correct AWS Dependency Order
00:22:09 Frontend + AWS - AWS Build Order - Backend IAM Role Is Not User Role
00:22:33 Frontend + AWS - Bedrock Wiring - Backend Calls Bedrock, Frontend Never Does
00:22:57 Frontend + AWS - Final System Map - What BidIntel Is
