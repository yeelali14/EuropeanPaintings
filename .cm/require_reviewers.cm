# -*- mode: yaml -*-
manifest:
  version: 1.0

automations:
  time_based_reviewer:
    if:
      - {{ reviewersBasedOnDayTime | length > 0 }}
    run: 
      - action: require-reviewers@v1
        args:
          reviewers: {{ reviewersBasedOnDayTime }}
      - action: add-comment@v1
        args:
          comment: |
            You can’t merge {{ repo.name }} on this time without leader approval

reviewersBasedOnDayTime: {{ repo | timeBasedReviewers }}
