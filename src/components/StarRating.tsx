import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
}

export function StarRating({ value, onChange, size = 20, className = '' }: StarRatingProps) {
  const interactive = !!onChange;
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            className={
              star <= value
                ? 'fill-orange-400 text-orange-400'
                : 'fill-cream-200 text-cream-300'
            }
          />
        </button>
      ))}
    </div>
  );
}
