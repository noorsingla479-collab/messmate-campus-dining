import type { Issue } from '../types';
import { CategoryBadge, PriorityBadge, StatusBadge } from './Badges';
import { CategoryIcon } from './CategoryIcon';
import { MapPin, Calendar, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { timeAgo, formatDate } from '../utils';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  compact?: boolean;
}

export function IssueCard({ issue, onClick, compact = false }: IssueCardProps) {
  return (
    <button
      onClick={onClick}
      className="card p-5 text-left w-full hover:shadow-glow hover:border-sky-200 transition-all duration-200 group animate-fadeIn"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg font-mono">
            {issue.id}
          </span>
          <StatusBadge status={issue.status} />
        </div>
        <ChevronRight size={18} className="text-ink-300 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>

      <h3 className="font-display font-bold text-ink-900 text-base leading-snug mb-2 line-clamp-2">
        {issue.title}
      </h3>

      {!compact && (
        <p className="text-sm text-ink-500 line-clamp-2 leading-relaxed mb-3">
          {issue.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <CategoryBadge category={issue.category} />
        <PriorityBadge priority={issue.priority} />
      </div>

      <div className="flex items-center justify-between text-xs text-ink-400 pt-3 border-t border-ink-100">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {issue.location}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={13} /> {compact ? timeAgo(issue.submittedAt) : formatDate(issue.submittedAt)}
        </span>
      </div>

      {issue.image && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-sky-600 font-medium">
          <ImageIcon size={13} /> Photo attached
        </div>
      )}
    </button>
  );
}

export function IssueRowIcon({ issue }: { issue: Issue }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
      <CategoryIcon category={issue.category} size={18} className="text-sky-600" />
    </div>
  );
}
