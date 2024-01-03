  # -*- mode: yaml -*-

manifest:
  version: 1.0

automations:  
  complex_review:
    if:
      - true
    run:
      - action: set-required-approvals@v1
        args:
          approvals: 2
  senior_review_2:
    if:
      - true
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [yeelali14, EladKohavi, ShakedZrihen]
  assign_reviewer:
    if:
      - true
    run:
      - action: add-reviewers@v1
        args:
          reviewers: {{ team_members | reject(term=pr.author) | reject(list=pr.reviewers) }}

team_members:
  - EladKohavi
  - ShakedZrihen
  - yeelali14