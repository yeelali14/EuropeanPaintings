# -*- mode: yaml -*-

# +----------------------------------------------------------------------------+
# | WARNING: This file controls repo automations, use caution when modifying   |
# +----------------------------------------------------------------------------+
# | This file contains one or more /:\ gitStream automations:                  |
# | https:// docs.gitstream.cm                                                 |
# |                                                                            |
# | gitStream uses YAML syntax with nunjucks templating via Jinja 2.           |
# |                                                                            |
# | Automations follow an "if this, then that" execution format.               |
# | More info here: https://docs.gitstream.cm/how-it-works/                    |
# |                                                                            |
# +----------------------------------------------------------------------------+

# /:\ gitStream Reference Docs: 
#    Context Variables: https://docs.gitstream.cm/context-variables/
#    Filter Functions: https://docs.gitstream.cm/filter-functions/
#    Automation Actions: https://docs.gitstream.cm/automation-actions/

config:
  admin:
    users: [MishaKav]

  ignore_files:
    - '*.txt'
    - '.vscode'
    - 'constants.py'
    - 'constants.ts'
    - 'constants.js'
    - 'ui/src/**/*Model.d.ts'
    - 'agent/aws/java/src/main/java/cn/events/*'
    - 'base/java/cn/events/*'
    - '*_pb2.pyi'
    - '*.pb.go'

# https://docs.gitstream.cm/execution-model/#explicit-triggers
on:
  - pr_created
  - commit

