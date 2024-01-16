# -*- mode: yaml -*-
# This example configuration for provides basic automations to get started with gitStream.
# View the gitStream quickstart for more examples: https://docs.gitstream.cm/quick-start/

manifest:
  version: 1.0

automations:
  test:
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: {{ "aaa" | pasha }}

  print_params:
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
            {{ jira_params | dump | safe }}



jira_params:
  url: "pavelvaks.atlassian.net"
  username: "pavel_vaks"
  token: "env.JIRA_TOKEN "