import { describe, it } from 'node:test';

/**
 * Перша самостійна задача проєкту (картка P1-05).
 * Створи parse-ingredient.ts і заміни кожен todo на справжній тест.
 */
describe('parseIngredient', () => {
  it.todo('«200 г борошна» → 200, g, борошно');
  it.todo('«1,5 кг картоплі» → 1.5, kg, картопля');
  it.todo('«2 ст. л. цукру» → 2, tbsp, цукор');
  it.todo('«1/2 склянки молока» → 0.5, cup, молоко');
  it.todo('«3 яйця» → 3, pcs, яйця');
  it.todo('«сіль за смаком» → null, null, сіль');
});
