/**
 * UI string catalogue.
 *
 * Interface chrome only — the analysis *output* is translated in
 * `src/data/mockProject.ts` / `mockProject.zh.ts`, because in Phase 2 that
 * content comes from the agent pipeline, not from here.
 *
 * Keys are grouped by surface. `en` is the source of truth; `zh` must mirror
 * its shape exactly (TypeScript enforces this below).
 */

export type Lang = 'en' | 'zh';

export const LANGUAGE_LABELS: Record<Lang, string> = {
  en: 'EN',
  zh: '简体',
};

const en = {
  app: {
    name: 'Research Copilot',
    internal: 'Internal',
    mockBadge: 'Mock data · Phase 1',
    mockBadgeTitle:
      'Phase 1 prototype — all output is mock data, no model is called.',
    languageLabel: 'Language',
    rail: {
      projects: 'Projects',
      frameworks: 'Industry frameworks',
      experts: 'Expert library',
      search: 'Search',
      settings: 'Settings',
      workspace: 'Workspace',
    },
  },

  intake: {
    eyebrow: 'Expert Network · Research Operations',
    subtitle: 'Transform unfamiliar client briefs into expert sourcing strategies.',
    cardTitle: 'Let’s break down a client request',
    placeholder: 'Paste your client brief here...',
    briefLabel: 'Client brief',
    loadExample: 'Load example brief',
    exampleLoaded: 'Example loaded',
    analyze: 'Analyze Brief',
    emptySignals: 'Intake signals appear as you paste.',
    signalLanguage: 'Language',
    signalCompanies: 'Named companies',
    signalQuestions: 'Sub-questions',
    characters: (n: number) => `${n} characters`,
    produces: 'What the analysis produces',
    recent: 'Recent projects',
    agentSummary: [
      {
        title: 'Brief Understanding',
        description:
          'Restates what the client is actually asking, defines the vocabulary, and ranks competing interpretations by confidence.',
      },
      {
        title: 'Industry Intelligence',
        description:
          'Maps the value chain around the brief so you can see where the money and the decisions actually sit.',
      },
      {
        title: 'Knowledge Owners',
        description:
          'Converts each research question into the function, department and job titles that own the answer.',
      },
    ],
    recentProjects: [
      { title: 'EU Battery Cell Localization', sector: 'Energy Storage' },
      { title: 'LATAM Cold Chain Pharma', sector: 'Healthcare Logistics' },
      { title: 'SEA Two-Wheeler EV Channels', sector: 'Mobility' },
    ],
  },

  analysis: {
    eyebrow: 'Running analysis',
    title: 'Reading the brief like a senior CSA',
    subtitle:
      'Three agents run in sequence. Each one produces a section of the research dashboard.',
  },

  stages: {
    parse: {
      agent: 'Intake',
      label: 'Parsing brief',
      detail: 'Segmenting requirements, normalising mixed-language input',
    },
    agent1: {
      agent: 'Agent 1',
      label: 'Interpreting client objective',
      detail: 'Extracting intent hypotheses, key terms and open questions',
    },
    agent2: {
      agent: 'Agent 2',
      label: 'Building industry framework',
      detail: 'Mapping value chain layers and the client focus area',
    },
    agent3: {
      agent: 'Agent 3',
      label: 'Mapping knowledge owners',
      detail: 'Resolving research questions to functions, titles and tiers',
    },
  },

  dashboard: {
    projects: 'Projects',
    client: 'Client',
    sector: 'Sector',
    analyzed: 'Analyzed',
    runtime: 'Runtime',
    agents: (s: string) => `${s}s · 3 agents`,
    originalBrief: 'Original brief',
    briefAsReceived: 'Brief as received',
    newProject: 'New project',
    tabBrief: 'Brief Understanding',
    tabIndustry: 'Industry Intelligence',
    tabOwners: 'Knowledge Owners',
    tablistLabel: 'Research output',
  },

  agent1: {
    restated: 'Broken into answerable questions',
    industryContext: 'Industry context',
    keyTerms: 'Key terms',
    termCount: (n: number) => `${n} terms`,
    whyItMatters: 'Why it matters · ',
    intents: 'Likely business intents',
    intentsDescription:
      'The model does not commit to one interpretation. Confirm the intent with the client before sourcing — it changes which experts are primary.',
    openQuestions: 'Open questions to clarify with the client',
    needsConfirmation: 'Needs confirmation',
  },

  agent2: {
    legendDirect: 'Direct flow',
    legendConditional: 'Conditional',
    legendFocus: 'Client focus',
    inspectorHint: 'Hover a node to trace its connections, or click to pin it open.',
    upstream: 'Upstream',
    downstream: 'Downstream',
    clientFocusChip: 'Client focus',
    sourcingPriority: 'Sourcing priority',
  },

  agent3: {
    title: 'Knowledge owners',
    copyPlan: 'Copy sourcing plan',
    copied: 'Copied',
    questionsMapped: 'research questions mapped',
    primaryTargets: 'primary sourcing targets',
    rowHint:
      'Select a row to see why that function owns the answer, plus screening questions for the call.',
    colQuestion: 'Research Question',
    colOwner: 'Knowledge Owner',
    colDepartment: 'Department',
    colTitles: 'Recommended Titles',
    colTier: 'Expert Tier',
    whyOwner: 'Why this owner',
    screening: 'Screening questions',
    companies: 'Likely source companies',
    avoidTitle: 'Profiles To Avoid',
    avoidDescription:
      'These profiles look relevant on paper and waste sourcing cycles. Each one is paired with the profile to source instead.',
    toExclude: (n: number) => `${n} to exclude`,
    sourceInstead: 'Source instead:',
    tierHint: {
      'Tier 1': 'Primary — source first',
      'Tier 2': 'Supporting — adds depth',
      'Tier 3': 'Optional — context only',
    },
    planHeading: 'SOURCING PLAN',
    planOwner: 'Owner',
    planTitles: 'Titles',
    planCompanies: 'Companies',
    planAvoid: 'DO NOT SOURCE',
  },
};

