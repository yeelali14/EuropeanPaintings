# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  pr_description_by_linearb_ai:
    if:
      - true
    run:
      - action: update-description@v1
        args:
          concat_mode: append
          description: {{ source | AI_DescribePR }}

HAS_LB_CR_LABEL: {{ pr.labels | match(term="LB CR") | some }}
HAS_LB_DESCRIPTION_LABEL: {{ pr.labels | match(term="LB DESCRIPTION") | some }}

PR_REVIEW_PROMT: |
  Perform a detailed code review based on the provided code diff. For each modified file:
  - Analyze the changes in the code and identify any bugs, performance issues, or improvements in readability, maintainability, or adherence to best practices
  - If unchanged parts of the code are relevant to the modifications, include comments on them to provide a complete context for improvement
  - Reference specific lines of code from the diff and any relevant unchanged code in your comments
  - Organize issues by sorting them by the file name and line numbers within each file
  - For each identified issue:
    - Use a collapsible section with title that consists of a short description, the file name, and line numbers
    - Provide actionable suggestions and include a refactored code snippet formatted as a GitHub markdown code block, using a code diff format with + for additions and - for removals
    - Clearly demonstrate how the improvement can be applied in the relevant section of the code
  - Focus on actionable, specific feedback about the changes and their immediate context; avoid generic or unrelated comments

