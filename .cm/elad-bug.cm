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
  check_title:
    if: 
      - {{ pr.title | includes(term='LINBEE-') }}
    run: 
      - action: add-comment@v1
        args:
          comment: title match!