import { useState, useMemo } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { availabilityData } from '../seedData';
import { getMealById } from '../data';
import { VegBadge } from '../components/VegBadge';

const statusConfig = {
  available: {
    label: 'Available',
    color: 'bg-green-500',
    text: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: CheckCircle2,
  },
  limited: {
    label: 'Limited',
    color: 'bg-orange-500',
    text: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: AlertTriangle,
  },
  unavailable: {
    label: 'Unavailable',
    color: 'bg-red-400',
    text: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: XCircle,
  },
};

const mealFilters = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Dinner'] as const;

export function FoodAvailability() {
  const [filter, setFilter] = useState<(typeof mealFilters)[number]>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return availabilityData;
    return availabilityData.filter((a) => a.meal === filter);
  }, [filter]);

  const counts = useMemo(() => ({
    available: availabilityData.filter((a) => a.status === 'available').length,
    limited: availabilityData.filter((a) => a.status === 'limited').length,
    unavailable: availabilityData.filter((a) => a.status === 'unavailable').length,
  }), []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Food Availability</h1>
        <p className="text-ink-500">Check what's being served right now and plan your meals accordingly.</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4 stagger">
        {(['available', 'limited', 'unavailable'] as const).map((status) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <div key={status} className={`card p-5 ${cfg.bg} ${cfg.border} border`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${cfg.color} flex items-center justify-center`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-ink-900">{counts[status]}</p>
                  <p className={`text-xs font-medium ${cfg.text}`}>{cfg.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {mealFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              filter === f
                ? 'bg-orange-500 text-white shadow-soft'
                : 'bg-white text-ink-600 border border-cream-300 hover:border-orange-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Availability cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
        {filtered.map((item, idx) => {
          const cfg = statusConfig[item.status];
          const Icon = cfg.icon;
          const meal = getMealById(item.item.toLowerCase().replace(/[^a-z]/g, ''));
          return (
            <div key={idx} className={`card p-5 ${cfg.border} border-2`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {meal && (
                    <img src={meal.image} alt={item.item} className="w-14 h-14 rounded-xl object-cover" loading="lazy" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-ink-900">{item.item}</h3>
                      {meal && <VegBadge category={meal.category} />}
                    </div>
                    <span className="text-xs text-ink-500">{item.meal}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`badge ${cfg.bg} ${cfg.text}`}>
                  <Icon size={14} /> {cfg.label}
                </span>
                {item.status !== 'unavailable' && (
                  <span className="text-xs text-ink-500 font-medium">{item.remaining} servings left</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-ink-500">
                <Clock size={15} />
                {item.timing}
              </div>

              {item.status === 'available' && (
                <div className="mt-3 h-2 rounded-full bg-cream-200 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${Math.min(item.remaining * 1.5, 100)}%` }} />
                </div>
              )}
              {item.status === 'limited' && (
                <div className="mt-3 h-2 rounded-full bg-cream-200 overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${Math.min(item.remaining * 8, 100)}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
