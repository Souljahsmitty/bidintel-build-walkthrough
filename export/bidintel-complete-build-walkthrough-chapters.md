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
00:13:57 IAM Deep Dive - Authorization Build - Identity Center Is The Login Control Plane
00:14:31 IAM Deep Dive - Authorization Build - Create BidIntel Access Groups
00:15:05 IAM Deep Dive - Authorization Build - Add Users And Assign Groups
00:15:43 IAM Deep Dive - Authorization Build - Create The BidIntel Application
00:16:25 IAM Deep Dive - Authorization Build - Map Identity Attributes Into Claims
00:17:09 IAM Deep Dive - Authorization Build - Assign Groups To The BidIntel App
00:17:47 IAM Deep Dive - Authorization Build - Frontend Login Button To Backend Session
00:18:29 IAM Deep Dive - Authorization Build - Map Groups To BidIntel Roles
00:18:35 IAM Deep Dive - Authorization Build - Authorization Matrix For Pages And APIs
00:19:19 IAM Deep Dive - Authorization Build - Backend Blocks Unauthorized APIs
00:20:01 IAM Deep Dive - Authorization Build - Document Retrieval Filters By Tenant And Access Group
00:20:51 IAM Deep Dive - Authorization Build - Elevated Access Needs Extra Guardrails
00:21:35 IAM Deep Dive - Authorization Build - Auditor Access Is Read Only
00:22:17 IAM Deep Dive - Authorization Build - Manager Access Can Approve But Not Administer
00:22:57 IAM Deep Dive - Authorization Build - Test The IAM Wiring End To End
00:23:41 Granular PDF - AWS Console Screens - IAM Role: Backend Service Permissions
00:24:15 Granular PDF - AWS Console Screens - ECR And ECS: Host The FastAPI Backend
00:24:49 Granular PDF - AWS Console Screens - S3 And CloudFront: Host The Frontend
00:25:19 Granular PDF - AWS Console Screens - Secrets, RDS, And S3 Document Storage
00:25:49 Granular PDF - Final Order - Final Build Order From The PDF
00:26:17 Docs-Backed Click Path - IAM Identity Center - Open The Exact AWS IAM Identity Center Area
00:26:53 Docs-Backed Click Path - IAM Identity Center - Groups Screen: Create The Roles Users Will Carry
00:27:37 Docs-Backed Click Path - IAM Identity Center - Applications Screen: Add BidIntel As A Custom App
00:28:25 Docs-Backed Click Path - IAM Identity Center - Configuration Screen: Paste ACS, Entity, And Metadata Values
00:29:19 Docs-Backed Click Path - IAM Identity Center - Attribute Mapping Screen: Put Claims In The Token
00:30:17 Docs-Backed Click Path - IAM Identity Center - Assignments Screen: Let Groups Use The App
00:31:03 Docs-Backed Click Path - Backend Hosting - ECR Screen: Where The Backend Image Goes
00:31:57 Docs-Backed Click Path - Backend Hosting - Secrets Manager: Where DATABASE_URL And SSO Metadata Go
00:32:49 Docs-Backed Click Path - Backend Hosting - ECS Task Definition: Paste Image URI And Env Vars
00:33:49 Docs-Backed Click Path - Backend Hosting - ECS Service And Load Balancer: Make The API Reachable
00:34:53 Docs-Backed Click Path - Frontend Hosting - S3 Bucket: Upload The Built React Frontend
00:35:51 Docs-Backed Click Path - Frontend Hosting - CloudFront: Create The Public Tutorial/App URL
00:36:55 Docs-Backed Click Path - Bedrock And RAG - Bedrock Model Access: The Console Screen Before Code Works
00:37:47 Docs-Backed Click Path - RAGAS Phoenix Vector DB - Where RAGAS, Phoenix, And pgvector Fit
00:38:45 Frontend + AWS - Correct Build Order - Create The Local Project Skeleton
00:39:09 Frontend + AWS - Frontend First - Vite React App And Routes
00:39:33 Frontend + AWS - Frontend First - API Client Is The Switch
00:39:57 Frontend + AWS - Frontend Product Flow - Login Screen And Identity
00:40:21 Frontend + AWS - Frontend Product Flow - Dashboard After Login
00:40:45 Frontend + AWS - Frontend Product Flow - Document Ingest Screen
00:41:09 Frontend + AWS - Backend And Database - FastAPI Doorway
00:41:33 Frontend + AWS - Backend And Database - PostgreSQL And pgvector Tables
00:41:57 Frontend + AWS - RAG Product Flow - Ask BidIntel Screen
00:42:21 Frontend + AWS - RAG Product Flow - Permission Filter Before Bedrock
00:42:45 Frontend + AWS - Proposal Scoring - Score Page With Example Findings
00:43:09 Frontend + AWS - Evaluation And Observability - RAGAS Evaluation Mock Screen
00:43:33 Frontend + AWS - Evaluation And Observability - Phoenix Trace Mock Screen
00:43:57 Frontend + AWS - AWS Build Order - Correct AWS Dependency Order
00:44:21 Frontend + AWS - AWS Build Order - Backend IAM Role Is Not User Role
00:44:45 Frontend + AWS - Bedrock Wiring - Backend Calls Bedrock, Frontend Never Does
00:45:09 Frontend + AWS - Final System Map - What BidIntel Is
