import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
//jhkdasdasdasd

const automation = {
  "timestamp": "2024-03-20T14:42:04.500Z",
  "level": "info",
  "message": "Report metric to custom metrics for pr https://github.com/yeela-org/pasha/pull/79",
  "ctx": {
      "environment": "dev-01",
      "app": "github-actions-consumer",
      "data": {
          "source": "gitstream.automations",
          "timestamp": "2024-03-20T14:42:03.400Z",
          "metric_name": "cm/gitstream/estimated_time_to_review",
          "value": 1,
          "entity": {
              "pr_url": "https://github.com/yeela-org/pasha/pull/79",
              "commit_sha": "f93e2031ee8e9b7f2fb33ffaf92ec5047b9084bb",
              "repo_url": "https://github.com/yeela-org/pasha"
          },
          "tags": {
              "executed_actions": [
                  "add-label@v1"
              ],
              "blocking_actions": [],
              "successful_actions": [
                  "add-label@v1"
              ],
              "failed_actions": [],
              "cm_path": "cm/gitstream.cm",
              "automation_title": "estimated_time_to_review"
          }
      },
      "url": "https://public-api.linearb-dev-02.io/api/v1/report/event",
      "status": 200
  }
}

const action = {
  "timestamp": "2024-03-20T14:41:58.621Z",
  "level": "info",
  "message": "Report metric to custom metrics for pr https://github.com/yeela-org/pasha/pull/79",
  "ctx": {
      "environment": "dev-01",
      "app": "github-actions-consumer",
      "data": {
          "source": "gitstream.actions",
          "timestamp": "2024-03-20T14:41:57.440Z",
          "metric_name": "add-label@v1",
          "value": 3,
          "entity": {
              "pr_url": "https://github.com/yeela-org/pasha/pull/79",
              "commit_sha": "f93e2031ee8e9b7f2fb33ffaf92ec5047b9084bb"
          },
          "tags": {
              "automation": "cm/gitstream/estimated_time_to_review",
              "label": "1 min review",
              "color": "36A853",
              "cm_path": "cm/gitstream.cm"
          }
      },
      "url": "https://public-api.linearb-dev-02.io/api/v1/report/event",
      "status": 200
  }
}
// need to change action.automation value to:
action.automation = `${automaion.cm_path.replace('.cm', '')}/${automation_title}`
// where automation.tags.cm_path == action.tags.cm_path and automation.entity.pr_url == action.entity.pr_url