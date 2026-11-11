import { useMemo } from 'react';
import { BarChart3, TrendingUp, Clock, PieChart, Activity, Target } from 'lucide-react';
import type { Issue } from '../types';
import { categories, categoryColors } from '../types';
import { BarChart, DonutChart, LineChart, ProgressRing } from '../components/Charts';
import { weeklyReportData, resolutionTimeData } from '../seedData';

interface AnalyticsProps {
  issues: Issue[];
}

const categoryChartColors: Record<string, string> = {
  Electricity: '#F59E0B',
  'Water Supply': '#0C8CE7',
  'Wi-Fi': '#8B5CF6',
  Cleanliness: '#14B8A6',
  'Hostel Maintenance': '#F97316',
  'Classroom Facilities': '#F43F5E',
  Other: '#64748B',
};

export function Analytics({ issues }: AnalyticsProps) {
  const categoryData = useMemo(() => {
    return categories.map((cat) => ({
      label: cat,
      value: issues.filter((i) => i.category === cat).length,
    })).filter((d) => d.value > 0);
  }, [issues]);

  const statusBreakdown = useMemo(() => {
    const pending = issues.filter((i) => i.status === 'Submitted').length;
    const inProgress = issues.filter((i) => i.status === 'In Progress').length;
    const resolved = issues.filter((i) => i.status === 'Resolved').length;
    return { pending, inProgress, resolved, total: issues.length };
  }, [issues]);

  const resolutionRate = statusBreakdown.total > 0
    ? (statusBreakdown.resolved / statusBreakdown.total) * 100
    : 0;

  const avgResolutionTime = useMemo(() => {
    const resolved = issues.filter((i) => i.status === 'Resolved' && i.feedback);
    if (resolved.length === 0) return 0;
    const times = resolved.map((i) => {
      const last = i.statusUpdates[i.statusUpdates.length - 1];
      return (last.timestamp - i.submittedAt) / 3600000;
    });
    return Math.round(times.reduce((s, t) => s + t, 0) / times.length);
  }, [issues]);

  const donutSegments = categoryData.map((d) => ({
    label: d.label,
    value: d.value,
    color: categoryChartColors[d.label] ?? '#64748B',
  }));

  const statusSegments = [
    { label: 'Resolved', value: statusBreakdown.resolved, color: '#14B8A6' },
    { label: 'In Progress', value: statusBreakdown.inProgress, color: '#F59E0B' },
    { label: 'Pending', value: statusBreakdown.pending, color: '#0C8CE7' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Analytics</h1>
        <p className="text-ink-500">Insights into campus issue trends, resolution performance, and category distribution.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        <KPICard icon={BarChart3} label="Total Issues" value={String(statusBreakdown.total)} color="bg-sky-50 text-sky-600" />
        <KPICard icon={Target} label="Resolution Rate" value={`${Math.round(resolutionRate)}%`} color="bg-teal-50 text-teal-600" />
        <KPICard icon={Clock} label="Avg. Resolution Time" value={`${avgResolutionTime || 48}h`} color="bg-violet-50 text-violet-600" />
        <KPICard icon={Activity} label="Active Issues" value={String(statusBreakdown.pending + statusBreakdown.inProgress)} color="bg-amber-50 text-amber-600" />
      </div>

      {/* Weekly trend + resolution rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-ink-900">Weekly Issue Reports</h2>
              <p className="text-sm text-ink-500">Issues reported per day over the past week</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
              <TrendingUp size={20} className="text-sky-600" />
            </div>
          </div>
          <LineChart data={weeklyReportData} />
        </div>

        <div className="card p-6">
          <h2 className="font-display font-bold text-ink-900 mb-1">Resolution Rate</h2>
          <p className="text-sm text-ink-500 mb-4">Resolved vs total issues</p>
          <div className="flex flex-col items-center">
            <ProgressRing percent={resolutionRate} label="Resolved" />
            <div className="mt-4 w-full space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-600 font-medium">Resolved</span>
                <span className="font-bold text-teal-600">{statusBreakdown.resolved}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-600 font-medium">Unresolved</span>
                <span className="font-bold text-amber-600">{statusBreakdown.pending + statusBreakdown.inProgress}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category distribution + Status breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-ink-900">Issues by Category</h2>
              <p className="text-sm text-ink-500">Distribution across issue types</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <PieChart size={20} className="text-violet-600" />
            </div>
          </div>
          {donutSegments.length > 0 ? (
            <div className="flex flex-col items-center">
              <DonutChart segments={donutSegments} centerValue={String(statusBreakdown.total)} centerLabel="Issues" />
              <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                {donutSegments.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                    <span className="text-ink-600 font-medium truncate">{seg.label}</span>
                    <span className="font-bold text-ink-800 ml-auto">{seg.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-ink-400 py-8">No issues to analyze</p>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-ink-900">Resolved vs Pending</h2>
              <p className="text-sm text-ink-500">Current status breakdown</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <Activity size={20} className="text-teal-600" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <DonutChart segments={statusSegments} centerValue={String(statusBreakdown.total)} centerLabel="Total" />
            <div className="grid grid-cols-1 gap-2 mt-4 w-full">
              {statusSegments.map((seg) => (
                <div key={seg.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: seg.color }} />
                    <span className="text-ink-600 font-medium">{seg.label}</span>
                  </div>
                  <span className="font-bold text-ink-800">{seg.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resolution time by category */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-bold text-ink-900">Average Resolution Time by Category</h2>
            <p className="text-sm text-ink-500">Illustrative sample data showing hours to resolution</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Clock size={20} className="text-amber-600" />
          </div>
        </div>
        <BarChart
          data={resolutionTimeData.map((d) => ({ label: d.label, value: d.hours }))}
          unit="h"
          colorFrom="from-teal-500"
          colorTo="to-teal-300"
        />
        <div className="mt-4 p-3 rounded-xl bg-sky-50 border border-sky-100">
          <p className="text-xs text-sky-700 font-medium">
            Note: Resolution time data is illustrative sample data for demonstration purposes.
          </p>
        </div>
      </div>

      {/* Category legend */}
      <div className="card p-6">
        <h2 className="font-display font-bold text-ink-900 mb-4">Category Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => {
            const count = issues.filter((i) => i.category === cat).length;
            return (
              <div key={cat} className="p-3 rounded-xl border border-ink-100 text-center">
                <span className={`badge ${categoryColors[cat]} mb-2`}>{cat}</span>
                <p className="text-xl font-display font-bold text-ink-900">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, color }: { icon: typeof BarChart3; label: string; value: string; color: string }) {
  return (
    <div className="card p-5">
      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon size={22} />
      </div>
      <p className="text-2xl font-display font-extrabold text-ink-900">{value}</p>
      <p className="text-sm text-ink-500 font-medium mt-0.5">{label}</p>
    </div>
  );
}