/** `zh` is structurally checked against `en` — a missing key is a build error. */
type Dict = typeof en;

const zh: Dict = {
  app: {
    name: '调研助手',
    internal: '内部工具',
    mockBadge: '示例数据 · 第一阶段',
    mockBadgeTitle: '第一阶段原型——所有结果均为示例数据，未调用任何模型。',
    languageLabel: '语言',
    rail: {
      projects: '项目',
      frameworks: '行业框架',
      experts: '专家库',
      search: '搜索',
      settings: '设置',
      workspace: '工作区',
    },
  },

  intake: {
    eyebrow: '专家网络 · 调研运营',
    subtitle: '把陌生的客户需求转化为专家寻访策略。',
    cardTitle: '来拆解一个客户需求',
    placeholder: '在此粘贴客户需求……',
    briefLabel: '客户需求',
    loadExample: '载入示例需求',
    exampleLoaded: '示例已载入',
    analyze: '开始分析',
    emptySignals: '粘贴后将自动识别需求要素。',
    signalLanguage: '语言',
    signalCompanies: '提及公司',
    signalQuestions: '子问题',
    characters: (n: number) => `${n} 字符`,
    produces: '分析将产出',
    recent: '最近项目',
    agentSummary: [
      {
        title: '需求理解',
        description: '复述客户真正想问的问题，界定专业术语，并按置信度排列不同解读。',
      },
      {
        title: '行业情报',
        description: '围绕需求梳理价值链，让你看清资金与决策真正所在的位置。',
      },
      {
        title: '知识归属',
        description: '把每个研究问题转化为掌握答案的职能、部门与职位头衔。',
      },
    ],
    recentProjects: [
      { title: '欧洲电池电芯本地化', sector: '储能' },
      { title: '拉美医药冷链', sector: '医疗物流' },
      { title: '东南亚两轮电动车渠道', sector: '出行' },
    ],
  },

  analysis: {
    eyebrow: '分析进行中',
    title: '像资深顾问一样读需求',
    subtitle: '三个智能体依次运行，各自产出研究看板中的一个模块。',
  },

  stages: {
    parse: {
      agent: '接收',
      label: '解析需求',
      detail: '拆分需求条目，规范中英混排内容',
    },
    agent1: {
      agent: '智能体 1',
      label: '理解客户目标',
      detail: '提取意图假设、关键术语与待确认问题',
    },
    agent2: {
      agent: '智能体 2',
      label: '构建行业框架',
      detail: '梳理价值链层级，标出客户关注范围',
    },
    agent3: {
      agent: '智能体 3',
      label: '定位知识归属',
      detail: '将研究问题映射到职能、头衔与专家层级',
    },
  },

  dashboard: {
    projects: '项目',
    client: '客户',
    sector: '行业',
    analyzed: '分析时间',
    runtime: '耗时',
    agents: (s: string) => `${s} 秒 · 3 个智能体`,
    originalBrief: '需求原文',
    briefAsReceived: '客户需求原文',
    newProject: '新建项目',
    tabBrief: '需求理解',
    tabIndustry: '行业情报',
    tabOwners: '知识归属',
    tablistLabel: '研究产出',
  },

  agent1: {
    restated: '拆解为可回答的问题',
    industryContext: '行业背景',
    keyTerms: '关键术语',
    termCount: (n: number) => `${n} 个术语`,
    whyItMatters: '为何重要 · ',
    intents: '可能的商业意图',
    intentsDescription:
      '模型不会锁定单一解读。开始寻访前请先与客户确认意图——它决定了哪类专家是首选。',
    openQuestions: '寻访前需向客户澄清的问题',
    needsConfirmation: '待确认',
  },

  agent2: {
    legendDirect: '直接流向',
    legendConditional: '条件性流向',
    legendFocus: '客户关注',
    inspectorHint: '悬停节点可查看其关联，点击可固定展开。',
    upstream: '上游',
    downstream: '下游',
    clientFocusChip: '客户关注',
    sourcingPriority: '寻访优先级',
  },

  agent3: {
    title: '知识归属',
    copyPlan: '复制寻访方案',
    copied: '已复制',
    questionsMapped: '个研究问题已定位',
    primaryTargets: '个首选寻访对象',
    rowHint: '点击任一行可查看该职能为何掌握答案，以及电话筛选问题。',
    colQuestion: '研究问题',
    colOwner: '知识归属',
    colDepartment: '部门',
    colTitles: '推荐头衔',
    colTier: '专家层级',
    whyOwner: '为何是该职能',
    screening: '筛选问题',
    companies: '可能的来源公司',
    avoidTitle: '应避免的画像',
    avoidDescription:
      '这些画像看似相关，实则会浪费寻访周期。每条都附有应当替代寻访的画像。',
    toExclude: (n: number) => `${n} 类需排除`,
    sourceInstead: '改为寻访：',
    tierHint: {
      'Tier 1': '首选——优先寻访',
      'Tier 2': '补充——深化细节',
      'Tier 3': '可选——仅作背景',
    },
    planHeading: '寻访方案',
    planOwner: '归属职能',
    planTitles: '头衔',
    planCompanies: '公司',
    planAvoid: '不要寻访',
  },
};

export const strings = { en, zh } as const;
export type Strings = Dict;
