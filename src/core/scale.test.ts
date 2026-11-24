import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { scaleRecipe } from './scale.ts';
import type { Recipe } from './types.ts';

const pancakes: Recipe = {
  title: 'Млинці',
  servings: 4,
  ingredients: [
    { name: 'борошно', amount: 200, unit: 'g' },
    { name: 'яйця', amount: 2, unit: 'pcs' },
    { name: 'сіль', amount: null, unit: null },
  ],
};

describe('scaleRecipe', () => {
  it('збільшує кількість пропорційно порціям', () => {
    const result = scaleRecipe(pancakes, 6);
    assert.equal(result.servings, 6);
    assert.equal(result.ingredients[0]?.amount, 300);
    assert.equal(result.ingredients[1]?.amount, 3);
  });

  it('зменшує кількість пропорційно порціям', () => {
    assert.equal(scaleRecipe(pancakes, 2).ingredients[0]?.amount, 100);
  });

  it('не змінює інгредієнт без числа', () => {
    assert.equal(scaleRecipe(pancakes, 8).ingredients[2]?.amount, null);
  });

  it('не змінює початковий рецепт', () => {
    scaleRecipe(pancakes, 8);
    assert.equal(pancakes.servings, 4);
    assert.equal(pancakes.ingredients[0]?.amount, 200);
  });

  it('відхиляє неможливу кількість порцій', () => {
    for (const value of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      assert.throws(() => scaleRecipe(pancakes, value), RangeError);
    }
    assert.throws(() => scaleRecipe({ ...pancakes, servings: 0 }, 2), RangeError);
  });
  it('зберігає дробові кількості без округлення', () => {
    const res = scaleRecipe(pancakes, 3);
    assert.equal(res.servings, 3);
    assert.equal(res.ingredients[0]?.amount, 150);
    assert.equal(res.ingredients[1]?.amount, 1.5);
  });
  it('змінює порцію на дробове значення (менше 1)', () => {
    const res = scaleRecipe(pancakes, 0.5);
    assert.equal(res.servings, 0.5);
    assert.equal(res.ingredients[0]?.amount, 25);
    assert.equal(res.ingredients[1]?.amount, 0.25);
  });
});
