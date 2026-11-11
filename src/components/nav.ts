import {
  LayoutDashboard,
  CalendarDays,
  Star,
  MessageSquareHeart,
  Trash2,
  CircleDot,
  User,
  ChefHat,
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'menu'
  | 'ratings'
  | 'feedback'
  | 'waste'
  | 'availability'
  | 'profile';

export const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu', label: 'Weekly Menu', icon: CalendarDays },
  { id: 'ratings', label: 'Ratings & Reviews', icon: Star },
  { id: 'feedback', label: 'Feedback', icon: MessageSquareHeart },
  { id: 'waste', label: 'Food Waste', icon: Trash2 },
  { id: 'availability', label: 'Availability', icon: CircleDot },
  { id: 'profile', label: 'Profile', icon: User },
];
