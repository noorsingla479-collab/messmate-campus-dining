import type { DayMenu, MealItem } from './types';

const meals = {
  // Breakfast items
  alooParatha: {
    id: 'alooparatha',
    name: 'Aloo Paratha',
    description: 'Stuffed wheat flatbread with spiced potato filling, served with butter and curd',
    image: 'https://images.pexels.com/photos/37555450/pexels-photo-37555450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 320,
    tags: ['Breakfast', 'Hot', 'Filling'],
  },
  masalaDosa: {
    id: 'masaladosa',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato masala, coconut chutney and sambar',
    image: 'https://images.pexels.com/photos/20422133/pexels-photo-20422133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 380,
    tags: ['South Indian', 'Crispy'],
  },
  idliSambar: {
    id: 'idlisambar',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes with lentil sambar and coconut chutney — light and healthy',
    image: 'https://images.pexels.com/photos/20422128/pexels-photo-20422128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 180,
    tags: ['Steamed', 'Light', 'Healthy'],
  },
  poha: {
    id: 'poha',
    name: 'Poha & Cutlet',
    description: 'Flattened rice tempered with mustard and curry leaves, paired with a veg cutlet',
    image: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 250,
    tags: ['Light', 'Quick'],
  },
  fruitBowl: {
    id: 'fruitbowl',
    name: 'Fresh Fruit Bowl',
    description: 'Seasonal fruits with yogurt and granola — a refreshing morning start',
    image: 'https://images.pexels.com/photos/566564/pexels-photo-566564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 150,
    tags: ['Healthy', 'Cold', 'Seasonal'],
  },
  // Lunch items
  paneerButterMasala: {
    id: 'paneerbuttermasala',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in a rich, creamy tomato gravy with butter and fresh cream',
    image: 'https://images.pexels.com/photos/11188417/pexels-photo-11188417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 450,
    tags: ['Rich', 'Creamy', 'Popular'],
  },
  vegThali: {
    id: 'vegthali',
    name: 'Special Veg Thali',
    description: 'Complete meal: dal, sabzi, rice, roti, salad, papad and sweet',
    image: 'https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 650,
    tags: ['Complete Meal', 'Balanced'],
  },
  chickenBiryani: {
    id: 'chickenbiryani',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken, saffron and fried onions',
    image: 'https://images.pexels.com/photos/40262796/pexels-photo-40262796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'non-veg' as const,
    calories: 520,
    tags: ['Non-Veg', 'Aromatic', 'Sunday Special'],
  },
  rajmaChawal: {
    id: 'rajmachawal',
    name: 'Rajma Chawal',
    description: 'Kidney beans in thick onion-tomato gravy served with steamed basmati rice',
    image: 'https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 420,
    tags: ['Comfort Food', 'Protein'],
  },
  dalRoti: {
    id: 'dalroti',
    name: 'Dal Tadka & Roti',
    description: 'Yellow lentils tempered with cumin and garlic, served with hot rotis',
    image: 'https://images.pexels.com/photos/7351635/pexels-photo-7351635.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 380,
    tags: ['Light Lunch', 'Everyday'],
  },
  // Snacks
  samosaChai: {
    id: 'samosachai',
    name: 'Samosa & Chai',
    description: 'Crispy pastry stuffed with spiced potatoes, served with masala chai',
    image: 'https://images.pexels.com/photos/39104670/pexels-photo-39104670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 280,
    tags: ['Tea Time', 'Crispy'],
  },
  breadPakora: {
    id: 'breadpakora',
    name: 'Bread Pakora',
    description: 'Bread slices stuffed with potato filling, deep-fried and served with chutney',
    image: 'https://images.pexels.com/photos/9452278/pexels-photo-9452278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 300,
    tags: ['Fried', 'Hot'],
  },
  pavBhaji: {
    id: 'pavbhaji',
    name: 'Pav Bhaji',
    description: 'Spiced mixed vegetable mash served with buttered pav buns',
    image: 'https://images.pexels.com/photos/17223838/pexels-photo-17223838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 350,
    tags: ['Street Food', 'Spicy'],
  },
  // Dinner
  dalRotiDinner: {
    id: 'dalrotidinner',
    name: 'Dal, Roti & Rice',
    description: 'Comforting dinner with dal tadka, hot rotis and steamed rice',
    image: 'https://images.pexels.com/photos/39323513/pexels-photo-39323513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 400,
    tags: ['Light Dinner', 'Comfort'],
  },
  paneerThali: {
    id: 'paneerthali',
    name: 'Paneer Thali',
    description: 'Paneer curry, dal, rice, roti, salad and dessert — a complete dinner',
    image: 'https://images.pexels.com/photos/37420999/pexels-photo-37420999.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 550,
    tags: ['Complete Meal', 'Rich'],
  },
  mixedVeg: {
    id: 'mixedveg',
    name: 'Mixed Veg & Roti',
    description: 'Seasonal vegetables cooked with mild spices, served with rotis',
    image: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 350,
    tags: ['Healthy', 'Light'],
  },
  // Extra for variety
  mattaRice: {
    id: 'mattarice',
    name: 'Matta Rice & Curry',
    description: 'Kerala red rice served with vegetable curry and papadum',
    image: 'https://images.pexels.com/photos/7686374/pexels-photo-7686374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 430,
    tags: ['South Indian', 'Filling'],
  },
  samosaSnack: {
    id: 'samosasnack',
    name: 'Golden Samosas',
    description: 'Triangle pastries with spiced potato filling, served with tangy chutneys',
    image: 'https://images.pexels.com/photos/36170557/pexels-photo-36170557.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'veg' as const,
    calories: 260,
    tags: ['Crispy', 'Classic'],
  },
} satisfies Record<string, MealItem>;

