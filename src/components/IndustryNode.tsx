import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import type { IndustryNodeData } from '@/types';

export type NodeState = 'default' | 'active' | 'related' | 'dimmed';

interface IndustryNodeProps {
  node: IndustryNodeData;
  x: number;
  y: number;
  width: number;
  height: number;
  state: NodeState;
  isSelected: boolean;
  index: number;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

/**
 * A single card in the industry map. Positioned absolutely on the map canvas so
 * the SVG edge layer underneath can be drawn from exact coordinates.
 */
export function IndustryNode({
  node,
  x,
  y,
  width,
  height,
  state,
  isSelected,
  index,
  onHover,
  onSelect,
}: IndustryNodeProps) {
  const isLit = state === 'active' || isSelected;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: state === 'dimmed' ? 0.32 : 1,
        y: 0,
      }}
      transition={{
        opacity: { duration: 0.28 },
        y: { duration: 0.4, delay: Math.min(index * 0.02, 0.24) },
      }}
      style={{ left: x, top: y, width, height }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(node.id)}
      aria-pressed={isSelected}
      className={cn(
        'absolute flex flex-col justify-center rounded-xl border px-3.5 py-3 text-left transition-[border-color,box-shadow,background-color,transform] duration-200',
        'hover:-translate-y-px',
        isLit
          ? 'border-accent bg-surface shadow-[0_0_0_3px_rgba(79,70,229,0.10),0_10px_24px_-14px_rgba(26,26,26,0.4)]'
          : state === 'related'
            ? 'border-accent-line bg-surface shadow-card'
            : node.isFocus
              ? 'border-line-strong bg-surface shadow-card'
              : 'border-line bg-surface shadow-card',
      )}
    >
      {node.isFocus && (
        <span
          className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-accent"
          title="Inside the client focus area"
        />
      )}
      <span className="pr-3 text-[13px] leading-tight font-semibold tracking-[-0.01em] text-ink">
        {node.label}
      </span>
      {node.sublabel && (
        <span className="mt-0.5 text-[10.5px] leading-tight font-medium text-ink-faint">
          {node.sublabel}
        </span>
      )}
      <span className="mt-1.5 line-clamp-4 text-[10.5px] leading-[1.45] text-ink-soft">
        {node.description}
      </span>
    </motion.button>
  );
}

export default IndustryNode;
