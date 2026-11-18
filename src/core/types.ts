/** Одиниці виміру, які розуміє ядро застосунку. */
export type Unit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'pcs'
  | 'pinch';

export interface Ingredient {
  name: string;
  /** null означає кількість без числа, наприклад «сіль за смаком». */
  amount: number | null;
  unit: Unit | null;
}

export interface Recipe {
  title: string;
  servings: number;
  ingredients: Ingredient[];
}
