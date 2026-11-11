import { useMemo } from 'react';
import {
  FileText,
  Clock,
  Loader2,
  CheckCircle2,
  ArrowRight,
  FilePlus2,
  TrendingUp,
  Activity,
} from 'lucide-react';
import type { Issue } from '../types';
import type { PageId } from '../components/nav';
import { IssueCard } from '../components/IssueCard';
import { BarChart, DonutChart } from '../components/Charts';
import { weeklyReportData } from '../seedData';

interface DashboardProps {
  issues: Issue[];
  profileName: string;
  onNavigate: (page: PageId) => void;
  onSelectIssue: (issue: Issue) => void;
}

export function Dashboard({ issues, profileName, onNavigate, onSelectIssue }: DashboardProps) {
  const stats = useMemo(() => {
    const total = issues.length;
    const pending = issues.filter((i) => i.status === 'Submitted').length;
    const inProgress = issues.filter((i) => i.status === 'In Progress').length;
    const resolved = issues.filter((i) => i.status === 'Resolved').length;
    return { total, pending, inProgress, resolved };
  }, [issues]);

  const recentIssues = useMemo(
    () => [...issues].sort((a, b) => b.submittedAt - a.submittedAt).slice(0, 4),
    [issues]
  );

  const statusSegments = [
    { label: 'Submitted', value: stats.pending, color: '#0C8CE7' },
    { label: 'In Progress', value: stats.inProgress, color: '#F59E0B' },
    { label: 'Resolved', value: stats.resolved, color: '#14B8A6' },
  ];

  const statCards = [
    { label: 'Total Reported', value: stats.total, icon: FileText, color: 'bg-sky-50 text-sky-600', ring: 'ring-sky-100' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-50 text-amber-600', ring: 'ring-amber-100' },
    { label: 'In Progress', value: stats.inProgress, icon: Loader2, color: 'bg-violet-50 text-violet-600', ring: 'ring-violet-100' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle2, color: 'bg-teal-50 text-teal-600', ring: 'ring-teal-100' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 to-sky-800 p-8 md:p-10 text-white shadow-card">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-24 translate-x-24" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-teal-400/10 rounded-full translate-y-12" />
        <div className="relative z-10">
          <p className="text-sky-200 font-medium mb-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">
            Welcome back, {profileName.split(' ')[0]}!
          </h1>
          <p className="text-sky-100 max-w-lg text-lg leading-relaxed">
            Report campus issues, track their progress, and help build a better campus for everyone.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={() => onNavigate('report')} className="btn bg-white text-sky-700 px-5 py-2.5 hover:bg-sky-50">
              <FilePlus2 size={18} /> Report an Issue
            </button>
            <button onClick={() => onNavigate('track')} className="btn bg-sky-700/40 backdrop-blur text-white px-5 py-2.5 hover:bg-sky-700/60 border border-white/20">
              Track Issues <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`card p-5 ring-2 ${stat.ring}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon size={22} className={stat.label === 'In Progress' ? 'animate-spin' : ''} />
                </div>
              </div>
              <p className="text-3xl font-display font-extrabold text-ink-900">{stat.value}</p>
              <p className="text-sm text-ink-500 font-medium mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-ink-900">Weekly Issue Reports</h2>
              <p className="text-sm text-ink-500">Issues reported over the past week</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
              <TrendingUp size={20} className="text-sky-600" />
            </div>
          </div>
          <BarChart data={weeklyReportData} />
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-ink-900">Status Distribution</h2>
              <p className="text-sm text-ink-500">Current issue statuses</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <Activity size={20} className="text-teal-600" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <DonutChart
              segments={statusSegments}
              centerValue={String(stats.total)}
              centerLabel="Issues"
            />
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

      {/* Recent issues + quick report */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-ink-900">Recent Issue Reports</h2>
            <button onClick={() => onNavigate('track')} className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} onClick={() => onSelectIssue(issue)} />
            ))}
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-sky-50 to-teal-50 border-sky-100">
          <h2 className="font-display font-bold text-ink-900 mb-2">Quick Report</h2>
          <p className="text-sm text-ink-600 mb-5">
            Spotted a problem on campus? Report it in under a minute and track it to resolution.
          </p>
          <div className="space-y-2 mb-5">
            {[
              'Electricity issues',
              'Wi-Fi connectivity',
              'Water supply problems',
              'Cleanliness concerns',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-ink-600">
                <CheckCircle2 size={16} className="text-teal-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate('report')} className="btn-primary w-full">
            <FilePlus2 size={18} /> Report Now
          </button>
        </div>
      </div>
    </div>
  );
}
