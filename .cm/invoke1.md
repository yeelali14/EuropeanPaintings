manifest:
  version: 1.0

automations:
  invoke_action:
    if: 
      - true
    run:
      - action: run-github-workflow@v1
        args:
          workflow: .github/workflows/example.yml
          owner: yeelali14
          repo: pasha
          ref: main
          inputs: {{ inputs_var | dump }}
          check_name: "cypress-e2e"
          stop_ongoing_workflow: false

inputs_var: 
  commit_sha: "test"
  pr_number: {{ pr.number }}