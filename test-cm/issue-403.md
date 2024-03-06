  # -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  complex_review:
    if:
      - {{ calc.etr >= 5 }}
    run:
      - action: set-required-approvals@v1
        args:
          approvals: {{ 3 if (calc.etr >= 10) else 2 }}

  {% for item in teams %}
  assign_reviewer_files_{{ loop.index }}:
    if:
      - {{ files | match(list=item.files) | some }}
      - {{ item.team_members | reject(term=pr.author) | reject(list=pr.reviewers) | length >= 1 }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: {{ item.team_members | reject(term=pr.author) | reject(list=pr.reviewers) }}
  {% endfor %}

  {% for item in teams %}
  assign_team_reviewer_{{ loop.index }}:
    if:
      - {{ item.team_members | includes(term=pr.author) }}
      - {{ item.team_members | reject(term=pr.author) | reject(list=pr.reviewers) | length >= 1 }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: {{ item.team_members | reject(term=pr.author) | reject(list=pr.reviewers) }}
  {% endfor %}

calc:
  etr: {{ branch | estimatedReviewTime }}

teams:
  - team_name: "team1"
    team_members:
      - "EladKohavi"
      - "ShakedZrihen"
      - "yeelali14"
    files:
      - "src/app/core/services/http.service.ts"
      - "src/app/core/services/artworks.service.ts"
