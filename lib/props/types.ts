export type Recipe = {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructions: string[];
  ingredients: string[];
  photo: string;
  tags: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  rating: number;
  reviews: number;
  dateAdded: string;
  dateUpdated: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  photo: string;
  dateAdded: string;
  dateUpdated: string;
};
