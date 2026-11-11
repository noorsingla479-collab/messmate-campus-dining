import type { Category, Priority, Status } from '../types';
import { categoryColors, priorityConfig, statusConfig } from '../types';

export function CategoryBadge({ category, className = '' }: { category: Category; className?: string }) {
  return (
    <span className={`badge ${categoryColors[category]} ${className}`}>{category}</span>
  );
}

export function PriorityBadge({ priority, className = '' }: { priority: Priority; className?: string }) {
  const cfg = priorityConfig[priority];
  return (
    <span className={`badge ${cfg.badge} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function StatusBadge({ status, className = '' }: { status: Status; className?: string }) {
  const cfg = statusConfig[status];
  return (
    <span className={`badge ${cfg.badge} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status !== 'Resolved' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </span>
  );
}
