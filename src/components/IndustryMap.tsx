import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IndustryNode } from '@/components/IndustryNode';
import type { NodeState } from '@/components/IndustryNode';
import { useLang } from '@/i18n';
import { cn } from '@/lib/cn';
import type { IndustryFramework, IndustryNodeData } from '@/types';

/* Canvas geometry. Fixed pixel coordinates keep the SVG edge layer and the
   node cards in exact agreement at any container width. */
const NODE_W = 176;
const NODE_H = 116;
const COL_PITCH = 214;
const ROW_GAP = 18;
const HEADER_H = 58;
const PAD = 6;

interface Layout {
  positions: Record<string, { x: number; y: number }>;
  columns: { id: string; x: number }[];
  width: number;
  height: number;
}

function buildLayout(framework: IndustryFramework): Layout {
  const columns = framework.layers.map((layer, i) => ({
    id: layer.id,
    x: PAD + i * COL_PITCH,
    nodes: framework.nodes.filter((n) => n.layerId === layer.id),
  }));

  const tallest = Math.max(
    ...columns.map((c) => c.nodes.length * NODE_H + (c.nodes.length - 1) * ROW_GAP),
  );

  const positions: Record<string, { x: number; y: number }> = {};
  for (const column of columns) {
    const columnHeight =
      column.nodes.length * NODE_H + (column.nodes.length - 1) * ROW_GAP;
    const startY = HEADER_H + (tallest - columnHeight) / 2;
    column.nodes.forEach((node, i) => {
      positions[node.id] = { x: column.x, y: startY + i * (NODE_H + ROW_GAP) };
    });
  }

  return {
    positions,
    columns: columns.map(({ id, x }) => ({ id, x })),
    width: PAD * 2 + (columns.length - 1) * COL_PITCH + NODE_W,
    height: HEADER_H + tallest + PAD,
  };
}

interface IndustryMapProps {
  framework: IndustryFramework;
  className?: string;
}

/**
 * Interactive value-chain map. Hovering or selecting a node isolates its
 * immediate upstream and downstream relationships — the point is to let a CSA
 * trace a path through the industry, not to read a list of companies.
 */
