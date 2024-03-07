# -*- mode: yaml -*-
manifest:
  version: 1.0

automations:
  merger:
    on:
      - merge
    if:
      - true
    run:
      - action: http-request@v1
        args:
          url: {{ env.SLACK_LINEAR_BEEHIVE_WEBHOOK }}
          method: "POST"
          body: '{"text": "*{{ pr.author }}* merged to *{{ repo.name }}*: {{ pr.url }} - {{ pr.source }} :merged:"}'
