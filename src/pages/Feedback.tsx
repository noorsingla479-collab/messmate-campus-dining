import { useState, useMemo } from 'react';
import { CheckCircle2, MessageSquareHeart, Send, Tag } from 'lucide-react';
import type { Feedback, FeedbackCategory } from '../types';
import { StarRating } from '../components/StarRating';

interface FeedbackPageProps {
  feedbacks: Feedback[];
  onSubmit: (feedback: Feedback) => void;
}

const categories: FeedbackCategory[] = ['Food Quality', 'Hygiene', 'Taste', 'Quantity', 'Service'];

const categoryColors: Record<FeedbackCategory, string> = {
  'Food Quality': 'bg-orange-100 text-orange-700',
  Hygiene: 'bg-green-100 text-green-700',
  Taste: 'bg-yellow-100 text-yellow-700',
  Quantity: 'bg-blue-100 text-blue-700',
  Service: 'bg-purple-100 text-purple-700',
};

export function Feedback({ feedbacks, onSubmit }: FeedbackPageProps) {
  const [category, setCategory] = useState<FeedbackCategory>('Food Quality');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const sortedFeedbacks = useMemo(
    () => [...feedbacks].sort((a, b) => b.createdAt - a.createdAt),
    [feedbacks]
  );

  const avgByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    categories.forEach((c) => {
      const items = feedbacks.filter((f) => f.category === c);
      map[c] = items.length > 0 ? items.reduce((s, f) => s + f.rating, 0) / items.length : 0;
    });
    return map;
  }, [feedbacks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError('Please select a star rating'); return; }
    if (comment.trim().length < 15) { setError('Please write at least 15 characters in your comment'); return; }
    const fb: Feedback = {
      id: `f${Date.now()}`,
      category,
      rating,
      comment: comment.trim(),
      createdAt: Date.now(),
    };
    onSubmit(fb);
    setRating(0);
    setComment('');
    setError('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Mess Feedback</h1>
        <p className="text-ink-500">Help improve the mess by sharing structured feedback on food and service.</p>
      </div>

      {/* Category summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((c) => {
          const avg = avgByCategory[c];
          return (
            <div key={c} className="card p-4 text-center">
              <span className={`badge ${categoryColors[c]} mb-2`}>{c}</span>
              <p className="text-xl font-display font-bold text-ink-900">
                {avg > 0 ? avg.toFixed(1) : '—'}
              </p>
              <p className="text-xs text-ink-400 mt-0.5">avg rating</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="card p-6">
          <h2 className="font-display font-bold text-ink-900 mb-4 flex items-center gap-2">
            <MessageSquareHeart size={20} className="text-orange-500" /> Submit Feedback
          </h2>

          {showSuccess && (
            <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 animate-pop">
              <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-green-800 text-sm">Feedback submitted!</p>
                <p className="text-xs text-green-600">Thank you for helping improve the mess.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-1.5 ${
                      category === c
                        ? 'bg-orange-500 text-white shadow-soft'
                        : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
                    }`}
                  >
                    <Tag size={14} /> {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Rating</label>
              <StarRating value={rating} onChange={setRating} size={28} />
            </div>

            <div>
              <label className="label">Comments</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more about your experience..."
                rows={4}
                className="input resize-none"
                maxLength={500}
              />
              <p className="text-xs text-ink-400 mt-1 text-right">{comment.length}/500</p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              <Send size={16} /> Submit Feedback
            </button>
          </form>
        </div>

        {/* Previous feedback */}
        <div className="card p-6">
          <h2 className="font-display font-bold text-ink-900 mb-4">Previous Feedback</h2>
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {sortedFeedbacks.length === 0 ? (
              <p className="text-center text-ink-400 py-8">No feedback submitted yet.</p>
            ) : (
              sortedFeedbacks.map((fb) => (
                <div key={fb.id} className="p-4 rounded-xl bg-cream-50 border border-cream-200 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`badge ${categoryColors[fb.category]}`}>{fb.category}</span>
                    <span className="text-xs text-ink-400">{timeAgo(fb.createdAt)}</span>
                  </div>
                  <StarRating value={fb.rating} size={16} className="mb-2" />
                  <p className="text-sm text-ink-600 leading-relaxed">{fb.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'just now';
}
