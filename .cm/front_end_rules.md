# -*- mode: yaml -*-
manifest:
  version: 1.0

automations:
  front_end_reviewers:
    if:
      - {{ repo.name | includes(term="mfa") }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: ['EladKohavi']
