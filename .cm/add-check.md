manifest:
  version: 1.0

automations:
  add_check:
    if:
      - true
    run:
      - action: add-github-check@v1
        args:
          check_name: blabla
          conclusion: cancelled
  check_label_type_1:
    on:
      - comment_added 
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
            this is comment with triggers
  
