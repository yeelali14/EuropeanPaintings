export const contextForCMTester = {
  branch: {
    name: 'wwf-1801-new',
    base: 'develop',
    author: 'Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>',
    author_name: 'Yeela Lifshitz\n',
    author_email: 'yeelalifshitz@MacBook-Pro-8.local\n',
    diff: {
      size: 2,
      files_metadata: [
        {
          original_file: 'src/App.js',
          new_file: 'src/App.js',
          deletions: 0,
          additions: 1,
        },
        {
          original_file:
            'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js',
          new_file:
            'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js',
          deletions: 0,
          additions: 1,
        },
      ],
    },
    num_of_commits: 2,
  },
  source: {
    diff: {
      files: [
        {
          original_file: '',
          new_file: 'lol.spec.js',
          original_content: '',
          diff: '',
          new_content:
            "import { signToken } from '@linearb/linode-common';\nimport { JwtPayload } from '../../types/jwt';\nimport { validateToken } from './jwt';\nimport { omit } from 'lodash';\nimport { JsonWebTokenError } from 'jsonwebtoken';\nconst additionalJWTKeys = ['iat', 'exp'];\ndescribe('JWT utils', () => {\n  describe('validateToken', () => {\n    const payload: JwtPayload = {\n      provider_organization_id: 1,\n      account_id: 1,\n      email: 'daveloper@linearb.io',\n      id: 1,\n      installation_id: 1,\n    };\n    const secret = 'a sectret';\n\n    it('Should validate token correctly', async () => {\n      const signedToken = await signToken(payload, secret, '7d');\n      const validateResponse = validateToken(signedToken, secret);\n\n      expect(omit(validateResponse, additionalJWTKeys)).toEqual(payload);\n    });\n\n    it('Should validate Bearer token correctly', async () => {\n      const signedToken = await signToken(payload, secret, '7d');\n      const validateResponse = validateToken('Bearer ' + signedToken, secret);\n\n      expect(omit(validateResponse, additionalJWTKeys)).toEqual(payload);\n    });\n\n    it('Should fail validation on incorrect token', async () => {\n      expect(() => validateToken('incorrect token', secret)).toThrow(JsonWebTokenError);\n    });\n  });\n});",
        },
        {
          original_file: 'src/App.js',
          new_file: 'src/App.js',
          diff: '@@ -104,3 +104,4 @@ class App extends Component {\n   }\n }\n export default App;\n+//sdadad\n\\ No newline at end of file',
          original_content:
            "import React, { Component } from 'react';\nimport QueryString from 'query-string';\nimport './App.scss';\nimport { Route, Router, Switch } from 'react-router-dom';\nimport AppRouter from 'common/AppRouter';\nimport history from 'common/RouterHistory';\nimport {\n  LICENSE_TYPES,\n  LOCAL_STORAGE_KEYS,\n} from 'common/constants/constants';\nimport OAuthHandler from 'views/oauth/OAuthHandler';\nimport Login from 'views/login';\nimport Modal from 'modals';\nimport SnackBar from 'connected-components/SnackBar';\nimport Overdue from 'views/overdue';\nimport LinkAccount from 'views/link-account';\nimport BrowserStorageAccessor from 'common/utils/BrowserStorageAccessor';\nimport {\n  omitFromQsAndSaveInLocalStorage,\n  omitFromQsAndSaveInSessionStorage\n} from 'common/utils/utils';\nimport ErrorBoundary from 'components/ErrorBoundary';\nimport Root from 'views/root';\nimport SendInvitation from 'views/send-invitation';\n\nclass App extends Component {\n  componentDidMount() {\n    const search = QueryString.parse(window.location.search, {\n      ignoreQueryPrefix: true\n    });\n    const { license, authFlow, oid, t, authLevel } = search;\n\n    if (t) {\n      omitFromQsAndSaveInLocalStorage(\n        LOCAL_STORAGE_KEYS.LINK_ACCOUNT_TOKEN,\n        't'\n      );\n    }\n\n    if (license && LICENSE_TYPES.includes(license)) {\n      omitFromQsAndSaveInLocalStorage(LOCAL_STORAGE_KEYS.LICENSE, 'license');\n    } else if (\n      !BrowserStorageAccessor().local.get(LOCAL_STORAGE_KEYS.LICENSE)\n    ) {\n      // default to team license if not provied\n      // we need to explicitly set this in local storage since a bunch of other code relies on it\n      BrowserStorageAccessor().local.set(LOCAL_STORAGE_KEYS.LICENSE, 'team');\n    }\n\n    if (authFlow) {\n      omitFromQsAndSaveInSessionStorage(\n        SESSION_STORAGE_KEYS.AUTH_FLOW,\n        'authFlow'\n      );\n    }\n\n    if (authLevel) {\n      omitFromQsAndSaveInSessionStorage(\n        SESSION_STORAGE_KEYS.AUTH_LEVEL,\n        'authLevel'\n      );\n    }\n\n    if (oid) {\n      omitFromQsAndSaveInSessionStorage(SESSION_STORAGE_KEYS.ORG_ID, 'oid');\n    }\n  }\n\n  render() {\n    return (\n      <div className='App'>\n        <ErrorBoundary height='100vh' componentName='LinearB'>\n          <Router history={history}>\n            <Switch>\n              <Route\n                path={AppRouter.LINK_ACCOUNT.path}\n                exact\n                component={LinkAccount}\n              />\n              <Route path={AppRouter.OVERDUE.path} exact component={Overdue} />\n              <Route path={AppRouter.LOGIN.path} exact component={Login} />\n              <Route\n                path={AppRouter.REGISTER.path}\n                exact\n                component={Register}\n              />\n              <Route\n                path={AppRouter.OAUTH_CALLBACK.path}\n                exact\n                component={OAuthHandler}\n              />\n              <Route\n                path={AppRouter.SEND_INVITATION.path}\n                component={SendInvitation}\n              />\n              <Route path={AppRouter.ROOT.path} component={Root} />\n            </Switch>\n            <Modal />\n            <SnackBar />\n          </Router>\n        </ErrorBoundary>\n      </div>\n    );\n  }\n}\nexport default App;\n",
          new_content:
            "import React, { Component } from 'react';\nimport QueryString from 'query-string';\nimport './App.scss';\nimport { Route, Router, Switch } from 'react-router-dom';\nimport AppRouter from 'common/AppRouter';\nimport history from 'common/RouterHistory';\nimport {\n  LICENSE_TYPES,\n  LOCAL_STORAGE_KEYS,\n} from 'common/constants/constants';\nimport OAuthHandler from 'views/oauth/OAuthHandler';\nimport Login from 'views/login';\nimport Modal from 'modals';\nimport SnackBar from 'connected-components/SnackBar';\nimport Overdue from 'views/overdue';\nimport LinkAccount from 'views/link-account';\nimport BrowserStorageAccessor from 'common/utils/BrowserStorageAccessor';\nimport {\n  omitFromQsAndSaveInLocalStorage,\n  omitFromQsAndSaveInSessionStorage\n} from 'common/utils/utils';\nimport ErrorBoundary from 'components/ErrorBoundary';\nimport Root from 'views/root';\nimport SendInvitation from 'views/send-invitation';\n\nclass App extends Component {\n  componentDidMount() {\n    const search = QueryString.parse(window.location.search, {\n      ignoreQueryPrefix: true\n    });\n    const { license, authFlow, oid, t, authLevel } = search;\n\n    if (t) {\n      omitFromQsAndSaveInLocalStorage(\n        LOCAL_STORAGE_KEYS.LINK_ACCOUNT_TOKEN,\n        't'\n      );\n    }\n\n    if (license && LICENSE_TYPES.includes(license)) {\n      omitFromQsAndSaveInLocalStorage(LOCAL_STORAGE_KEYS.LICENSE, 'license');\n    } else if (\n      !BrowserStorageAccessor().local.get(LOCAL_STORAGE_KEYS.LICENSE)\n    ) {\n      // default to team license if not provied\n      // we need to explicitly set this in local storage since a bunch of other code relies on it\n      BrowserStorageAccessor().local.set(LOCAL_STORAGE_KEYS.LICENSE, 'team');\n    }\n\n    if (authFlow) {\n      omitFromQsAndSaveInSessionStorage(\n        SESSION_STORAGE_KEYS.AUTH_FLOW,\n        'authFlow'\n      );\n    }\n\n    if (authLevel) {\n      omitFromQsAndSaveInSessionStorage(\n        SESSION_STORAGE_KEYS.AUTH_LEVEL,\n        'authLevel'\n      );\n    }\n\n    if (oid) {\n      omitFromQsAndSaveInSessionStorage(SESSION_STORAGE_KEYS.ORG_ID, 'oid');\n    }\n  }\n\n  render() {\n    return (\n      <div className='App'>\n        <ErrorBoundary height='100vh' componentName='LinearB'>\n          <Router history={history}>\n            <Switch>\n              <Route\n                path={AppRouter.LINK_ACCOUNT.path}\n                exact\n                component={LinkAccount}\n              />\n              <Route path={AppRouter.OVERDUE.path} exact component={Overdue} />\n              <Route path={AppRouter.LOGIN.path} exact component={Login} />\n              <Route\n                path={AppRouter.REGISTER.path}\n                exact\n                component={Register}\n              />\n              <Route\n                path={AppRouter.OAUTH_CALLBACK.path}\n                exact\n                component={OAuthHandler}\n              />\n              <Route\n                path={AppRouter.SEND_INVITATION.path}\n                component={SendInvitation}\n              />\n              <Route path={AppRouter.ROOT.path} component={Root} />\n            </Switch>\n            <Modal />\n            <SnackBar />\n          </Router>\n        </ErrorBoundary>\n      </div>\n    );\n  }\n}\nexport default App;\n//sdadad",
        },
        {
          original_file:
            'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js',
          new_file:
            'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js',
          diff: '@@ -275,3 +275,4 @@ export default ({\n     </Scroll>\n   );\n };\n+///das\n\\ No newline at end of file',
          original_content:
            "import React, { useState, useEffect } from 'react';\nimport _ from 'lodash';\nimport { Link } from '@material-ui/core';\nimport {\n  Padding,\n  TableNoVerticalLines,\n  TableNoVerticalSpaces,\n  Flex\n} from 'components/base/layout-components';\nimport Text from 'components/base/Text';\nimport Table from 'components/base/Table';\nimport { SPACES } from 'common/constants/sizes';\nimport styled from 'styled-components';\nimport { verticalScroller } from 'components/base/scroller';\nimport * as TrackingService from 'common/services/tracking.service';\n\nimport {\n  getIssuesTableColumns,\n  getIssuesTableData\n} from '../services/projectExtended.services';\nimport {\n  getIssuesCountsV2,\n  getIssuesSummaryV2,\n  getIssuesV2\n} from 'common/services/pdt.service';\nimport { PROJECTS } from '../services/projects.services';\nimport { getColor } from 'common/constants/_colors';\nimport IterationIssuesHeader from '../components/IterationIssuesHeader';\nimport { DELIVERY_STATES_KEYS } from '../projects.consts';\nimport { TRACKING } from 'common/constants/constants';\nimport { useHistory } from 'react-router';\nimport AppRouter from 'common/AppRouter';\nconst DEFAULT_ORDER = {\n  sort_column: 'story_points',\n  sort_direction: 'desc'\n};\n\nconst Scroll = styled.div`\n  width: 100%;\n  height: 100%;\n  ${verticalScroller()};\n`;\n\nexport default ({\n  project,\n  selectedIteration,\n  selectedDeliveryState,\n  chartConfig,\n  setSelectedDeliveryState\n}) => {\n  const [order, setOrder] = useState(DEFAULT_ORDER);\n  const [totals, setTotals] = useState({});\n  const [searchValue, setSearchValue] = useState('');\n  const [summaryData, setSummaryData] = useState({});\n  const [loading, setLoading] = useState(false);\n  const [deliveryStateIssues, setDeliveryStateIssues] = useState([]);\n  const history = useHistory();\n  const isPulse = history.location.pathname != AppRouter.PULSE.path;\n\n  useEffect(() => {\n    fetchData({ selectedIteration, searchValue, order, selectedDeliveryState });\n  }, [selectedIteration, searchValue, order, selectedDeliveryState]);\n\n  const getPayload = ({\n    selectedIteration,\n    searchValue,\n    order,\n    selectedDeliveryState\n  }) => {\n    return {\n      search_param: searchValue,\n      iteration_provider_ids: _.get(selectedIteration, 'merged_ids') || [\n        _.get(selectedIteration, 'provider_id')\n      ],\n      ...order,\n      project_id: project.id,\n      delivery_state: selectedDeliveryState\n    };\n  };\n\n  const formatTotals = totals => {\n    const counts = {\n      total_count: 0,\n      total_story_points: 0\n    };\n    const totalsMap = {\n      planned: { ...counts },\n      uncompleted: { ...counts },\n      added: { ...counts },\n      completed: { ...counts }\n    };\n    totals.forEach(item => {\n      if (item.status == 'planned') {\n        totalsMap.planned.total_count += item.total_count;\n        totalsMap.planned.total_story_points += item.total_story_points;\n      }\n      if (item.status == 'planned' && !item.completed) {\n        totalsMap.uncompleted.total_count += item.total_count;\n        totalsMap.uncompleted.total_story_points += item.total_story_points;\n      }\n      if (item.status == 'added') {\n        totalsMap.added.total_count += item.total_count;\n        totalsMap.added.total_story_points += item.total_story_points;\n      }\n      if (item.status == 'planned' && item.completed) {\n        totalsMap.completed.total_count += item.total_count;\n        totalsMap.completed.total_story_points += item.total_story_points;\n      }\n    });\n    return totalsMap;\n  };\n\n  const formatSummaryData = issues => {\n    const summaryDataMap = {\n      planned: [],\n      uncompleted: [],\n      added: [],\n      completed: []\n    };\n    return issues.reduce((previous, current) => {\n      previous[current.delivery_type].push(current);\n      return previous;\n    }, summaryDataMap);\n  };\n\n  const fetchData = async filters => {\n    setLoading(true);\n    const payload = getPayload(filters);\n    try {\n      const [totals, summary = [], allIssues = []] = await Promise.all([\n        getIssuesCountsV2(payload),\n        !selectedDeliveryState\n          ? getIssuesSummaryV2(payload)\n          : Promise.resolve([]),\n        selectedDeliveryState ? getIssuesV2(payload) : Promise.resolve([])\n      ]);\n      setTotals(formatTotals(totals));\n      setSummaryData(formatSummaryData(summary));\n      setDeliveryStateIssues(allIssues);\n    } catch (exp) {}\n    setLoading(false);\n  };\n\n  const onSort = async (colName, orderBy) => {\n    TrackingService.logEvent(TRACKING.EVENTS.CLICK, {\n      page: isPulse ? TRACKING.PAGES.PULSE : TRACKING.PAGES.PROJECTS,\n      click_type: TRACKING.CLICK.PDT_ISSUES_TABLE_SORT_CLICK,\n      sort_column: colName,\n      sort_direction: orderBy,\n      selected_delivery_type: selectedDeliveryState\n    });\n    setOrder({\n      sort_column: colName,\n      sort_direction: orderBy\n    });\n  };\n\n  const onRowClick = ({ issue_provider_url }) => {\n    TrackingService.logEvent(TRACKING.EVENTS.CLICK, {\n      page: isPulse ? TRACKING.PAGES.PULSE : TRACKING.PAGES.PROJECTS,\n      click_type: TRACKING.CLICK.PDT_ISSUES_TABLE_ROW_CLICK,\n      issue_url: issue_provider_url\n    });\n    window.open(issue_provider_url);\n  };\n\n  return (\n    <Scroll id='iterations_scroll'>\n      <Flex\n        minWidth={PROJECTS.LARGE_CHART_SIZE.width}\n        maxWidth={PROJECTS.LARGE_CHART_SIZE.width}\n        minHeight='calc(13.2rem * 4)'\n        maxHeight='calc(13.2rem * 4)'\n        borderLeft={`1px solid ${getColor('catskillWhite')}`}\n        borderTop={`1px solid ${getColor('catskillWhite')}`}\n        direction='column'\n      >\n        <IterationIssuesHeader\n          searchValue={searchValue}\n          setSearchValue={setSearchValue}\n        />\n        {loading ? (\n          <Padding t='medium' l='small'>\n            <Text>Loading...</Text>\n          </Padding>\n        ) : selectedDeliveryState ? (\n          <>\n            <Flex justify='center' pb='small'>\n              <Flex flex={1}>\n                <Text size='medium' padding={SPACES.small}>\n                  <Link\n                    onClick={() => {\n                      setSelectedDeliveryState(null);\n                    }}\n                  >\n                    &#60; Back\n                  </Link>\n                </Text>\n              </Flex>\n              <Flex flex={2} justify='center'>\n                <Text\n                  size='medium'\n                  padding={SPACES.small}\n                  textTransform='uppercase'\n                  color='shark'\n                  align='center'\n                >\n                  {_.get(\n                    DELIVERY_STATES_KEYS,\n                    `[${selectedDeliveryState}]title`,\n                    selectedDeliveryState\n                  )}{' '}\n                  ({_.get(totals, `${selectedDeliveryState}.total_count`, 0)})\n                </Text>\n              </Flex>\n              <Flex flex={1}></Flex>\n            </Flex>\n            <TableNoVerticalSpaces>\n              <TableNoVerticalLines>\n                <Table\n                  columns={getIssuesTableColumns({\n                    setSelectedDeliveryState,\n                    deliveryState: selectedDeliveryState,\n                    numOfIssues: _.get(\n                      totals,\n                      `${selectedDeliveryState}.total_count`,\n                      0\n                    ),\n                    numOfStorypoints: _.get(\n                      totals,\n                      `${selectedDeliveryState}.total_story_points`,\n                      0\n                    ),\n                    isSummary: false\n                  })}\n                  data={getIssuesTableData(deliveryStateIssues)}\n                  sortBy={order.sort_column}\n                  sortOrder={order.sort_direction}\n                  onSort={onSort}\n                  onRowClick={onRowClick}\n                ></Table>\n              </TableNoVerticalLines>\n            </TableNoVerticalSpaces>\n          </>\n        ) : (\n          chartConfig.sortedKeys.map(key => {\n            const rows = _.get(summaryData, key, []);\n            return rows.length ? (\n              <Padding b='medium' key={key}>\n                <TableNoVerticalSpaces>\n                  <TableNoVerticalLines>\n                    <Table\n                      columns={getIssuesTableColumns({\n                        setSelectedDeliveryState,\n                        deliveryState: key,\n                        numOfIssues: _.get(totals, `${key}.total_count`, 0),\n                        numOfStorypoints: Math.round(\n                          _.get(totals, `${key}.total_story_points`, 0)\n                        ),\n                        isSummary: true,\n                        isPulse\n                      })}\n                      data={getIssuesTableData(rows, true)}\n                      onRowClick={onRowClick}\n                    ></Table>\n                  </TableNoVerticalLines>\n                </TableNoVerticalSpaces>\n              </Padding>\n            ) : (\n              <></>\n            );\n          })\n        )}\n      </Flex>\n    </Scroll>\n  );\n};\n",
          new_content:
            "import React, { useState, useEffect } from 'react';\nimport _ from 'lodash';\nimport { Link } from '@material-ui/core';\nimport {\n  Padding,\n  TableNoVerticalLines,\n  TableNoVerticalSpaces,\n  Flex\n} from 'components/base/layout-components';\nimport Text from 'components/base/Text';\nimport Table from 'components/base/Table';\nimport { SPACES } from 'common/constants/sizes';\nimport styled from 'styled-components';\nimport { verticalScroller } from 'components/base/scroller';\nimport * as TrackingService from 'common/services/tracking.service';\n\nimport {\n  getIssuesTableColumns,\n  getIssuesTableData\n} from '../services/projectExtended.services';\nimport {\n  getIssuesCountsV2,\n  getIssuesSummaryV2,\n  getIssuesV2\n} from 'common/services/pdt.service';\nimport { PROJECTS } from '../services/projects.services';\nimport { getColor } from 'common/constants/_colors';\nimport IterationIssuesHeader from '../components/IterationIssuesHeader';\nimport { DELIVERY_STATES_KEYS } from '../projects.consts';\nimport { TRACKING } from 'common/constants/constants';\nimport { useHistory } from 'react-router';\nimport AppRouter from 'common/AppRouter';\nconst DEFAULT_ORDER = {\n  sort_column: 'story_points',\n  sort_direction: 'desc'\n};\n\nconst Scroll = styled.div`\n  width: 100%;\n  height: 100%;\n  ${verticalScroller()};\n`;\n\nexport default ({\n  project,\n  selectedIteration,\n  selectedDeliveryState,\n  chartConfig,\n  setSelectedDeliveryState\n}) => {\n  const [order, setOrder] = useState(DEFAULT_ORDER);\n  const [totals, setTotals] = useState({});\n  const [searchValue, setSearchValue] = useState('');\n  const [summaryData, setSummaryData] = useState({});\n  const [loading, setLoading] = useState(false);\n  const [deliveryStateIssues, setDeliveryStateIssues] = useState([]);\n  const history = useHistory();\n  const isPulse = history.location.pathname != AppRouter.PULSE.path;\n\n  useEffect(() => {\n    fetchData({ selectedIteration, searchValue, order, selectedDeliveryState });\n  }, [selectedIteration, searchValue, order, selectedDeliveryState]);\n\n  const getPayload = ({\n    selectedIteration,\n    searchValue,\n    order,\n    selectedDeliveryState\n  }) => {\n    return {\n      search_param: searchValue,\n      iteration_provider_ids: _.get(selectedIteration, 'merged_ids') || [\n        _.get(selectedIteration, 'provider_id')\n      ],\n      ...order,\n      project_id: project.id,\n      delivery_state: selectedDeliveryState\n    };\n  };\n\n  const formatTotals = totals => {\n    const counts = {\n      total_count: 0,\n      total_story_points: 0\n    };\n    const totalsMap = {\n      planned: { ...counts },\n      uncompleted: { ...counts },\n      added: { ...counts },\n      completed: { ...counts }\n    };\n    totals.forEach(item => {\n      if (item.status == 'planned') {\n        totalsMap.planned.total_count += item.total_count;\n        totalsMap.planned.total_story_points += item.total_story_points;\n      }\n      if (item.status == 'planned' && !item.completed) {\n        totalsMap.uncompleted.total_count += item.total_count;\n        totalsMap.uncompleted.total_story_points += item.total_story_points;\n      }\n      if (item.status == 'added') {\n        totalsMap.added.total_count += item.total_count;\n        totalsMap.added.total_story_points += item.total_story_points;\n      }\n      if (item.status == 'planned' && item.completed) {\n        totalsMap.completed.total_count += item.total_count;\n        totalsMap.completed.total_story_points += item.total_story_points;\n      }\n    });\n    return totalsMap;\n  };\n\n  const formatSummaryData = issues => {\n    const summaryDataMap = {\n      planned: [],\n      uncompleted: [],\n      added: [],\n      completed: []\n    };\n    return issues.reduce((previous, current) => {\n      previous[current.delivery_type].push(current);\n      return previous;\n    }, summaryDataMap);\n  };\n\n  const fetchData = async filters => {\n    setLoading(true);\n    const payload = getPayload(filters);\n    try {\n      const [totals, summary = [], allIssues = []] = await Promise.all([\n        getIssuesCountsV2(payload),\n        !selectedDeliveryState\n          ? getIssuesSummaryV2(payload)\n          : Promise.resolve([]),\n        selectedDeliveryState ? getIssuesV2(payload) : Promise.resolve([])\n      ]);\n      setTotals(formatTotals(totals));\n      setSummaryData(formatSummaryData(summary));\n      setDeliveryStateIssues(allIssues);\n    } catch (exp) {}\n    setLoading(false);\n  };\n\n  const onSort = async (colName, orderBy) => {\n    TrackingService.logEvent(TRACKING.EVENTS.CLICK, {\n      page: isPulse ? TRACKING.PAGES.PULSE : TRACKING.PAGES.PROJECTS,\n      click_type: TRACKING.CLICK.PDT_ISSUES_TABLE_SORT_CLICK,\n      sort_column: colName,\n      sort_direction: orderBy,\n      selected_delivery_type: selectedDeliveryState\n    });\n    setOrder({\n      sort_column: colName,\n      sort_direction: orderBy\n    });\n  };\n\n  const onRowClick = ({ issue_provider_url }) => {\n    TrackingService.logEvent(TRACKING.EVENTS.CLICK, {\n      page: isPulse ? TRACKING.PAGES.PULSE : TRACKING.PAGES.PROJECTS,\n      click_type: TRACKING.CLICK.PDT_ISSUES_TABLE_ROW_CLICK,\n      issue_url: issue_provider_url\n    });\n    window.open(issue_provider_url);\n  };\n\n  return (\n    <Scroll id='iterations_scroll'>\n      <Flex\n        minWidth={PROJECTS.LARGE_CHART_SIZE.width}\n        maxWidth={PROJECTS.LARGE_CHART_SIZE.width}\n        minHeight='calc(13.2rem * 4)'\n        maxHeight='calc(13.2rem * 4)'\n        borderLeft={`1px solid ${getColor('catskillWhite')}`}\n        borderTop={`1px solid ${getColor('catskillWhite')}`}\n        direction='column'\n      >\n        <IterationIssuesHeader\n          searchValue={searchValue}\n          setSearchValue={setSearchValue}\n        />\n        {loading ? (\n          <Padding t='medium' l='small'>\n            <Text>Loading...</Text>\n          </Padding>\n        ) : selectedDeliveryState ? (\n          <>\n            <Flex justify='center' pb='small'>\n              <Flex flex={1}>\n                <Text size='medium' padding={SPACES.small}>\n                  <Link\n                    onClick={() => {\n                      setSelectedDeliveryState(null);\n                    }}\n                  >\n                    &#60; Back\n                  </Link>\n                </Text>\n              </Flex>\n              <Flex flex={2} justify='center'>\n                <Text\n                  size='medium'\n                  padding={SPACES.small}\n                  textTransform='uppercase'\n                  color='shark'\n                  align='center'\n                >\n                  {_.get(\n                    DELIVERY_STATES_KEYS,\n                    `[${selectedDeliveryState}]title`,\n                    selectedDeliveryState\n                  )}{' '}\n                  ({_.get(totals, `${selectedDeliveryState}.total_count`, 0)})\n                </Text>\n              </Flex>\n              <Flex flex={1}></Flex>\n            </Flex>\n            <TableNoVerticalSpaces>\n              <TableNoVerticalLines>\n                <Table\n                  columns={getIssuesTableColumns({\n                    setSelectedDeliveryState,\n                    deliveryState: selectedDeliveryState,\n                    numOfIssues: _.get(\n                      totals,\n                      `${selectedDeliveryState}.total_count`,\n                      0\n                    ),\n                    numOfStorypoints: _.get(\n                      totals,\n                      `${selectedDeliveryState}.total_story_points`,\n                      0\n                    ),\n                    isSummary: false\n                  })}\n                  data={getIssuesTableData(deliveryStateIssues)}\n                  sortBy={order.sort_column}\n                  sortOrder={order.sort_direction}\n                  onSort={onSort}\n                  onRowClick={onRowClick}\n                ></Table>\n              </TableNoVerticalLines>\n            </TableNoVerticalSpaces>\n          </>\n        ) : (\n          chartConfig.sortedKeys.map(key => {\n            const rows = _.get(summaryData, key, []);\n            return rows.length ? (\n              <Padding b='medium' key={key}>\n                <TableNoVerticalSpaces>\n                  <TableNoVerticalLines>\n                    <Table\n                      columns={getIssuesTableColumns({\n                        setSelectedDeliveryState,\n                        deliveryState: key,\n                        numOfIssues: _.get(totals, `${key}.total_count`, 0),\n                        numOfStorypoints: Math.round(\n                          _.get(totals, `${key}.total_story_points`, 0)\n                        ),\n                        isSummary: true,\n                        isPulse\n                      })}\n                      data={getIssuesTableData(rows, true)}\n                      onRowClick={onRowClick}\n                    ></Table>\n                  </TableNoVerticalLines>\n                </TableNoVerticalSpaces>\n              </Padding>\n            ) : (\n              <></>\n            );\n          })\n        )}\n      </Flex>\n    </Scroll>\n  );\n};\n///das",
        },
      ],
    },
  },
  repo: {
    owner: 'linear-b',
    contributors: {
      'Oriel Zaken <oriel@linearb.io>': 2358,
      '“Keren <keren@linearb.io>': 2293,
      'Zuki Sarusi <zuki@linearb.io>': 1112,
      'flomermer <tomer.flom@linearb.io>': 1006,
      'ShakedZrihen <shaked.zrihen@gmail.com>': 968,
      'Fadi Khayo <khayofadi@gmail.com>': 744,
      'Noam Hofshi <noam@linearb.io>': 459,
      'Miki Michaeli <miki@linearb.io>': 359,
      'Github action <action@linearb.io>': 330,
      'shaked zohar <30412727+ShakedZrihen@users.noreply.github.com>': 324,
      'Tomer Flom <tomer.flom@linearb.io>': 307,
      'Fadi Khayo <33923689+Fadikhayo1995@users.noreply.github.com>': 302,
      'matan-ubuntu <mbytester9898@gmail.com>': 288,
      'Keren Shiloah <68225563+KerenLinearB@users.noreply.github.com>': 237,
      'Keren <keren@linearb.io>': 204,
      'Yishai Beeri <yishai@linearb.io>': 196,
      'omri marcovitch <omri.marcovitch@linearb.io>': 154,
      'matan-ubuntu <matanby94@gmail.com>': 148,
      'Yovel Elad <yuvel.elad@gmail.com>': 133,
      'Zuki Sarusi <61375831+zuki-linB@users.noreply.github.com>': 124,
      'Keren Shiloah <keren@linearb.io>': 100,
      'Alexander Chernov <alex.chernov@linearb.io>': 93,
      'matan-mac <matanby94@gmail.com>': 91,
      'Boaz Dremer <45198223+boazlinearb@users.noreply.github.com>': 88,
      'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>': 63,
      'Keren Shiloah <kerenshiloah@MacBook-Pro.local>': 57,
      'Omri Marcovitch <omarcovitch@gmail.com>': 57,
      'Yovel Elad <79972883+YovelElad@users.noreply.github.com>': 54,
      'Matan Ben Yair <mbytester9898@gmail.com>': 53,
      'Ariel <ariel@linearb.io>': 50,
      'bennyLinearB <benny@linearb.io>': 46,
      'ofer affias <ofer.affias@gmail.com>': 45,
      'Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>': 45,
      'Alexander Chernov <97388287+alexChernovLinearB@users.noreply.github.com>': 41,
      'ShaniBelisha <shani.belisha@linearb.io>': 36,
      'zuki sarusi <zuki@linearb.io>': 34,
      'shaked zohar <shaked.zrihen@gmail.com>': 31,
      'Shani <102466679+ShaniBelisha@users.noreply.github.com>': 27,
      'Ori Keren <39879781+orikrn@users.noreply.github.com>': 25,
      'Alon Galperin <alongalperin@Alons-MacBook-Pro.local>': 22,
      'Benny Kachanovsky <57859949+bennyLinearB@users.noreply.github.com>': 20,
      'Ariel Illouz <48905780+ariel-linearb@users.noreply.github.com>': 20,
      'Alon Galperin <105145534+alongalperin-lb@users.noreply.github.com>': 19,
      'Zuki Sarusi <zukisarusi@Zukis-MacBook-Pro.local>': 18,
      'eitanm <eitanm@tikalk.com>': 17,
      'ronyeh-lb <ron@linearb.io>': 15,
      'Stas Onichak <stas@linearb.io>': 15,
      'Noam Hofshi <58387017+noamh-lin@users.noreply.github.com>': 14,
      'Avishag Sahar <42721195+saharavishag@users.noreply.github.com>': 14,
      'Ron Yehuda <79041106+ronyeh-lb@users.noreply.github.com>': 13,
      'omarcovitch <omarcovitch@gmail.com>': 12,
      'Alon Galperin <alon.galperin@linearb.io>': 12,
      'Keren Shiloah <kerenshiloah@macbook-pro.lan>': 11,
      'Ariel Illouz <ariel@linearb.io>': 11,
      'Oriel Zaken <orielux@gmail.com>': 10,
      'ronyeh-lb <79041106+ronyeh-lb@users.noreply.github.com>': 8,
      'Ariel <ariel@ariels-mbp.mynet>': 8,
      'Roy Reshef <reshef.roy@gmail.com>': 8,
      'yeelali14 <52451294+yeelali14@users.noreply.github.com>': 7,
      'Ofer Affias <ofer.affias@gmail.com>': 6,
      'Eldad Marciano <eldad@linearb.io>': 6,
      'Yeela Lifshitz <yeelalifshitz@Yeelas-MacBook-Pro.local>': 6,
      'Yaara Shoham <yaara.shohamd@gmail.com>': 6,
      'Yeela Lifshitz <52451294+yeelali14@users.noreply.github.com>': 5,
      'alongalperin-lb <105145534+alongalperin-lb@users.noreply.github.com>': 3,
      'ShaniBelisha <102466679+ShaniBelisha@users.noreply.github.com>': 3,
      'Moti Zamir <63998921+zamboosh@users.noreply.github.com>': 3,
      'Ron Yehuda <79041106+lb-ronyeh@users.noreply.github.com>': 3,
      'emasuary <37768057+emasuary@users.noreply.github.com>': 2,
      'Yoni Amikam <yoni.amikam@linearb.io>': 2,
      'Elad Kohavi <106978846+EladKohavi@users.noreply.github.com>': 2,
      'Dekel Bayazi <96546565+dekelbyz@users.noreply.github.com>': 2,
      'Avishag Sahar <avishag.sahar@gmail.com>': 2,
      'Administrator <admin@example.com>': 2,
      'snyk-bot <snyk-bot@snyk.io>': 2,
      'boazlinearb <boaz@astricomsoft.com>': 1,
      'Yeela Lifshitz <yeelalifshitz@Yeelas-MBP.lan>': 1,
      'Roy <reshef.roy@gmail.com>': 1,
      'Keren Shiloah <kerenshiloah@Shays-MacBook-Pro-2.local>': 1,
      'Dekel Bayazi <dekel.bayazi@tikalk.com>': 1,
      'Eitan Masuary <37768057+emasuary@users.noreply.github.com>': 1,
      'emasuary <eitan.masuary@gmail.com>': 1,
      'stas-linearb <84438797+stas-linearb@users.noreply.github.com>': 1,
      'gitstream-cm[bot] <111687743+gitstream-cm[bot]@users.noreply.github.com>': 1,
    },
    provider: 'github',
    git_to_provider_user: {
      'Oriel Zaken <oriel@linearb.io>': 'orielz',
      'flomermer <tomer.flom@linearb.io>': 'flomermer',
      'ShakedZrihen <shaked.zrihen@gmail.com>': 'ShakedZrihen',
      'shaked zohar <30412727+ShakedZrihen@users.noreply.github.com>':
        'ShakedZrihen',
      'Fadi Khayo <33923689+Fadikhayo1995@users.noreply.github.com>':
        'Fadikhayo1995',
      'Keren Shiloah <68225563+KerenLinearB@users.noreply.github.com>':
        'KerenLinearB',
      'Yishai Beeri <yishai@linearb.io>': 'yishaibeeri',
      'Yovel Elad <yuvel.elad@gmail.com>': 'YovelElad',
      'Zuki Sarusi <61375831+zuki-linB@users.noreply.github.com>': 'zuki-linB',
      'Omri Marcovitch <omarcovitch@gmail.com>': 'omarcovitch',
      'Yovel Elad <79972883+YovelElad@users.noreply.github.com>': 'YovelElad',
      'Alexander Chernov <97388287+alexChernovLinearB@users.noreply.github.com>':
        'alexChernovLinearB',
      'ShaniBelisha <shani.belisha@linearb.io>': 'ShaniBelisha',
      'Shani <102466679+ShaniBelisha@users.noreply.github.com>': 'ShaniBelisha',
      'Ori Keren <39879781+orikrn@users.noreply.github.com>': 'orikrn',
      'Ariel Illouz <48905780+ariel-linearb@users.noreply.github.com>':
        'ariel-linearb',
      'Alon Galperin <105145534+alongalperin-lb@users.noreply.github.com>':
        'alongalperin-lb',
      'Noam Hofshi <58387017+noamh-lin@users.noreply.github.com>': 'noamh-lin',
      'Avishag Sahar <42721195+saharavishag@users.noreply.github.com>':
        'saharavishag',
      'omarcovitch <omarcovitch@gmail.com>': 'omarcovitch',
      'Oriel Zaken <orielux@gmail.com>': 'orielz',
      'yeelali14 <52451294+yeelali14@users.noreply.github.com>': 'yeelali14',
      'Yaara Shoham <yaara.shohamd@gmail.com>': 'Yaarash',
      'Yeela Lifshitz <52451294+yeelali14@users.noreply.github.com>':
        'yeelali14',
      'alongalperin-lb <105145534+alongalperin-lb@users.noreply.github.com>':
        'alongalperin-lb',
      'ShaniBelisha <102466679+ShaniBelisha@users.noreply.github.com>':
        'ShaniBelisha',
      'Moti Zamir <63998921+zamboosh@users.noreply.github.com>': 'zamboosh',
      'Ron Yehuda <79041106+lb-ronyeh@users.noreply.github.com>': 'lb-ronyeh',
      'emasuary <37768057+emasuary@users.noreply.github.com>': 'emasuary',
      'Elad Kohavi <106978846+EladKohavi@users.noreply.github.com>':
        'EladKohavi',
      'Eitan Masuary <37768057+emasuary@users.noreply.github.com>': 'emasuary',
      'emasuary <eitan.masuary@gmail.com>': 'emasuary',
      'stas-linearb <84438797+stas-linearb@users.noreply.github.com>':
        'stas-linearb',
      'Zuki Sarusi <zuki@linearb.io>': 'zuki-linB',
      'Fadi Khayo <khayofadi@gmail.com>': 'Fadikhayo1995',
      'Noam Hofshi <noam@linearb.io>': 'noamh-lin',
      'Tomer Flom <tomer.flom@linearb.io>': 'flomermer',
      'omri marcovitch <omri.marcovitch@linearb.io>': 'omarcovitch',
      'Keren Shiloah <keren@linearb.io>': 'KerenLinearB',
      'Alexander Chernov <alex.chernov@linearb.io>': 'alexChernovLinearB',
      'Keren Shiloah <kerenshiloah@MacBook-Pro.local>': 'KerenLinearB',
      'ofer affias <ofer.affias@gmail.com>': 'vim-zz',
      'Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>': 'yeelali14',
      'zuki sarusi <zuki@linearb.io>': 'zuki-linB',
      'shaked zohar <shaked.zrihen@gmail.com>': 'ShakedZrihen',
      'Alon Galperin <alongalperin@Alons-MacBook-Pro.local>': 'alongalperin-lb',
      'Zuki Sarusi <zukisarusi@Zukis-MacBook-Pro.local>': 'zuki-linB',
      'Stas Onichak <stas@linearb.io>': 'stas-linearb',
      'Ron Yehuda <79041106+ronyeh-lb@users.noreply.github.com>': 'lb-ronyeh',
      'Alon Galperin <alon.galperin@linearb.io>': 'alongalperin-lb',
      'Keren Shiloah <kerenshiloah@macbook-pro.lan>': 'KerenLinearB',
      'Ariel Illouz <ariel@linearb.io>': 'ariel-linearb',
      'Ofer Affias <ofer.affias@gmail.com>': 'vim-zz',
      'Yeela Lifshitz <yeelalifshitz@Yeelas-MacBook-Pro.local>': 'yeelali14',
      'Yoni Amikam <yoni.amikam@linearb.io>': 'yoni-amikam',
      'Avishag Sahar <avishag.sahar@gmail.com>': 'saharavishag',
      'Yeela Lifshitz <yeelalifshitz@Yeelas-MBP.lan>': 'yeelali14',
      'Keren Shiloah <kerenshiloah@Shays-MacBook-Pro-2.local>': 'KerenLinearB',
      '“Keren <keren@linearb.io>': '“Keren <keren@linearb.io>',
      'Miki Michaeli <miki@linearb.io>': 'Miki Michaeli <miki@linearb.io>',
      'Github action <action@linearb.io>': 'Github action <action@linearb.io>',
      'matan-ubuntu <mbytester9898@gmail.com>':
        'matan-ubuntu <mbytester9898@gmail.com>',
      'Keren <keren@linearb.io>': 'Keren <keren@linearb.io>',
      'matan-ubuntu <matanby94@gmail.com>':
        'matan-ubuntu <matanby94@gmail.com>',
      'matan-mac <matanby94@gmail.com>': 'matan-mac <matanby94@gmail.com>',
      'Boaz Dremer <45198223+boazlinearb@users.noreply.github.com>':
        'Boaz Dremer <45198223+boazlinearb@users.noreply.github.com>',
      'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>':
        'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>',
      'Matan Ben Yair <mbytester9898@gmail.com>':
        'Matan Ben Yair <mbytester9898@gmail.com>',
      'Ariel <ariel@linearb.io>': 'Ariel <ariel@linearb.io>',
      'bennyLinearB <benny@linearb.io>': 'bennyLinearB <benny@linearb.io>',
      'Benny Kachanovsky <57859949+bennyLinearB@users.noreply.github.com>':
        'Benny Kachanovsky <57859949+bennyLinearB@users.noreply.github.com>',
      'eitanm <eitanm@tikalk.com>': 'emasuary',
      'ronyeh-lb <ron@linearb.io>': 'ronyeh-lb <ron@linearb.io>',
      'ronyeh-lb <79041106+ronyeh-lb@users.noreply.github.com>':
        'ronyeh-lb <79041106+ronyeh-lb@users.noreply.github.com>',
      'Ariel <ariel@ariels-mbp.mynet>': 'Ariel <ariel@ariels-mbp.mynet>',
      'Roy Reshef <reshef.roy@gmail.com>': 'Roy Reshef <reshef.roy@gmail.com>',
      'Eldad Marciano <eldad@linearb.io>': 'Eldad Marciano <eldad@linearb.io>',
      'Dekel Bayazi <96546565+dekelbyz@users.noreply.github.com>':
        'Dekel Bayazi <96546565+dekelbyz@users.noreply.github.com>',
      'Administrator <admin@example.com>': 'Administrator <admin@example.com>',
      'snyk-bot <snyk-bot@snyk.io>': 'snyk-bot <snyk-bot@snyk.io>',
      'boazlinearb <boaz@astricomsoft.com>':
        'boazlinearb <boaz@astricomsoft.com>',
      'Roy <reshef.roy@gmail.com>': 'Roy <reshef.roy@gmail.com>',
      'Dekel Bayazi <dekel.bayazi@tikalk.com>':
        'Dekel Bayazi <dekel.bayazi@tikalk.com>',
      'gitstream-cm[bot] <111687743+gitstream-cm[bot]@users.noreply.github.com>':
        'gitstream-cm[bot] <111687743+gitstream-cm[bot]@users.noreply.github.com>',
    },
    age: 1540,
    author_age: 38,
    blame: {
      'src/App.js': {
        'omri marcovitch <omri.marcovitch@linearb.io>': 2.8301886792452833,
        'Oriel Zaken <oriel@linearb.io>': 59.43396226415094,
        'omarcovitch <omarcovitch@gmail.com>': 11.320754716981133,
        'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>': 2.8301886792452833,
        'boazlinearb <boaz@astricomsoft.com>': 3.7735849056603774,
        'Keren Shiloah <kerenshiloah@macbook-pro.lan>': 2.8301886792452833,
        'Avishag Sahar <42721195+saharavishag@users.noreply.github.com>': 7.547169811320755,
        'Yishai Beeri <yishai@linearb.io>': 1.8867924528301887,
        'Zuki Sarusi <zuki@linearb.io>': 6.60377358490566,
        'Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>': 0.9433962264150944,
      },
      'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js':
        {
          'Fadi Khayo <khayofadi@gmail.com>': 100,
        },
    },
    git_activity: {
      'src/App.js': {
        'Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>': {
          week_0: 5,
        },
        'Ofer Affias <ofer.affias@gmail.com>': {
          week_2: 1,
        },
        'Yeela Lifshitz <52451294+yeelali14@users.noreply.github.com>': {
          week_2: 5,
        },
        'ofer affias <ofer.affias@gmail.com>': {
          week_8: 1,
        },
        'omarcovitch <omarcovitch@gmail.com>': {
          week_38: 27,
        },
        'omri marcovitch <omri.marcovitch@linearb.io>': {
          week_39: 12,
          week_40: 39,
        },
        'Avishag Sahar <42721195+saharavishag@users.noreply.github.com>': {
          week_42: 9,
        },
      },
      'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js':
        {
          'Fadi Khayo <khayofadi@gmail.com>': {
            week_20: 27,
            week_27: 5,
            week_30: 6,
            week_31: 39,
            week_32: 242,
          },
        },
    },
    pr_author: 'yeelali14',
    data_service: {
      expert_reviwer_request: {
        merge_dict: {
          'Oriel Zaken <oriel@linearb.io>': 'orielz',
          'flomermer <tomer.flom@linearb.io>': 'flomermer',
          'ShakedZrihen <shaked.zrihen@gmail.com>': 'ShakedZrihen',
          'shaked zohar <30412727+ShakedZrihen@users.noreply.github.com>':
            'ShakedZrihen',
          'Fadi Khayo <33923689+Fadikhayo1995@users.noreply.github.com>':
            'Fadikhayo1995',
          'Keren Shiloah <68225563+KerenLinearB@users.noreply.github.com>':
            'KerenLinearB',
          'Yishai Beeri <yishai@linearb.io>': 'yishaibeeri',
          'Yovel Elad <yuvel.elad@gmail.com>': 'YovelElad',
          'Zuki Sarusi <61375831+zuki-linB@users.noreply.github.com>':
            'zuki-linB',
          'Omri Marcovitch <omarcovitch@gmail.com>': 'omarcovitch',
          'Yovel Elad <79972883+YovelElad@users.noreply.github.com>':
            'YovelElad',
          'Alexander Chernov <97388287+alexChernovLinearB@users.noreply.github.com>':
            'alexChernovLinearB',
          'ShaniBelisha <shani.belisha@linearb.io>': 'ShaniBelisha',
          'Shani <102466679+ShaniBelisha@users.noreply.github.com>':
            'ShaniBelisha',
          'Ori Keren <39879781+orikrn@users.noreply.github.com>': 'orikrn',
          'Ariel Illouz <48905780+ariel-linearb@users.noreply.github.com>':
            'ariel-linearb',
          'Alon Galperin <105145534+alongalperin-lb@users.noreply.github.com>':
            'alongalperin-lb',
          'Noam Hofshi <58387017+noamh-lin@users.noreply.github.com>':
            'noamh-lin',
          'Avishag Sahar <42721195+saharavishag@users.noreply.github.com>':
            'saharavishag',
          'omarcovitch <omarcovitch@gmail.com>': 'omarcovitch',
          'Oriel Zaken <orielux@gmail.com>': 'orielz',
          'yeelali14 <52451294+yeelali14@users.noreply.github.com>':
            'yeelali14',
          'Yaara Shoham <yaara.shohamd@gmail.com>': 'Yaarash',
          'Yeela Lifshitz <52451294+yeelali14@users.noreply.github.com>':
            'yeelali14',
          'alongalperin-lb <105145534+alongalperin-lb@users.noreply.github.com>':
            'alongalperin-lb',
          'ShaniBelisha <102466679+ShaniBelisha@users.noreply.github.com>':
            'ShaniBelisha',
          'Moti Zamir <63998921+zamboosh@users.noreply.github.com>': 'zamboosh',
          'Ron Yehuda <79041106+lb-ronyeh@users.noreply.github.com>':
            'lb-ronyeh',
          'emasuary <37768057+emasuary@users.noreply.github.com>': 'emasuary',
          'Elad Kohavi <106978846+EladKohavi@users.noreply.github.com>':
            'EladKohavi',
          'Eitan Masuary <37768057+emasuary@users.noreply.github.com>':
            'emasuary',
          'emasuary <eitan.masuary@gmail.com>': 'emasuary',
          'stas-linearb <84438797+stas-linearb@users.noreply.github.com>':
            'stas-linearb',
          'Zuki Sarusi <zuki@linearb.io>': 'zuki-linB',
          'Fadi Khayo <khayofadi@gmail.com>': 'Fadikhayo1995',
          'Noam Hofshi <noam@linearb.io>': 'noamh-lin',
          'Tomer Flom <tomer.flom@linearb.io>': 'flomermer',
          'omri marcovitch <omri.marcovitch@linearb.io>': 'omarcovitch',
          'Keren Shiloah <keren@linearb.io>': 'KerenLinearB',
          'Alexander Chernov <alex.chernov@linearb.io>': 'alexChernovLinearB',
          'Keren Shiloah <kerenshiloah@MacBook-Pro.local>': 'KerenLinearB',
          'ofer affias <ofer.affias@gmail.com>': 'vim-zz',
          'Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>': 'yeelali14',
          'zuki sarusi <zuki@linearb.io>': 'zuki-linB',
          'shaked zohar <shaked.zrihen@gmail.com>': 'ShakedZrihen',
          'Alon Galperin <alongalperin@Alons-MacBook-Pro.local>':
            'alongalperin-lb',
          'Zuki Sarusi <zukisarusi@Zukis-MacBook-Pro.local>': 'zuki-linB',
          'Stas Onichak <stas@linearb.io>': 'stas-linearb',
          'Ron Yehuda <79041106+ronyeh-lb@users.noreply.github.com>':
            'lb-ronyeh',
          'Alon Galperin <alon.galperin@linearb.io>': 'alongalperin-lb',
          'Keren Shiloah <kerenshiloah@macbook-pro.lan>': 'KerenLinearB',
          'Ariel Illouz <ariel@linearb.io>': 'ariel-linearb',
          'Ofer Affias <ofer.affias@gmail.com>': 'vim-zz',
          'Yeela Lifshitz <yeelalifshitz@Yeelas-MacBook-Pro.local>':
            'yeelali14',
          'Yoni Amikam <yoni.amikam@linearb.io>': 'yoni-amikam',
          'Avishag Sahar <avishag.sahar@gmail.com>': 'saharavishag',
          'Yeela Lifshitz <yeelalifshitz@Yeelas-MBP.lan>': 'yeelali14',
          'Keren Shiloah <kerenshiloah@Shays-MacBook-Pro-2.local>':
            'KerenLinearB',
          '“Keren <keren@linearb.io>': '“Keren <keren@linearb.io>',
          'Miki Michaeli <miki@linearb.io>': 'Miki Michaeli <miki@linearb.io>',
          'Github action <action@linearb.io>':
            'Github action <action@linearb.io>',
          'matan-ubuntu <mbytester9898@gmail.com>':
            'matan-ubuntu <mbytester9898@gmail.com>',
          'Keren <keren@linearb.io>': 'Keren <keren@linearb.io>',
          'matan-ubuntu <matanby94@gmail.com>':
            'matan-ubuntu <matanby94@gmail.com>',
          'matan-mac <matanby94@gmail.com>': 'matan-mac <matanby94@gmail.com>',
          'Boaz Dremer <45198223+boazlinearb@users.noreply.github.com>':
            'Boaz Dremer <45198223+boazlinearb@users.noreply.github.com>',
          'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>':
            'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>',
          'Matan Ben Yair <mbytester9898@gmail.com>':
            'Matan Ben Yair <mbytester9898@gmail.com>',
          'Ariel <ariel@linearb.io>': 'Ariel <ariel@linearb.io>',
          'bennyLinearB <benny@linearb.io>': 'bennyLinearB <benny@linearb.io>',
          'Benny Kachanovsky <57859949+bennyLinearB@users.noreply.github.com>':
            'Benny Kachanovsky <57859949+bennyLinearB@users.noreply.github.com>',
          'eitanm <eitanm@tikalk.com>': 'emasuary',
          'ronyeh-lb <ron@linearb.io>': 'ronyeh-lb <ron@linearb.io>',
          'ronyeh-lb <79041106+ronyeh-lb@users.noreply.github.com>':
            'ronyeh-lb <79041106+ronyeh-lb@users.noreply.github.com>',
          'Ariel <ariel@ariels-mbp.mynet>': 'Ariel <ariel@ariels-mbp.mynet>',
          'Roy Reshef <reshef.roy@gmail.com>':
            'Roy Reshef <reshef.roy@gmail.com>',
          'Eldad Marciano <eldad@linearb.io>':
            'Eldad Marciano <eldad@linearb.io>',
          'Dekel Bayazi <96546565+dekelbyz@users.noreply.github.com>':
            'Dekel Bayazi <96546565+dekelbyz@users.noreply.github.com>',
          'Administrator <admin@example.com>':
            'Administrator <admin@example.com>',
          'snyk-bot <snyk-bot@snyk.io>': 'snyk-bot <snyk-bot@snyk.io>',
          'boazlinearb <boaz@astricomsoft.com>':
            'boazlinearb <boaz@astricomsoft.com>',
          'Roy <reshef.roy@gmail.com>': 'Roy <reshef.roy@gmail.com>',
          'Dekel Bayazi <dekel.bayazi@tikalk.com>':
            'Dekel Bayazi <dekel.bayazi@tikalk.com>',
          'gitstream-cm[bot] <111687743+gitstream-cm[bot]@users.noreply.github.com>':
            'gitstream-cm[bot] <111687743+gitstream-cm[bot]@users.noreply.github.com>',
        },
        pr_files: {
          'src/App.js': {
            blame:
              'author omri marcovitch author-mail <omri.marcovitch@linearb.io>\nauthor omri marcovitch author-mail <omri.marcovitch@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor omri marcovitch author-mail <omri.marcovitch@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor Boaz Dremer author-mail <boazdremer@Boazs-MacBook-Pro.local>\nauthor boazlinearb author-mail <boaz@astricomsoft.com>\nauthor Keren Shiloah author-mail <kerenshiloah@macbook-pro.lan>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Yishai Beeri author-mail <yishai@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Yishai Beeri author-mail <yishai@linearb.io>\nauthor Keren Shiloah author-mail <kerenshiloah@macbook-pro.lan>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Avishag Sahar author-mail <42721195+saharavishag@users.noreply.github.com>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Keren Shiloah author-mail <kerenshiloah@macbook-pro.lan>\nauthor boazlinearb author-mail <boaz@astricomsoft.com>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Zuki Sarusi author-mail <zuki@linearb.io>\nauthor Zuki Sarusi author-mail <zuki@linearb.io>\nauthor Boaz Dremer author-mail <boazdremer@Boazs-MacBook-Pro.local>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor omarcovitch author-mail <omarcovitch@gmail.com>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Zuki Sarusi author-mail <zuki@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Zuki Sarusi author-mail <zuki@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Boaz Dremer author-mail <boazdremer@Boazs-MacBook-Pro.local>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor Zuki Sarusi author-mail <zuki@linearb.io>\nauthor Zuki Sarusi author-mail <zuki@linearb.io>\nauthor boazlinearb author-mail <boaz@astricomsoft.com>\nauthor Oriel Zaken author-mail <oriel@linearb.io>\nauthor boazlinearb author-mail <boaz@astricomsoft.com>\nauthor Yeela Lifshitz author-mail <yeelalifshitz@MacBook-Pro-8.local>\nauthor Zuki Sarusi author-mail <zuki@linearb.io>\n',
            activity:
              'Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>,Tue Feb 28 15:58:52 2023 +0200\n\n1\t4\tsrc/App.js\nOfer Affias <ofer.affias@gmail.com>,Wed Feb 15 13:58:10 2023 +0200\n\n0\t1\tsrc/App.js\nYeela Lifshitz <52451294+yeelali14@users.noreply.github.com>,Wed Feb 15 13:57:27 2023 +0200\n\n4\t1\tsrc/App.js\nofer affias <ofer.affias@gmail.com>,Mon Jan 2 11:25:12 2023 +0200\n\n0\t1\tsrc/App.js\nomarcovitch <omarcovitch@gmail.com>,Thu Jun 2 16:41:30 2022 +0300\n\n13\t14\tsrc/App.js\nomri marcovitch <omri.marcovitch@linearb.io>,Mon May 30 14:53:07 2022 +0300\n\n1\t1\tsrc/App.js\nomri marcovitch <omri.marcovitch@linearb.io>,Mon May 30 12:03:16 2022 +0300\n\n2\t8\tsrc/App.js\nomri marcovitch <omri.marcovitch@linearb.io>,Sun May 22 14:57:35 2022 +0300\n\n4\t3\tsrc/App.js\nomri marcovitch <omri.marcovitch@linearb.io>,Sun May 22 11:50:37 2022 +0300\n\n19\t13\tsrc/App.js\nAvishag Sahar <42721195+saharavishag@users.noreply.github.com>,Tue May 10 14:19:21 2022 +0300\n\n8\t1\tsrc/App.js\n',
          },
          'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js':
            {
              blame:
                'author Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\nauthor Fadi Khayo author-mail <khayofadi@gmail.com>\n',
              activity:
                'Fadi Khayo <khayofadi@gmail.com>,Sun Oct 9 13:43:38 2022 +0300\n\n2\t1\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Sun Oct 9 12:44:25 2022 +0300\n\n22\t2\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Mon Aug 22 13:59:00 2022 +0300\n\n2\t1\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Thu Aug 18 09:47:33 2022 +0300\n\n1\t1\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Sun Jul 31 10:57:49 2022 +0300\n\n2\t4\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Tue Jul 26 10:15:42 2022 +0300\n\n30\t9\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Wed Jul 20 10:11:00 2022 +0300\n\n6\t2\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Tue Jul 19 18:01:24 2022 +0300\n\n1\t1\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\nFadi Khayo <khayofadi@gmail.com>,Mon Jul 18 11:23:16 2022 +0300\n\n232\t0\tsrc/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js\n',
            },
        },
        context: {
          org: 'linear-b',
          repo: 'gitstream-test-repo',
          pullRequestNumber: 133,
          branch: 'wwf-1801-new',
          triggeredBy: 'yeelali14',
        },
      },
    },
  },
  files: [
    'src/App.js',
    'src/views/root/views/home/views/ProjectsApi/ProjectExtended/PDTIssuesTable.js',
  ],
  pr: {
    isFullyInstalled: true,
    title: 'ok',
    approvals: [],
    author: 'yeelali14',
    description:
      "# PR Description\r\n\r\n- [Jira Ticket](https://linearb.atlassian.net/browse/LINB-XXXX)\r\n\r\n## Changes\r\n\r\n- ---- ADD CHANGE HERE ----\r\n\r\n## Screenshots\r\n\r\n## PR Checklist\r\n\r\n- [x] Tested locally\r\n- [x] Tested in dev\r\n- [ ] Add Unit tests\r\n- [ ] Add cypress flow if it's a new feature\r\n",
    checks: [],
    created_at: '2023-03-01T19:31:49Z',
    draft: false,
    mergeable: true,
    labels: [''],
    reviewers: [],
    status: 'OPEN',
    updated_at: '2023-03-01T19:39:34Z',
    assignees: [],
    contributors: [
      {
        login: 'vim-zz',
        name: 'Ofer Affias',
      },
      {
        login: 'almog27',
        name: 'Almog Ben David',
      },
      {
        login: 'yishaibeeri',
        name: 'Yishai Beeri',
      },
      {
        login: 'orielz',
        name: 'Oriel Zaken',
      },
      {
        login: 'amitmohleji',
        name: 'Amit Mohleji',
      },
      {
        login: 'vscabral',
        name: 'Val Cabral',
      },
      {
        login: 'flomermer',
        name: 'Tomer Flom',
      },
      {
        login: 'Yaarash',
        name: 'Yaara Shoham',
      },
      {
        login: 'omarcovitch',
        name: 'Omri Marcovitch',
      },
      {
        login: 'ShakedZrihen',
        name: 'shaked zohar',
      },
      {
        login: 'Fadikhayo1995',
        name: 'Fadi Khayo',
      },
      {
        login: 'emasuary',
        name: 'Eitan Masuary',
      },
      {
        login: 'orikrn',
        name: 'Ori Keren',
      },
      {
        login: 'linknfg182',
        name: 'Dan Lines',
      },
      {
        login: 'saharavishag',
        name: 'Avishag Sahar',
      },
      {
        login: 'linearbci',
        name: 'LinearB Automation',
      },
      {
        login: 'ariel-linearb',
        name: 'Ariel Illouz',
      },
      {
        login: 'yeelali14',
        name: 'Yeela Lifshitz',
      },
      {
        login: 'noamh-lin',
        name: 'Noam Hofshi',
      },
      {
        login: 'zuki-linB',
        name: 'Zuki Sarusi',
      },
      {
        login: 'zamboosh',
        name: 'Moti Zamir',
      },
      {
        login: 'mavery-linb',
        name: 'Mike Avery',
      },
      {
        login: 'Eran-Shitrit',
        name: 'Eran',
      },
      {
        login: 'KerenLinearB',
        name: 'Keren Shiloah',
      },
      {
        login: 'LiorF-BDBQ',
        name: null,
      },
      {
        login: 'lb-ronyeh',
        name: 'Ron Yehuda',
      },
      {
        login: 'YovelElad',
        name: 'Yovel Elad',
      },
      {
        login: 'aviah42',
        name: 'Aviah Laor',
      },
      {
        login: 'stas-linearb',
        name: 'Stas Onichak ',
      },
      {
        login: 'BetsyRogers',
        name: 'Betsy Rogers',
      },
      {
        login: 'Hadarbitan149',
        name: 'hadar bitan',
      },
      {
        login: 'shirels',
        name: 'Shirel Lugasi',
      },
      {
        login: 'negevyoav',
        name: 'Yoav Negev',
      },
      {
        login: 'RoyKulik',
        name: 'Roy Kulik',
      },
      {
        login: 'yoni-amikam',
        name: 'Yoni Amikam',
      },
      {
        login: 'alexChernovLinearB',
        name: 'Alexander Chernov',
      },
      {
        login: 'ZWLinearB',
        name: 'Zach Westall',
      },
      {
        login: 'urikochav',
        name: 'Uri Kochavi',
      },
      {
        login: 'ShaniBelisha',
        name: 'Shani',
      },
      {
        login: 'orenylinearb',
        name: 'oren yosef',
      },
      {
        login: 'alongalperin-lb',
        name: 'Alon Galperin',
      },
      {
        login: 'Dudu-linb',
        name: 'Dudu Yosef',
      },
      {
        login: 'EladKohavi',
        name: 'Elad Kohavi',
      },
      {
        login: 'nivSwisa1',
        name: 'Niv Swisa',
      },
      {
        login: 'b-sims',
        name: 'Brandon Sims',
      },
      {
        login: 'rotemshynes',
        name: null,
      },
      {
        login: 'mark-linearb',
        name: 'Mark Bulgakov',
      },
      {
        login: 'shaisorek',
        name: null,
      },
      {
        login: 'chen-weizmann',
        name: 'Chen Weizmann',
      },
      {
        login: 'ZionSoferLinearB',
        name: 'Zion Sofer',
      },
      {
        login: 'GabiC-LinearB',
        name: 'Gabriel Cherniavsky',
      },
      {
        login: 'linearbri',
        name: 'Briana Johnson',
      },
      {
        login: 'imanuel-leibo',
        name: 'Imanuel Leibovitch',
      },
      {
        login: 'mosheia',
        name: null,
      },
    ],
    author_teams: ['developers', 'Israel R&D', 'Team Flare', 'Workflow Group'],
    comments: [
      {
        commenter: 'sonarcloud',
        content:
          "SonarCloud Quality Gate failed.&nbsp; &nbsp; [![Quality Gate failed](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/QualityGateBadge/failed-16px.png 'Quality Gate failed')](https://sonarcloud.io/dashboard?id=linear-b_gitstream-sls-pipeline&pullRequest=536)\n\n[![Bug](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/bug-16px.png 'Bug')](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=BUG) [![A](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/RatingBadge/A-16px.png 'A')](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=BUG) [0 Bugs](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=BUG)  \n[![Vulnerability](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/vulnerability-16px.png 'Vulnerability')](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=VULNERABILITY) [![A](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/RatingBadge/A-16px.png 'A')](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=VULNERABILITY) [0 Vulnerabilities](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=VULNERABILITY)  \n[![Security Hotspot](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/security_hotspot-16px.png 'Security Hotspot')](https://sonarcloud.io/project/security_hotspots?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=SECURITY_HOTSPOT) [![A](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/RatingBadge/A-16px.png 'A')](https://sonarcloud.io/project/security_hotspots?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=SECURITY_HOTSPOT) [0 Security Hotspots](https://sonarcloud.io/project/security_hotspots?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=SECURITY_HOTSPOT)  \n[![Code Smell](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/code_smell-16px.png 'Code Smell')](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=CODE_SMELL) [![A](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/RatingBadge/A-16px.png 'A')](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=CODE_SMELL) [0 Code Smells](https://sonarcloud.io/project/issues?id=linear-b_gitstream-sls-pipeline&pullRequest=536&resolved=false&types=CODE_SMELL)\n\n[![No Coverage information](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/CoverageChart/NoCoverageInfo-16px.png 'No Coverage information')](https://sonarcloud.io/component_measures?id=linear-b_gitstream-sls-pipeline&pullRequest=536) No Coverage information  \n[![46.7%](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/Duplications/20plus-16px.png '46.7%')](https://sonarcloud.io/component_measures?id=linear-b_gitstream-sls-pipeline&pullRequest=536&metric=new_duplicated_lines_density&view=list) [46.7% Duplication](https://sonarcloud.io/component_measures?id=linear-b_gitstream-sls-pipeline&pullRequest=536&metric=new_duplicated_lines_density&view=list)\n\n",
        created_at: '2023-05-02T11:12:50Z',
        updated_at: '2023-05-02T11:12:50Z',
        id: 1531288765,
      },
    ],
    conversations: [],
  },
};
