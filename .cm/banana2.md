# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  approve_and_merge_audit_fix_prs:
    if:
      - true
    run:
      - action: approve@v1
      - action: add-label@v1
        args:
          label: 'approved-audit-fix'
      - action: merge@v1
