# -*- mode: yaml -*-
manifest:
  version: 1.0

on: 
  - commit
  - pr_created
automations:
  send_slack_1:
    if:
      - true
    run:
      - action: send-slack-message@v1
        args:
          message: "Hello world :tada:."
          webhook_url: "{{ slack_webhook }}"

slack_webhook: {{ env.SLACK_DEV_WEBHOOK }}