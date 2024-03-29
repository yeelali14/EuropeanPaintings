manifest:
    version: 1.0

automations:
  invoke_action:
    on:
      - comment_added
    if: 
      - {{ not isAllResourceAllocation }}
      - {{ pr.comments | map(attr='content') | match(regex=r/^\/e2e/) | last }}
    run:
      - action: run-github-workflow@v1
        args:
          workflow: .github/workflows/example.yml
          owner: yeelali14
          repo: pasha
          ref: main
          check_name: "cypress-e2e"
          stop_ongoing_workflow: false
  ra_changes:
    on:
      - commit
      - pr_created
    if:
      - {{ isAllResourceAllocation }}
    run:
      - action: add-github-check@v1
        args:
          check_name: "cypress-e2e"
          conclusion: skipped

isAllResourceAllocation: {{ files | match(regex=r/^src\/ResourceAllocationOverview\//) | every }}