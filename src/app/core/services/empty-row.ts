const tt2 = {
  timestamp: '2023-07-22T16:35:47.741Z',
  level: 'info',
  message:
    'set prState: github-yeelali14/EuropeanPaintings/867 with payload: {"prCommands":[],"isFullyInstalled":true,"trackedWorkflows":{"branch":"","wokflow_id":".github/workflows/example.yml","check_name":"blabla"},"org":"github-yeelali14","prPath":"EuropeanPaintings/867"}',
  ctx: {
    environment: 'local',
    app: 'github-actions-consumer',
    prCommands: [],
    watchers: { watchPREvents: { labels: true }, watchFilters: {} },
    prPath: 'EuropeanPaintings/867',
    trackedWorkflows: {
      branch: '',
      wokflow_id: '.github/workflows/example.yml',
      check_name: 'blabla',
    },
    org: 'github-yeelali14',
    isFullyInstalled: true,
  },
};

const tt = {
  timestamp: '2023-07-22T16:35:57.330Z',
  level: 'info',
  message:
    'set prState: github-yeelali14/EuropeanPaintings/867 with payload: {"prCommands":[{"state":"UPDATE_LABELS","args":{"labels":["5 min review"]}}],"watchers":{"watchPREvents":{"labels":true},"watchFilters":{}},"isFullyInstalled":true,"trackedWorkflows":{"branch":"","wokflow_id":".github/workflows/example.yml","check_name":"blabla"},"org":"github-yeelali14","prPath":"EuropeanPaintings/867"}',
  ctx: {
    environment: 'local',
    app: 'github-actions-consumer',
    prCommands: [
      { state: 'UPDATE_LABELS', args: { labels: ['5 min review'] } },
    ],
    watchers: { watchPREvents: { labels: true }, watchFilters: {} },
    prPath: 'EuropeanPaintings/867',
    trackedWorkflows: {
      branch: '',
      wokflow_id: '.github/workflows/example.yml',
      check_name: 'blabla',
    },
    org: 'github-yeelali14',
    isFullyInstalled: true,
  },
};
