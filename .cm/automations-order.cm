# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  explain_code_experts:
    if:
      - true
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10 
  double_review:
    if:
      - true
    run:
      - action: set-required-approvals@v1
        args:
          approvals: 2
      - action: add-comment@v1
        args:
          comment: |
            This PR affects one or more sensitive files and requires review from the security team.
  double_review_2:
    if:
      - {{ files | match(regex=r/^agent\//) | some }}
    run:
      - action: set-required-approvals@v1
        args:
          approvals: 2
      - action: require-reviewers@v1
        args:
          reviewers: [EladKohavi]
  catch_deprecated:
    if:
      - true
    run:
      - action: add-label@v1
        args:
          label: "DCF18-no-vulnerabilities-scanning"
          color: 'F6443B'
      - action: request-changes@v1
        args:
          comment: |
            You have used deprecated API `oldFetch`, use `newFetch` instead.
  senior_review:
    if:
      - true
    run:
      - action: require-reviewers@v1
        args:
          reviewers: [EladKohavi]
auto_merge_label:
    if:
      - {{ pr.labels | match(list=['auto-merge']) | some }}
    run:
      - action: merge@v1
        args:
          wait_for_all_checks: true
      - action: add-comment@v1
        args:
          comment: |
            The PR will be automatically merged by Gitstream after all requirements are done.
