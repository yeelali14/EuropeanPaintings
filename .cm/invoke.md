manifest:
  version: 1.0

on:
  - comment_added

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
          check_name: "invoke-pasha-action"
          stop_ongoing_workflow: false
  add_label:
    if:
      - true
    run:
      - action: add-label@v1
        args:
          label: dispatch check

inputs_var: 
  commit_sha: "test"