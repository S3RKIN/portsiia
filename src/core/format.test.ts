import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatAmount } from './format.ts';
import type { Unit } from './types.ts';

const cases: Array<[number | null, Unit | null, string]> = [
  [33.33, 'g', '33 г'],
  [2.3, 'g', '2,5 г'],
  [0.1, 'g', '0,5 г'],
  [123, 'g', '125 г'],
  [998, 'g', '1 кг'],
  [1600, 'g', '1,6 кг'],
  [0.5, 'kg', '500 г'],
  [1.25, 'l', '1,25 л'],
  [1.5, 'tbsp', '1½ ст. л.'],
  [0.1, 'tsp', '¼ ч. л.'],
  [0.75, 'cup', '¾ скл.'],
  [1.4, 'pcs', '1½ шт.'],
  [3, 'pcs', '3 шт.'],
  [1, 'pinch', '1 дрібка'],
  [3, 'pinch', '3 дрібки'],
  [5, 'pinch', '5 дрібок'],
  [11, 'pinch', '11 дрібок'],
  [null, null, 'за смаком'],
  [1.5, null, '1,5'],
];

describe('formatAmount', () => {
  for (const [amount, unit, expected] of cases) {
    it(`${amount} ${unit} → ${expected}`, () => {
      assert.equal(formatAmount({ amount, unit }), expected);
    });
  }
});
