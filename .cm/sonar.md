manifest:
  version: 1.0

automations:
  sonar_parser:
    if: 
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
            {{ sonar | dump }}

sonar: {{ pr | extractSonarFindings }}