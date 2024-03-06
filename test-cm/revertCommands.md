# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  request_screenshot_1:
    if:
      - true
      - {{ files | map(attr='new_file') | length > 2 }}
    run:
      - action: add-label@v1
        args:
          label: 'no-screenshot'
          color: '#FF000A'
      - action: request-changes@v1
        args:
          comment: |
            Be a life saver 🛟 by adding a screenshot of the changes you made.
      - action: add-comment@v1
        args:
          comment: |
            comment 1
  small_change:
    if:
      - {{ files | allDocs }}
    run:
      - action: merge@v1
        args:
          wait_for_all_checks: true
