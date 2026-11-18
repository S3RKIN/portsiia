import type { Ingredient, Unit } from './types.ts';

const FRACTIONS: Record<number, string> = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

const LABELS: Record<Exclude<Unit, 'pinch'>, string> = {
  g: 'г',
  kg: 'кг',
  ml: 'мл',
  l: 'л',
  tsp: 'ч. л.',
  tbsp: 'ст. л.',
  cup: 'скл.',
  pcs: 'шт.',
};

function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function decimal(value: number, maxDigits: number): string {
  return Number(value.toFixed(maxDigits)).toString().replace('.', ',');
}

function fraction(value: number): string {
  const whole = Math.floor(value);
  const rest = value - whole;
  if (rest === 0) return String(whole);
  return `${whole > 0 ? whole : ''}${FRACTIONS[rest]}`;
}

/** Вага й об'єм: точність залежить від величини числа. */
function formatMetric(baseAmount: number, small: Unit, large: Unit): string {
  const step = baseAmount < 10 ? 0.5 : baseAmount < 100 ? 1 : 5;
  const rounded = Math.max(roundToStep(baseAmount, step), 0.5);

  if (rounded >= 1000) return `${decimal(rounded / 1000, 2)} ${LABELS[large as 'kg' | 'l']}`;
  return `${decimal(rounded, 1)} ${LABELS[small as 'g' | 'ml']}`;
}

/** Ложки, склянки й штуки: людині зручніші дроби, а не десяткові числа. */
function formatCount(amount: number, step: number, unit: 'tsp' | 'tbsp' | 'cup' | 'pcs'): string {
  const rounded = Math.max(roundToStep(amount, step), step);
  return `${fraction(rounded)} ${LABELS[unit]}`;
}

function formatPinch(amount: number): string {
  const rounded = Math.max(Math.round(amount), 1);
  const lastTwo = rounded % 100;
  const last = rounded % 10;

  if (last === 1 && lastTwo !== 11) return `${rounded} дрібка`;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${rounded} дрібки`;
  return `${rounded} дрібок`;
}

/** Перетворює точну кількість на текст для екрана: «1,5 кг», «1½ ст. л.». */
export function formatAmount({ amount, unit }: Pick<Ingredient, 'amount' | 'unit'>): string {
  if (amount === null) return 'за смаком';
  if (unit === null) return decimal(amount, 2);

  switch (unit) {
    case 'g':
      return formatMetric(amount, 'g', 'kg');
    case 'kg':
      return formatMetric(amount * 1000, 'g', 'kg');
    case 'ml':
      return formatMetric(amount, 'ml', 'l');
    case 'l':
      return formatMetric(amount * 1000, 'ml', 'l');
    case 'tsp':
    case 'tbsp':
    case 'cup':
      return formatCount(amount, 0.25, unit);
    case 'pcs':
      return formatCount(amount, 0.5, unit);
    case 'pinch':
      return formatPinch(amount);
  }
}
