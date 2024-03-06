# -*- mode: yaml -*-

manifest:
  version: 1.0
automations:
  check_lables: 
    if:
      -  true
    run:
      - action: add-comment@v1
      # etr is defined in the last section of this example
        args:
          comment: |
            this is just a comment
  assign_code_experts:
    if: 
      - true
    run:
      - action: add-reviewers@v1
        args:
          reviewers: {{ repo | codeExperts(gt=10) }}