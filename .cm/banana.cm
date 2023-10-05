# -*- mode: yaml -*-

manifest:
  version: 1.0

on:
  - label_added

automations:
  # Add a label that indicates how many minutes it will take to review the PR.
  check_lables: 
    if:
      -  true
    run:
      - action: add-comment@v1
      # etr is defined in the last section of this example
        args:
          comment: |
            triggers
  check_lables_2: 
    if:
      -  true
    run:
      - action: add-comment@v1
      # etr is defined in the last section of this example
        args:
          comment: |
            triggers 2