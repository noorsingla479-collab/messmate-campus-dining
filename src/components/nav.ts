import {
  LayoutDashboard,
  FilePlus2,
  ListChecks,
  ClipboardList,
  Map,
  BarChart3,
  User,
  type LucideIcon,
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'report'
  | 'track'
  | 'myreports'
  | 'map'
  | 'analytics'
  | 'profile';

export const navItems: { id: PageId; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'report', label: 'Report an Issue', icon: FilePlus2 },
  { id: 'track', label: 'Track Issues', icon: ListChecks },
  { id: 'myreports', label: 'My Reports', icon: ClipboardList },
  { id: 'map', label: 'Campus Map', icon: Map },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];
