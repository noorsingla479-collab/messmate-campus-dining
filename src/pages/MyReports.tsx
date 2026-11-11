import { useState, useMemo } from 'react';
import {
  ClipboardList,
  Pencil,
  Trash2,
  X,
  Save,
  CheckCircle2,
  MessageSquare,
  AlertTriangle,
  Inbox,
} from 'lucide-react';
import type { Issue, Status } from '../types';
import { categories, locations, priorities, allStatuses } from '../types';
import { IssueCard } from '../components/IssueCard';
import { IssueDetailModal } from '../components/IssueDetailModal';
import { StatusBadge } from '../components/Badges';

interface MyReportsProps {
  issues: Issue[];
  currentUserName: string;
  onEdit: (id: string, updates: Partial<Issue>) => void;
  onDelete: (id: string) => void;
  onGiveFeedback: (issueId: string, rating: number, comment: string) => void;
  adminMode: boolean;
  onStatusChange: (issueId: string, status: Status) => void;
}

export function MyReports({
  issues,
  currentUserName,
  onEdit,
  onDelete,
  onGiveFeedback,
  adminMode,
  onStatusChange,
}: MyReportsProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selected, setSelected] = useState<Issue | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

  const myIssues = useMemo(
    () => issues.filter((i) => i.submittedBy === currentUserName),
    [issues, currentUserName]
  );

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return myIssues;
    return myIssues.filter((i) => i.status === statusFilter);
  }, [myIssues, statusFilter]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => b.submittedAt - a.submittedAt), [filtered]);

  const stats = useMemo(() => ({
    total: myIssues.length,
    resolved: myIssues.filter((i) => i.status === 'Resolved').length,
    active: myIssues.filter((i) => i.status !== 'Resolved').length,
  }), [myIssues]);

  const editingIssue = editing ? issues.find((i) => i.id === editing) ?? null : null;
  const selectedIssue = selected ? issues.find((i) => i.id === selected.id) ?? selected : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">My Reports</h1>
        <p className="text-ink-500">View and manage issues you've submitted. Edit unresolved issues or give feedback on resolved ones.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 stagger">
        <div className="card p-5">
          <p className="text-3xl font-display font-extrabold text-ink-900">{stats.total}</p>
          <p className="text-sm text-ink-500 font-medium mt-0.5">Total Submitted</p>
        </div>
        <div className="card p-5">
          <p className="text-3xl font-display font-extrabold text-amber-600">{stats.active}</p>
          <p className="text-sm text-ink-500 font-medium mt-0.5">Active / Unresolved</p>
        </div>
        <div className="card p-5">
          <p className="text-3xl font-display font-extrabold text-teal-600">{stats.resolved}</p>
          <p className="text-sm text-ink-500 font-medium mt-0.5">Resolved</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>All</FilterChip>
        {allStatuses.map((s) => (
          <FilterChip key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
            {s}
          </FilterChip>
        ))}
      </div>

      {/* Issues list */}
      {sorted.length === 0 ? (
        <div className="card p-12 text-center">
          <Inbox size={40} className="text-ink-300 mx-auto mb-3" />
          <h3 className="font-display font-bold text-ink-700 text-lg mb-1">No reports yet</h3>
          <p className="text-ink-400 text-sm">Issues you submit will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((issue) => (
            <div key={issue.id} className="card p-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setSelected(issue)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg font-mono">
                      {issue.id}
                    </span>
                    <StatusBadge status={issue.status} />
                  </div>
                  <h3 className="font-display font-bold text-ink-900 text-base mb-1">{issue.title}</h3>
                  <p className="text-sm text-ink-500 line-clamp-2 mb-2">{issue.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
                    <span>{issue.category}</span>
                    <span>•</span>
                    <span>{issue.location}</span>
                    <span>•</span>
                    <span>{new Date(issue.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </button>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 sm:w-32 flex-shrink-0">
                  {issue.status !== 'Resolved' && (
                    <>
                      <button
                        onClick={() => setEditing(issue.id)}
                        className="btn-secondary flex-1 text-sm py-2"
                      >
                        <Pencil size={15} /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(issue.id)}
                        className="btn-danger flex-1 text-sm py-2"
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </>
                  )}
                  {issue.status === 'Resolved' && !issue.feedback && (
                    <button
                      onClick={() => setSelected(issue)}
                      className="btn-teal flex-1 text-sm py-2"
                    >
                      <MessageSquare size={15} /> Feedback
                    </button>
                  )}
                  {issue.feedback && (
                    <div className="flex-1 flex items-center justify-center gap-1.5 text-xs text-teal-600 font-semibold bg-teal-50 rounded-xl px-2 py-2 border border-teal-100">
                      <CheckCircle2 size={15} /> Feedback Given
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editingIssue && (
        <EditModal
          issue={editingIssue}
          onSave={(updates) => {
            onEdit(editingIssue.id, updates);
            setEditing(null);
          }}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <DeleteConfirm
          issue={issues.find((i) => i.id === deleteConfirm)}
          onConfirm={() => {
            onDelete(deleteConfirm);
            setDeleteConfirm(null);
          }}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* Detail modal */}
      <IssueDetailModal
        issue={selectedIssue}
        onClose={() => setSelected(null)}
        onGiveFeedback={onGiveFeedback}
        canFeedback={true}
      />

      {/* Admin status panel for selected issue */}
      {selectedIssue && adminMode && (
        <div className="fixed bottom-6 right-6 z-50 card p-4 shadow-glow border-amber-200 animate-scaleIn max-w-xs">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">Demo Admin Actions</p>
          <p className="text-sm text-ink-700 font-semibold mb-1 truncate">{selectedIssue.id}</p>
          <div className="flex gap-2">
            {allStatuses.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onStatusChange(selectedIssue.id, s);
                  setSelected(null);
                }}
                disabled={selectedIssue.status === s}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-1 ${
                  selectedIssue.status === s
                    ? 'bg-ink-100 text-ink-400 cursor-default'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-sky-600 text-white shadow-soft' : 'bg-white text-ink-600 border border-ink-200 hover:border-sky-300'
      }`}
    >
      {children}
    </button>
  );
}

function EditModal({ issue, onSave, onClose }: { issue: Issue; onSave: (updates: Partial<Issue>) => void; onClose: () => void }) {
  const [title, setTitle] = useState(issue.title);
  const [category, setCategory] = useState(issue.category);
  const [location, setLocation] = useState(issue.location);
  const [priority, setPriority] = useState(issue.priority);
  const [description, setDescription] = useState(issue.description);

  const save = () => {
    if (title.trim().length < 5 || description.trim().length < 20) return;
    onSave({ title: title.trim(), category, location, priority, description: description.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative card max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="sticky top-0 bg-white border-b border-ink-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-bold text-ink-900">Edit Issue</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-ink-50 text-ink-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="label">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" maxLength={100} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="input">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value as typeof location)} className="input">
                {locations.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Priority</label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${
                    priority === p
                      ? p === 'High' ? 'border-red-400 bg-red-50 text-red-700'
                      : p === 'Medium' ? 'border-amber-400 bg-amber-50 text-amber-700'
                      : 'border-green-400 bg-green-50 text-green-700'
                      : 'border-ink-200 text-ink-500 hover:border-ink-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="input resize-none" maxLength={500} />
          </div>
          <button onClick={save} className="btn-primary w-full">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({ issue, onConfirm, onCancel }: { issue: Issue | undefined; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fadeIn" onClick={onCancel} />
      <div className="relative card max-w-sm w-full p-6 animate-scaleIn">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <h2 className="font-display font-bold text-ink-900 text-lg mb-1">Delete this issue?</h2>
        <p className="text-sm text-ink-500 mb-1">
          {issue?.id}: {issue?.title}
        </p>
        <p className="text-sm text-ink-400 mb-5">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="btn-danger flex-1">
            <Trash2 size={16} /> Delete
          </button>
          <button onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
