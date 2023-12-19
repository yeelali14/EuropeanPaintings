//dasdasdas
//dasd
console.log('Running gitstream-rules-engine docker v1.224');
const automations = {
  'gitstream/suggest_code_experts': {
    if: [{ passed: false }],
    run: [
      {
        action: 'explain-code-experts@v1',
        args: {
          gt: 10,
          comment:
            'base64: 8J+ltyAqKkNvZGUgZXhwZXJ0czogRWxhZEtvaGF2aSwgWWFhcmFzaCoqIAogCkVsYWRLb2hhdmksIFlhYXJhc2ggaGF2ZSBtb3N0IPCfkanigI3wn5K7ICoqYWN0aXZpdHkqKiBpbiB0aGUgZmlsZXMuIApFbGFkS29oYXZpLCBZYWFyYXNoIGhhdmUgbW9zdCDwn6egICoqa25vd2xlZGdlKiogaW4gdGhlIGZpbGVzLiAKIDxkZXRhaWxzPgogPHN1bW1hcnk+U2VlIGRldGFpbHM8L3N1bW1hcnk+CgoKYFJFQURNRS5tZGAgCiAKCkFjdGl2aXR5IGJhc2VkIG9uIGdpdC1jb21taXQ6IAoKIHwgIHwgRWxhZEtvaGF2aSB8IFlhYXJhc2h8IAogfCAtLS0gfCAtLS0gfCAtLS0gfCAKIHwgSlVMIHwgICB8ICAKfCBKVU4gfCAgIHwgIAp8IE1BWSB8ICAgfCAgCnwgQVBSIHwgNCBhZGRpdGlvbnMgJiAwIGRlbGV0aW9ucyB8MyBhZGRpdGlvbnMgJiAxIGRlbGV0aW9ucyB8IAp8IE1BUiB8ICAgfCAgCnwgRkVCIHwgICB8ICAKIAoKS25vd2xlZGdlIGJhc2VkIG9uIGdpdC1ibGFtZTogCiBFbGFkS29oYXZpOiA1NyUgCllhYXJhc2g6IDQzJSAKCjwvZGV0YWlscz4KIAoKIAogClRvIGxlYXJuIG1vcmUgYWJvdXQgLzpcIGdpdFN0cmVhbSAtIFtWaXNpdCBvdXIgRG9jc10oaHR0cHM6Ly9kb2NzLmdpdHN0cmVhbS5jbS8pIAogCiAK\n',
        },
      },
    ],
    passed: false,
    is_org_level: false,
    provider_repository_id: 619082494,
  },
  'gitstream/approve_safe_changes': {
    if: [{ passed: true }],
    run: [{ action: 'approve@v1' }],
    passed: true,
    is_org_level: false,
    provider_repository_id: 619082494,
  },
  'pinkfloyd2/label_sonar_vulnerabilities': {
    if: [{ passed: false }],
    run: [
      {
        action: 'add-label@v1',
        args: { label: '🔓 x  vulnerabilities', color: 'fbca04' },
      },
    ],
    passed: false,
    is_org_level: false,
    provider_repository_id: 619082494,
  },
  'pinkfloyd2/label_sonar_code smells': {
    if: [{ passed: false }],
    run: [
      {
        action: 'add-label@v1',
        args: { label: '☣️ x  code smells', color: 'fbca04' },
      },
    ],
    passed: false,
    is_org_level: false,
    provider_repository_id: 619082494,
  },
  'pinkfloyd2/label_sonar_security hotspots': {
    if: [{ passed: false }],
    run: [
      {
        action: 'add-label@v1',
        args: { label: '🛡️ x  security hotspots', color: 'fbca04' },
      },
    ],
    passed: false,
    is_org_level: false,
    provider_repository_id: 619082494,
  },
  'pinkfloyd2/label_sonar_bugs': {
    if: [{ passed: false }],
    run: [
      {
        action: 'add-label@v1',
        args: { label: '🪲 x  bugs', color: 'fbca04' },
      },
    ],
    passed: false,
    is_org_level: false,
    provider_repository_id: 619082494,
  },
};
const context = {
  watchPREvents: { labels: true },
  watchFilters: { extractSonarFindings: true },
  repoPath: '.github/workflows/gitstream.yml',
  gitstreamGatesCheckId: 15334543074,
  repo: 'pasha',
  owner: 'yeelali14',
  branch: 'yeelali14-patch-14',
  installationId: 40033889,
  pullRequestNumber: 21,
  headSha: '49c4251fe1dd76706de6d00fe15f63fc389bf854',
  baseRef: 'main',
  triggeredBy: 'yeelali14',
  triggeredPREvent: 'opened',
  source: 'github',
  ddApiKey: '123',
  env: 'local',
  creator: 'yeelali14',
  analytics_url: 'http://yeela.ngrok.io/analytics',
  analyticsHttpApiUrl: 'https://api.amplitude.com/2/httpapi',
  analyticsKey: '123',
  segmentServiceUrl: 'https://api.segment.io',
  segmentWriteKey: 'Ts5ERU2KWfeE50DekgnG6t5g5Rp0wFRA',
  prContext: {
    isFullyInstalled: true,
    title: 'Update README.md',
    approvals: [],
    requested_changes: [],
    author: 'yeelali14',
    description:
      'WyFbd29ya2VyQl0oaHR0cHM6Ly9pbWcuc2hpZWxkcy5pby9lbmRwb2ludD91cmw9aHR0cHMlM0ElMkYlMkZ3b3JrZXJiLmxpbmVhcmIuaW8lMkZ2MiUyRmJhZGdlJTJGcHJpdmF0ZSUyRlUyRnNkR1ZrWDFYZVFtTGw2S0h1NTFScjZoZ1JrUDdxV3dVdlZKaUZjJTJGY29sbGFib3JhdGlvbi5zdmclM0ZjYWNoZVNlY29uZHMlM0Q2MCldKGh0dHBzOi8vd29ya2VyYi5saW5lYXJiLmlvL3YyL2JhZGdlL2NvbGxhYm9yYXRpb24tcGFnZT9tYWdpY0xpbmtJZD1QZFNTZTBDKQ==',
    checks: [],
    created_at: '2023-07-25T17:32:11Z',
    draft: false,
    mergeable: true,
    labels: [],
    reviewers: [],
    status: 'open',
    updated_at: '2023-07-25T17:32:11Z',
    assignees: [],
    contributors: [
      { login: 'Yaarash', name: 'Yaara Shoham' },
      { login: 'yeelali14', name: 'Yeela Lifshitz' },
      { login: 'EladKohavi', name: 'Elad Kohavi' },
      { login: 'PavelLinearB', name: 'Pavel Vaks' },
    ],
    paths: [{ name: 'gitstream.cm' }, { name: 'pinkfloyd2.cm' }],
    author_teams: [],
    author_is_org_member: true,
    comments: [],
    reviews: [],
    conversations: [],
    unresolved_threads: 0,
    isPrivate: true,
    target: 'main',
  },
  hasCmRepo: false,
  providerRepoId: 619082494,
  isNewCommit: true,
  trigger_id: '4b603a60-c5c8-443c-b384-9e146bc00f76',
  admins: [],
  dryRun: false,
  onlyRulesFilesChanges: false,
};
