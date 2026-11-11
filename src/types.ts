export type Category =
  | 'Electricity'
  | 'Water Supply'
  | 'Wi-Fi'
  | 'Cleanliness'
  | 'Hostel Maintenance'
  | 'Classroom Facilities'
  | 'Other';

export type Location =
  | 'Hostel'
  | 'Academic Block'
  | 'Library'
  | 'Cafeteria'
  | 'Washroom'
  | 'Sports Area'
  | 'Other';

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Submitted' | 'In Progress' | 'Resolved';

export interface StatusUpdate {
  status: Status;
  note: string;
  timestamp: number;
  by: string;
}

export interface Issue {
  id: string;
  title: string;
  category: Category;
  description: string;
  location: Location;
  priority: Priority;
  status: Status;
  image: string | null;
  submittedBy: string;
  submittedAt: number;
  statusUpdates: StatusUpdate[];
  feedback?: IssueFeedback;
}

export interface IssueFeedback {
  rating: number;
  comment: string;
  submittedAt: number;
}

export interface StudentProfile {
  name: string;
  rollNumber: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  hostel: string;
  room: string;
  bio: string;
}

export interface ActivityEntry {
  id: string;
  type: 'reported' | 'status_changed' | 'feedback_given' | 'edited' | 'deleted';
  description: string;
  timestamp: number;
  issueId?: string;
}

export const categories: Category[] = [
  'Electricity',
  'Water Supply',
  'Wi-Fi',
  'Cleanliness',
  'Hostel Maintenance',
  'Classroom Facilities',
  'Other',
];

export const locations: Location[] = [
  'Hostel',
  'Academic Block',
  'Library',
  'Cafeteria',
  'Washroom',
  'Sports Area',
  'Other',
];

export const priorities: Priority[] = ['Low', 'Medium', 'High'];

export const allStatuses: Status[] = ['Submitted', 'In Progress', 'Resolved'];

export const categoryIcons: Record<Category, string> = {
  Electricity: 'zap',
  'Water Supply': 'droplet',
  'Wi-Fi': 'wifi',
  Cleanliness: 'sparkles',
  'Hostel Maintenance': 'wrench',
  'Classroom Facilities': 'door-open',
  Other: 'circle-help',
};

export const categoryColors: Record<Category, string> = {
  Electricity: 'bg-amber-100 text-amber-700',
  'Water Supply': 'bg-sky-100 text-sky-700',
  'Wi-Fi': 'bg-violet-100 text-violet-700',
  Cleanliness: 'bg-teal-100 text-teal-700',
  'Hostel Maintenance': 'bg-orange-100 text-orange-700',
  'Classroom Facilities': 'bg-rose-100 text-rose-700',
  Other: 'bg-ink-100 text-ink-600',
};

export const priorityConfig: Record<Priority, { badge: string; dot: string; label: string }> = {
  Low: { badge: 'bg-green-100 text-green-700', dot: 'bg-green-500', label: 'Low' },
  Medium: { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', label: 'Medium' },
  High: { badge: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'High' },
};

export const statusConfig: Record<Status, { badge: string; dot: string; label: string }> = {
  Submitted: { badge: 'bg-sky-100 text-sky-700', dot: 'bg-sky-500', label: 'Submitted' },
  'In Progress': { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', label: 'In Progress' },
  Resolved: { badge: 'bg-teal-100 text-teal-700', dot: 'bg-teal-500', label: 'Resolved' },
};
