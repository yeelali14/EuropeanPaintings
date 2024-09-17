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
      - action: add-label@v1
        args:
          label: 'merger'