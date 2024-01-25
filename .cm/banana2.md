manifest:
  version: 1.0

automations:
  check_label_type:
    if:
      - {{ pr.labels | length > 1 }}
    run:
      - action: add-comment@v1
        args:
          comment: |
            this is comment without triggers

          