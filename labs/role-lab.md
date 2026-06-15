# Lab: IAM Role And Authorization

Goal: prove Identity Center claims become backend permissions.

Do:

1. Create groups in IAM Identity Center: Proposal Writer, Manager, Auditor, Elevated Admin.
2. Map claims: email, groups, tenant_id, access_level.
3. Assign groups to the BidIntel app.
4. Sign in as each role or use mock claims locally.
5. Call `GET /auth/me`.
6. Try allowed and blocked actions.

Verify:

- Auditor can read audit logs.
- Auditor cannot upload documents.
- Manager can approve/review.
- Proposal Writer can ask RAG and score.
- Elevated Admin writes an audit event for privileged action.
