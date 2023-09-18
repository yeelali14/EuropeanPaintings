# -*- mode: yaml -*-
# This example configuration for provides basic automations to get started with gitStream.
# View the gitStream quickstart for more examples: https://docs.gitstream.cm/quick-start/
manifest:
  version: 1.0
automations:
  estimated_time_to_review: 
    if:
      - true
    run:
      - action: add-label@v1
      # etr is defined in the last section of this example
        args:
          label: "{{ calc.etr }} min review"
          color: {{ 'E94637' if (calc.etr >= 20) else ('FBBD10' if (calc.etr >= 5) else '36A853') }}
  explain_code_experts:
    if:
      - true
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10 
  is_firs_commit:
    if: 
    - {{ repo.contributors | isFirstCommit(branch.author) }}
    run: 
      - action: add-comment@v1
        args:
          comment: Welcome {{branch.author}}!
  print_active_coders_and_rookie:
    if: 
    - true
    run: 
      - action: add-comment@v1
        args:
          comment: |
            active coders: {{ active_coders }}
            rookie: {{is_rookie}}
  check_conflicts:
    if:
      - {{ pr.conflicted_files_count > 0 }}
    run:
      - action: add-label@v1
        args:
          label: pr conflicts 🚩
      - action: add-comment@v1
        args:
          comment: |
            When your code politely asks for couple's therapy: 
            You've got {{ pr.conflicted_files_count }} merge conflicts... 🚩
  check_title:
    if: 
    - {{ pr.title | includes(term='LINBEE-22-76') }}
    run: 
      - action: add-comment@v1
        args:
          comment: title match!

calc:
  etr: {{ branch | estimatedReviewTime }}

active_coders: {{ repo | rankByGitActivity(gt=50, weeks=12) }}
is_rookie: {{ repo | rankByGitActivity(gt=50, weeks=52) | match(term='EladKohavi') | some }}
