# -*- mode: yaml -*-

manifest:
  version: 1.0

on:
  - merge

automations:
  approval:
    if:
      - true
    run:
      - action: http-request@v1
        args:
          url: https://webhooks.gitstream-dev.cm/analytics
          method: "POST"
          body: '{"type": "customMetric", "metric_name":"approval", "metric_value": 1, "repo_name": "{{ repo.name }}", "repo_owner": "{{ repo.owner }}", "pr_approval": "{{ pr.approvals | join(",") }}", "provider": "github", "pr_owner": "{{ pr.author }}", "pr_url": "{{ pr.url }}" }'
  missing_jira_ticket:
    if:
      - {{ missing_jira_ticket }}
    run:
      - action: http-request@v1
        args:
          url: https://webhooks.gitstream-dev.cm/analytics
          method: "POST"
          body: '{"type": "customMetric", "metric_name":"missing_jira_ticket", "metric_value": 1, "repo_name": "{{ repo.name }}", "repo_owner": "{{ repo.owner }}", "pr_approval": "{{ pr.approvals | join(",") }}", "provider": "github", "pr_owner": "{{ pr.author }}", "pr_url": "{{ pr.url }}" }'
  tests_added:
    if:
      - {{ number_of_tests > 0 }}
    run:
      - action: http-request@v1
        args:
          url: https://webhooks.gitstream-dev.cm/analytics
          method: "POST"
          body: '{"type": "customMetric","jira_ticket":"{{ jira_ticket }}", "metric_name":"tests.added", "metric_value": {{ number_of_tests }}, "repo_name": "{{ repo.name }}", "repo_owner": "{{ repo.owner }}", "pr_approval": "{{ pr.approvals | join(",") }}", "provider": "github", "pr_owner": "{{ pr.author }}", "pr_url": "{{ pr.url }}" }'

number_of_tests: {{ source | countTests }}
jira_ticket: {{ branch.name | capture(regex=r/[A-Z]+\-\d+/) }}
missing_jira_ticket: {{ (branch.name | capture(regex=r/[A-Z]+\-\d+/) | length == 0 ) or (pr.title | capture(regex=r/[A-Z]+\-\d+/) | length == 0 ) }}
