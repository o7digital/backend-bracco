insert into public.departments (id, code, name, description, executive_lane, sort_order)
values
  ('10000000-0000-0000-0000-000000000001', 'commercial', 'Commercial', 'Owns market need, launch timing, and field alignment.', false, 1),
  ('10000000-0000-0000-0000-000000000002', 'procurement', 'Procurement', 'Qualifies suppliers, pricing terms, and sourcing readiness.', false, 2),
  ('10000000-0000-0000-0000-000000000003', 'finance', 'Finance', 'Validates budget controls, accruals, and payment exposure.', false, 3),
  ('10000000-0000-0000-0000-000000000004', 'legal', 'Legal', 'Reviews contracts, data governance, and market-specific obligations.', false, 4),
  ('10000000-0000-0000-0000-000000000005', 'executive_management', 'Executive Management', 'Approves strategic exceptions and threshold-crossing decisions.', true, 5)
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  executive_lane = excluded.executive_lane,
  sort_order = excluded.sort_order;

insert into public.countries (id, code, name, region, default_language, supported_languages, timezone, compliance_focus)
values
  ('20000000-0000-0000-0000-000000000001', 'IT', 'Italy', 'Southern Europe', 'Italian', '{"Italian","English"}', 'Europe/Rome', 'Healthcare event sponsorship review'),
  ('20000000-0000-0000-0000-000000000002', 'ES', 'Spain', 'Iberia', 'Spanish', '{"Spanish","English"}', 'Europe/Madrid', 'Distributor pricing controls'),
  ('20000000-0000-0000-0000-000000000003', 'MX', 'Mexico', 'Latin America', 'Spanish', '{"Spanish","English"}', 'America/Mexico_City', 'Vendor onboarding and tax packet checks'),
  ('20000000-0000-0000-0000-000000000004', 'BR', 'Brazil', 'Latin America', 'Portuguese', '{"Portuguese","English"}', 'America/Sao_Paulo', 'Medical education event contracting'),
  ('20000000-0000-0000-0000-000000000005', 'AE', 'United Arab Emirates', 'Middle East', 'English', '{"English","Arabic"}', 'Asia/Dubai', 'Arabic document traceability and executive exceptions')
on conflict (code) do update
set
  name = excluded.name,
  region = excluded.region,
  default_language = excluded.default_language,
  supported_languages = excluded.supported_languages,
  timezone = excluded.timezone,
  compliance_focus = excluded.compliance_focus;

