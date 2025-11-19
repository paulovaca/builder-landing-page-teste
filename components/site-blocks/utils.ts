import type {
  BorderValue,
  ColorValue,
  GradientValue,
  SpacingValue,
} from '@/lib/site-renderer/types';

const gradientToCss = (gradient: GradientValue) => {
  const stops = gradient.stops.map((stop) => `${stop.color} ${stop.position}%`).join(', ');

  if (gradient.type === 'linear') {
    return `linear-gradient(${gradient.angle}deg, ${stops})`;
  }

  return `radial-gradient(circle, ${stops})`;
};

export const colorValueToCss = (value?: ColorValue) => {
  if (!value) {
    return 'transparent';
  }

  if (typeof value === 'string') {
    return value;
  }

  return gradientToCss(value);
};

export const spacingValueToArray = (value?: SpacingValue): [number, number, number, number] => {
  if (Array.isArray(value)) {
    return [
      Number(value[0]) || 0,
      Number(value[1]) || 0,
      Number(value[2]) || 0,
      Number(value[3]) || 0,
    ];
  }

  const numeric = Number(value) || 0;
  return [numeric, numeric, numeric, numeric];
};

export const spacingValueToCss = (value?: SpacingValue, unit: string = 'px') =>
  spacingValueToArray(value)
    .map((size) => `${size}${unit}`)
    .join(' ');

export const spacingSummary = (value?: SpacingValue, unit: string = 'px') =>
  spacingValueToCss(value, unit);

export const borderValueToCss = (border?: BorderValue) => {
  if (!border || border.width <= 0 || border.style === 'none') {
    return 'none';
  }

  return `${border.width}px ${border.style} ${border.color}`;
};
