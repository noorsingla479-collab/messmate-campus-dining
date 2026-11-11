import type { Review, Feedback, WasteReport, Profile } from './types';

export const seedReviews: Review[] = [
  {
    id: 'r1',
    mealId: 'chickenbiryani',
    mealName: 'Chicken Biryani',
    author: 'Rahul S.',
    rating: 5,
    comment: 'Absolutely loved the biryani today! The rice was perfectly cooked and the chicken was so tender. Best meal of the week.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'r2',
    mealId: 'paneerbuttermasala',
    mealName: 'Paneer Butter Masala',
    author: 'Priya M.',
    rating: 4,
    comment: 'Great taste and the gravy was creamy. Would love a bit more spice next time. Overall really enjoyable!',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'r3',
    mealId: 'masaladosa',
    mealName: 'Masala Dosa',
    author: 'Arjun K.',
    rating: 5,
    comment: 'Crispy and perfectly made. The sambar was on point. This is the breakfast I look forward to every Tuesday!',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'r4',
    mealId: 'samosachai',
    mealName: 'Samosa & Chai',
    author: 'Sneha R.',
    rating: 4,
    comment: 'Perfect evening combo. The chai could be a little less sweet but the samosas were crispy and fresh.',
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'r5',
    mealId: 'vegthali',
    mealName: 'Special Veg Thali',
    author: 'Vikram P.',
    rating: 3,
    comment: 'Good variety but the dal was a bit watery today. The sabzi and roti were nice though.',
    createdAt: Date.now() - 86400000 * 7,
  },
];

export const seedFeedback: Feedback[] = [
  {
    id: 'f1',
    category: 'Food Quality',
    rating: 4,
    comment: 'The quality has improved a lot this month. Fresh vegetables are being used now.',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'f2',
    category: 'Hygiene',
    rating: 5,
    comment: 'The dining area has been very clean lately. Tables are wiped regularly. Great job by the staff!',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'f3',
    category: 'Quantity',
    rating: 3,
    comment: 'Portion sizes for dinner could be a bit larger. Some students are still hungry after meals.',
    createdAt: Date.now() - 86400000 * 8,
  },
];

export const seedWasteReports: WasteReport[] = [
  {
    id: 'w1',
    meal: 'Lunch',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    amount: 12,
    unit: 'kg',
    reason: 'Excess rice prepared',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'w2',
    meal: 'Breakfast',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    amount: 5,
    unit: 'kg',
    reason: 'Leftover parathas',
    createdAt: Date.now() - 86400000 * 3,
  },
];

export const weeklyWasteData = [
  { day: 'Mon', waste: 18 },
  { day: 'Tue', waste: 14 },
  { day: 'Wed', waste: 22 },
  { day: 'Thu', waste: 11 },
  { day: 'Fri', waste: 16 },
  { day: 'Sat', waste: 28 },
  { day: 'Sun', waste: 31 },
];

export const defaultProfile: Profile = {
  name: 'Aarav Sharma',
  rollNumber: 'BT21CSE045',
  hostel: 'Block A — Himalaya Hostel',
  room: 'B-214',
  email: 'aarav.sharma@campus.edu',
  bio: 'Final year Computer Science student. Big fan of South Indian food and Sunday biryani!',
  favoriteMeals: ['chickenbiryani', 'masaladosa', 'paneerbuttermasala'],
};

export const sustainabilityTips = [
  {
    title: 'Take Only What You Can Eat',
    text: 'Serving smaller portions first and going back for seconds prevents plate waste — the most common type of mess food waste.',
    icon: 'utensils',
  },
  {
    title: 'Report Excess Early',
    text: 'If you notice large quantities of untouched food, report it. Early alerts help the kitchen adjust future portions.',
    icon: 'bell',
  },
  {
    title: 'Embrace Leftover Creativity',
    text: 'Leftover rice can become lemon rice, extra dal becomes soup. The kitchen transforms leftovers into fresh dishes daily.',
    icon: 'recycle',
  },
  {
    title: 'Plan Around Attendance',
    text: 'The mess tracks student counts on weekends and holidays. Mark your absence so food isn\'t prepared for you.',
    icon: 'calendar',
  },
];

export const availabilityData = [
  { meal: 'Breakfast', item: 'Aloo Paratha', status: 'available' as const, timing: '7:30 – 9:30 AM', remaining: 45 },
  { meal: 'Breakfast', item: 'Fresh Fruit Bowl', status: 'limited' as const, timing: '7:30 – 9:30 AM', remaining: 8 },
  { meal: 'Lunch', item: 'Paneer Butter Masala', status: 'available' as const, timing: '12:30 – 2:30 PM', remaining: 60 },
  { meal: 'Lunch', item: 'Veg Thali', status: 'available' as const, timing: '12:30 – 2:30 PM', remaining: 52 },
  { meal: 'Snacks', item: 'Samosa & Chai', status: 'limited' as const, timing: '5:00 – 6:30 PM', remaining: 12 },
  { meal: 'Snacks', item: 'Pav Bhaji', status: 'unavailable' as const, timing: '5:00 – 6:30 PM', remaining: 0 },
  { meal: 'Dinner', item: 'Paneer Thali', status: 'available' as const, timing: '8:00 – 10:00 PM', remaining: 48 },
  { meal: 'Dinner', item: 'Dal, Roti & Rice', status: 'limited' as const, timing: '8:00 – 10:00 PM', remaining: 5 },
];
