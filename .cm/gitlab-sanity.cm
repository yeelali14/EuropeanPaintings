# -*- mode: yaml -*-

manifest:
  version: 1.0


automations:
  test_approve:
    if:
      - {{ pr.labels | match(term='auto-approve') | some }}
    run:
      - action: approve@v1
  test_request_changes:
    if:
      - true
    run:
      - action: request-changes@v1
        args:
          comment: |
            You have used deprecated API `oldFetch`, use `newFetch` instead.
  test_set_required_approvals:
    if:
      - true
    run:
      - action: set-required-approvals@v1
        args:
          approvals: 2
  test_add_label:
    if:
      - true
    run:
      - action: add-label@v1
        args:
          label: api-change
  test_add_labels:
    if:
      - true
    run:
      - action: add-label@v1
        args:
          labels: [test-labels, test-labels2]
  test_add_comment:
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
            this is a test for add-comment
  code_experts:
    if:
      - true
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10
  test_add_reviewers:
    if:
      - true
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [elad.kohavi, misha.kav]
  test_merge:
    if:
      - true
    run:
      - action: merge@v1
  test_require_reviewers:
    if:
      - true
    run:
      - action: require-reviewers@v1
        args:
          reviewers: [elad.kohavi]
  test_close:
    if:
      - {{ pr.labels | match(term='auto-approve') | some }}
    run:
      - action: close@v1
  send_slack:
    if:
      - true
    run:
      - action: send-slack-message@v1
        args:
          message: "Hello world :tada:."
          webhook_url: "{{ slack_webhook }}"

slack_webhook: {{ env.SLACK_DEV_WEBHOOK }}
