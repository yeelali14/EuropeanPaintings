# -*- mode: yaml -*-
manifest:
  version: 1.0
automations:
  label_roadmap:  
    if:  
      - {{ ticketDetails.customfield_10199 == 'Yes' }}
    run:
      - action: add-label@v1
        args:
          label: "🎖️ Roadmap"
          color: FFFECB
jira_params:
  url: {{ env.JIRA_URL }}
  username: {{ env.JIRA_USER }}
  ticket: {{ branch.name | capture(regex=r/[A-Z]+\-\d+/) }}
  token: {{ env.JIRA_API_TOKEN }}

ticketDetails: {{ jira_params.ticket | getJiraTicketDetails(url=jira_params.url, username=jira_params.username, apiToken=jira_params.token, additionalFields=['customfield_10199']) }}
