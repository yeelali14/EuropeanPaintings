const filterOutProperties = () => {
  const record = {
    owner: 'yeelali14',
    '.cm/another.cm': {
      updated_at: '2023-10-02T13:32:19.456Z',
      content:
        '# -*- mode: yaml -*-\n' +
        '\n' +
        'manifest:\n' +
        '  version: 1.0\n' +
        'on:\n' +
        '  - label_added\n' +
        'automations:\n' +
        '  safe_changes:\n' +
        '    if:\n' +
        '      - {{ is.formatting or is.docs or is.tests or is.image }}\n' +
        '    run: \n' +
        '      - action: add-label@v1\n' +
        '        args:\n' +
        "          label: 'safe-change'\n" +
        '      - action: add-comment@v1\n' +
        '        args:\n' +
        '          comment: |\n' +
        '            This PR is considered a safe change and has been automatically approved.\n' +
        '  check_lables: \n' +
        '    if:\n' +
        '      -  true\n' +
        '    run:\n' +
        '      - action: add-comment@v1\n' +
        '      # etr is defined in the last section of this example\n' +
        '        args:\n' +
        '          comment: |\n' +
        '            lables: {{ pr.labels | dump | safe }}\n' +
        '\n' +
        '\n' +
        'is:\n' +
        '  formatting: {{ source.diff.files | isFormattingChange }}\n' +
        '  docs: {{ files | allDocs }}\n' +
        '  tests: {{ files | allTests }}\n' +
        '  image: {{ files | allImages }}\n',
    },
    repo: 'EuropeanPaintings',
  };
  const result = Object.keys(record).reduce((acc, key) => {
    if (key !== 'owner' && key !== 'repo') {
      acc[key] = record[key];
    }
    return acc;
  }, {});
  console.log('yeela-debug result ', result);
};
