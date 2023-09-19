on:
  pull_request:
    types: [synchronize]

jobs:
  job_1:
    runs-on: ubuntu-latest
    steps:
    - name: cypress job
      uses: actions/github-script@v3
      with:
        script: |
          setTimeout(() => {
            console.log("Slept for 5 minutes");
          }, 300000);