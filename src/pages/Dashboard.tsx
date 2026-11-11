import { Sunrise, Sun, Cookie, Moon, Star, ArrowRight, TrendingUp, Clock, Utensils } from 'lucide-react';
import type { PageId } from '../components/nav';
import type { Review } from '../types';
import { featuredMeal, weeklyMenu, getTodayName, mealTimings } from '../data';
import { FoodCard } from '../components/FoodCard';
import { StarRating } from '../components/StarRating';
import { VegBadge } from '../components/VegBadge';

interface DashboardProps {
  reviews: Review[];
  profileName: string;
  onNavigate: (page: PageId) => void;
}

const mealIcons: Record<string, typeof Sunrise> = {
  sunrise: Sunrise,
  sun: Sun,
  cookie: Cookie,
  moon: Moon,
};

export function Dashboard({ reviews, profileName, onNavigate }: DashboardProps) {
  const todayName = getTodayName();
  const todayMenu = weeklyMenu.find((d) => d.day === todayName) ?? weeklyMenu[0];
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : '4.2';

  const mealSections = [
    { key: 'breakfast', label: 'Breakfast', items: todayMenu.breakfast },
    { key: 'lunch', label: 'Lunch', items: todayMenu.lunch },
    { key: 'snacks', label: 'Snacks', items: todayMenu.snacks },
    { key: 'dinner', label: 'Dinner', items: todayMenu.dinner },
  ] as const;

  const quickLinks: { page: PageId; label: string; icon: typeof Utensils; color: string }[] = [
    { page: 'menu', label: 'Weekly Menu', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
    { page: 'feedback', label: 'Give Feedback', icon: Star, color: 'bg-green-100 text-green-600' },
    { page: 'waste', label: 'Food Waste', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
    { page: 'ratings', label: 'Reviews', icon: Star, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 p-8 md:p-10 text-white shadow-card">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-16" />
        <div className="relative z-10">
          <p className="text-orange-100 font-medium mb-1">{todayName}, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">
            Hello, {profileName.split(' ')[0]}!
          </h1>
          <p className="text-orange-50 max-w-md text-lg leading-relaxed">
            What's cooking at the mess today? Let's explore today's meals and make good food choices together.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={() => onNavigate('menu')} className="btn bg-white text-orange-600 px-5 py-2.5 hover:bg-cream-100">
              View Today's Menu <ArrowRight size={18} />
            </button>
            <button onClick={() => onNavigate('feedback')} className="btn bg-orange-700/40 backdrop-blur text-white px-5 py-2.5 hover:bg-orange-700/60 border border-white/20">
              Share Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <Star className="text-orange-500" size={20} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-ink-900">{avgRating}</p>
              <p className="text-xs text-ink-500 font-medium">Avg. Food Rating</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Utensils className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-ink-900">{reviews.length}</p>
              <p className="text-xs text-ink-500 font-medium">Student Reviews</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-ink-900">4</p>
              <p className="text-xs text-ink-500 font-medium">Meals Daily</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-ink-900">7</p>
              <p className="text-xs text-ink-500 font-medium">Day Menu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured meal */}
      <div className="card overflow-hidden animate-fadeIn">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 relative h-56 md:h-auto min-h-[240px]">
            <img src={featuredMeal.image} alt={featuredMeal.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 left-4 badge bg-orange-500 text-white shadow-lg px-3 py-1">
              <Star size={14} className="fill-white" /> Featured Today
            </div>
          </div>
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <VegBadge category={featuredMeal.category} />
              <span className="badge bg-cream-200 text-ink-600">{featuredMeal.calories} cal</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-2">{featuredMeal.name}</h2>
            <p className="text-ink-600 leading-relaxed mb-4">{featuredMeal.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {featuredMeal.tags.map((tag) => (
                <span key={tag} className="badge bg-orange-50 text-orange-600">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <StarRating value={5} size={18} />
              <span className="text-sm text-ink-500 font-medium">Chef's Special — top rated by students</span>
            </div>
            <button onClick={() => onNavigate('ratings')} className="btn-primary self-start mt-5">
              Rate This Meal <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Today's meals */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-ink-900">Today's Meals</h2>
            <p className="text-sm text-ink-500">{todayName} • Four meals served throughout the day</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mealSections.map((section) => {
            const Icon = mealIcons[
              section.key === 'breakfast' ? 'sunrise' :
              section.key === 'lunch' ? 'sun' :
              section.key === 'snacks' ? 'cookie' : 'moon'
            ];
            const timing = mealTimings.find((t) => t.type.toLowerCase() === section.key);
            return (
              <div key={section.key} className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Icon className="text-orange-500" size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-ink-900">{section.label}</h3>
                      {timing && <p className="text-xs text-ink-500">{timing.start} – {timing.end}</p>}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {section.items.map((meal) => (
                    <div key={meal.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-cream-100 transition-colors">
                      <img src={meal.image} alt={meal.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-ink-800 text-sm truncate">{meal.name}</h4>
                          <VegBadge category={meal.category} />
                        </div>
                        <p className="text-xs text-ink-500 truncate">{meal.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming timings + quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-display font-bold text-ink-900 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-orange-500" /> Upcoming Meal Timings
          </h2>
          <div className="space-y-3">
            {mealTimings.map((t) => {
              const Icon = mealIcons[t.icon];
              return (
                <div key={t.type} className="flex items-center gap-4 p-3 rounded-xl bg-cream-50 border border-cream-200">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Icon className="text-orange-500" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink-800">{t.type}</p>
                    <p className="text-sm text-ink-500">{t.start} – {t.end}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-display font-bold text-ink-900 mb-4 flex items-center gap-2">
            <ArrowRight size={20} className="text-orange-500" /> Quick Links
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="group p-4 rounded-xl border border-cream-200 hover:border-orange-300 hover:shadow-soft transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold text-ink-800 text-sm">{link.label}</p>
                </button>
              );
            })}
          </div>
          <button onClick={() => onNavigate('availability')} className="btn-secondary w-full mt-4">
            Check Food Availability <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
