
automations:
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
