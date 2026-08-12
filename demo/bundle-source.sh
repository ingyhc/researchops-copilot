#!/usr/bin/env bash
# Concatenates the project source into one uploadable markdown file.
# Usage: bash demo/bundle-source.sh
set -euo pipefail

cd "$(dirname "$0")/.."
OUT="demo/source-bundle.md"

{
  echo "# ResearchOps Copilot — full source"
  echo
  echo "Phase 1 UX prototype. React + TypeScript + Tailwind v4 + Framer Motion."
  echo "No AI integration: \`src/services/aiService.ts\` returns mock data on a timer."
  echo
  echo '## File tree'
  echo
  echo '```'
  find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) | sort
  echo '```'
  echo

  for f in \
    package.json \
    vite.config.ts \
    src/index.css \
    src/types/index.ts \
    src/services/aiService.ts \
    src/data/mockProject.ts \
    src/main.tsx \
    src/App.tsx \
    src/pages/ProjectIntake.tsx \
    src/pages/ResearchDashboard.tsx \
    src/components/BriefInput.tsx \
    src/components/AnalysisOverlay.tsx \
    src/components/DashboardTabs.tsx \
    src/components/InsightCard.tsx \
    src/components/ConfidenceBadge.tsx \
    src/components/ExpertTierBadge.tsx \
    src/components/IndustryMap.tsx \
    src/components/IndustryNode.tsx \
    src/components/KnowledgeOwnerTable.tsx \
    src/components/panels/BriefUnderstandingPanel.tsx \
    src/components/panels/IndustryIntelligencePanel.tsx \
    src/components/panels/KnowledgeOwnersPanel.tsx \
    src/lib/cn.ts
  do
    ext="${f##*.}"
    echo "## \`$f\`"
    echo
    echo "\`\`\`$ext"
    cat "$f"
    echo "\`\`\`"
    echo
  done
} > "$OUT"

echo "Wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes, $(wc -l < "$OUT" | tr -d ' ') lines)"
