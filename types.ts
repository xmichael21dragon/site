
export enum Difficulty {
  EASY = 'Fácil',
  MEDIUM = 'Médio',
  HARD = 'Difícil'
}

export enum DietType {
  VEGAN = 'Vegano',
  VEGETARIAN = 'Vegetariano',
  GLUTEN_FREE = 'Sem Glúten',
  LOW_CARB = 'Low Carb',
  NONE = 'Nenhum'
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  photo?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: Difficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  diet: DietType;
  category: string;
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
  rating: number;
  reviews: Review[];
  author: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  // Added 'Saúde Geral' to the category union type to fix the error in constants.ts where this value is used.
  category: 'Doenças' | 'Nutrição' | 'Bem-estar' | 'Mental' | 'Saúde Geral';
  date: string;
  readTime: string;
  author: string;
}

export type MealSlotType = 'Café da Manhã' | 'Lanche da Manhã' | 'Almoço' | 'Lanche da Tarde' | 'Jantar';

export interface MealPlanDay {
  day: string;
  meals: Record<MealSlotType, string | null>; // Mapeia o tipo de refeição para o ID da receita
}

export type MealPlan = MealPlanDay[];
