# -*- mode: yaml -*-
# This example configuration for provides basic automations to get started with gitStream.
# View the gitStream quickstart for more examples: https://docs.gitstream.cm/quick-start/
manifest:
  version: 1.0
automations:
  # Add a label that indicates how many minutes it will take to review the PR.
  estimated_time_to_review: 
    if:
      - true
      - action: add-label@v1
      # etr is defined in the last section of this example
        args:
          label: "{{ calc.etr }} min review"
          color: {{ 'E94637' if (calc.etr >= 20) else ('FBBD10' if (calc.etr >= 5) else '36A853') }}
  # Post a comment that lists the best experts for the files that were modified.
  code_experts:
    if:
      - true
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10
  code_experts_reviewers:
    if: 
      - true
    run:
      - action: add-reviewers@v1
        args:
          reviewers: {{ repo | codeExperts(gt=10) }}
      
  gitstream-challenge-16-3-gold:
    # PR have at least 1 test, 5 or less files and branch includes Jira-Ticket prefix
    if:
      - {{ files | match(regex=r/(test|spec)/) | some }}
      - {{ files | length <= 5 }}
      - {{ branch.name | includes(regex=r/[A-Z]{2,}-\d+.*/) }} 
    run:
      - action: add-label@v1
        args:
          label: 'gitStream-gold 🥇'
          color: '#F4EBD0'
  active_coders:
    if: 
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
            {{ repo | rankByGitActivity(gt=50, weeks=12) }}
  catch_deprecated:
    if:
      - {{ source.diff.files | matchDiffLines(regex=r/.*oldFetch.*/) | some }}
    run:
      - action: request-changes@v1
        args:
          comment: |
            You have used deprecated API `oldFetch`, use `newFetch` instead.
  dependencies_update:
    if:
      - {{ files | match(list=['package.json', 'package-lock.json']) | every }}    
    run:
      - action: approve@v1

# The next function calculates the estimated time to review and makes it available in the automation above.
calc:
  etr: {{ branch | estimatedReviewTime }}
