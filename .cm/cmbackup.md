  explain_code_experts:
    if:
      - true
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10 
  invoke_action:
    on:
      - comment_added
    if: 
      - true
    run:
      - action: invoke-github-action@v1
        args:
          owner: yeelali14
          repo: pasha
          workflow: .github/workflows/example.yml
          ref: "yeelali14-patch-13"
          inputs: {{ inputs_var | dump }}
          check_name: "invoke-pasha-action"