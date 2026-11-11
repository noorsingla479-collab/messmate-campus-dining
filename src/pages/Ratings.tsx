import { useState, useMemo } from 'react';
import { Trash2, Pencil, X, Check, Star as StarIcon } from 'lucide-react';
import type { Review } from '../types';
import { allMeals, getMealById } from '../data';
import { StarRating } from '../components/StarRating';
import { VegBadge } from '../components/VegBadge';

interface RatingsPageProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
  onUpdateReview: (id: string, review: Review) => void;
  onDeleteReview: (id: string) => void;
}

export function Ratings({ reviews, onAddReview, onUpdateReview, onDeleteReview }: RatingsPageProps) {
  const [selectedMealId, setSelectedMealId] = useState(allMeals[0].id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const selectedMeal = getMealById(selectedMealId)!;

  const reviewsForMeal = useMemo(
    () => reviews.filter((r) => r.mealId === selectedMealId).sort((a, b) => b.createdAt - a.createdAt),
    [reviews, selectedMealId]
  );

  const avgForMeal = useMemo(() => {
    if (reviewsForMeal.length === 0) return null;
    return (reviewsForMeal.reduce((s, r) => s + r.rating, 0) / reviewsForMeal.length).toFixed(1);
  }, [reviewsForMeal]);

  const allAvg = useMemo(() => {
    if (reviews.length === 0) return '—';
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError('Please select a star rating'); return; }
    if (comment.trim().length < 10) { setError('Please write at least 10 characters'); return; }
    const review: Review = {
      id: `r${Date.now()}`,
      mealId: selectedMealId,
      mealName: selectedMeal.name,
      author: 'You',
      rating,
      comment: comment.trim(),
      createdAt: Date.now(),
    };
    onAddReview(review);
    setRating(0);
    setComment('');
    setError('');
  };

  const startEdit = (r: Review) => {
    setEditingId(r.id);
    setEditRating(r.rating);
    setEditComment(r.comment);
  };

  const saveEdit = (id: string) => {
    if (editRating === 0 || editComment.trim().length < 10) return;
    const original = reviews.find((r) => r.id === id);
    if (original) {
      onUpdateReview(id, { ...original, rating: editRating, comment: editComment.trim() });
    }
    setEditingId(null);
  };

  const sortedReviews = useMemo(
    () => [...reviews].sort((a, b) => b.createdAt - a.createdAt),
    [reviews]
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Ratings & Reviews</h1>
        <p className="text-ink-500">Rate meals, read what other students think, and manage your own reviews.</p>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <StarIcon className="fill-orange-400 text-orange-400" size={20} />
            <span className="text-2xl font-display font-bold text-ink-900">{allAvg}</span>
          </div>
          <p className="text-xs text-ink-500 font-medium">Overall Average</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-display font-bold text-ink-900">{reviews.length}</p>
          <p className="text-xs text-ink-500 font-medium">Total Reviews</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-display font-bold text-ink-900">{allMeals.length}</p>
          <p className="text-xs text-ink-500 font-medium">Meals Available</p>
        </div>
      </div>

      {/* Meal selector + review form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-display font-bold text-ink-900 mb-4">Select a Meal to Review</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
            {allMeals.map((meal) => (
              <button
                key={meal.id}
                onClick={() => setSelectedMealId(meal.id)}
                className={`rounded-xl overflow-hidden border-2 transition-all ${
                  selectedMealId === meal.id ? 'border-orange-400 ring-2 ring-orange-200' : 'border-transparent hover:border-cream-300'
                }`}
              >
                <div className="relative h-16">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-xs font-medium text-ink-700 p-1.5 truncate bg-white">{meal.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src={selectedMeal.image} alt={selectedMeal.name} className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-ink-900">{selectedMeal.name}</h3>
                <VegBadge category={selectedMeal.category} />
              </div>
              {avgForMeal && (
                <div className="flex items-center gap-1 mt-1">
                  <StarRating value={Math.round(Number(avgForMeal))} size={14} />
                  <span className="text-sm text-ink-500 font-medium">{avgForMeal} ({reviewsForMeal.length})</span>
                </div>
              )}
              {!avgForMeal && <p className="text-sm text-ink-400 mt-1">No reviews yet — be the first!</p>}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Your Rating</label>
              <StarRating value={rating} onChange={setRating} size={28} />
            </div>
            <div>
              <label className="label">Your Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this meal..."
                rows={3}
                className="input resize-none"
              />
            </div>
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              <StarIcon size={16} /> Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* All reviews */}
      <div>
        <h2 className="text-xl font-display font-bold text-ink-900 mb-4">All Student Reviews</h2>
        {sortedReviews.length === 0 ? (
          <div className="card p-8 text-center text-ink-400">No reviews yet. Be the first to share your experience!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
            {sortedReviews.map((review) => {
              const meal = getMealById(review.mealId);
              const isOwn = review.author === 'You';
              return (
                <div key={review.id} className="card p-5">
                  {editingId === review.id ? (
                    <div className="space-y-3">
                      <StarRating value={editRating} onChange={setEditRating} size={22} />
                      <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        rows={3}
                        className="input resize-none"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(review.id)} className="btn-primary px-4 py-2 text-sm">
                          <Check size={16} /> Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="btn-ghost px-4 py-2 text-sm">
                          <X size={16} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          {meal && <img src={meal.image} alt={review.mealName} className="w-12 h-12 rounded-lg object-cover" />}
                          <div>
                            <h4 className="font-semibold text-ink-900 text-sm">{review.mealName}</h4>
                            <p className="text-xs text-ink-500">by {review.author} • {timeAgo(review.createdAt)}</p>
                          </div>
                        </div>
                        {isOwn && (
                          <div className="flex gap-1">
                            <button onClick={() => startEdit(review)} className="p-1.5 rounded-lg hover:bg-cream-200 text-ink-500 hover:text-orange-500 transition">
                              <Pencil size={15} />
                            </button>
                            <button onClick={() => onDeleteReview(review.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-ink-500 hover:text-red-500 transition">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </div>
                      <StarRating value={review.rating} size={16} className="mb-2" />
                      <p className="text-sm text-ink-600 leading-relaxed">{review.comment}</p>
                      {isOwn && <span className="badge bg-orange-100 text-orange-600 mt-3">Your Review</span>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
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