export function IndustryMap({ framework, className }: IndustryMapProps) {
  const { t } = useLang();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const layout = useMemo(() => buildLayout(framework), [framework]);
  const nodesById = useMemo(
    () => new Map(framework.nodes.map((n) => [n.id, n])),
    [framework.nodes],
  );

  const activeId = hoveredId ?? selectedId;

  const neighbours = useMemo(() => {
    if (!activeId) return new Set<string>();
    const set = new Set<string>([activeId]);
    for (const edge of framework.edges) {
      if (edge.from === activeId) set.add(edge.to);
      if (edge.to === activeId) set.add(edge.from);
    }
    return set;
  }, [activeId, framework.edges]);

  const inspected: IndustryNodeData | null = activeId
    ? (nodesById.get(activeId) ?? null)
    : null;

  const upstream = inspected
    ? framework.edges
        .filter((e) => e.to === inspected.id)
        .map((e) => nodesById.get(e.from)?.label)
        .filter(Boolean)
    : [];
  const downstream = inspected
    ? framework.edges
        .filter((e) => e.from === inspected.id)
        .map((e) => nodesById.get(e.to)?.label)
        .filter(Boolean)
    : [];

  const nodeState = (id: string): NodeState => {
    if (!activeId) return 'default';
    if (id === activeId) return 'active';
    return neighbours.has(id) ? 'related' : 'dimmed';
  };

  return (
    <div className={cn('surface-card overflow-hidden', className)}>
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-6 py-5">
        <div className="max-w-2xl">
          <h3 className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink">
            {framework.headline}
          </h3>
          <p className="mt-1.5 text-[13px] leading-[1.65] text-ink-soft">
            {framework.summary}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[11px] text-ink-faint">
          <LegendRow>
            <svg width="26" height="8" aria-hidden="true">
              <line
                x1="0"
                y1="4"
                x2="26"
                y2="4"
                stroke="var(--color-line-strong)"
                strokeWidth="1.5"
              />
            </svg>
            {t.agent2.legendDirect}
          </LegendRow>
          <LegendRow>
            <svg width="26" height="8" aria-hidden="true">
              <line
                x1="0"
                y1="4"
                x2="26"
                y2="4"
                stroke="var(--color-line-strong)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
            {t.agent2.legendConditional}
          </LegendRow>
          <LegendRow>
            <span className="inline-flex w-[26px] justify-center">
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
            {t.agent2.legendFocus}
          </LegendRow>
        </div>
      </header>

      <div className="relative">
        <div className="overflow-x-auto px-6 py-6">
          <div
            className="relative"
            style={{ width: layout.width, height: layout.height }}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Layer headers */}
            {framework.layers.map((layer, i) => (
              <div
                key={layer.id}
                className="absolute top-0"
                style={{ left: layout.columns[i].x, width: NODE_W }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'size-1.5 rounded-full',
                      layer.isFocus ? 'bg-accent' : 'bg-line-strong',
                    )}
                  />
                  <span
                    className={cn(
                      'text-[11px] leading-none font-semibold tracking-tight',
                      layer.isFocus ? 'text-accent' : 'text-ink',
                    )}
                  >
                    {layer.title}
                  </span>
                </div>
                <p className="mt-1.5 text-[10px] leading-tight text-ink-faint">
                  {layer.caption}
                </p>
              </div>
            ))}

            {/* Focus band behind the two layers the client actually asked about */}
            {framework.layers.map((layer, i) =>
              layer.isFocus ? (
                <div
                  key={`band-${layer.id}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-2xl border border-dashed border-accent-line bg-accent-soft/45"
                  style={{
                    left: layout.columns[i].x - 12,
                    top: HEADER_H - 14,
                    width: NODE_W + 24,
                    height: layout.height - HEADER_H + 8,
                  }}
                />
              ) : null,
            )}

            {/* Edge layer */}
            <svg
              className="pointer-events-none absolute inset-0"
              width={layout.width}
              height={layout.height}
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="arrow-idle"
                  viewBox="0 0 8 8"
                  refX="6"
                  refY="4"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0 1.5 L6 4 L0 6.5 Z" fill="#d6d5cf" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 8 8"
                  refX="6"
                  refY="4"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0 1.5 L6 4 L0 6.5 Z" fill="#6f4520" />
                </marker>
              </defs>

              {framework.edges.map((edge) => {
                const from = layout.positions[edge.from];
                const to = layout.positions[edge.to];
                if (!from || !to) return null;

                const sx = from.x + NODE_W;
                const sy = from.y + NODE_H / 2;
                const tx = to.x - 5;
                const ty = to.y + NODE_H / 2;
                const bend = (tx - sx) * 0.5;

                const isActive =
                  !!activeId && (edge.from === activeId || edge.to === activeId);
                const isMuted = !!activeId && !isActive;

                return (
                  <motion.path
                    key={`${edge.from}-${edge.to}`}
                    d={`M ${sx} ${sy} C ${sx + bend} ${sy}, ${tx - bend} ${ty}, ${tx} ${ty}`}
                    fill="none"
                    stroke={isActive ? 'var(--color-accent)' : '#d6d5cf'}
                    strokeWidth={isActive ? 1.6 : 1.2}
                    strokeDasharray={edge.kind === 'secondary' ? '4 4' : undefined}
                    markerEnd={`url(#${isActive ? 'arrow-active' : 'arrow-idle'})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: isMuted ? 0.28 : 1,
                    }}
                    transition={{
                      pathLength: { duration: 0.8, ease: 'easeOut' },
                      opacity: { duration: 0.25 },
                    }}
                  />
                );
              })}
            </svg>

            {/* Node layer */}
            {framework.nodes.map((node, i) => {
              const pos = layout.positions[node.id];
              if (!pos) return null;
              return (
                <IndustryNode
                  key={node.id}
                  node={node}
                  x={pos.x}
                  y={pos.y}
                  width={NODE_W}
                  height={NODE_H}
                  index={i}
                  state={nodeState(node.id)}
                  isSelected={selectedId === node.id}
                  onHover={setHoveredId}
                  onSelect={(id) =>
                    setSelectedId((current) => (current === id ? null : id))
                  }
                />
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface to-transparent lg:hidden" />
      </div>

      {/* Inspector */}
      <div className="border-t border-line bg-canvas px-6 py-5">
        <AnimatePresence mode="wait" initial={false}>
          {inspected ? (
            <motion.div
              key={inspected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
                    {inspected.label}
                  </h4>
                  {inspected.sublabel && (
                    <span className="text-[11px] text-ink-faint">
                      {inspected.sublabel}
                    </span>
                  )}
                  {inspected.isFocus && (
                    <span className="rounded-full border border-accent-line bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {t.agent2.clientFocusChip}
                    </span>
                  )}
                </div>
                <p className="mt-2 max-w-2xl text-[13px] leading-[1.7] text-ink-muted">
                  {inspected.detail}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {(upstream.length > 0 || downstream.length > 0) && (
                    <>
                      <ConnectionList
                        label={t.agent2.upstream}
                        items={upstream as string[]}
                      />
                      <ConnectionList
                        label={t.agent2.downstream}
                        items={downstream as string[]}
                      />
                    </>
                  )}
                </div>
              </div>
              <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
                {inspected.meta.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 bg-surface px-3.5 py-2.5"
                  >
                    <dt className="text-[11px] text-ink-faint">{item.label}</dt>
                    <dd className="text-right text-[12px] font-medium text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-2 text-[12.5px] text-ink-soft"
            >
              {t.agent2.inspectorHint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LegendRow({ children }: { children: ReactNode }) {
  return <span className="flex items-center gap-2">{children}</span>;
}

function ConnectionList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="label-eyebrow">{label}</span>
      <span className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-[11px] text-ink-muted"
          >
            {item}
          </span>
        ))}
      </span>
    </div>
  );
}

export default IndustryMap;
