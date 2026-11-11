import { useState, useMemo } from 'react';
import { Map as MapIcon, X, ChevronRight, AlertCircle, Building2, BookOpen, Utensils, Dumbbell, ShowerHead, GraduationCap, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Issue } from '../types';
import { campusLocations } from '../seedData';
import { IssueCard } from '../components/IssueCard';
import { IssueDetailModal } from '../components/IssueDetailModal';

interface CampusMapProps {
  issues: Issue[];
  currentUserName: string;
  onGiveFeedback: (issueId: string, rating: number, comment: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  'building-2': Building2,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  utensils: Utensils,
  dumbbell: Dumbbell,
  'shower-head': ShowerHead,
};

export function CampusMap({ issues, currentUserName, onGiveFeedback }: CampusMapProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const selectedLocation = campusLocations.find((l) => l.id === selectedLocationId);
  const Icon = selectedLocation ? iconMap[selectedLocation.icon] ?? MapPin : MapPin;

  const locationIssues = useMemo(() => {
    if (!selectedLocation) return [];
    return issues
      .filter((i) => i.location === selectedLocation.type)
      .sort((a, b) => b.submittedAt - a.submittedAt);
  }, [selectedLocation, issues]);

  const selectedIssueFull = selectedIssue ? issues.find((i) => i.id === selectedIssue.id) ?? selectedIssue : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Campus Map</h1>
        <p className="text-ink-500">Browse campus locations and view issues reported in each area.</p>
      </div>

      {/* Map illustration */}
      <div className="card p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapIcon size={20} className="text-sky-600" />
          <h2 className="font-display font-bold text-ink-900">Campus Overview</h2>
        </div>
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-sky-50 to-teal-50 rounded-2xl border-2 border-dashed border-sky-100 overflow-hidden">
          {/* Decorative paths */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 75">
            <path d="M 10 15 Q 40 20 50 30" fill="none" stroke="#BAE0FD" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M 50 30 Q 60 45 55 55" fill="none" stroke="#BAE0FD" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M 50 30 L 78 22" fill="none" stroke="#BAE0FD" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M 55 55 Q 35 60 25 65" fill="none" stroke="#BAE0FD" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <rect x="5" y="5" width="90" height="65" fill="none" stroke="#E0EFFE" strokeWidth="0.3" rx="3" />
          </svg>

          {/* Location markers */}
          {campusLocations.map((loc) => {
            const LocIcon = iconMap[loc.icon] ?? MapPin;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${
                  selectedLocationId === loc.id ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                }`}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${loc.color} flex items-center justify-center shadow-card ${selectedLocationId === loc.id ? 'ring-4 ring-sky-200' : ''}`}>
                  <LocIcon size={22} className="text-white" />
                </div>
                {loc.issueCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {loc.issueCount}
                  </span>
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                  <p className="text-xs font-semibold text-ink-700 bg-white/90 backdrop-blur px-2 py-0.5 rounded-md shadow-sm">
                    {loc.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Location directory */}
      <div>
        <h2 className="text-xl font-display font-bold text-ink-900 mb-4">Location Directory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {campusLocations.map((loc) => {
            const LocIcon = iconMap[loc.icon] ?? MapPin;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className="card p-5 text-left hover:shadow-glow hover:border-sky-200 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${loc.color} flex items-center justify-center flex-shrink-0`}>
                    <LocIcon size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-ink-900 text-sm truncate">{loc.name}</h3>
                    <p className="text-xs text-ink-400 mb-2">{loc.area}</p>
                    <div className="flex items-center gap-2">
                      <span className="badge bg-sky-50 text-sky-600">{loc.type}</span>
                      {loc.issueCount > 0 ? (
                        <span className="badge bg-red-50 text-red-600">
                          <AlertCircle size={12} /> {loc.issueCount} issue{loc.issueCount > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="badge bg-teal-50 text-teal-600">All clear</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-ink-300 group-hover:text-sky-500 transition-all flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Location detail panel */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedLocationId(null)} />
          <div className="relative card max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-scaleIn">
            <div className={`bg-gradient-to-br ${selectedLocation.color} p-6 text-white relative`}>
              <button onClick={() => setSelectedLocationId(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
                <X size={18} />
              </button>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
                <Icon size={28} className="text-white" />
              </div>
              <h2 className="text-xl font-display font-bold mb-1">{selectedLocation.name}</h2>
              <p className="text-white/80 text-sm">{selectedLocation.area} • {selectedLocation.type}</p>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-sm text-ink-600 leading-relaxed">{selectedLocation.description}</p>

              <div>
                <h3 className="font-display font-bold text-ink-900 mb-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-sky-500" />
                  Associated Issues ({locationIssues.length})
                </h3>
                {locationIssues.length === 0 ? (
                  <div className="rounded-xl bg-teal-50 border border-teal-100 p-4 text-center">
                    <p className="text-sm text-teal-700 font-medium">No issues reported for this location.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {locationIssues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} onClick={() => setSelectedIssue(issue)} compact />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Issue detail modal */}
      <IssueDetailModal
        issue={selectedIssueFull}
        onClose={() => setSelectedIssue(null)}
        onGiveFeedback={onGiveFeedback}
        canFeedback={selectedIssueFull?.submittedBy === currentUserName}
      />
    </div>
  );
}
