# -*- mode: yaml -*-

manifest:
  version: 1.0

config:
  ignore_files:
    - 'src/app/core/services/emtyFile.ts'

automations:
  explain_code_experts:
    if: 
      - true
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10