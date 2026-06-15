# BidIntel Frontend + AWS Walkthrough Chapters

00:00:00 Course Shape - Fast Track And Expert Track - Fix Shape: Two Tracks, Not One Long Watch
00:00:56 Course Shape - Fast Track And Expert Track - Fast Track: Watch, Do, Verify
00:02:00 Course Shape - Fast Track And Expert Track - Expert Track IAM Lab: Claims Must Become Permissions
00:03:14 Course Shape - Fast Track And Expert Track - Every Module Needs A Checklist And Screenshot Target
00:04:16 Course Shape - Fast Track And Expert Track - Failure Labs Build Expert Judgment
00:05:20 Course Shape - Fast Track And Expert Track - Prototype Boundary, AWS Cost, And Teardown
00:06:32 Original Build - Welcome & Big Picture - What BidIntel Builds
00:06:43 Original Build - Concept Cards - RAG
00:07:05 Original Build - Concept Cards - Chunking
00:07:27 Original Build - Concept Cards - Embedding / Vector
00:07:49 Original Build - Concept Cards - Vector Search
00:08:11 Original Build - Concept Cards - BM25
00:08:33 Original Build - Concept Cards - Hybrid Search
00:08:55 Original Build - Concept Cards - RRF
00:09:17 Original Build - Concept Cards - Reranker
00:09:39 Original Build - Concept Cards - Context Builder
00:10:01 Original Build - Concept Cards - LLM / Amazon Bedrock / Claude
00:10:23 Original Build - Concept Cards - Guardrails
00:10:45 Original Build - Concept Cards - Evaluator / LLM-as-a-Judge
00:11:07 Original Build - Concept Cards - RAGAS
00:11:29 Original Build - Concept Cards - Phoenix / Observability / Tracing
00:11:51 Original Build - Concept Cards - Precision@K
00:12:01 Original Build - Concept Cards - Recall@K
00:12:11 Original Build - Concept Cards - MRR
00:12:21 Original Build - Concept Cards - NDCG
00:12:31 Original Build - Concept Cards - Faithfulness
00:12:41 Original Build - Concept Cards - Answer Relevancy
00:12:51 Original Build - Concept Cards - Context Precision / Context Recall
00:13:01 Original Build - Concept Cards - Answer Correctness
00:13:11 Original Build - Concept Cards - Latency / Cost / Citation Coverage / Hallucination Rate
00:13:21 Original Build - Concept Cards - PostgreSQL
00:13:43 Original Build - Concept Cards - pgvector
00:14:05 Original Build - Concept Cards - Full-text Search / tsvector
00:14:15 Original Build - Concept Cards - HNSW & GIN Indexes
00:14:25 Original Build - Concept Cards - Docker / Container / docker-compose
00:14:47 Original Build - Concept Cards - FastAPI / Swagger Docs
00:15:09 Original Build - Concept Cards - React / Vite
00:15:31 Original Build - Concept Cards - IAM Role / Temporary Credentials
00:15:53 Original Build - Concept Cards - S3 / Secrets Manager / ECS Task
00:16:15 Original Build - Concept Cards - CloudTrail / CloudWatch
00:16:37 Original Build - Concept Cards - Multi-tenancy / tenant_id / Access Groups / ATO
00:16:59 Original Build - Mental Model - Pipeline Map
00:17:10 Original Build - Set Up Your Machine - Prerequisites
00:17:21 Original Build - Folder Structure - Project Skeleton
00:17:32 Original Build - Docker & Database - Start Postgres and Phoenix
00:17:43 Original Build - Database Schema - Tables and Indexes
00:17:55 Original Build - Documents In - Ingestion
00:18:06 Original Build - Keyword Search - BM25 Query
00:18:17 Original Build - Meaning Search - Vector Query
00:18:28 Original Build - Hybrid + RRF - Merge Results
00:18:39 Original Build - Reranker - Shortlist Review
00:18:50 Original Build - Context & Model - Build Prompt
00:19:01 Original Build - Guardrails & Safety - Filter Before LLM
00:19:12 Original Build - Evaluation - Did It Work?
00:19:23 Original Build - Observability - Phoenix Traces
00:19:34 Original Build - Frontend - Button to API
00:19:45 Original Build - Analyst Tools - Proposal Scoring Engine
00:20:30 Original Build - Going to AWS - Eight Console Steps
00:20:41 Original Build - Run End-to-End - Proof Commands
00:20:52 Original Build - Troubleshooting & Maturity - Common Problems
00:21:03 Original Build - Final Recap - ADHD Short Version
00:21:14 Bridge - Now Add The Product Walkthrough
00:21:28 Granular PDF - Product Screens - Login Screen Matches The Real Product
00:21:46 Granular PDF - Product Screens - Document Ingest Screen Is The RAG Starting Point
00:22:06 Granular PDF - Product Screens - Audit Logs Prove Guardrails And Accountability
00:22:24 Granular PDF - Frontend Code Order - Five Frontend Files First
00:22:46 Granular PDF - Frontend Code Order - api.ts Is The Bridge From Browser To Python
00:23:10 Granular PDF - Frontend Code Order - Assistant Click Loop
00:23:36 Granular PDF - Backend Code Order - FastAPI Receives The Click
00:24:02 Granular PDF - Login And Access - Login Maps To Groups, Not Just A UI Button
00:24:30 Granular PDF - AWS Console Screens - AWS Home: The Services You Actually Open
00:24:54 Granular PDF - AWS Console Screens - IAM Identity Center: User Login And Groups
00:25:24 Granular PDF - AWS Console Screens - Bedrock: Enable Claude And Titan
00:25:54 IAM Deep Dive - Authorization Build - Identity Center Is The Login Control Plane
00:26:28 IAM Deep Dive - Authorization Build - Create BidIntel Access Groups
00:27:02 IAM Deep Dive - Authorization Build - Add Users And Assign Groups
00:27:40 IAM Deep Dive - Authorization Build - Create The BidIntel Application
00:28:22 IAM Deep Dive - Authorization Build - Map Identity Attributes Into Claims
00:29:06 IAM Deep Dive - Authorization Build - Assign Groups To The BidIntel App
00:29:44 IAM Deep Dive - Authorization Build - Frontend Login Button To Backend Session
00:30:26 IAM Deep Dive - Authorization Build - Map Groups To BidIntel Roles
00:31:14 IAM Deep Dive - Authorization Build - Authorization Matrix For Pages And APIs
00:31:58 IAM Deep Dive - Authorization Build - Backend Blocks Unauthorized APIs
00:32:40 IAM Deep Dive - Authorization Build - Document Retrieval Filters By Tenant And Access Group
00:33:30 IAM Deep Dive - Authorization Build - Elevated Access Needs Extra Guardrails
00:34:14 IAM Deep Dive - Authorization Build - Auditor Access Is Read Only
00:34:56 IAM Deep Dive - Authorization Build - Manager Access Can Approve But Not Administer
00:35:36 IAM Deep Dive - Authorization Build - Test The IAM Wiring End To End
00:36:20 Granular PDF - AWS Console Screens - IAM Role: Backend Service Permissions
00:36:54 Granular PDF - AWS Console Screens - ECR And ECS: Host The FastAPI Backend
00:37:28 Granular PDF - AWS Console Screens - S3 And CloudFront: Host The Frontend
00:37:58 Granular PDF - AWS Console Screens - Secrets, RDS, And S3 Document Storage
00:38:28 Granular PDF - Final Order - Final Build Order From The PDF
00:38:56 Docs-Backed Click Path - IAM Identity Center - Open The Exact AWS IAM Identity Center Area
00:39:32 Docs-Backed Click Path - IAM Identity Center - Groups Screen: Create The Roles Users Will Carry
00:40:16 Docs-Backed Click Path - IAM Identity Center - Applications Screen: Add BidIntel As A Custom App
00:41:04 Docs-Backed Click Path - IAM Identity Center - Configuration Screen: Paste ACS, Entity, And Metadata Values
00:41:58 Docs-Backed Click Path - IAM Identity Center - Attribute Mapping Screen: Put Claims In The Token
00:42:56 Docs-Backed Click Path - IAM Identity Center - Assignments Screen: Let Groups Use The App
00:43:42 Docs-Backed Click Path - Backend Hosting - ECR Screen: Where The Backend Image Goes
00:44:36 Docs-Backed Click Path - Backend Hosting - Secrets Manager: Where DATABASE_URL And SSO Metadata Go
00:45:28 Docs-Backed Click Path - Backend Hosting - ECS Task Definition: Paste Image URI And Env Vars
00:46:28 Docs-Backed Click Path - Backend Hosting - ECS Service And Load Balancer: Make The API Reachable
00:47:32 Docs-Backed Click Path - Frontend Hosting - S3 Bucket: Upload The Built React Frontend
00:48:30 Docs-Backed Click Path - Frontend Hosting - CloudFront: Create The Public Tutorial/App URL
00:49:34 Docs-Backed Click Path - Bedrock And RAG - Bedrock Model Access: The Console Screen Before Code Works
00:50:26 Docs-Backed Click Path - RAGAS Phoenix Vector DB - Where RAGAS, Phoenix, And pgvector Fit
00:51:24 Educator Build-Along - Bible Gaps Filled - Where You Actually Build: Local First, AWS Later
00:52:26 Educator Build-Along - Bible Gaps Filled - Exact Local Terminal Setup From Empty Folder
00:53:24 Educator Build-Along - Bible Gaps Filled - Architecture Section To File Map
00:54:28 Educator Build-Along - Bible Gaps Filled - Docker Compose Is Local Infrastructure, Not The Cloud
00:55:32 Educator Build-Along - Bible Gaps Filled - Backend Dockerfile: The Wrapper That Moves To AWS
00:56:38 Educator Build-Along - Bible Gaps Filled - Frontend Build: Static Files Go To S3
00:57:36 Educator Build-Along - Bible Gaps Filled - Environment Variables: Local .env Versus AWS Secrets
00:58:40 Educator Build-Along - Bible Gaps Filled - Proof Checklist: Could You Build It From This?
00:59:46 Frontend + AWS - Correct Build Order - Create The Local Project Skeleton
01:00:10 Frontend + AWS - Frontend First - Vite React App And Routes
01:00:34 Frontend + AWS - Frontend First - API Client Is The Switch
01:00:58 Frontend + AWS - Frontend Product Flow - Login Screen And Identity
01:01:22 Frontend + AWS - Frontend Product Flow - Dashboard After Login
01:01:46 Frontend + AWS - Frontend Product Flow - Document Ingest Screen
01:02:10 Frontend + AWS - Backend And Database - FastAPI Doorway
01:02:34 Frontend + AWS - Backend And Database - PostgreSQL And pgvector Tables
01:02:58 Frontend + AWS - RAG Product Flow - Ask BidIntel Screen
01:03:22 Frontend + AWS - RAG Product Flow - Permission Filter Before Bedrock
01:03:46 Frontend + AWS - Proposal Scoring - Score Page With Example Findings
01:04:10 Frontend + AWS - Evaluation And Observability - RAGAS Evaluation Mock Screen
01:04:34 Frontend + AWS - Evaluation And Observability - Phoenix Trace Mock Screen
01:04:58 Frontend + AWS - AWS Build Order - Correct AWS Dependency Order
01:05:22 Frontend + AWS - AWS Build Order - Backend IAM Role Is Not User Role
01:05:46 Frontend + AWS - Bedrock Wiring - Backend Calls Bedrock, Frontend Never Does
01:06:10 Frontend + AWS - Final System Map - What BidIntel Is
