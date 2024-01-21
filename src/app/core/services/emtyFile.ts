const automationResults = {
    "revertCommands/request_screenshot": [
      {
        "add-label@v1": {
          "status": "completed",
          "conclusion": "success",
          "actionContext": { "action": "add-labels@v1", "args": ["no-screenshot"] }
        }
      },
      {
        "request-changes@v1": {
          "status": "completed",
          "conclusion": "action_required",
          "output": { "title": "Requested changes", "summary": "Requested changes" },
          "actionContext": {
            "action": "request-changes@v1",
            "args": [{ "reviewId": 1835372527, "messageForRevert": "Review resolved" }]
          }
        }
      },
      {
        "add-comment@v1": {
          "status": "completed",
          "conclusion": "success",
          "actionContext": {
            "action": "add-comment@v1",
            "args": [
              { "id": 1902682694, "content": "comment 1\n\n<automation id=\"revertCommands/request_screenshot\"/>" }
            ]
          }
        }
      }
    ]
  };


const check = {
    checkName: 'revertCommands/code_experts',
    conclusion: [if conclusion is different from 'success' ? conclusion : 'success'],
    status: 'completed',
    output: { title: 'add-label@v1, request-changes@v1, add-comment@v1', summary: ''}
  };

export const updateCheck = async (
  {
    owner,
    repo,
    check,
    ref,
    headSha,
    status,
    conclusion,
    output = null,
    updatedBy,
  },
  installationId,
  logger
) => {
  if (!check) {
    return;
  }
  const checkId = check.data?.id || check?.id;
  const checkName = check.data?.name || check?.name;
  try {
    const { octokit } = await createOctokit(installationId);
    logger.debug(
      `Updating Check: ${checkId} to: ${status} with conclusion: ${conclusion} for repo: ${owner}/${repo}`
    );
    const res = await octokit.rest.checks.update({
      owner,
      repo,
      check_run_id: check.data?.id || check?.id,
      status,
      conclusion,
      ...(output && { output }),
    });

    if (checkName === GITSTREAM_GATE_CHECK_NAME) {
      await setCheckRunToDone({
        owner,
        repo,
        ref: ref || headSha,
        checkrun_id: checkId,
        installation_id: installationId,
        updated_by: updatedBy,
        provider: PROVIDERS.GITHUB,
      });
    }

    await logRateLimitForInstallation(installationId, 'updateCheck', {
      owner,
      repo,
    });
    return res;
  } catch (e) {
    logger.warn(
      `Update Check: ${checkId} - ${checkName} to: ${status} with conclusion: ${conclusion} for repo: ${installationId}/${owner}/${repo}/${
        ref || headSha
      } by ${updatedBy} failed with ${e.status}`,
      e
    );
    if (
      checkName === GITSTREAM_GATE_CHECK_NAME &&
      [403, 404].includes(e.status)
    ) {
      const fail_reasons = {
        403: 'App is suspended or uninstalled',
        404: 'Check was not found',
      };
      try {
        await setCheckRunToDone({
          owner,
          repo,
          ref: ref || headSha,
          checkrun_id: checkId,
          installation_id: installationId,
          updated_by: fail_reasons[e.status],
          provider: PROVIDERS.GITHUB,
        });
      } catch (e) {
        logger.error(
          `Failed to set check to done ${owner}/${repo}/${ref} - ${headSha}, `,
          e
        );
      }
    }
  }
};

export type IRunResult = {
  status: string;
  conclusion: string;
  output?: { title: string; summary: string };
  actionContext?: any;
};

export interface IAutomationResult {
  [actionName: string]: IRunResult;
}

export interface IAutomationResults {
  [automationName: string]: IAutomationResult[];
}



  

const withAutomationUpdate = (automationResults: IAutomationResults) => {
  for (const automationKey of Object.keys(automationResults || {})) {
    const titles = [];
    const conclusions = [];
    const summaries = [];

    for (const action of automationResults[automationKey]) {
        const actionKey = Object.keys(action)[0];
        conclusions.push(action[actionKey].conclusion);
        titles.push(actionKey);

        const dryRunFunction = _.get(dryRunActionComment, actionKey, dryRunActionComment.default);
        const actionMessage = dryRunFunction({
            ...context, ...action 
        });
        summaries.push(`${actionKey}: ${actionMessage}\n`);
    }
    const automationConclusion = conclusions.filter(conclusion !== CheckConclusion.success).length ? conclusions.filter(conclusion !== CheckConclusion.success)[0] : CheckConclusion.success;
    const check =  {
        checkName: automationKey,
        conclusion: automationConclusion,
        status: 'completed',
        output: { title: titles.join(', '), summary: summaries.join('') }
    };
    // create / update check
    }



    // check is for the existing run-actions on the same automations
    const { check, actionMessage } = await getCheckNameAndDetails(
      params,
      installationId,
      logger
    );
    let checkResult: any = {
      status: CheckStatus.completed,
      conclusion: CheckConclusion.failure,
    };
    try {
      checkResult = await callback(params, installationId, logger);
      console.log('yeela-debug checkResult: ', JSON.stringify(checkResult));

      await updateCheck(
        {
          ...params,
          check,
          ...checkResult,
          conclusion:
            check?.conclusion && check?.conclusion !== CheckConclusion.success // yeela-debug fsdfsdfs
              ? check?.conclusion
              : checkResult?.conclusion,
          output: {
            title: getCheckTitle(params.action, check),
            summary: getCheckSummary(
              params.action,
              check,
              actionMessage,
              checkResult
            ),
          },
        },
        installationId,
        logger
      );
      //save check id in workflow runs table
      await handleExternalChecks(
        {
          owner: params.owner,
          repo: params.repo,
          pullRequestNumber: params.pullRequestNumber,
          headSha: params.headSha,
          branch: params.branch,
          triggeredBy: params.triggeredBy,
          args: params.args,
          check,
        },
        checkResult.numOfCurrentWorkflowRuns,
        installationId,
        logger
      );
    } catch (e) {
      logger.error(
        `Error updating check status and conclusion: ${e.message}`,
        e
      );
      await updateCheck(
        {
          ...params,
          check,
          ...checkResult,
          ...(e instanceof ActionError && {
            output: {
              title: e.message,
              summary: e.message,
            },
          }),
        },
        installationId,
        logger
      );
    }
    return checkResult;
  }
};


export const withChecksUpdate = async (
  callback,
  params: IWithChecksUpdateParam,
  installationId,
  logger
) => {
  let checkResult: any = {
    status: CheckStatus.completed,
    conclusion: CheckConclusion.failure,
  };
  try {
    checkResult = await callback(params, installationId, logger);
  } catch (e) {
    checkResult = {
      ...checkResult,
      ...(e instanceof ActionError && {
        output: {
          title: e.message,
          summary: e.message,
        },
      }),
    };
  }

  return checkResult;
};
