manifest:
  version: 1.0

on:
  - comment_added

automations:
  check_conflicts:
    if:
      - { pr.conflicted_files_count | length > 0 }
    run:
      - action: add-label@v1
        args:
          label: pr conflicts 🚩
      - action: add-comment@v1
        args:
          comment: |
            When your code politely asks for couple's therapy: 
            You've got {{ pr.conflicted_files_count }} merge conflicts... 🚩
      - action: add-comment@v1
        args:
          comment: |
            You've got {{ pr.conflicted_files_count }} merge conflicts... cue the dramatic soap opera music 🎻

inputs_var: 
  commit_sha: "test"