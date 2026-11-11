import type { Status } from '../types';
import { Check, Clock, Loader2 } from 'lucide-react';
import { allStatuses, statusConfig } from '../types';

interface StatusTrackerProps {
  currentStatus: Status;
  updates: { status: Status; timestamp: number; note: string; by: string }[];
}

export function StatusTracker({ currentStatus, updates }: StatusTrackerProps) {
  const currentIndex = allStatuses.indexOf(currentStatus);

  const getUpdate = (status: Status) => updates.find((u) => u.status === status);

  return (
    <div className="space-y-0">
      {allStatuses.map((status, i) => {
        const isDone = i <= currentIndex;
        const isCurrent = i === currentIndex;
        const update = getUpdate(status);
        const Icon = status === 'Submitted' ? Clock : status === 'In Progress' ? Loader2 : Check;

        return (
          <div key={status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isDone
                    ? status === 'Resolved'
                      ? 'bg-teal-500 text-white'
                      : status === 'In Progress'
                      ? 'bg-amber-500 text-white'
                      : 'bg-sky-500 text-white'
                    : 'bg-ink-100 text-ink-300'
                } ${isCurrent ? 'ring-4 ring-sky-100' : ''}`}
              >
                <Icon size={16} className={status === 'In Progress' && isCurrent ? 'animate-spin' : ''} />
              </div>
              {i < allStatuses.length - 1 && (
                <div className={`w-0.5 h-12 ${i < currentIndex ? 'bg-sky-400' : 'bg-ink-100'}`} />
              )}
            </div>
            <div className="pt-1.5 pb-8 flex-1">
              <div className="flex items-center gap-2">
                <h4 className={`font-semibold text-sm ${isDone ? 'text-ink-800' : 'text-ink-400'}`}>
                  {statusConfig[status].label}
                </h4>
                {isCurrent && (
                  <span className={`badge ${statusConfig[status].badge}`}>Current</span>
                )}
              </div>
              {update ? (
                <div className="mt-1">
                  <p className="text-sm text-ink-600">{update.note}</p>
                  <p className="text-xs text-ink-400 mt-0.5">
                    {new Date(update.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })} • by {update.by}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-ink-300 mt-0.5">Awaiting update</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
