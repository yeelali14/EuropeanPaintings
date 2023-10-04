# -*- mode: yaml -*-

manifest:
  version: 1.0
on:
  - label_added
automations:
  safe_changes:
    if:
      - {{ is.formatting or is.docs or is.tests or is.image }}
    run: 
      - action: add-label@v1
        args:
          label: 'safe-change'
      - action: add-comment@v1
        args:
          comment: |
            This PR is considered a safe change and has been automatically approved.
  check_lables_koko__5: 
    if:
      -  true
    run:
      - action: add-comment@v1
      # etr is defined in the last section of this example
        args:
          comment: |
            lables: {{ pr.labels | dump | safe }}


is:
  formatting: {{ source.diff.files | isFormattingChange }}
  docs: {{ files | allDocs }}
  tests: {{ files | allTests }}
  image: {{ files | allImages }}