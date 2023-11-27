const branchProtection = {
    url: 'https://api.github.com/repos/yeelali14/EuropeanPaintings/branches/main/protection',
    required_status_checks: {
      url: 'https://api.github.com/repos/yeelali14/EuropeanPaintings/branches/main/protection/required_status_checks',
      strict: true,
      contexts: [Array],
      contexts_url:
        'https://api.github.com/repos/yeelali14/EuropeanPaintings/branches/main/protection/required_status_checks/contexts',
      checks: [Array],
    },
    required_pull_request_reviews: {
      url: 'https://api.github.com/repos/yeelali14/EuropeanPaintings/branches/main/protection/required_pull_request_reviews',
      dismiss_stale_reviews: false,
      require_code_owner_reviews: false,
      require_last_push_approval: true,
      required_approving_review_count: 1,
    },
    required_signatures: {
      url: 'https://api.github.com/repos/yeelali14/EuropeanPaintings/branches/main/protection/required_signatures',
      enabled: false,
    },
    enforce_admins: {
      url: 'https://api.github.com/repos/yeelali14/EuropeanPaintings/branches/main/protection/enforce_admins',
      enabled: false,
    },
    required_linear_history: { enabled: false },
    allow_force_pushes: { enabled: false },
    allow_deletions: { enabled: false },
    block_creations: { enabled: false },
    required_conversation_resolution: { enabled: false },
    lock_branch: { enabled: false },
    allow_fork_syncing: { enabled: false },
  };
  //dasdsafsdfsd
  //commit 2