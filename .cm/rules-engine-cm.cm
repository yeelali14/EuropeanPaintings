# -*- mode: yaml -*-

manifest:
  version: 1.0

config:
  ignore_files:
    - 'package-lock.json'

automations:
  dependencies_update:
    if:
      - {{ source.diff.files | reject(attr='new_file', term='package.json') | matchDiffLines(regex='^[+-].*console\\.log', ignoreWhiteSpaces=true) | every }}
    run:
      - action: approve@v1
      - action: add-label@v1
        args:
          label: 'dependencies-update'
  spec_update:
    if:
      - {{ files | match(term='src/utils/diffParser.js') | some }}    
    run: 
      - action: add-reviewers@v1
        args:
          reviewers: [vim-zz]
      - action: add-label@v1
        args:
          label: spec
  soc_review:
    if:
      - {{ files | match(term='Dockerfile') | some }}    
    run: 
      - action: require-reviewers@v1
        args:
          reviewers: [linear-b/app-sec]
      - action: add-label@v1
        args:
          label: soc_review  
  estimated_time_to_review:
    if:
      - true
    run:
      - action : add-label@v1
        args:
          label: "{{ calc.etr }} min review"
          color: {{ 'E94637' if (calc.etr >= 20) else ('FBBD10' if (calc.etr >= 5) else '36A853') }}

  safe_changes:
    if:
      - {{ is.formatting or is.docs or is.tests }}
    run: 
      - action: add-label@v1
        args:
          label: 'safe-changes'
      - action: approve@v1
  admin_is_author:
    if:
      - {{ pr.author == 'ShakedZrihen' }}
    run: 
      - action: approve@v1
calc:
  etr: {{ branch | estimatedReviewTime }}
is:
  formatting: {{ source.diff.files | isFormattingChange }}
  docs: {{ files | allDocs }}
  tests: {{ files | allTests }}
  blame: {{ repo | rankByGitBlame(gt=10) }}
  