export const mealTimings: { type: string; start: string; end: string; icon: string }[] = [
  { type: 'Breakfast', start: '7:30 AM', end: '9:30 AM', icon: 'sunrise' },
  { type: 'Lunch', start: '12:30 PM', end: '2:30 PM', icon: 'sun' },
  { type: 'Snacks', start: '5:00 PM', end: '6:30 PM', icon: 'cookie' },
  { type: 'Dinner', start: '8:00 PM', end: '10:00 PM', icon: 'moon' },
];

export const weeklyMenu: DayMenu[] = [
  {
    day: 'Monday',
    breakfast: [meals.alooParatha, meals.fruitBowl],
    lunch: [meals.vegThali, meals.dalRoti],
    snacks: [meals.samosaChai, meals.breadPakora],
    dinner: [meals.dalRotiDinner, meals.mixedVeg],
  },
  {
    day: 'Tuesday',
    breakfast: [meals.masalaDosa, meals.idliSambar],
    lunch: [meals.paneerButterMasala, meals.rajmaChawal],
    snacks: [meals.pavBhaji, meals.samosaSnack],
    dinner: [meals.paneerThali, meals.dalRotiDinner],
  },
  {
    day: 'Wednesday',
    breakfast: [meals.idliSambar, meals.poha],
    lunch: [meals.rajmaChawal, meals.vegThali],
    snacks: [meals.samosaChai, meals.breadPakora],
    dinner: [meals.mixedVeg, meals.dalRotiDinner],
  },
  {
    day: 'Thursday',
    breakfast: [meals.alooParatha, meals.masalaDosa],
    lunch: [meals.dalRoti, meals.paneerButterMasala],
    snacks: [meals.pavBhaji, meals.samosaSnack],
    dinner: [meals.paneerThali, meals.mattaRice],
  },
  {
    day: 'Friday',
    breakfast: [meals.poha, meals.fruitBowl],
    lunch: [meals.vegThali, meals.paneerButterMasala],
    snacks: [meals.samosaChai, meals.breadPakora],
    dinner: [meals.dalRotiDinner, meals.paneerThali],
  },
  {
    day: 'Saturday',
    breakfast: [meals.masalaDosa, meals.alooParatha],
    lunch: [meals.chickenBiryani, meals.vegThali],
    snacks: [meals.pavBhaji, meals.samosaChai],
    dinner: [meals.paneerThali, meals.mixedVeg],
  },
  {
    day: 'Sunday',
    breakfast: [meals.alooParatha, meals.idliSambar, meals.fruitBowl],
    lunch: [meals.chickenBiryani, meals.rajmaChawal, meals.vegThali],
    snacks: [meals.samosaChai, meals.samosaSnack, meals.breadPakora],
    dinner: [meals.paneerThali, meals.dalRotiDinner, meals.mattaRice],
  },
];

export const allMeals: MealItem[] = Array.from(
  new Map(Object.values(meals).map((m) => [m.id, m])).values()
);

export const featuredMeal: MealItem = {
  ...meals.chickenBiryani,
  description: 'Today\'s chef-special: fragrant basmati rice layered with tender spiced chicken, saffron, fried onions and mint. A weekend favourite everyone waits for!',
};

export function getMealById(id: string): MealItem | undefined {
  return allMeals.find((m) => m.id === id);
}

export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export function getTodayName(): string {
  const today = new Date().getDay(); // 0 = Sunday
  const map = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return map[today];
}