automations:
  {% for item in deprecated %}
  # Automation names should be unique, therefore the iteration number postfix
  catch_deprecated_components_{{ loop.index }}:
    if:
      - {{ source.diff.files | reject(attr='new_file', regex=r/\.json$/) | matchDiffLines(regex=item.regex) | some }}
    run:
      - action: add-label@v1
        args:
          label: 'deprecated-component'
      - action: request-changes@v1
        args:
          comment: |
            Please don't use hardcoded values such `{{ item.regex }}`, use `EventType/RuleSource` from `constants.py/constants.ts[js]`
  {% endfor %}

  formatting_safe_changes:
    # The `if` key has a list of conditions, each condition is specified as a Jinja expression
    # in a double curly braces. Expressions are evaluated by gitStream on a PR when triggered.
    if:
      # Given the PR code changes, check that only formatting changes were made 
      - {{ source.diff.files | isFormattingChange }}
    # `run` key has a list of actions, which are executed one by one whenever the automation 
    # conditions are met. 
    run: 
      # When the changes are validated as formatting only, you can help to speed up the review 
      # by adding a label that marks it accordingly.
      - action: add-labels@v1
        args:
          labels: ['formatting']
      - action: approve@v1

  docs_safe_changes:
    if:
      # Given the PR files changes, check that only documents were changed.
      - {{ files | allDocs }}
    run: 
      - action: add-labels@v1
        args:
          labels: ['documentation']
      - action: approve@v1
  
  tests_safe_changes:
    if:
      # Given the PR files changes, check that only tests were changed. The allTests filter checks for 
      # the substring `test` or `spec` in the file path or file name.
      - {{ files | match(regex=r/[^a-zA-Z0-9](spec|test|tests)[^a-zA-Z0-9]/) | every }}
      - {{ files | match(regex=r/^[^.]/) | every }}
      # - {{ files | allTests }}
      # - {{ files | match(list=wrong_tests_files) | nope }}
    run: 
      - action: add-labels@v1
        args:
          labels: ['tests']
      - action: approve@v1

  images_safe_changes:
    if:
      # Check for every changed file if is a document file. The allImages filter checks for
      # common file extensions used for graphics.
      - {{ files | allImages }}
    run:
      - action: add-labels@v1
        args:
          labels: ['images']
      - action: approve@v1

  mark_long_review:
    if:
      - {{ branch | estimatedReviewTime >= 20 }}
      - {{ (branch.diff.size >= 800) or (files | length >= 10 ) }}
    run:
      - action: add-labels@v1
        args:
          labels: ['large-pr']
  
  double_review:
    if:
      - {{ files | reject(list=exclude_files_from_double_review) | match(regex=r/^agent\//) | some }}
    run:
      - action: set-required-approvals@v1
        args:
          approvals: 2

  agent_reviewers:
    if:
      - {{ files | match(regex=r/^agent\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true
          
  ui_review:
    if:
      - {{ files | match(regex=r/^ui\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  github_files_review:
    if:
      - {{ files | match(regex='.github\\/') | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]

  request_description_in_lambdas:
    if:
      - {{ source.diff.files | matchDiffLines(regex=r/LambdaDeclaration/) | some }}
      - {{ source.diff.files | matchDiffLines(regex=r/import.*LambdaFunction/) | nope }}
      - {{ source.diff.files | matchDiffLines(regex=r/description:/) | nope }}
    run:
      - action: request-changes@v1
        args:
          comment: |
            Please provide `description` on every lambda you create.

  cn_customer_remark:
    if:
      - {{ files | match(regex=r/^customer\/cn-customer\//) | some }}
    run:
      - action: add-comment@v1
        args:
          comment: |
            You change `cn-customer`, please check if you need to deploy it for environments:
            - [synthetic / cli agents](https://github.com/Contrast-Security-Inc/cn-mono/actions/workflows/deploy_cn_customer.yml)
            - [dev / stage agents](https://github.com/Contrast-Security-Inc/cn-mono/actions/workflows/deploy_cn_customer_dev_agents.yml)


  api_docs_review:
    if:
      - {{ files | match(list=['oas3.yml', 'openapi.json']) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  api_docs_discard_auto_generated_files:
    if:
      - {{ files | match(list=['open-api/merged_openapi.yml', 'open-api/api-spec.html']) | some }}
    run:
      - action: request-changes@v1
        args:
          comment: |
            Please discard changes at these files `open-api/merged_openapi.yml`, `open-api/api-spec.html`.
            These files should be auto-generated by [Open-Api Workflow](https://github.com/Contrast-Security-Inc/cn-mono/actions/workflows/open_api.yml)

  inspector_review:
    if:
      - {{ files | match(regex=r/^agent\/inspector\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  gateway_review:
    if:
      - {{ files | match(regex=r/^gateway\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true
  
  e2e_review:
    if:
      - {{ files | match(regex=r/^e2e\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  graph_review:
    if:
      - {{ files | match(regex=r/^graph\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  image_detector_review:
    if:
      - {{ files | match(regex=r/^image-detector\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  cft_review:
    if:
      - {{ files | match(list=cft_templates_files) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  cft_request_review:
    if:
      - {{ files | match(list=cft_templates_files) | some }}
    run:
      - action: require-reviewers@v1
        args:
          reviewers: [EladKohavi]

  cft_version_review:
    if:
      - {{ files | match(list=['agent_cf_template.yml']) | some }}
      - {{ files | match(list=['template_version.json']) | nope }}
    run:
      - action: add-comment@v1
        args:
          comment: |
            - Please be sure that you update the `template_version.json` with new version and description when modify the `agent_cf_template.yml`
            - Please check if this change are require update `stage-agents` on `e2e` 

  pulumi_cli_review:
    if:
      - {{ files | match(regex=r/^pulumi\/cn-cli\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  scans_review:
    if:
      - {{ files | match(regex=r/^scans\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  resources_review:
    if:
      - {{ files | match(regex=r/^resources\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  instrumentor_review:
    if:
      - {{ files | match(regex=r/^instrumentor\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true

  old_discovery_remark:
    if:
      - {{ files | match(regex=r/^resources\/app\/functions\/discovery\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi]
          wait_for_all_checks: true
      - action: request-changes@v1
        args:
          comment: |
            You shouldn't change `old discovery`, please reach @Moshemo for more information

  ja_translations_review:
    if:
      - {{ files | match(regex=r/^ui\/src\/i18n\/locales\//) | some }}
    run:
      - action: add-reviewers@v1
        args:
          wait_for_all_checks: true
          reviewers: [EladKohavi]

  validate_translations:
    if:
      - {{ files | match(regex=r/^ui\/src\/i18n\/locales\/en\//) | some }}
      - {{ files | match(regex=r/^ui\/src\/i18n\/locales\/ja\//) | nope }}
    run:
      - action: add-comment@v1
        args:
          comment: |
            You change only `en` translations, please be sure that you don't miss `ja` translations.

  suggest_reviewer:
    on:
      - label_added
    if: 
      - {{ pr.labels | match(term='suggest-reviewer') }}
    run:
      - action: add-comment@v1
        # More info about explainCodeExperts: https://docs.gitstream.cm/filter-functions/#explaincodeexperts
        args:
          comment: |
            {{ repo | explainCodeExperts(gt=10) }}

  request_ids_dev_nodejs_version:
    if:
      - {{ source.diff.files | filter(attr='new_file', term='version_manifest.json') | matchDiffLines(regex=r/^[+].*prod-nodejs-layer/) | some }}
      - {{ source.diff.files | filter(attr='new_file', term='version_manifest.json') | matchDiffLines(regex=r/^[+].*dev-nodejs-layer/) | nope }}
    run:
      - action: request-changes@v1
        args:
          comment: |
            You can't update only the `prod-nodejs-layer`, because all tests run on `dev-nodejs-layer`.
            Please update both `prod-nodejs-layer` and `dev-nodejs-layer` with the same changes.

  request_ids_dev_python_version:
    if:
      - {{ source.diff.files | filter(attr='new_file', term='version_manifest.json') | matchDiffLines(regex=r/^[+].*prod-python-layer/) | some }}
      - {{ source.diff.files | filter(attr='new_file', term='version_manifest.json') | matchDiffLines(regex=r/^[+].*dev-python-layer/) | nope }}
    run:
      - action: request-changes@v1
        args:
          comment: |
            You can't update only the `prod-python-layer`, because all tests run on `dev-python-layer`.
            Please update both `prod-python-layer` and `dev-python-layer` with the same changes.

wrong_tests_files:
  - agent/inspector/go.mod
  - agent/inspector/go.sum

cft_templates_files:
  - resources/app/functions/accounts/agent_cf_template.yml
  - resources/app/functions/accounts/cross_account_role_template.yml
  - resources/app/functions/accounts/sls.yml
  - resources/app/functions/accounts/xrays_rest_add_account.yaml

exclude_files_from_double_review:
  - r/agent\//aws\//instrumentor\//
  - r/tests\//
  - Dockerfile

# This list includes the deprecated items
deprecated:
  - regex: r/^[+]cloudessence.internal/
  - regex: r/^[+].*onboardingRequested\/v1/
  - regex: r/^[+].*offboardingRequested\/v1/
  - regex: r/^[+].*onboardingCompleted\/v1/
  - regex: r/^[+].*resourcesCompleted\/v1/
  - regex: r/^[+].*resourcesUpdated\/v1/
  - regex: r/^[+].*resourcesDeleted\/v1/
  - regex: r/^[+].*resourcesOptOut\/v1/
  - regex: r/^[+].*accountConfigUpdated\/v1/
  - regex: r/^[+].*resourcesDeactivationBatchCompleted\/v1/
  - regex: r/^[+].*resourcesDeactivationCompleted\/v1/
  - regex: r/^[+].*discoveryBatchCompleted\/v1/
  - regex: r/^[+].*discoveryCompleted\/v1/
  - regex: r/^[+].*graphCreationCompleted\/v1/
  - regex: r/^[+].*graphRiskRatingRequested\/v1/
  - regex: r/^[+].*graphDiscoveryRiskRatingCompleted\/v1/
  - regex: r/^[+].*graphVulnerabilityRiskRatingCompleted\/v1/
  - regex: r/^[+].*scanApiBatchCompleted\/v1/
  - regex: r/^[+].*scanInit\/v1/
  - regex: r/^[+].*scanAborted\/v1/
  - regex: r/^[+].*scanRequested\/v1/
  - regex: r/^[+].*scanDismissed\/v1/
  - regex: r/^[+].*scanFailed\/v1/
  - regex: r/^[+].*ossCompleted\/v1/
  - regex: r/^[+].*analysisCompleted\/v1/
  - regex: r/^[+].*serviceActionsCompleted\/v1/
  - regex: r/^[+].*analysisFailed\/v1/
  - regex: r/^[+].*cleanupCompleted\/v1/
  - regex: r/^[+].*scanCompleted\/v1/
  - regex: r/^[+].*scannerCompleted\/v1/
  - regex: r/^[+].*scanUpdate\/v1/
  - regex: r/^[+].*vulnerabilityRiskRatingRefreshStarted\/v1/
  - regex: r/^[+].*newVulnerabilityFound\/v1/
  - regex: r/^[+].*vulnerabilitiesDeactivationCompleted\/v1/
  - regex: r/^[+].*notificationCreated\/v1/
  - regex: r/^[+].*deploymentCompleted\/v1/
  - regex: r/^[+].*integrationCompleted\/v1/
  - regex: r/^[+].*orgDeleted\/v1/
  - regex: r/^[+].*accountDeactivationCompleted\/v1/
  - regex: r/^[+].*schedulerCompleted\/v1/
  - regex: r/^[+].*taskCreationRequested\/v1/
  - regex: r/^[+].*staleTaskFound\/v1/
  - regex: r/^[+].*taskCreated\/v1/
  - regex: r/^[+].*taskInitiated\/v1/
  - regex: r/^[+].*attestationReportRequested\/v1/
  - regex: r/^[+].*attestationReportCreated\/v1/
  - regex: r/^[+].*attestationReportFailed\/v1/
  - regex: r/^[+].*leastPrivilegeCompleted\/v1/
  - regex: r/^[+].*syntheticMonitoringCompleted\/v1/
  - regex: r/^[+].*syntheticMonitoringFailed\/v1/
  - regex: r/^[+].*imageInspectionCompleted\/v1/
  - regex: r/^[+].*imageInspectionFailed\/v1/
  - regex: r/^[+].*imageInspectionAborted\/v1/
  - regex: r/^[+].*malwareAnalysisCompleted\/v1/
  - regex: r/^[+].*graphResourcesEnriched\/v1/
  - regex: r/^[+].*baseImageDetectionCompleted\/v1/
