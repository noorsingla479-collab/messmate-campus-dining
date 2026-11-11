import type { MealItem } from '../types';
import { VegBadge } from './VegBadge';
import { Flame } from 'lucide-react';

interface FoodCardProps {
  meal: MealItem;
  onClick?: () => void;
  className?: string;
}

export function FoodCard({ meal, onClick, className = '' }: FoodCardProps) {
  return (
    <div
      onClick={onClick}
      className={`card group overflow-hidden cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all duration-300 animate-fadeIn ${className}`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <VegBadge category={meal.category} className="backdrop-blur-sm bg-white/90" />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-display font-bold text-lg leading-tight drop-shadow-sm">
            {meal.name}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-ink-500 line-clamp-2 leading-relaxed">{meal.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-200">
          <span className="flex items-center gap-1 text-xs font-medium text-ink-500">
            <Flame size={14} className="text-orange-400" />
            {meal.calories} cal
          </span>
          <div className="flex gap-1">
            {meal.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="badge bg-cream-200 text-ink-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
