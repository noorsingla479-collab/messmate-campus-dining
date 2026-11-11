import {
  Zap,
  Droplet,
  Wifi,
  Sparkles,
  Wrench,
  DoorOpen,
  CircleHelp,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '../types';

const iconMap: Record<Category, LucideIcon> = {
  Electricity: Zap,
  'Water Supply': Droplet,
  'Wi-Fi': Wifi,
  Cleanliness: Sparkles,
  'Hostel Maintenance': Wrench,
  'Classroom Facilities': DoorOpen,
  Other: CircleHelp,
};

export function CategoryIcon({ category, size = 18, className = '' }: { category: Category; size?: number; className?: string }) {
  const Icon = iconMap[category];
  return <Icon size={size} className={className} />;
}
