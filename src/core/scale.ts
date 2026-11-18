import type { Recipe } from './types.ts';

function assertValidServings(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label}: кількість порцій має бути більшою за нуль`);
  }
}

/**
 * Повертає новий рецепт під потрібну кількість порцій.
 *
 * Тут навмисно немає округлення: точні числа зберігаються в даних,
 * а зручний для людини вигляд створює formatAmount.
 */
export function scaleRecipe(recipe: Recipe, targetServings: number): Recipe {
  assertValidServings(recipe.servings, 'Початковий рецепт');
  assertValidServings(targetServings, 'Новий рецепт');

  const factor = targetServings / recipe.servings;

  return {
    ...recipe,
    servings: targetServings,
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount === null ? null : ingredient.amount * factor,
    })),
  };
}
