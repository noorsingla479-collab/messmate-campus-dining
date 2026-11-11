export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';
export type DayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type FoodCategory = 'veg' | 'non-veg';

export interface MealItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: FoodCategory;
  calories: number;
  tags: string[];
}

export interface DayMenu {
  day: DayName;
  breakfast: MealItem[];
  lunch: MealItem[];
  snacks: MealItem[];
  dinner: MealItem[];
}

export interface Review {
  id: string;
  mealId: string;
  mealName: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export type FeedbackCategory = 'Food Quality' | 'Hygiene' | 'Taste' | 'Quantity' | 'Service';

export interface Feedback {
  id: string;
  category: FeedbackCategory;
  rating: number;
  comment: string;
  createdAt: number;
}

export interface WasteReport {
  id: string;
  meal: string;
  date: string;
  amount: number;
  unit: string;
  reason: string;
  createdAt: number;
}

export interface Profile {
  name: string;
  rollNumber: string;
  hostel: string;
  room: string;
  email: string;
  bio: string;
  favoriteMeals: string[];
}
