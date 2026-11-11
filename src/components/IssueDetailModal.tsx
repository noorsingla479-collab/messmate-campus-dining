import { useState } from 'react';
import type { Issue } from '../types';
import { CategoryBadge, PriorityBadge, StatusBadge } from './Badges';
import { StatusTracker } from './StatusTracker';
import { StarRating } from './StarRating';
import {
  X,
  MapPin,
  Calendar,
  User,
  Building2,
  Flag,
  FileText,
  MessageSquare,
  Star,
} from 'lucide-react';
import { formatDateTime, formatDate } from '../utils';

interface IssueDetailModalProps {
  issue: Issue | null;
  onClose: () => void;
  onGiveFeedback?: (issueId: string, rating: number, comment: string) => void;
  canFeedback?: boolean;
}

export function IssueDetailModal({ issue, onClose, onGiveFeedback, canFeedback = false }: IssueDetailModalProps) {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative card max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="sticky top-0 bg-white border-b border-ink-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg font-mono">
              {issue.id}
            </span>
            <StatusBadge status={issue.status} />
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-ink-50 text-ink-400 hover:text-ink-700 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-ink-900 mb-3">{issue.title}</h2>
            {issue.image && (
              <div className="rounded-xl overflow-hidden mb-3 max-h-64">
                <img src={issue.image} alt={issue.title} className="w-full object-cover" />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <CategoryBadge category={issue.category} />
              <PriorityBadge priority={issue.priority} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetaItem icon={MapPin} label="Location" value={issue.location} />
            <MetaItem icon={User} label="Reported By" value={issue.submittedBy} />
            <MetaItem icon={Calendar} label="Submitted" value={formatDate(issue.submittedAt)} />
            <MetaItem icon={Flag} label="Priority" value={issue.priority} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-700 mb-2 flex items-center gap-2">
              <FileText size={16} className="text-sky-500" /> Description
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed bg-sky-50/50 rounded-xl p-4 border border-ink-100">
              {issue.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-700 mb-4 flex items-center gap-2">
              <Building2 size={16} className="text-sky-500" /> Progress Tracker
            </h3>
            <StatusTracker currentStatus={issue.status} updates={issue.statusUpdates} />
          </div>

          {issue.feedback && (
            <div className="rounded-xl bg-teal-50 border border-teal-200 p-4">
              <h3 className="text-sm font-semibold text-teal-800 mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Resolution Feedback
              </h3>
              <StarRating value={issue.feedback.rating} size={18} className="mb-2" />
              <p className="text-sm text-teal-700 leading-relaxed">{issue.feedback.comment}</p>
              <p className="text-xs text-teal-500 mt-2">{formatDateTime(issue.feedback.submittedAt)}</p>
            </div>
          )}

          {canFeedback && !issue.feedback && issue.status === 'Resolved' && onGiveFeedback && (
            <FeedbackForm issueId={issue.id} onSubmit={onGiveFeedback} />
          )}
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-ink-50/50 border border-ink-100">
      <div className="flex items-center gap-1.5 text-ink-400 mb-1">
        <Icon size={13} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-sm font-semibold text-ink-800">{value}</p>
    </div>
  );
}

function FeedbackForm({ issueId, onSubmit }: { issueId: string; onSubmit: (id: string, rating: number, comment: string) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (rating === 0) { setError('Please select a rating'); return; }
    if (comment.trim().length < 10) { setError('Please write at least 10 characters'); return; }
    setError('');
    onSubmit(issueId, rating, comment.trim());
  };

  return (
    <div className="rounded-xl bg-sky-50 border border-sky-200 p-4">
      <h3 className="text-sm font-semibold text-sky-800 mb-3 flex items-center gap-2">
        <Star size={16} className="fill-sky-500 text-sky-500" /> Give Resolution Feedback
      </h3>
      <div className="space-y-3">
        <div>
          <label className="label text-sky-800">How satisfied are you?</label>
          <StarRating value={rating} onChange={setRating} size={26} />
        </div>
        <div>
          <label className="label text-sky-800">Your feedback</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with the resolution..."
            rows={3}
            className="input resize-none bg-white"
          />
        </div>
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        <button onClick={submit} className="btn-teal w-full">
          <MessageSquare size={16} /> Submit Feedback
        </button>
      </div>
    </div>
  );
}
