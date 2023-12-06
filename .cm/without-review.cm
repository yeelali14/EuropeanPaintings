# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  DCF5-pr-reviewed:
    on:
      - merge
    if:
      - {{ pr.approvals | length == 0 }}
    run:
      - action: add-label@v1
        args:
          label: "DCF5-merge-without-approve"
          color: 'F6443B'
      - action: add-comment@v1
        args:
          comment: |
            SOC2 requires code review process on every code change.
            This PR was merged without any review process. 
            _SOC2 ref: CC8.1_

            @linear-b/app-sec