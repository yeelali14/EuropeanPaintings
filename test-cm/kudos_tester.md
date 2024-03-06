# -*- mode: yaml -*-
manifest:
  version: 1.0

automations:
  tester:
    on:
      - merge
    if:
      - {{ number_of_tests > 0 }}
    run:
      - action: http-request@v1
        args:
          url: {{ env.SLACK_TEAM_FLARE_WEBHOOK }}
          method: "POST"
          body: '{"text": ":tada: kudos *{{ pr.author }}* for adding *{{ number_of_tests }}* new tests to *{{ repo.name }}*: {{ pr.url }} :tada:"}'
  
number_of_tests: {{ source | countTests }}
jira_ticket: {{ branch.name | capture(regex=r/[A-Z]+\-\d+/) }}
