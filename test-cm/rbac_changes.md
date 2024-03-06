
# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  rbac_changes:
    if:
      - {{ source.diff.files | match(attr='diff', term='account_scope') | some }}
    run:
      - action: require-reviewers@v1
        args:
          reviewers: ['EladKohavi']
      - action: add-comment@v1
        args:
          comment: |
            You can’t merge RBAC changes without feature owners approval
