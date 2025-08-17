// Core recipe data structures
export interface Recipe {
  id: string;
  url: string;
  title: string;
  description?: string;
  image?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  metadata: RecipeMetadata;
  nutrition?: NutritionInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  raw: string; // Original text from recipe
  amount?: number;
  unit?: string;
  name: string;
  category: IngredientCategory;
  notes?: string; // e.g., "chopped", "room temperature"
}

export interface Instruction {
  id: string;
  stepNumber: number;
  text: string;
  duration?: string; // e.g., "10 minutes"
  temperature?: string; // e.g., "350°F"
}

export interface RecipeMetadata {
  servings?: number;
  prepTime?: string; // ISO 8601 duration or human readable
  cookTime?: string;
  totalTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  cuisine?: string;
  course?: 'appetizer' | 'main' | 'dessert' | 'side' | 'snack' | 'breakfast' | 'lunch' | 'dinner';
  tags?: string[];
  rating?: number; // 1-5 stars
  author?: string;
  source?: string;
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  servingSize?: string;
}

// Ingredient categorization for shopping lists
export enum IngredientCategory {
  PRODUCE = 'produce',
  DAIRY = 'dairy',
  MEAT = 'meat',
  SEAFOOD = 'seafood',
  PANTRY = 'pantry',
  GRAINS = 'grains',
  SPICES = 'spices',
  CONDIMENTS = 'condiments',
  FROZEN = 'frozen',
  BAKERY = 'bakery',
  BEVERAGES = 'beverages',
  OTHER = 'other'
}

// Shopping list structures
export interface ShoppingList {
  id: string;
  name: string;
  recipes: Recipe[];
  items: ShoppingListItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingListItem {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  checked: boolean;
  category: IngredientCategory;
  notes?: string;
}

// API response types
export interface ParseRecipeRequest {
  url: string;
}

export interface ParseRecipeResponse {
  recipe?: ParsedRecipe;
  error?: string;
}

export interface ParsedRecipe {
  title?: string;
  description?: string;
  image?: string;
  ingredients: string[];
  instructions: string[];
  servings?: string;
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  rating?: number;
  author?: string;
  cuisine?: string;
  course?: string;
  tags?: string[];
}

// Utility types for ingredient parsing
export interface ParsedIngredient {
  amount?: number;
  unit?: string;
  name: string;
  notes?: string;
  confidence: number; // 0-1, how confident we are in the parsing
}

// Export format types
export interface ExportOptions {
  format: 'text' | 'email' | 'json' | 'pdf';
  groupByCategory: boolean;
  includeQuantities: boolean;
  includeNotes: boolean;
}