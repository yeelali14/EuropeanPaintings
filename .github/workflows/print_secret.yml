on:
  pull_request:
    types: [synchronize]

jobs:
  job_1:
    runs-on: ubuntu-latest
    steps:
    - name: print env
      env:
        YEELA: ${{ secrets.YEELA_TEST }}
      uses: actions/github-script@v3
      with:
        script: |
          core.info(`print: ${ process.env.YEELA}`);