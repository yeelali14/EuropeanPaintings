name: Create tag

on:
  issue_comment:
    types: [created]

jobs:
  job_1:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Cache node modules
        uses: actions/cache@v2
        env:
          cache-name: cache-node-modules
        with:
          path: |
            ~/.npm
            **/node_modules
          key: ${{ runner.os }}-node-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-${{ env.cache-name }}-
            ${{ runner.os }}-node-


      - name: npm install
        run: npm ci

      - name: Build and tag
        id: build
        run: |
          GIT_HASH=$(git rev-parse --short "$GITHUB_SHA")
          CURRENTDATE=`date +"%Y-%m-%d %T"`
          CURRENT_BRANCH=${GITHUB_REF##*/}
          if [ "${CURRENT_BRANCH}" == "main" ]; then
            git config --global user.email "yeela88@gmail.com"
            git config --global user.name "Github action"
            currentTag=$(git describe --abbrev=0 --tags)
            patch=${currentTag##*.}
            WORDTOREMOVE='-rc'
            patch=${patch//$WORDTOREMOVE/}
            ARTIFACT_NAME=${currentTag%.*}.$((patch+1))
            RC_TAG_NAME=${ARTIFACT_NAME}-rc
            git tag -a $RC_TAG_NAME -m $RC_TAG_NAME $GIT_HASH
          fi
          echo 'ARTIFACT_NAME:' ${ARTIFACT_NAME}
          EXTEND_ESLINT=true npm run build
          echo git push --follow-tags
          git push --follow-tags
          echo "::set-output name=artifact_name::${ARTIFACT_NAME}"
