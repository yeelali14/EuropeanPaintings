manifest:
    version: 1.0

on:
  - comment_added

automations:
  core_changes:
    if:
      - {{ files | match(regex=r/^src\/app\/core\//) | every }}
      kfjnksdjfhi
      sifjoidjf
      ijdfoisdj
      oijfsodi
    run:

      - action: add-github-check@v1
        args:
          check_name: "cypress-e2e"
          conclusion: skipped
