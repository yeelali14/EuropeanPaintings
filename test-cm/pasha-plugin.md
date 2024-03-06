# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  test:
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: {{ "aaa" | pasha }}
  test_map:
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: {{ "aaa" | pasha | map(attr='my_key') | dump | safe }}