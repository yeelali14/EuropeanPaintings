# -*- mode: yaml -*-
# This example configuration for provides basic automations to get started with gitStream.
# View the gitStream quickstart for more examples: https://docs.gitstream.cm/quick-start/
manifest:
  version: 1.0
automations:
  explain_code_experts:
    if:
      - true
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10 
  print_active_coders_and_rookie:
    if: 
      - true
    run: 
      - action: add-comment@v1
        args:
          comment: |
            active coders: {{ active_coders }}
            rookie: {{is_rookie}}
  is_firs_commit:
    if: 
      - {{ repo.contributors | isFirstCommit(branch.author) }}
    run: 
      - action: add-comment@v1
        args:
          comment: Welcome {{branch.author_name}}!
  
active_coders: {{ repo | rankByGitActivity(gt=10, weeks=52) }}
is_rookie: {{ repo | rankByGitActivity(gt=50, weeks=52) | match(term='EladKohavi') | some }}