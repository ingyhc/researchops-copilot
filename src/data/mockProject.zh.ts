import { EXAMPLE_BRIEF, mockProject } from '@/data/mockProject';
import type { ResearchProject } from '@/types';

/**
 * Simplified-Chinese counterpart of `mockProject`.
 *
 * Same ids, same graph, translated content. In Phase 2 both fixtures go away
 * and the agent pipeline returns whichever language the CSA asked for.
 */
export const mockProjectZh: ResearchProject = {
  id: mockProject.id,
  title: '汽车座椅出口策略',
  client: '某全球工业基金',
  sector: '汽车与出行',
  status: 'Analysis Complete',
  submittedAt: mockProject.submittedAt,
  analysisDurationMs: mockProject.analysisDurationMs,
  briefText: EXAMPLE_BRIEF,

  briefInterpretation: {
    clientObjective: {
      prompt: '客户究竟想了解什么？',
      summary:
        '客户想弄清中国车企如何做出口制造模式的决策，以及这些决策如何影响座椅一级供应商的选择。',
      restated: [
        '是什么促使车企选择整车出口，而不是以散件形式发运？',
        '造车新势力（蔚来、小鹏、理想）在这一选择上的逻辑，与传统车企（比亚迪、吉利、长安）有何不同？',
        '出口模式确定后，座椅由谁供应——CBU 与 CKD 下答案会变吗？',
        '在出口项目上，国内一级供应商（延锋、继峰）相对外资供应商（李尔、安道拓）在哪些环节胜出或失守？',
      ],
    },

    industryContext: {
      chain: ['汽车制造', '整车出口', '座椅供应链'],
      note: '这个需求横跨两套决策体系：由海外战略团队做出的出口模式决策，以及由采购部门做出的座椅定点决策。只懂其中一端的专家，只能回答一半的问题。',
    },

    keyTerms: [
      {
        term: 'OEM',
        expansion: '整车厂',
        definition: '设计、组装并销售整车的品牌方——比亚迪、吉利、蔚来。',
        whyItMatters: '出口模式由整车厂决定。一级供应商只是被动响应，并不主导这一决策。',
      },
      {
        term: 'Tier 1 一级供应商',
        expansion: '直接向整车厂供货',
        definition: '向整车厂装配线直接供应完整系统，例如整套座椅总成。',
        whyItMatters: '座椅一级供应商同时掌握商务关系与成本结构，正是客户关心的部分。',
      },
      {
        term: 'CBU',
        expansion: '整车出口',
        definition: '在国内完成整车装配后，通常以滚装船方式整车发运。',
        whyItMatters: 'CBU 模式下座椅在国内装车，国内定点供应商通常直接延续。',
      },
      {
        term: 'CKD',
        expansion: '全散件出口',
        definition: '以零件与分总成形式发运，在海外工厂完成组装。',
        whyItMatters: 'CKD 会让座椅定点重新开放：本地化率要求与 JIT 距离可能让国内供应商出局。',
      },
      {
        term: 'SKD',
        expansion: '半散件出口',
        definition: 'CKD 的简化版本——发运更大的预装模块，海外组装工作量更少。',
        whyItMatters: '专家口中的「CKD」常常其实是 SKD。电话筛选时值得先澄清。',
      },
      {
        term: '本地化率',
        expansion: '当地含量要求',
        definition: '整车价值中必须在当地生产的比例，用以享受关税或政策优惠。',
        whyItMatters: '这是把座椅从中国推向当地供应商最强的一股力量。',
      },
    ],

    businessIntents: [
      {
        id: 'intent-1',
        confidence: 85,
        title: '评估出口策略如何影响供应商选择',
        rationale:
          '需求把出口模式与一级供应商定点直接并列，说明客户在测算出口结构变化下供应商的收入敞口。',
        signals: [
          'CBU/CKD出口决策逻辑 与 Tier 1 sourcing strategy 同时出现在一份需求中',
          '「座椅在CBU和CKD模式下的处理方式」明确要求打通两者',
        ],
      },
      {
        id: 'intent-2',
        confidence: 70,
        title: '了解海外本地化策略',
        rationale:
          '点名 CKD 比例与海外处理方式，指向对制造布局迁移方向与本地化速度的关注。',
        signals: [
          '「当前主要OEM CBU/CKD比例」要的是结构比例，而非单一案例',
          '新势力与传统车企同时列出，意味着需要全市场视角',
        ],
      },
      {
        id: 'intent-3',
        confidence: 60,
        title: '对标国内与外资一级供应商',
        rationale:
          '点名的四家供应商恰好是两家外资、两家内资，并直接询问两者的竞争差异。',
        signals: [
          '「国内tier1 vs 外资tier1竞争差异」被单列为一个问题',
          '李尔、安道拓与延锋、继峰并列出现',
        ],
      },
    ],

    openQuestions: [
      '客户是投资方（关注供应商收入敞口）还是产业方（关注产能布局）？这决定了整车厂侧还是供应商侧专家为首选。',
      '最关键的目标市场是欧洲、东南亚还是中东？不同目的地的出口逻辑差异很大。',
      '「座椅」指整套座椅总成，还是仅指骨架/调角器？两者对应的供应商并不相同。',
    ],
  },

  industryFramework: {
    headline: '一套中国制造的座椅如何抵达海外买家',
    summary:
      '从中国整车厂到海外客户之间有六个决策层级。客户问的是第三层和第四层——出口模式在哪里确定，以及这一选择如何重塑座椅定点。',

    layers: [
      { id: 'oem', title: '中国整车厂', caption: '出口决策的主体' },
      { id: 'strategy', title: '出口策略', caption: '销量、市场与布局' },
      { id: 'decision', title: 'CBU / CKD 决策', caption: '关税、本地化率、销量', isFocus: true },
      { id: 'supplier', title: '座椅一级供应商', caption: '按项目与模式定点', isFocus: true },
      { id: 'manufacturing', title: '海外制造', caption: '座椅在哪里装车' },
      { id: 'market', title: '目标市场', caption: '需求与法规' },
    ],

    nodes: [
      {
        id: 'byd', layerId: 'oem', label: '比亚迪', sublabel: 'BYD',
        description: '出口体量最大；自建海外工厂与滚装船队。',
        detail:
          '垂直一体化程度最高，海外建厂最为激进。两种模式并行：整车出口欧洲，同时在东南亚与巴西开展散件组装。座椅有相当比例自制，因此对外部座椅供应商而言是最难切入的客户。',
        meta: [
          { label: '出口模式偏好', value: '整车与散件并行' },
          { label: '海外工厂', value: '泰国、巴西、匈牙利' },
          { label: '座椅来源', value: '部分自制' },
        ],
      },
      {
        id: 'nio', layerId: 'oem', label: '蔚来', sublabel: 'NIO',
        description: '高端新势力；以整车出口为主，服务体系重。',
        detail:
          '出口量小但单价高，整车出口的经济性成立，缺少散件化的压力。出口车型沿用国内座椅规格，意味着国内供应商跟随整车一起走出去。',
        meta: [
          { label: '出口模式偏好', value: '以整车出口为主' },
          { label: '重点市场', value: '北欧' },
          { label: '座椅来源', value: '沿用国内定点' },
        ],
      },
      {
        id: 'xpeng', layerId: 'oem', label: '小鹏', sublabel: 'XPeng',
        description: '轻资产出口，依靠伙伴完成组装与分销。',
        detail:
          '采用伙伴代工而非自建工厂，出口模式的决定变成与当地伙伴的共同决策。定点权比传统车企更分散——答案往往在海外业务拓展部门，而不只在采购。',
        meta: [
          { label: '出口模式偏好', value: '整车为主，选择性散件' },
          { label: '模式', value: '伙伴代工组装' },
          { label: '座椅来源', value: '逐项目而定' },
        ],
      },
      {
        id: 'geely', layerId: 'oem', label: '吉利', sublabel: 'Geely',
        description: '多品牌集团，已有全球制造基础。',
        detail:
          '传统车企中海外布局最成熟，并通过品牌矩阵具备欧洲工程资源。散件组装已成规模且有成熟的本地化打法，是理解成熟 CKD 座椅供应链的最佳样本。',
        meta: [
          { label: '出口模式偏好', value: '具备规模化散件能力' },
          { label: '优势', value: '既有全球工厂' },
          { label: '座椅来源', value: '国内与本地并行' },
        ],
      },
      {
        id: 'changan', layerId: 'oem', label: '长安', sublabel: 'Changan',
        description: '国资传统车企；新兴市场以散件为主。',
        detail:
          '长期深耕关税使整车出口不划算的市场，因而拥有多年散件出口运营经验。是了解散件包装、座椅总成如何装箱发运与到港复检的优质来源。',
        meta: [
          { label: '出口模式偏好', value: '以散件为主' },
          { label: '重点市场', value: '中东、拉美' },
          { label: '座椅来源', value: '国内发运散件' },
        ],
      },

      {
        id: 'export-strategy', layerId: 'strategy', label: '出口策略',
        description: '销量规划、市场优先级与布局投入。',
        detail:
          '由海外事业部与集团战略共同制定，每年确定各市场目标销量、是否投资当地工厂，以及可承受的关税敞口。下游所有定点决策都继承这里的约束。',
        meta: [
          { label: '决策主体', value: '海外事业部' },
          { label: '周期', value: '3–5 年布局规划' },
          { label: '输入', value: '关税、需求、资本' },
        ],
      },

      {
        id: 'cbu', layerId: 'decision', label: '整车出口', sublabel: 'CBU',
        description: '在国内装配完成后整车发运，快且投入低。',
        detail:
          '当单一市场销量不足以支撑建厂、上市速度优先，或目的地没有实质本地化要求时采用。座椅在国内产线装车，国内定点直接延续，不会触发新的定点决策。',
        meta: [
          { label: '资本投入', value: '低' },
          { label: '关税敞口', value: '高' },
          { label: '对座椅的影响', value: '国内供应商延续' },
        ],
        isFocus: true,
      },
      {
        id: 'ckd', layerId: 'decision', label: '散件出口', sublabel: 'CKD',
        description: '散件发运，在当地完成整车组装。',
        detail:
          '当关税或本地化率要求让整车进口不经济、且销量足以支撑一条组装线时采用。座椅定点问题在此重新打开：座椅体积大、运费高，本地化率目标又偏向就近供应，国内供应商可能因此丢单。',
        meta: [
          { label: '资本投入', value: '高' },
          { label: '触发条件', value: '关税与本地化率' },
          { label: '对座椅的影响', value: '定点重新开放' },
        ],
        isFocus: true,
      },

      {
        id: 'lear', layerId: 'supplier', label: '李尔', sublabel: 'Lear · 外资一级供应商',
        description: '全球布局，可随整车厂进入任何市场。',
        detail:
          '面对散件项目的经典答案：在多数整车装配地附近已有工厂，无需新增资本即可报本地供货价。短板在于国内成本竞争力，价格主导的项目上处于下风。',
        meta: [
          { label: '背景', value: '美国' },
          { label: '优势', value: '全球工厂覆盖' },
          { label: '适配模式', value: '散件 / 海外组装' },
        ],
        isFocus: true,
      },
      {
        id: 'adient', layerId: 'supplier', label: '安道拓', sublabel: 'Adient · 外资一级供应商',
        description: '全球座椅专家，在华合资历史深厚。',
        detail:
          '同时拥有全球工厂网络与长期在华合资公司，整车出口与散件出口两端都能打。客户询问外资供应商如何抵御国内新进入者时，通常以它为参照。',
        meta: [
          { label: '背景', value: '爱尔兰 / 美国' },
          { label: '优势', value: '在华合资根基深' },
          { label: '适配模式', value: '两种模式均可' },
        ],
        isFocus: true,
      },
      {
        id: 'yanfeng', layerId: 'supplier', label: '延锋', sublabel: 'Yanfeng · 国内一级供应商',
        description: '国内内饰与座椅的主导供应商。',
        detail:
          '国内项目的默认在位者，因而是整车出口模式下的默认赢家。正随客户向海外扩张，是观察国内供应商能否在装配外迁后守住份额的最佳案例。',
        meta: [
          { label: '背景', value: '中国' },
          { label: '优势', value: '国内规模与成本' },
          { label: '适配模式', value: '整车出口，正拓展散件' },
        ],
        isFocus: true,
      },
      {
        id: 'jifeng', layerId: 'supplier', label: '继峰', sublabel: 'Jifeng · 国内一级供应商',
        description: '国内挑战者，从零部件做到整椅。',
        detail:
          '由头枕、扶手向完整座椅总成延伸，并通过并购获得欧洲布局。在看重速度与协同开发、而非在位关系的新势力项目上尤其强势。',
        meta: [
          { label: '背景', value: '中国' },
          { label: '优势', value: '新势力项目响应快' },
          { label: '适配模式', value: '整车出口，选择性海外' },
        ],
        isFocus: true,
      },

      {
        id: 'vehicle-export', layerId: 'manufacturing', label: '整车物流',
        description: '滚装运输、港口操作与目的地认证。',
        detail:
          '整车出口路径。真正的瓶颈是船期、港口资源与目的地认证，而非工厂产能。座椅此时已装车，这一环节不触及座椅供应链。',
        meta: [
          { label: '适用于', value: '整车出口车型' },
          { label: '瓶颈', value: '船期与港口能力' },
          { label: '座椅参与度', value: '无——已装车' },
        ],
      },
      {
        id: 'kd-assembly', layerId: 'manufacturing', label: '海外散件组装',
        description: '当地工厂用发运散件或本地供应商装配座椅。',
        detail:
          '散件出口路径，也是这份需求的核心。工厂要么把发运来的座椅套件投入产线，要么由几小时车程内的供应商 JIT 供货。二选一直接决定国内供应商能否保住这部分收入。',
        meta: [
          { label: '适用于', value: '散件 / 半散件车型' },
          { label: '约束', value: '本地化率、JIT 半径' },
          { label: '座椅参与度', value: '定点决策发生点' },
        ],
        isFocus: true,
      },

      {
        id: 'europe', layerId: 'market', label: '欧洲',
        description: '合规门槛高；关税压力推动本地生产。',
        detail:
          '高端定价支撑整车出口的经济性，但贸易措施与含量预期正把走量项目推向当地组装。这是最可能迫使外资供应商重新拿回座椅的市场。',
        meta: [
          { label: '典型模式', value: '整车出口，正转向本地' },
          { label: '驱动因素', value: '关税与合规' },
          { label: '对座椅的含义', value: '偏向本地供货' },
        ],
      },
      {
        id: 'sea', layerId: 'market', label: '东南亚',
        description: '散件组装生态成熟，政策激励明确。',
        detail:
          '泰国、印尼与马来西亚有数十年散件组装基础和明确的本地化率激励。是最快搭起海外座椅供应链的路径，也是当前中国车企散件产量的主要所在。',
        meta: [
          { label: '典型模式', value: '全散件 / 半散件' },
          { label: '驱动因素', value: '本地化率激励' },
          { label: '对座椅的含义', value: '本地或合资供货' },
        ],
      },
      {
        id: 'mideast', layerId: 'market', label: '中东',
        description: '以销量驱动；关税允许则整车，否则散件。',
        detail:
          '既有开放的整车市场，也有要求本地组装的保护性市场。座椅规格通常沿用国内方案，仅针对气候调整材料，而非重新定点。',
        meta: [
          { label: '典型模式', value: '混合' },
          { label: '驱动因素', value: '关税结构' },
          { label: '对座椅的含义', value: '调规格，不换供应商' },
        ],
      },
    ],

    edges: mockProject.industryFramework.edges.map((edge) =>
      edge.label === 'Low volume / low tariff'
        ? { ...edge, label: '低销量 / 低关税' }
        : edge.label === 'High tariff / local content'
          ? { ...edge, label: '高关税 / 本地化率' }
          : edge,
    ),

    clientFocus: {
      title: '客户关注范围',
      description:
        '这份需求并不涉及整条价值链。两个层级承载了全部问题——寻访应集中于此。',
      pillars: [
        {
          title: 'CBU/CKD 决策',
          detail: '整车厂为何选择某一出口模式、当前比例如何，以及新势力与传统车企的差别。',
          nodeIds: ['cbu', 'ckd'],
        },
        {
          title: '一级供应商定点策略',
          detail: '每种模式下座椅由谁中标，以及国内供应商相对外资供应商的胜负手。',
          nodeIds: ['lear', 'adient', 'yanfeng', 'jifeng'],
        },
      ],
    },
  },

  knowledgeOwners: {
    summary: '五个研究问题，逐一对应掌握答案的职能。筛选标准不是职级，而是决策归属。',

    rows: [
      {
        id: 'ko-1',
        question: '谁决定整车出口还是散件出口？',
        knowledgeOwner: '国际化战略',
        department: '海外事业部',
        recommendedTitles: ['海外事业部负责人', '出口战略总监', '国际业务总监'],
        tier: 'Tier 1',
        rationale:
          '出口模式属于布局与资本决策，在海外事业部内部做出，再由集团战略批准。采购与工程只是承接结果，并不参与决定。',
        screeningQuestions: [
          '请讲一次你们为某个市场从整车转向散件的决策过程，最终是什么因素促成的？',
          '这个决策由谁签字，商业论证需要证明什么？',
          '新能源项目与传统燃油项目在这个决策上有何不同？',
        ],
        sourceCompanies: ['比亚迪', '吉利', '长安', '奇瑞', '上汽'],
      },
      {
        id: 'ko-2',
        question: '谁选择座椅供应商？',
        knowledgeOwner: '供应商定点',
        department: '采购',
        recommendedTitles: ['座椅采购总监', '大宗商品采购总监', '内饰品类经理'],
        tier: 'Tier 1',
        rationale:
          '座椅定点由品类采购依据询价名单决定。该岗位掌握历史定点记录、名单构成，以及在位供应商被保留或替换的真实原因。',
        screeningQuestions: [
          '出口项目与国内项目的座椅询价名单在构成上有什么不同？',
          '最近一次出口项目定点中都有谁参与报价，最终胜负手是什么？',
          '座椅决策中成本、布局与工程能力各占多大权重？',
        ],
        sourceCompanies: ['蔚来', '小鹏', '理想', '比亚迪', '吉利'],
      },
      {
        id: 'ko-3',
        question: '散件与整车模式下座椅如何处理？',
        knowledgeOwner: '散件包装与套件物流',
        department: '供应链 / 制造工程',
        recommendedTitles: ['散件业务总监', '海外制造规划经理', '出口物流经理'],
        tier: 'Tier 2',
        rationale:
          '座椅体积大、装载密度低，走套件发运还是本地采购由散件包装经济性决定。这个职能掌握支撑两种方案的单套成本数据。',
        screeningQuestions: [
          '座椅总成是随套件发运，还是在组装厂本地采购？原因是什么？',
          '一套座椅会让单车集装箱成本增加多少？',
          '年产量达到多少时，本地供应会比发运套件更便宜？',
        ],
        sourceCompanies: ['长安', '吉利', '奇瑞', '长城'],
      },
      {
        id: 'ko-4',
        question: '国内与外资一级供应商如何争夺出口项目？',
        knowledgeOwner: '商务得失复盘',
        department: '销售——供应商侧',
        recommendedTitles: ['整车厂客户销售副总裁', '中国客户大客户总监', '亚洲业务拓展总监'],
        tier: 'Tier 1',
        rationale:
          '只有供应商侧的客户团队能讲清一个项目为何丢掉。整车厂采购会告诉你结果，供应商客户总监才会给出背后的价格、布局与能力差距。',
        screeningQuestions: [
          '面对延锋或继峰，你们在哪些环节能赢，哪些环节是结构性劣势？',
          '当项目是出口东南亚的散件项目时，你们的报价会怎么变？',
          '中国整车厂对你们的要求，与西方整车厂有何不同？',
        ],
        sourceCompanies: ['李尔', '安道拓', '延锋', '继峰', '丰田纺织'],
      },
      {
        id: 'ko-5',
        question: '当前主要整车厂的整车/散件出口比例如何？',
        knowledgeOwner: '出口销量规划',
        department: '海外销售与规划',
        recommendedTitles: ['海外销售规划经理', '区域总经理', '出口运营经理'],
        tier: 'Tier 2',
        rationale:
          '比例数据存在于海外销售计划中，而非战略报告里。这个职能按市场跟踪该数据，并能解释近两三年的变化。',
        screeningQuestions: [
          '按销量口径目前的比例是多少？自 2023 年以来如何变化？',
          '哪些市场从整车切换为散件，各自的触发因素是什么？',
          '你预计两年后这个比例会是什么样？',
        ],
        sourceCompanies: ['比亚迪', '吉利', '长安', '上汽 MG'],
      },
    ],

    avoid: [
      {
        id: 'av-1',
        profile: '座椅设计工程师',
        reason: '掌握技术细节，但不拥有定点决策权。能讲清座椅结构，讲不清供应商为何中标或出局。',
        insteadSource: '座椅采购总监',
      },
      {
        id: 'av-2',
        profile: '区域销售 / 经销商经理',
        reason: '面向市场与需求端，处于出口模式决策的下游，看不到制造与定点逻辑。',
        insteadSource: '海外销售规划经理',
      },
      {
        id: 'av-3',
        profile: '组装厂产线主管',
        reason: '负责执行生产，但依据既定物料清单作业。能确认什么零件到线，说不出该供应商为何在名单上。',
        insteadSource: '海外制造规划经理',
      },
      {
        id: 'av-4',
        profile: '整车厂总部战略分析师',
        reason: '看起来资历与相关性都不错，但通常依据客户已有的公开市场数据工作，差异化价值低。',
        insteadSource: '海外事业部负责人',
      },
    ],
  },
};

export default mockProjectZh;
