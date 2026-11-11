import { useState, useMemo } from 'react';
import { Trash2, Leaf, Bell, Recycle, Calendar, Utensils, TrendingDown, Sprout, Send } from 'lucide-react';
import type { WasteReport } from '../types';
import { BarChart, DonutChart } from '../components/Charts';
import { weeklyWasteData, sustainabilityTips } from '../seedData';

interface WastePageProps {
  reports: WasteReport[];
  onSubmit: (report: WasteReport) => void;
}

const tipIcons: Record<string, typeof Utensils> = {
  utensils: Utensils,
  bell: Bell,
  recycle: Recycle,
  calendar: Calendar,
};

export function FoodWaste({ reports, onSubmit }: WastePageProps) {
  const [meal, setMeal] = useState('Lunch');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const sortedReports = useMemo(
    () => [...reports].sort((a, b) => b.createdAt - a.createdAt),
    [reports]
  );

  const totalWaste = weeklyWasteData.reduce((s, d) => s + d.waste, 0);
  const avgWaste = Math.round(totalWaste / weeklyWasteData.length);

  const wasteByMeal = useMemo(() => {
    const map: Record<string, number> = { Breakfast: 0, Lunch: 0, Snacks: 0, Dinner: 0 };
    reports.forEach((r) => {
      if (map[r.meal] !== undefined) map[r.meal] += r.amount;
    });
    return map;
  }, [reports]);

  const donutData = [
    { label: 'Breakfast', value: wasteByMeal.Breakfast || 8, color: '#FBBF24' },
    { label: 'Lunch', value: wasteByMeal.Lunch || 22, color: '#F97316' },
    { label: 'Snacks', value: wasteByMeal.Snacks || 6, color: '#22C55E' },
    { label: 'Dinner', value: wasteByMeal.Dinner || 14, color: '#6366F1' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { setError('Please enter a valid amount'); return; }
    if (reason.trim().length < 5) { setError('Please describe the reason (min 5 characters)'); return; }
    const report: WasteReport = {
      id: `w${Date.now()}`,
      meal,
      date,
      amount: amt,
      unit: 'kg',
      reason: reason.trim(),
      createdAt: Date.now(),
    };
    onSubmit(report);
    setAmount('');
    setReason('');
    setError('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Food Waste Tracker</h1>
        <p className="text-ink-500">Monitor waste trends, report food wastage, and discover sustainability tips.</p>
      </div>

      {/* Reduce Waste banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-green-700 p-8 text-white shadow-card">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
            <Sprout size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold mb-1">Reduce Waste, Save Food</h2>
            <p className="text-green-50 max-w-2xl">
              Every kilogram saved matters. Last week our mess wasted {totalWaste} kg of food — let's bring that down together.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-2">
            <Trash2 className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-display font-bold text-ink-900">{totalWaste} kg</p>
          <p className="text-xs text-ink-500 font-medium">Total This Week</p>
        </div>
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-2">
            <TrendingDown className="text-green-600" size={20} />
          </div>
          <p className="text-2xl font-display font-bold text-ink-900">{avgWaste} kg</p>
          <p className="text-xs text-ink-500 font-medium">Daily Average</p>
        </div>
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
            <Calendar className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl font-display font-bold text-ink-900">{reports.length}</p>
          <p className="text-xs text-ink-500 font-medium">Reports Filed</p>
        </div>
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-2">
            <Leaf className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl font-display font-bold text-ink-900">12%</p>
          <p className="text-xs text-ink-500 font-medium">Reduction Goal</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-display font-bold text-ink-900 mb-1">Weekly Food Waste Trend</h2>
          <p className="text-sm text-ink-500 mb-4">Daily food waste in kilograms over the past week</p>
          <BarChart data={weeklyWasteData.map((d) => ({ label: d.day, value: d.waste }))} unit="kg" />
        </div>
        <div className="card p-6">
          <h2 className="font-display font-bold text-ink-900 mb-1">Waste by Meal</h2>
          <p className="text-sm text-ink-500 mb-4">Distribution across meal times</p>
          <div className="flex flex-col items-center">
            <DonutChart segments={donutData} />
            <div className="grid grid-cols-2 gap-2 mt-4 w-full">
              {donutData.map((seg) => (
                <div key={seg.label} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full" style={{ background: seg.color }} />
                  <span className="text-ink-600 font-medium">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report form + recent reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-display font-bold text-ink-900 mb-4 flex items-center gap-2">
            <Send size={20} className="text-orange-500" /> Report Food Wastage
          </h2>

          {showSuccess && (
            <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 animate-pop">
              <Leaf className="text-green-500 flex-shrink-0" size={22} />
              <p className="text-sm font-semibold text-green-800">Waste report submitted. Thank you for tracking!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Meal</label>
                <select value={meal} onChange={(e) => setMeal(e.target.value)} className="input">
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Snacks</option>
                  <option>Dinner</option>
                </select>
              </div>
              <div>
                <label className="label">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
              </div>
            </div>
            <div>
              <label className="label">Amount Wasted (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5.5"
                className="input"
              />
            </div>
            <div>
              <label className="label">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="What caused the wastage? e.g. excess preparation, taste issues..."
                rows={3}
                className="input resize-none"
              />
            </div>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}
            <button type="submit" className="btn-primary w-full">
              <Send size={16} /> Submit Report
            </button>
          </form>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-bold text-ink-900 mb-4">Recent Reports</h2>
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {sortedReports.length === 0 ? (
              <p className="text-center text-ink-400 py-8">No reports filed yet.</p>
            ) : (
              sortedReports.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-cream-50 border border-cream-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="badge bg-orange-100 text-orange-700">{r.meal}</span>
                    <span className="text-xs text-ink-400">{r.date}</span>
                  </div>
                  <p className="text-lg font-display font-bold text-ink-900">{r.amount} {r.unit} wasted</p>
                  <p className="text-sm text-ink-600 mt-1">{r.reason}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sustainability tips */}
      <div>
        <h2 className="text-xl font-display font-bold text-ink-900 mb-4">Sustainability Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
          {sustainabilityTips.map((tip) => {
            const Icon = tipIcons[tip.icon] ?? Leaf;
            return (
              <div key={tip.title} className="card p-5 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-green-600" size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{tip.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
