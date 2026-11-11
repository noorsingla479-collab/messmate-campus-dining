import { Leaf, Drumstick } from 'lucide-react';
import type { FoodCategory } from '../types';

export function VegBadge({ category, className = '' }: { category: FoodCategory; className?: string }) {
  const isVeg = category === 'veg';
  return (
    <span
      className={`badge ${isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} ${className}`}
    >
      {isVeg ? <Leaf size={12} /> : <Drumstick size={12} />}
      {isVeg ? 'Veg' : 'Non-Veg'}
    </span>
  );
}
