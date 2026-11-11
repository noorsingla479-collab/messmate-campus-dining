import { useState, useMemo } from 'react';
import { Search, Filter, ListChecks, Inbox } from 'lucide-react';
import type { Issue, Category, Status } from '../types';
import { categories, allStatuses } from '../types';
import { IssueCard } from '../components/IssueCard';
import { IssueDetailModal } from '../components/IssueDetailModal';

interface TrackIssuesProps {
  issues: Issue[];
  onGiveFeedback: (issueId: string, rating: number, comment: string) => void;
  currentUserName: string;
  adminMode: boolean;
  onStatusChange: (issueId: string, status: Status) => void;
}

export function TrackIssues({ issues, onGiveFeedback, currentUserName, adminMode, onStatusChange }: TrackIssuesProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [selected, setSelected] = useState<Issue | null>(null);

  const filtered = useMemo(() => {
    return issues
      .filter((issue) => {
        const matchesSearch =
          issue.title.toLowerCase().includes(search.toLowerCase()) ||
          issue.id.toLowerCase().includes(search.toLowerCase()) ||
          issue.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => b.submittedAt - a.submittedAt);
  }, [issues, search, categoryFilter, statusFilter]);

  const selectedIssue = selected ? issues.find((i) => i.id === selected.id) ?? selected : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Track Issues</h1>
        <p className="text-ink-500">Browse all reported campus issues. Search, filter, and click any issue for full details.</p>
      </div>

      {/* Search + filters */}
      <div className="card p-4 space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, ID, or keyword..."
            className="input pl-11"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Filter size={15} className="text-ink-400" />
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>
                All
              </FilterChip>
              {categories.map((cat) => (
                <FilterChip key={cat} active={categoryFilter === cat} onClick={() => setCategoryFilter(cat)}>
                  {cat}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="sm:w-48">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Status</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
                All
              </FilterChip>
              {allStatuses.map((s) => (
                <FilterChip key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
                  {s}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-500">
          <span className="font-bold text-ink-800">{filtered.length}</span> issue{filtered.length !== 1 ? 's' : ''} found
        </p>
        {adminMode && (
          <span className="badge bg-amber-100 text-amber-700 border border-amber-200">
            Demo Admin Mode — status changes enabled
          </span>
        )}
      </div>

      {/* Issues grid */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Inbox size={40} className="text-ink-300 mx-auto mb-3" />
          <h3 className="font-display font-bold text-ink-700 text-lg mb-1">No issues found</h3>
          <p className="text-ink-400 text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {filtered.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onClick={() => setSelected(issue)} />
          ))}
        </div>
      )}

      {/* Detail modal */}
      <IssueDetailModal
        issue={selectedIssue}
        onClose={() => setSelected(null)}
        onGiveFeedback={onGiveFeedback}
        canFeedback={selectedIssue?.submittedBy === currentUserName}
      />

      {/* Admin status changer in modal */}
      {selectedIssue && adminMode && (
        <AdminStatusPanel
          issue={selectedIssue}
          onStatusChange={(status) => {
            onStatusChange(selectedIssue.id, status);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-sky-600 text-white shadow-soft'
          : 'bg-ink-50 text-ink-600 hover:bg-sky-50 hover:text-sky-600'
      }`}
    >
      {children}
    </button>
  );
}

function AdminStatusPanel({ issue, onStatusChange }: { issue: Issue; onStatusChange: (status: Status) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 card p-4 shadow-glow border-amber-200 animate-scaleIn max-w-xs">
      <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">Demo Admin Actions</p>
      <p className="text-sm text-ink-700 font-semibold mb-1 truncate">{issue.id}: {issue.title}</p>
      <p className="text-xs text-ink-400 mb-3">Change issue status (simulated)</p>
      <div className="flex gap-2">
        {allStatuses.map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            disabled={issue.status === s}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-1 ${
              issue.status === s
                ? 'bg-ink-100 text-ink-400 cursor-default'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
