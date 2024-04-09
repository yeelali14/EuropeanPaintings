# -*- mode: yaml -*-

manifest:
  version: 1.0

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
      - action: add-label@v1
        args:
          label: "🎖️ Roadmap"
          color: FFFECB
      - action: add-label@v1
        args:
          label: "test"
          color: 4287f5
