# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  {% for item in reports %}
  label_orca_{{ item.name }}:
    if:
      - true
    run:
      - action: add-label@v1
        args:
          label: '{{ item.icon }} Orca:  {{ item.name }}'
          color: {{ colors.red }}
  {% endfor %}

orca: {{ pr | extractOrcaFindings }}

reports:
  - name: vulnerabilities
    count: {{ orca.vulnerabilities.count }}
    icon: ☣️
  - name: infrastructure_as_code
    count: {{ orca.infrastructure_as_code.count }}
    icon: 🛡️
  - name: secrets
    count: {{ orca.secrets.count }}
    icon: 🔓


colors:
  red: 'b60205'
  orange: 'd93f0b'
  yellow: 'fbca04'