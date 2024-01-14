# -*- mode: yaml -*-

manifest:
  version: 1.0

  ignore_files:
    - 'package-lock.json'
    - 'kishkush.txt'
  admin:
    users: ["EladKohavi", "ShakedZrihen"]

automations:
  assign_code_experts:
    # Triggered when someone applies a suggest-reviewer label to a PR.
    if: 
      - {{ files | extensions | length == 1 }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: {{ repo | codeExperts(gt=10) }}
      - action: explain-code-experts@v1 
        args:
          gt: 10 
  review_ui:
    if:
      # | WARNING: change to the appropriate path on your project |
      - {{ files | match(regex=r/src\/app\/auth\/.*/) | some}}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: [EladKohavi, linear-b/team-flare]
      - action: add-comment@v1
        args:
          comment: |
            The Security team has automatically been added for review because this PR contains changes to components inside `/src/app/auth`
  share_knowledge:
    if:
      - {{ pr.labels | match(term='Share Knowledge') | some }}
    run:
      - action: add-reviewers@v1
        args:
          reviewers: {{ repo | codeExperts(gt=30, lt=60) | random }}
      - action: add-comment@v1
        args:
          comment: |
            gitStream has assigned a reviewer to increase knowledge sharing on this PR.
  close_wrong_team_by_directory:
    if:
    # | WARNING: change to the appropriate path on your project and the team name |
      - {{ files | match(regex=r/ui\/views/) | some }}
      - {{ pr.author_teams | match(term='ui') | nope }}
    run:
      - action: add-comment@v1
        args: 
          comment: Please contact a member of the `ui` team if you need to make changes to files in `src/views`
      - action: close@v1
  request_screenshot:
    if:
      - {{ not (has.screenshot_link or has.image_uploaded) }}
    run:
      - action: add-label@v1
        args:
          label: 'no-screenshot'
          color: '#FF000A'
      - action: add-comment@v1
        args:
          comment: |
            Be a life saver 🛟 by adding a screenshot of the changes you made.
  welcome_newcomer:
    if:
      - {{ repo.author_age < 1 and repo.age > 0 }}
    run:
      - action: add-reviewers@v1
        args:
        # | WARNING: change to the appropriate team member or reviewer |
          reviewers: [EladKohavi]
      - action: add-label@v1
        args:
          label: 'new-contributor'
          color: '#FBBD10'
      - action : add-comment@v1
        args:
          comment: |
            Hello {{ pr.author }} 👋 Thanks for making your first PR, and welcome to our project!
            Our mentor team has automatically been assigned to review this PR and guide you through the process.
            Please reach out to that team if you have questions about the next steps.
  jit_parser:
    if: 
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
            {{ jit | dump }}
  sonar_parser:
    if: 
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
            {{ sonar | dump }}
  label_color:
    if:
       - true
    run:
      - action: add-label@v1
        args:
          label: 'Blue label'
          color: {{ "blue" | mapToEnum(enum = colors) }}
  check_conflicts:
    if:
      - {{ pr.conflicted_files_count > 0 }}
    run:
      - action: add-label@v1
        args:
          label: pr conflicts 🚩
  print_active_coders:
    if: 
      - true
    run: 
      - action: add-comment@v1
        args:
          comment: |
            active coders: {{ active_coders }}

colors:
  red: 'FF0000'
  green: '00FF00'
  blue: '0000FF'
  yellow: 'FFFF00'

has:
  screenshot_link: {{ pr.description | includes(regex=r/!\[.*\]\(.*(jpg|svg|png|gif|psd).*\)/) }}
  image_uploaded: {{ pr.description | includes(regex=r/<img.*src.*(jpg|svg|png|gif|psd).*>/) }}
jit: {{ pr | extractJitFindings }}
sonar: {{ pr | sonarParser }}
active_coders: {{ repo | rankByGitActivity(gt=10, weeks=52) }}
# | WARNING: change to the appropriate contributor |
intersection_reviewer: {{ repo | codeExperts(gt=10) | intersection([yeelali14]) }}