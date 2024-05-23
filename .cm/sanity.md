# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  explain_code_experts:
    if:
      - {{ pr.labels | match(term='suggest-reviewer') | some }}
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10 
  {% for item in deprecated %}
  review_deprecated_component_{{ item.old }}:
    if:
      - {{ source.diff.files | matchDiffLines(regex=item.regex) | some }}
    run:
      - action: add-label@v1
        args:
          label: 'deprecated-component'
          color: '#FF0000'
      - action: request-changes@v1
        args:
          comment: |
            `{{ item.old }}` component is deprecated, use `{{ item.new }}` instead
  {% endfor %}
  review_sensitive_files:
    on:
      - label_added
    if:
      - {{ files | match(list=sensitive_files) | some }}
    run:
      - action: add-reviewers@v1
        args:
  # | WARNING: change to the appropriate organization and team |
          reviewers: [my-organization/security]
      - action: set-required-approvals@v1
        args:
          approvals: 2
      - action: add-comment@v1
        args:
          comment: |
            This PR affects one or more sensitive files and requires review from the security team.
  safe_changes:
    if:
      - {{ is.formatting or is.docs or is.tests or is.image }}
    run: 
      - action: add-label@v1
        args:
          label: 'safe-change'
      - action: approve@v1
      - action: add-comment@v1
        args:
          comment: |
            This PR is considered a safe change and has been automatically approved.
  estimated_time_to_review:
    if:
      - true
    run:
      - action: add-label@v1
        args:
          label: "{{ calc.etr }} min review"
          color: {{ colors.red if (calc.etr >= 20) else ( colors.yellow if (calc.etr >= 5) else colors.green ) }}

  label_missing_jira_info:
    if:
      - {{ not (has.jira_ticket_in_title or has.jira_ticket_in_desc) }}
    run:
      - action: add-label@v1
        args:
          label: "missing-jira"
          color: 'F6443B'
  approve_tests:
    if:
      - {{ files | allTests }}
    run: 
      - action: add-label@v1
        args:
          label: 'tests-only'
      - action: add-comment@v1
        args:
          comment: |
            This merge has been automatically approved because it only contains changes to tests.
      - action: approve@v1
  approve_tiny_change:
    if:
      - {{ is.one_file and is.one_line }}
    run:
      - action: add-label@v1
        args:
          label: 'single-line'
      - action: approve@v1
      - action: add-comment@v1
        args:
          comment: |
            This PR has been approved because it is only a single line
  approve_javascript_formatting:
    if:
      - {{ files | extensions | match(list=['js', 'ts']) | every }}
      - {{ source.diff.files | isFormattingChange }}
    run:
      - action: approve@v1
      - action: add-label@v1
        args:
          label: code-formatting
      - action: add-comment@v1
        args:
          comment: |
            This PR only contains formatting changes and has been approved.
  approve_javascript_log_output:
    if: 
      - {{ files | match(regex=r/\.js$|\.ts$/) | every }}
      - {{ source.diff.files | matchDiffLines(regex=r/^[+-].*console\.log/, ignoreWhiteSpaces=true) | every }}
    run: 
      - action: add-label@v1
        args:
          label: 'log-output-only'
      - action: approve@v1
      - action: add-comment@v1
        args:
          comment: |
            This PR has been approved because it only contains changes to log output
  approve_team_by_directory:
    if:
      - {{ files | match(regex=r/docs\//) | every }}
      # | WARNING: change to the appropriate team |
      - {{ pr.author_teams | match(regex=r/Team Flare/) }}
    run: 
      - action: approve@v1
      - action: add-comment@v1
        args:
          comment: |
            Docs changes from the tech-writers team are automatically approved.
  label_prs_without_tests:
    if:
      - {{ files | match(regex=r/[^a-zA-Z0-9](spec|test|tests)[^a-zA-Z0-9]/) | nope }}
    run: 
      - action: add-label@v1
        args:
          label: 'missing-tests'
          color: '#E94637'
  catch_missing_lambda_info:
    if:
      - {{ source.diff.files | matchDiffLines(regex=r/LambdaFunction/) | some }}
      - {{ source.diff.files | matchDiffLines(regex=r/description:/) | nope }}
    run:
      - action: add-label@v1
        args:
          label: 'lambda-missing-field'
          color: '#FF0000'
      - action: request-changes@v1
        args:
          comment: |
            New `LambdaFunction` must have `description:` field.


# | WARNING: please change to the appropriate data on your project |

changes:
  additions: {{ branch.diff.files_metadata | map(attr='additions') | sum }}
  deletions: {{ branch.diff.files_metadata | map(attr='deletions') | sum }}

is:
  one_file: {{ files | length == 1 }}
  one_line: {{ changes.additions - changes.deletions <= 1 }}
  formatting: {{ source.diff.files | isFormattingChange }}
  docs: {{ files | allDocs }}
  tests: {{ files | allTests }}
  image: {{ files | allImages }}

has:
  jira_ticket_in_title: {{ pr.title | includes(regex=r/\b[A-Za-z]+-\d+\b/) }}
  jira_ticket_in_desc: {{ pr.description | includes(regex=r/atlassian.net\/browse\/\w{1,}-\d{3,4}/) }}


calc:
  etr: {{ branch | estimatedReviewTime }}

colors:
  red: 'b60205'
  yellow: 'fbca04'
  green: '0e8a16'

sensitive_files:
  - src/app/auth/
  - src/app/routing/
  - src/app/resources/


deprecated:
  - regex: r/oldAPI/
    old: oldAPI
    new: newAPI
  - regex: r/anotherOldAPI/
    old: anotherOldAPI
    new: anotherNewAPI