insert into public.profiles (id, email, full_name, title, locale, department_id, home_country_id, region, is_executive)
values
  ('30000000-0000-0000-0000-000000000001', 'elena.rossi@braccoprocesshub.example', 'Elena Rossi', 'Commercial Operations Lead', 'it', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Southern Europe', false),
  ('30000000-0000-0000-0000-000000000002', 'sofia.ortega@braccoprocesshub.example', 'Sofia Ortega', 'Procurement Programme Manager', 'es-MX', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', 'Latin America', false),
  ('30000000-0000-0000-0000-000000000003', 'martin.keller@braccoprocesshub.example', 'Martin Keller', 'Regional Finance Controller', 'es-ES', '10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'Iberia', false),
  ('30000000-0000-0000-0000-000000000004', 'paula.almeida@braccoprocesshub.example', 'Paula Almeida', 'Legal Operations Counsel', 'pt-BR', '10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 'Latin America', false),
  ('30000000-0000-0000-0000-000000000005', 'nadia.haddad@braccoprocesshub.example', 'Nadia Haddad', 'Executive Portfolio Director', 'en-AE', '10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000005', 'Middle East', true)
on conflict (email) do update
set
  full_name = excluded.full_name,
  title = excluded.title,
  locale = excluded.locale,
  department_id = excluded.department_id,
  home_country_id = excluded.home_country_id,
  region = excluded.region,
  is_executive = excluded.is_executive,
  updated_at = now();

insert into public.workflows (
  id,
  workflow_code,
  title,
  summary,
  requestor_profile_id,
  country_id,
  owning_department_id,
  language_code,
  priority,
  status,
  current_step_order,
  submitted_at,
  due_at
)
values
  (
    '40000000-0000-0000-0000-000000000001',
    'BPH-WF-001',
    'Imaging vendor onboarding',
    'Approve a new vendor pack for imaging site support with synchronized commercial, legal, and finance checks.',
    '30000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000002',
    'it',
    'high',
    'in_review',
    2,
    '2026-03-10T09:00:00Z',
    '2026-03-18T18:00:00Z'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    'BPH-WF-002',
    'Regional event contracting',
    'Coordinate a multi-market education event package with Spanish and Portuguese documentation variants.',
    '30000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000004',
    'pt',
    'critical',
    'awaiting_approval',
    4,
    '2026-03-09T08:00:00Z',
    '2026-03-15T18:00:00Z'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    'BPH-WF-003',
    'Distributor rebate refresh',
    'Refresh a commercial rebate framework with new controls for the Mexico affiliate and shared finance review.',
    '30000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'es',
    'standard',
    'changes_requested',
    3,
    '2026-03-11T10:00:00Z',
    '2026-03-22T18:00:00Z'
  )
on conflict (workflow_code) do update
set
  title = excluded.title,
  summary = excluded.summary,
  requestor_profile_id = excluded.requestor_profile_id,
  country_id = excluded.country_id,
  owning_department_id = excluded.owning_department_id,
  language_code = excluded.language_code,
  priority = excluded.priority,
  status = excluded.status,
  current_step_order = excluded.current_step_order,
  submitted_at = excluded.submitted_at,
  due_at = excluded.due_at,
  updated_at = now();

insert into public.workflow_steps (
  id,
  workflow_id,
  department_id,
  step_order,
  step_name,
  approver_role,
  instructions,
  sla_hours,
  status,
  is_required
)
values
  ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 1, 'Business need confirmation', 'Commercial Operations Lead', 'Confirm market need and demand assumptions.', 24, 'approved', true),
  ('50000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 2, 'Vendor due diligence', 'Procurement Programme Manager', 'Validate vendor documents and sourcing terms.', 36, 'in_review', true),
  ('50000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 3, 'Budget line validation', 'Regional Finance Controller', 'Check available budget and payment timing.', 24, 'pending', true),
  ('50000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 4, 'Contract clause review', 'Legal Operations Counsel', 'Review liability and data handling language.', 48, 'pending', true),
  ('50000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 5, 'Executive threshold sign-off', 'Executive Portfolio Director', 'Approve threshold exception if required.', 72, 'pending', true),
  ('50000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 1, 'Programme scope lock', 'Commercial Operations Lead', 'Freeze event scope and market attendance.', 24, 'approved', true),
  ('50000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 2, 'Venue and vendor terms', 'Procurement Programme Manager', 'Validate event suppliers and pricing conditions.', 36, 'approved', true),
  ('50000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 3, 'Spend release approval', 'Regional Finance Controller', 'Release committed budget for event execution.', 24, 'in_review', true),
  ('50000000-0000-0000-0000-000000000009', '40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000004', 4, 'Speaker contract package', 'Legal Operations Counsel', 'Check localized clauses and annexes.', 48, 'at_risk', true),
  ('50000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000005', 5, 'Executive final release', 'Executive Portfolio Director', 'Approve final release before invitation dispatch.', 72, 'pending', true),
  ('50000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 1, 'Rebate scenario update', 'Commercial Operations Lead', 'Refresh commercial assumptions and target volumes.', 24, 'approved', true),
  ('50000000-0000-0000-0000-000000000012', '40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 2, 'Third-party support check', 'Procurement Programme Manager', 'Confirm supplier and broker support requirements.', 36, 'approved', true),
  ('50000000-0000-0000-0000-000000000013', '40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 3, 'Accrual alignment', 'Regional Finance Controller', 'Reconcile rebate accrual and exposure assumptions.', 24, 'at_risk', true),
  ('50000000-0000-0000-0000-000000000014', '40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', 4, 'Commercial terms amendments', 'Legal Operations Counsel', 'Revise commercial term wording for new rebate controls.', 48, 'pending', true),
  ('50000000-0000-0000-0000-000000000015', '40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000005', 5, 'Strategic exception decision', 'Executive Portfolio Director', 'Review strategic exception threshold.', 72, 'pending', true)
on conflict (id) do update
set
  department_id = excluded.department_id,
  step_order = excluded.step_order,
  step_name = excluded.step_name,
  approver_role = excluded.approver_role,
  instructions = excluded.instructions,
  sla_hours = excluded.sla_hours,
  status = excluded.status,
  is_required = excluded.is_required,
  updated_at = now();

insert into public.approvals (
  id,
  workflow_id,
  workflow_step_id,
  approver_profile_id,
  status,
  decision_note,
  due_at,
  decided_at
)
values
  ('60000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'approved', 'Market need confirmed for vendor onboarding.', '2026-03-10T18:00:00Z', '2026-03-10T11:00:00Z'),
  ('60000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'pending', null, '2026-03-12T16:30:00Z', null),
  ('60000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000001', 'approved', 'Scope aligned across participating markets.', '2026-03-09T15:00:00Z', '2026-03-09T10:00:00Z'),
  ('60000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000002', 'approved', 'Supplier terms accepted.', '2026-03-10T18:00:00Z', '2026-03-10T14:00:00Z'),
  ('60000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000003', 'pending', null, '2026-03-12T18:00:00Z', null),
  ('60000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000004', 'changes_requested', 'Localized liability wording needs adjustment.', '2026-03-13T17:00:00Z', null),
  ('60000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000003', '50000000-0000-0000-0000-000000000011', '30000000-0000-0000-0000-000000000001', 'approved', 'Scenario updated with revised commercial volumes.', '2026-03-11T14:00:00Z', '2026-03-11T09:00:00Z'),
  ('60000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000003', '50000000-0000-0000-0000-000000000013', '30000000-0000-0000-0000-000000000003', 'changes_requested', 'Need refreshed accrual scenario before finance sign-off.', '2026-03-13T18:00:00Z', null)
on conflict (id) do update
set
  workflow_id = excluded.workflow_id,
  workflow_step_id = excluded.workflow_step_id,
  approver_profile_id = excluded.approver_profile_id,
  status = excluded.status,
  decision_note = excluded.decision_note,
  due_at = excluded.due_at,
  decided_at = excluded.decided_at;

insert into public.documents (
  id,
  workflow_id,
  uploaded_by_profile_id,
  document_name,
  document_type,
  template_code,
  storage_bucket,
  storage_path,
  version,
  language_code,
  status
)
values
  ('70000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'vendor_due_diligence_packet_it.pdf', 'qualification_packet', 'PROC-QUAL-07', 'workflow-documents', 'demo/it/vendor_due_diligence_packet_it.pdf', 'v3', 'it', 'ready'),
  ('70000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'commercial_need_statement_it.pdf', 'commercial_brief', null, 'workflow-documents', 'demo/it/commercial_need_statement_it.pdf', 'v1', 'it', 'approved'),
  ('70000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000004', 'event_contract_pack_pt.pdf', 'contract_pack', 'LEGAL-EVENT-14', 'workflow-documents', 'demo/br/event_contract_pack_pt.pdf', 'v2', 'pt', 'draft'),
  ('70000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000003', 'budget_release_memo_br.pdf', 'budget_memo', 'FIN-CAPEX-03', 'workflow-documents', 'demo/br/budget_release_memo_br.pdf', 'v1', 'pt', 'ready'),
  ('70000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001', 'rebate_exception_summary_es.pdf', 'executive_summary', 'EXEC-DECISION-02', 'workflow-documents', 'demo/mx/rebate_exception_summary_es.pdf', 'v2', 'es', 'draft')
on conflict (id) do update
set
  workflow_id = excluded.workflow_id,
  uploaded_by_profile_id = excluded.uploaded_by_profile_id,
  document_name = excluded.document_name,
  document_type = excluded.document_type,
  template_code = excluded.template_code,
  storage_bucket = excluded.storage_bucket,
  storage_path = excluded.storage_path,
  version = excluded.version,
  language_code = excluded.language_code,
  status = excluded.status,
  updated_at = now();

insert into public.document_templates (
  id,
  template_code,
  name,
  description,
  department_id,
  country_id,
  language_code,
  automation_level,
  storage_path,
  version
)
values
  ('80000000-0000-0000-0000-000000000001', 'PROC-QUAL-07', 'Supplier qualification packet', 'Reusable onboarding packet for vendor qualification and banking checks.', '10000000-0000-0000-0000-000000000002', null, 'en', 'ready_for_handoff', 'templates/procurement/supplier_qualification_packet.docx', 'v4'),
  ('80000000-0000-0000-0000-000000000002', 'LEGAL-EVENT-14', 'Event contracting pack', 'Bilingual contract pack for market events and speaker engagements.', '10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 'pt', 'semi_automatic', 'templates/legal/event_contract_pack.docx', 'v2'),
  ('80000000-0000-0000-0000-000000000003', 'FIN-CAPEX-03', 'Budget authorization memo', 'Approval memo for regional spend release and budget traceability.', '10000000-0000-0000-0000-000000000003', null, 'en', 'guided', 'templates/finance/budget_authorization_memo.docx', 'v3'),
  ('80000000-0000-0000-0000-000000000004', 'EXEC-DECISION-02', 'Executive exception brief', 'Leadership brief for strategic exceptions and steering committee decisions.', '10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000005', 'en', 'ready_for_handoff', 'templates/executive/exception_brief.docx', 'v1')
on conflict (template_code) do update
set
  name = excluded.name,
  description = excluded.description,
  department_id = excluded.department_id,
  country_id = excluded.country_id,
  language_code = excluded.language_code,
  automation_level = excluded.automation_level,
  storage_path = excluded.storage_path,
  version = excluded.version;

insert into public.ai_insights (
  id,
  workflow_id,
  country_id,
  insight_type,
  sentiment_label,
  confidence_score,
  summary,
  recommended_action
)
values
  ('90000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'narrative_sentiment', 'positive', 88, 'Supporting notes from procurement show clear ownership and low ambiguity.', 'Keep the approval window unchanged and reuse the same packet structure.'),
  ('90000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004', 'contract_friction', 'attention', 61, 'Legal comments show repeated concern around liability wording in translated annexes.', 'Escalate the Portuguese contract annex for clause harmonization before steering review.'),
  ('90000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 'budget_confidence', 'attention', 58, 'Finance commentary shifted from confident to cautious after the latest rebate assumptions.', 'Re-run the accrual scenario with commercial before requesting executive approval.'),
  ('90000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005', 'translation_flow', 'neutral', 74, 'Teams are aligned on translation timelines, but document routing still depends on one reviewer.', 'Add a secondary legal reviewer for Arabic packets in the executive exception lane.')
on conflict (id) do update
set
  workflow_id = excluded.workflow_id,
  country_id = excluded.country_id,
  insight_type = excluded.insight_type,
  sentiment_label = excluded.sentiment_label,
  confidence_score = excluded.confidence_score,
  summary = excluded.summary,
  recommended_action = excluded.recommended_action;

insert into public.notifications (
  id,
  profile_id,
  workflow_id,
  channel,
  status,
  title,
  message,
  scheduled_for,
  sent_at
)
values
  ('91000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000002', 'in_app', 'queued', 'Finance review due today', 'Two LATAM workflows need finance confirmation before the regional close window.', '2026-03-12T15:00:00Z', null),
  ('91000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000002', 'email', 'delivered', 'Executive brief generated', 'The current steering pack was assembled with the latest legal and AI sentiment notes.', '2026-03-12T09:00:00Z', '2026-03-12T09:00:00Z'),
  ('91000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000002', 'slack', 'action_required', 'Translation fallback requested', 'Arabic document backup reviewer is required for the next UAE exception workflow.', '2026-03-13T08:30:00Z', null)
on conflict (id) do update
set
  profile_id = excluded.profile_id,
  workflow_id = excluded.workflow_id,
  channel = excluded.channel,
  status = excluded.status,
  title = excluded.title,
  message = excluded.message,
  scheduled_for = excluded.scheduled_for,
  sent_at = excluded.sent_at;
