import type { ResearchProject } from '@/types';

/**
 * Phase 1 mock data.
 *
 * Everything the dashboard renders lives here — no copy is hardcoded inside
 * components. When the Coze agent pipeline is wired up in Phase 2, this file
 * becomes the fixture used by tests and Storybook, and `aiService.analyzeBrief`
 * stops returning it.
 *
 * Figures are illustrative and hand-written for the prototype. They are not
 * sourced from real filings.
 */

export const EXAMPLE_BRIEF = `找懂给OEM出口seating供货的tier1专家，看Lear, Yanfeng, Adient，Jifeng这几家，专家需要能cover蔚来小鹏理想等新势力，以及BYD吉利长安等传统OEM

CBU/CKD出口决策逻辑:
1. 新势力 vs 传统OEM出口时选择CBU/CKD的决策因素
2. 当前主要OEM CBU/CKD比例
3. 座椅在CBU和CKD模式下的处理方式

Tier 1 sourcing strategy:
1. CBU出口车型座椅tier1供应商
2. CKD出口车型供应模式
3. 国内tier1 vs 外资tier1竞争差异`;

export const mockProject: ResearchProject = {
  id: 'prj_8412',
  title: 'Automotive Seating Export Strategy',
  client: 'Global Industrials Fund',
  sector: 'Automotive & Mobility',
  status: 'Analysis Complete',
  submittedAt: '2026-08-06T09:12:00.000Z',
  analysisDurationMs: 6400,
  briefText: EXAMPLE_BRIEF,

  /* ---------------------------------------------------------------- */
  /* Agent 1 — Brief Understanding                                     */
  /* ---------------------------------------------------------------- */
  briefInterpretation: {
    clientObjective: {
      prompt: 'What is the client trying to understand?',
      summary:
        'The client wants to understand how Chinese automotive OEMs make export manufacturing decisions and how these decisions impact seating Tier 1 supplier selection.',
      restated: [
        'What drives an OEM to export a vehicle as a completely built unit versus shipping it as a knocked-down kit?',
        'Do new-energy entrants (NIO, XPeng, Li Auto) reason about that choice differently from incumbents (BYD, Geely, Changan)?',
        'Once the export mode is fixed, who supplies the seats — and does the answer change between CBU and CKD?',
        'Where do domestic Tier 1s (Yanfeng, Jifeng) win or lose against foreign Tier 1s (Lear, Adient) on export programs?',
      ],
    },

    industryContext: {
      chain: ['Automotive Manufacturing', 'Vehicle Export', 'Seating Supply Chain'],
      note: 'The brief sits at the intersection of two decision systems: an OEM export-mode decision made by overseas strategy teams, and a seating sourcing decision made by commodity purchasing. Experts who only understand one side will answer half the brief.',
    },

    keyTerms: [
      {
        term: 'OEM',
        expansion: 'Original Equipment Manufacturer',
        definition:
          'The vehicle brand that designs, assembles and sells the finished car — BYD, Geely, NIO.',
        whyItMatters:
          'The OEM owns the export-mode decision. Tier 1 suppliers react to it; they do not set it.',
      },
      {
        term: 'Tier 1 Supplier',
        expansion: 'Direct supplier to vehicle manufacturers',
        definition:
          'Supplies a complete system — a full seat assembly — straight to the OEM assembly line.',
        whyItMatters:
          'Seat Tier 1s hold both the commercial relationship and the cost structure the client is asking about.',
      },
      {
        term: 'CBU',
        expansion: 'Completely Built Unit export',
        definition:
          'The vehicle is fully assembled in China and shipped finished, typically by roll-on/roll-off vessel.',
        whyItMatters:
          'Under CBU the seat is sourced domestically and the incumbent China supplier usually carries over.',
      },
      {
        term: 'CKD',
        expansion: 'Completely Knocked Down export',
        definition:
          'The vehicle ships as parts and sub-assemblies, then is assembled at an overseas plant.',
        whyItMatters:
          'CKD reopens the seat sourcing decision — local content rules and JIT distance can displace the China incumbent.',
      },
      {
        term: 'SKD',
        expansion: 'Semi Knocked Down export',
        definition:
          'A lighter version of CKD — larger pre-assembled modules, less local assembly work.',
        whyItMatters:
          'Frequently the real answer when an expert says "CKD". Worth disambiguating on the screening call.',
      },
      {
        term: 'Local Content Rate',
        expansion: 'Localization requirement',
        definition:
          'The share of vehicle value that must be produced in-market to qualify for tariff or incentive treatment.',
        whyItMatters:
          'This is the single strongest forcing function pushing seats out of China and into local suppliers.',
      },
    ],

    businessIntents: [
      {
        id: 'intent-1',
        confidence: 85,
        title: 'Evaluate how export strategies affect supplier selection.',
        rationale:
          'The brief pairs the export-mode question directly with a Tier 1 sourcing question, which suggests the client is modelling supplier revenue exposure as export mix shifts.',
        signals: [
          'CBU/CKD出口决策逻辑 and Tier 1 sourcing strategy appear as two halves of one brief',
          '"座椅在CBU和CKD模式下的处理方式" asks explicitly for the linkage',
        ],
      },
      {
        id: 'intent-2',
        confidence: 70,
        title: 'Understand overseas localization strategy.',
        rationale:
          'Naming CKD ratios and overseas handling points to interest in where assembly footprint is moving and how fast local content builds.',
        signals: [
          '"当前主要OEM CBU/CKD比例" — asking for a mix, not a single case',
          'Both new-force and incumbent OEMs named, implying a market-wide view',
        ],
      },
      {
        id: 'intent-3',
        confidence: 60,
        title: 'Benchmark domestic vs international Tier 1 suppliers.',
        rationale:
          'The four named suppliers split cleanly into two foreign and two domestic players, and the brief asks for the competitive difference between them.',
        signals: [
          '"国内tier1 vs 外资tier1竞争差异" stated as its own question',
          'Lear and Adient named alongside Yanfeng and Jifeng',
        ],
      },
    ],

    openQuestions: [
      'Is the client investment-side (supplier revenue exposure) or corporate-side (footprint planning)? This changes whether OEM-side or Tier 1-side experts are primary.',
      'Which target region matters most — Europe, Southeast Asia or the Middle East? Export logic differs sharply by destination.',
      'Does "座椅" mean the complete seat assembly, or the seat structure/mechanism only? The supplier set differs.',
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Agent 2 — Industry Intelligence                                   */
  /* ---------------------------------------------------------------- */
  industryFramework: {
    headline: 'How a Chinese-built seat reaches an overseas buyer',
    summary:
      'Six decision layers sit between a Chinese OEM and an overseas customer. The client is asking about layers three and four — where the export mode is chosen, and where that choice reshapes seat sourcing.',

    layers: [
      { id: 'oem', title: 'Chinese OEMs', caption: 'Own the export decision' },
      { id: 'strategy', title: 'Export Strategy', caption: 'Volume, market, footprint' },
      {
        id: 'decision',
        title: 'CBU / CKD Decision',
        caption: 'Tariffs, local content, volume',
        isFocus: true,
      },
      {
        id: 'supplier',
        title: 'Seat Tier 1 Suppliers',
        caption: 'Awarded per program & mode',
        isFocus: true,
      },
      { id: 'manufacturing', title: 'Overseas Manufacturing', caption: 'Where the seat is fitted' },
      { id: 'market', title: 'Target Markets', caption: 'Demand & regulation' },
    ],

    nodes: [
      /* -- Layer 1: OEMs ------------------------------------------- */
      {
        id: 'byd',
        layerId: 'oem',
        label: 'BYD',
        sublabel: '比亚迪',
        description: 'Largest exporter; building own plants and own RoRo fleet.',
        detail:
          'Vertically integrated and the most aggressive on overseas plants. Runs both modes at scale: CBU into Europe, KD assembly in Southeast Asia and Brazil. Sources a meaningful share of seats internally, which makes it the hardest account for external seat Tier 1s.',
        meta: [
          { label: 'Export mode lean', value: 'Mixed — CBU + KD' },
          { label: 'Overseas plants', value: 'Thailand, Brazil, Hungary' },
          { label: 'Seat sourcing', value: 'Partly in-house' },
        ],
      },
      {
        id: 'nio',
        layerId: 'oem',
        label: 'NIO',
        sublabel: '蔚来',
        description: 'Premium new force; CBU-first with a service-heavy model.',
        detail:
          'Low export volume at premium price points, so CBU economics hold and there is little pressure to knock down. Exports carry the domestic seat specification unchanged — which means the China incumbent supplier follows the car out.',
        meta: [
          { label: 'Export mode lean', value: 'CBU dominant' },
          { label: 'Priority market', value: 'Northern Europe' },
          { label: 'Seat sourcing', value: 'China incumbent carries over' },
        ],
      },
      {
        id: 'xpeng',
        layerId: 'oem',
        label: 'XPeng',
        sublabel: '小鹏',
        description: 'Asset-light export via partner assembly and distribution.',
        detail:
          'Uses partner-operated assembly rather than owned plants, which pushes the export-mode decision into a joint discussion with the local partner. Sourcing authority is more distributed than at an incumbent OEM — expect the answer to sit with overseas business development, not procurement alone.',
        meta: [
          { label: 'Export mode lean', value: 'CBU, selective KD' },
          { label: 'Model', value: 'Partner-operated assembly' },
          { label: 'Seat sourcing', value: 'Program-by-program' },
        ],
      },
      {
        id: 'geely',
        layerId: 'oem',
        label: 'Geely',
        sublabel: '吉利',
        description: 'Multi-brand group with an existing global manufacturing base.',
        detail:
          'The most mature overseas footprint of the incumbents, with European engineering ties through its brand portfolio. Runs genuine KD operations with established local-content playbooks, so it is the best single account for understanding how a mature CKD seat supply chain actually works.',
        meta: [
          { label: 'Export mode lean', value: 'KD-capable at scale' },
          { label: 'Advantage', value: 'Existing global plants' },
          { label: 'Seat sourcing', value: 'Split China / local' },
        ],
      },
      {
        id: 'changan',
        layerId: 'oem',
        label: 'Changan',
        sublabel: '长安',
        description: 'State-backed incumbent; KD-heavy into emerging markets.',
        detail:
          'Historically strong in markets where tariffs make CBU uneconomic, so it has long-running KD kit operations. A good source for the mechanics of kit packaging and how seat sets are shipped, sequenced and re-inspected in-market.',
        meta: [
          { label: 'Export mode lean', value: 'KD-heavy' },
          { label: 'Priority markets', value: 'Middle East, Latin America' },
          { label: 'Seat sourcing', value: 'China-shipped kits' },
        ],
      },

      /* -- Layer 2: Export strategy -------------------------------- */
      {
        id: 'export-strategy',
        layerId: 'strategy',
        label: 'Export Strategy',
        description: 'Volume plan, market priority and footprint commitment.',
        detail:
          'Set annually by overseas operations together with corporate strategy. Fixes the target volume per market, whether to commit capital to a local plant, and the tolerance for tariff exposure. Every downstream sourcing decision inherits its constraints from here.',
        meta: [
          { label: 'Owned by', value: 'Overseas Operations' },
          { label: 'Horizon', value: '3–5 year footprint plan' },
          { label: 'Inputs', value: 'Tariffs, demand, capital' },
        ],
      },

      /* -- Layer 3: CBU / CKD decision (focus) --------------------- */
      {
        id: 'cbu',
        layerId: 'decision',
        label: 'CBU Export',
        sublabel: 'Completely Built Unit',
        description: 'Finished vehicle shipped from China. Fast, low capital.',
        detail:
          'Chosen when volume per market is too low to justify a plant, when time-to-market matters, or when the destination has no meaningful local-content requirement. The seat is fitted on the Chinese line, so the domestic Tier 1 award simply carries over — no new sourcing decision is triggered.',
        meta: [
          { label: 'Capital required', value: 'Low' },
          { label: 'Tariff exposure', value: 'High' },
          { label: 'Seat impact', value: 'China incumbent retained' },
        ],
        isFocus: true,
      },
      {
        id: 'ckd',
        layerId: 'decision',
        label: 'CKD Export',
        sublabel: 'Completely Knocked Down',
        description: 'Kits shipped, vehicle assembled in-market.',
        detail:
          'Chosen when tariffs or local-content rules make finished imports uneconomic and volume can support an assembly line. This is where the seat sourcing question reopens: bulky seat sets are expensive to ship, and local-content targets favour a nearby supplier — so the China incumbent can lose the program.',
        meta: [
          { label: 'Capital required', value: 'High' },
          { label: 'Trigger', value: 'Tariffs & local content' },
          { label: 'Seat impact', value: 'Sourcing reopened' },
        ],
        isFocus: true,
      },

      /* -- Layer 4: Tier 1 suppliers (focus) ----------------------- */
      {
        id: 'lear',
        layerId: 'supplier',
        label: 'Lear',
        sublabel: 'Foreign Tier 1',
        description: 'Global footprint; can follow the OEM into any market.',
        detail:
          'The classic multinational answer to a CKD program: existing plants near most OEM assembly sites, so it can quote local supply without new capital. Its weakness is China-domestic cost competitiveness on price-led programs.',
        meta: [
          { label: 'Origin', value: 'United States' },
          { label: 'Strength', value: 'Global plant coverage' },
          { label: 'Best fit', value: 'CKD / overseas assembly' },
        ],
        isFocus: true,
      },
      {
        id: 'adient',
        layerId: 'supplier',
        label: 'Adient',
        sublabel: 'Foreign Tier 1',
        description: 'Global seating specialist with deep JV history in China.',
        detail:
          'Holds both a global plant network and long-standing Chinese joint ventures, so it can play either side of the CBU/CKD split. Often the reference point when a client asks how foreign Tier 1s defend share against domestic entrants.',
        meta: [
          { label: 'Origin', value: 'Ireland / US' },
          { label: 'Strength', value: 'JV depth in China' },
          { label: 'Best fit', value: 'Either mode' },
        ],
        isFocus: true,
      },
      {
        id: 'yanfeng',
        layerId: 'supplier',
        label: 'Yanfeng',
        sublabel: '延锋 · Domestic Tier 1',
        description: 'Dominant domestic interiors and seating supplier.',
        detail:
          'The default incumbent on Chinese-built programs and therefore the default winner under CBU. Expanding overseas alongside its OEM customers, which makes it the most interesting case study for whether domestic Tier 1s can hold share once assembly moves out of China.',
        meta: [
          { label: 'Origin', value: 'China' },
          { label: 'Strength', value: 'Domestic scale & cost' },
          { label: 'Best fit', value: 'CBU, expanding into KD' },
        ],
        isFocus: true,
      },
      {
        id: 'jifeng',
        layerId: 'supplier',
        label: 'Jifeng',
        sublabel: '继峰 · Domestic Tier 1',
        description: 'Domestic challenger; grew from components into full seats.',
        detail:
          'Moved up from headrests and armrests into complete seat assemblies, and acquired its way into a European footprint. Strong on new-force programs where the OEM values speed and co-development over incumbency.',
        meta: [
          { label: 'Origin', value: 'China' },
          { label: 'Strength', value: 'Speed on new-force programs' },
          { label: 'Best fit', value: 'CBU, selective overseas' },
        ],
        isFocus: true,
      },

      /* -- Layer 5: Overseas manufacturing ------------------------- */
      {
        id: 'vehicle-export',
        layerId: 'manufacturing',
        label: 'Full-Vehicle Logistics',
        description: 'RoRo shipping, port handling, homologation.',
        detail:
          'The CBU path. Vessel capacity, port slots and destination homologation set the real constraint — not the factory. Seats are already installed, so the seating supply chain is untouched by this step.',
        meta: [
          { label: 'Applies to', value: 'CBU vehicles' },
          { label: 'Constraint', value: 'Vessel & port capacity' },
          { label: 'Seat involvement', value: 'None — already fitted' },
        ],
      },
      {
        id: 'kd-assembly',
        layerId: 'manufacturing',
        label: 'Overseas KD Assembly',
        description: 'Local plant fits seats from kits or a local supplier.',
        detail:
          'The CKD path and the heart of the brief. The plant either feeds shipped seat kits into the line or takes JIT deliveries from a supplier within a few hours of the plant. Which of the two is chosen determines whether the China Tier 1 keeps the revenue.',
        meta: [
          { label: 'Applies to', value: 'CKD / SKD vehicles' },
          { label: 'Constraint', value: 'Local content, JIT radius' },
          { label: 'Seat involvement', value: 'Sourcing decision point' },
        ],
        isFocus: true,
      },

      /* -- Layer 6: Target markets --------------------------------- */
      {
        id: 'europe',
        layerId: 'market',
        label: 'Europe',
        description: 'High compliance bar; tariff pressure favours local build.',
        detail:
          'Premium pricing supports CBU economics, but trade measures and content expectations push volume programs toward local assembly. The market most likely to force a foreign Tier 1 back into the seat.',
        meta: [
          { label: 'Typical mode', value: 'CBU, shifting to local' },
          { label: 'Driver', value: 'Tariffs & compliance' },
          { label: 'Seat implication', value: 'Local supply favoured' },
        ],
      },
      {
        id: 'sea',
        layerId: 'market',
        label: 'Southeast Asia',
        description: 'Established KD ecosystem and incentive regimes.',
        detail:
          'Thailand, Indonesia and Malaysia have decades of KD assembly infrastructure and explicit local-content incentives. The fastest route to a working overseas seat supply chain, and where most Chinese OEM KD volume actually sits today.',
        meta: [
          { label: 'Typical mode', value: 'CKD / SKD' },
          { label: 'Driver', value: 'Local content incentives' },
          { label: 'Seat implication', value: 'Local or JV supply' },
        ],
      },
      {
        id: 'mideast',
        layerId: 'market',
        label: 'Middle East',
        description: 'Volume-driven; CBU where tariffs allow, KD where not.',
        detail:
          'A mix of open CBU markets and protected ones with assembly requirements. Seat specification is usually carried over from China with climate-driven material changes rather than a full re-source.',
        meta: [
          { label: 'Typical mode', value: 'Mixed' },
          { label: 'Driver', value: 'Tariff structure' },
          { label: 'Seat implication', value: 'Spec adapted, supplier kept' },
        ],
      },
    ],

    edges: [
      { from: 'byd', to: 'export-strategy' },
      { from: 'nio', to: 'export-strategy' },
      { from: 'xpeng', to: 'export-strategy' },
      { from: 'geely', to: 'export-strategy' },
      { from: 'changan', to: 'export-strategy' },

      { from: 'export-strategy', to: 'cbu', label: 'Low volume / low tariff' },
      { from: 'export-strategy', to: 'ckd', label: 'High tariff / local content' },

      { from: 'cbu', to: 'yanfeng' },
      { from: 'cbu', to: 'jifeng' },
      { from: 'cbu', to: 'adient' },
      { from: 'cbu', to: 'lear', kind: 'secondary' },
      { from: 'ckd', to: 'lear' },
      { from: 'ckd', to: 'adient' },
      { from: 'ckd', to: 'yanfeng', kind: 'secondary' },

      { from: 'lear', to: 'kd-assembly' },
      { from: 'adient', to: 'kd-assembly' },
      { from: 'yanfeng', to: 'vehicle-export' },
      { from: 'yanfeng', to: 'kd-assembly', kind: 'secondary' },
      { from: 'jifeng', to: 'vehicle-export' },

      { from: 'vehicle-export', to: 'europe' },
      { from: 'vehicle-export', to: 'mideast' },
      { from: 'kd-assembly', to: 'sea' },
      { from: 'kd-assembly', to: 'mideast' },
      { from: 'kd-assembly', to: 'europe', kind: 'secondary' },
    ],

    clientFocus: {
      title: 'Client Focus Area',
      description:
        'The brief does not ask about the whole chain. Two layers carry the entire question — sourcing should concentrate there.',
      pillars: [
        {
          title: 'CBU/CKD decision',
          detail:
            'Why an OEM picks one export mode over the other, how the mix is split today, and how new forces differ from incumbents.',
          nodeIds: ['cbu', 'ckd'],
        },
        {
          title: 'Tier 1 sourcing strategy',
          detail:
            'Which seat supplier is awarded under each mode, and where domestic Tier 1s win or lose against foreign ones.',
          nodeIds: ['lear', 'adient', 'yanfeng', 'jifeng'],
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  /* Agent 3 — Knowledge Owner Mapping                                 */
  /* ---------------------------------------------------------------- */
  knowledgeOwners: {
    summary:
      'Five research questions, mapped to the function that owns the answer. Seniority is not the filter — decision ownership is.',

    rows: [
      {
        id: 'ko-1',
        question: 'Who decides CBU vs CKD export strategy?',
        knowledgeOwner: 'International Expansion Strategy',
        department: 'Overseas Operations',
        recommendedTitles: [
          'Head of Overseas Operations',
          'Export Strategy Director',
          'International Business Director',
        ],
        tier: 'Tier 1',
        rationale:
          'The export-mode call is a footprint and capital decision made inside overseas operations, then ratified by corporate strategy. Procurement and engineering inherit it — they do not make it.',
        screeningQuestions: [
          'Walk me through the last time your team chose CKD over CBU for a specific market. What tipped it?',
          'Who signs off on that decision, and what does the business case have to show?',
          'How did that decision differ between your NEV programs and your legacy ICE programs?',
        ],
        sourceCompanies: ['BYD', 'Geely', 'Changan', 'Chery', 'SAIC'],
      },
      {
        id: 'ko-2',
        question: 'Who selects seating suppliers?',
        knowledgeOwner: 'Supplier Selection',
        department: 'Procurement',
        recommendedTitles: [
          'Seating Procurement Director',
          'Commodity Purchasing Director',
          'Interior Commodity Manager',
        ],
        tier: 'Tier 1',
        rationale:
          'Seat awards are made by commodity purchasing against a sourcing panel. This role holds the award history, the panel composition and the real reason an incumbent was kept or displaced.',
        screeningQuestions: [
          'How is the seating sourcing panel built for an export program versus a domestic one?',
          'On your last export award, who was quoted and what separated the winner?',
          'What share of the seat decision is cost versus footprint versus engineering capability?',
        ],
        sourceCompanies: ['NIO', 'XPeng', 'Li Auto', 'BYD', 'Geely'],
      },
      {
        id: 'ko-3',
        question: 'How are seats handled under CKD versus CBU?',
        knowledgeOwner: 'KD Packaging & Kit Logistics',
        department: 'Supply Chain / Manufacturing Engineering',
        recommendedTitles: [
          'KD Business Director',
          'Overseas Manufacturing Planning Manager',
          'Export Logistics Manager',
        ],
        tier: 'Tier 2',
        rationale:
          'Seats are bulky and low-density, so whether they ship as kits or come from a local supplier is decided by KD packaging economics. This function holds the cost-per-set numbers that make the case either way.',
        screeningQuestions: [
          'Do you ship seat sets in the kit, or source them locally at the assembly plant? Why?',
          'What does a seat set add to container cost per vehicle?',
          'At what annual volume does local seat supply become cheaper than shipping kits?',
        ],
        sourceCompanies: ['Changan', 'Geely', 'Chery', 'Great Wall'],
      },
      {
        id: 'ko-4',
        question: 'How do domestic and foreign Tier 1s compete for export programs?',
        knowledgeOwner: 'Commercial Win/Loss',
        department: 'Sales — Tier 1 side',
        recommendedTitles: [
          'VP Sales, OEM Accounts',
          'Key Account Director (Chinese OEMs)',
          'Business Development Director, Asia',
        ],
        tier: 'Tier 1',
        rationale:
          'Only the supplier-side account team can explain why a bid was lost. OEM procurement will give you the decision; the Tier 1 account director gives you the pricing, footprint and capability gap behind it.',
        screeningQuestions: [
          'Where do you win against Yanfeng or Jifeng, and where do you structurally lose?',
          'How does your quote change when the program is CKD into Southeast Asia?',
          'What does a Chinese OEM ask of you that a Western OEM does not?',
        ],
        sourceCompanies: ['Lear', 'Adient', 'Yanfeng', 'Jifeng', 'Toyota Boshoku'],
      },
      {
        id: 'ko-5',
        question: 'What is the current CBU/CKD mix across major OEMs?',
        knowledgeOwner: 'Export Volume Planning',
        department: 'Overseas Sales & Planning',
        recommendedTitles: [
          'Overseas Sales Planning Manager',
          'Regional General Manager',
          'Export Operations Manager',
        ],
        tier: 'Tier 2',
        rationale:
          'Mix data lives in the overseas sales plan, not in strategy decks. This function tracks it by market and can explain how the ratio has moved over the last two to three years.',
        screeningQuestions: [
          'What is your current split by volume, and how has it moved since 2023?',
          'Which markets flipped from CBU to KD, and what triggered each flip?',
          'How do you expect the mix to look two years out?',
        ],
        sourceCompanies: ['BYD', 'Geely', 'Changan', 'SAIC MG'],
      },
    ],

    avoid: [
      {
        id: 'av-1',
        profile: 'Seat Design Engineer',
        reason:
          'Technical knowledge but does not own sourcing decisions. Can describe the seat structure; cannot explain why a supplier was awarded or dropped.',
        insteadSource: 'Seating Procurement Director',
      },
      {
        id: 'av-2',
        profile: 'Regional Sales / Dealer Manager',
        reason:
          'Market-facing and demand-focused. Sits downstream of the export-mode decision and has no visibility into manufacturing or sourcing logic.',
        insteadSource: 'Overseas Sales Planning Manager',
      },
      {
        id: 'av-3',
        profile: 'Assembly Plant Line Supervisor',
        reason:
          'Executes the build but works to a fixed bill of materials. Can confirm what arrives at the line, not why that supplier is on it.',
        insteadSource: 'Overseas Manufacturing Planning Manager',
      },
      {
        id: 'av-4',
        profile: 'Corporate Strategy Analyst (OEM HQ)',
        reason:
          'Often reads as senior and relevant, but typically works from the same public market data the client already has. Low differentiated value.',
        insteadSource: 'Head of Overseas Operations',
      },
    ],
  },
};

export default mockProject;
