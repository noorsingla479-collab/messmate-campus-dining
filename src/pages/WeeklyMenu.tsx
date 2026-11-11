import { useState, useMemo } from 'react';
import { Filter, CalendarDays } from 'lucide-react';
import { weeklyMenu, daysOfWeek, getTodayName } from '../data';
import { FoodCard } from '../components/FoodCard';
import type { DayName, MealType } from '../types';

const mealTypes: { key: MealType; label: string; color: string }[] = [
  { key: 'breakfast', label: 'Breakfast', color: 'bg-yellow-100 text-yellow-700' },
  { key: 'lunch', label: 'Lunch', color: 'bg-orange-100 text-orange-700' },
  { key: 'snacks', label: 'Snacks', color: 'bg-green-100 text-green-700' },
  { key: 'dinner', label: 'Dinner', color: 'bg-indigo-100 text-indigo-700' },
];

export function WeeklyMenu() {
  const [selectedDay, setSelectedDay] = useState<DayName | 'all'>(
    getTodayName() as DayName
  );
  const [selectedMeal, setSelectedMeal] = useState<MealType | 'all'>('all');

  const filteredDays = useMemo(() => {
    if (selectedDay === 'all') return weeklyMenu;
    return weeklyMenu.filter((d) => d.day === selectedDay);
  }, [selectedDay]);

  const visibleMealTypes = selectedMeal === 'all' ? mealTypes : mealTypes.filter((m) => m.key === selectedMeal);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Weekly Menu</h1>
        <p className="text-ink-500">Explore the full Monday-to-Sunday meal schedule. Filter by day or meal type.</p>
      </div>

      {/* Day filter */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={18} className="text-orange-500" />
          <span className="font-semibold text-ink-800 text-sm">Select Day</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              selectedDay === 'all'
                ? 'bg-orange-500 text-white shadow-soft'
                : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
            }`}
          >
            All Days
          </button>
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                selectedDay === day
                  ? 'bg-orange-500 text-white shadow-soft'
                  : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Meal type filter */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} className="text-orange-500" />
          <span className="font-semibold text-ink-800 text-sm">Filter by Meal Type</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMeal('all')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              selectedMeal === 'all'
                ? 'bg-orange-500 text-white shadow-soft'
                : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
            }`}
          >
            All Meals
          </button>
          {mealTypes.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedMeal(m.key)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                selectedMeal === m.key
                  ? 'bg-orange-500 text-white shadow-soft'
                  : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu display */}
      <div className="space-y-8">
        {filteredDays.map((dayMenu) => (
          <div key={dayMenu.day} className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-display font-bold text-ink-900">{dayMenu.day}</h2>
              {dayMenu.day === getTodayName() && (
                <span className="badge bg-green-100 text-green-700">Today</span>
              )}
              <div className="flex-1 h-px bg-cream-200" />
            </div>

            <div className="space-y-6">
              {visibleMealTypes.map((mt) => {
                const items = dayMenu[mt.key];
                if (!items || items.length === 0) return null;
                return (
                  <div key={mt.key}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`badge ${mt.color} px-3 py-1`}>{mt.label}</span>
                      <span className="text-xs text-ink-400">{items.length} item{items.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger">
                      {items.map((meal) => (
                        <FoodCard key={meal.id} meal={meal} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
