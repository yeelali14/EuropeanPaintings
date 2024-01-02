// opened:
//   "request_screenshot/request_screenshot": {
//     "if": [
//       {
//         "passed": true
//       },
//       {
//         "passed": true
//       }
//     ],
//     "run": [
//       {
//         "action": "add-label@v1",
//         "args": {
//           "label": "no-screenshot",
//           "color": "#FF000A"
//         }
//       },
//       {
//         "action": "request-changes@v1",
//         "args": {
//           "comment": "Be a life saver 🛟 by adding a screenshot of the changes you made.\\n"
//         }
//       }
//     ],
//     "passed": false,
//     "isManagedByTriggers": true,
//     "isTriggered": false,
//     "is_org_level": false,
//     "provider_repository_id": 604053781
//   }
  
//   submitted:
//   "request_screenshot/request_screenshot": {
//     "if": [
//       {
//         "passed": true
//       },
//       {
//         "passed": false
//       }
//     ],
//     "run": [
//       {
//         "action": "add-label@v1",
//         "args": {
//           "label": "no-screenshot",
//           "color": "#FF000A"
//         }
//       },
//       {
//         "action": "request-changes@v1",
//         "args": {
//           "comment": "Be a life saver 🛟 by adding a screenshot of the changes you made.\\n"
//         }
//       }
//     ],
//     "passed": false,
//     "isManagedByTriggers": true,
//     "isTriggered": false,
//     "is_org_level": false,
//     "provider_repository_id": 604053781
//   }

//   synchronize: = commit
//   "request_screenshot/request_screenshot": {
//     "if": [
//       {
//         "passed": true
//       },
//       {
//         "passed": false
//       }
//     ],
//     "run": [
//       {
//         "action": "add-label@v1",
//         "args": {
//           "label": "no-screenshot",
//           "color": "#FF000A"
//         }
//       },
//       {
//         "action": "request-changes@v1",
//         "args": {
//           "comment": "Be a life saver 🛟 by adding a screenshot of the changes you made.\\n"
//         }
//       }
//     ],
//     "passed": false,
//     "isManagedByTriggers": true,
//     "isTriggered": true,
//     "is_org_level": false,
//     "provider_repository_id": 604053781
//   }
