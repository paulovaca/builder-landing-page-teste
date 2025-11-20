import React from 'react';
import * as LucideIcons from 'lucide-react';

import type { ListBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

const SHADOW_MAP: Record<ListBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-soft)',
  medium: 'var(--shadow-medium)',
};

const TEXT_WEIGHT_MAP: Record<ListBlockProps['fontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const DEFAULT_VISIBILITY = { desktop: true, tablet: true, mobile: true };

export function ListBlock({
  items,
  markerType,
  markerIcon,
  markerColor,
  textColor,
  textSize,
  fontFamily,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  textTransform,
  itemSpacing,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: ListBlockProps) {
  const visibility = visibleOn ?? DEFAULT_VISIBILITY;
  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  const resolvedItems =
    items && items.length > 0
      ? items
      : [
          {
            id: 'list-item-placeholder',
            text: 'Adicione itens na lista para exibir aqui.',
          },
        ];

  const clampedTextSize = Math.max(10, Math.min(72, Number(textSize) || 16));
  const clampedSpacing = Math.max(0, Math.min(160, Number(itemSpacing) || 8));
  const clampedLineHeight = Math.max(1, Math.min(2.4, Number(lineHeight) || 1.6));
  const clampedLetterSpacing = Math.max(-2, Math.min(12, Number(letterSpacing) || 0));
  const resolvedFontFamily = fontFamily?.trim() || 'var(--font-family-sans)';
  const resolvedTextTransform = textTransform ?? 'none';

  const markerColorCss = colorValueToCss(markerColor);
  const textColorCss = colorValueToCss(textColor);
  const IconComponent =
    LucideIcons[markerIcon as keyof typeof LucideIcons] || LucideIcons.CheckCircle2;
  const CheckIcon = LucideIcons.CheckCircle2 ?? LucideIcons.CheckCircle ?? LucideIcons.Check;
  const ListElement = markerType === 'number' ? 'ol' : 'ul';

  const renderMarker = (index: number) => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: markerColorCss,
      flexShrink: 0,
      marginTop: markerType === 'bullet' ? '0.35em' : '0.15em',
    };

    if (markerType === 'number') {
      return (
        <span
          aria-hidden
          style={{ ...baseStyle, fontWeight: 600, minWidth: '1.6em', textAlign: 'right' }}
        >
          {index + 1}.
        </span>
      );
    }

    if (markerType === 'icon') {
      return (
        <span aria-hidden style={baseStyle}>
          <IconComponent size={18} color={markerColorCss} strokeWidth={1.6} />
        </span>
      );
    }

    if (markerType === 'check') {
      return (
        <span aria-hidden style={baseStyle}>
          <CheckIcon size={18} color={markerColorCss} strokeWidth={1.8} />
        </span>
      );
    }

    return (
      <span
        aria-hidden
        style={{
          ...baseStyle,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: markerColorCss,
        }}
      />
    );
  };

  return (
    <div
      ref={innerRef}
      data-block-type="list"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={{
        margin: spacingValueToCss(margin),
        padding: spacingValueToCss(padding),
        background: colorValueToCss(background),
        border: borderValueToCss(border),
        borderRadius,
        boxShadow: SHADOW_MAP[shadow] ?? SHADOW_MAP.none,
        width: width && width.trim() !== '' ? width : '100%',
        ...(height && height.trim() !== '' && height !== 'auto'
          ? { height, minHeight: height }
          : {}),
        ...(wrapperStyle ?? {}),
      }}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <ListElement
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: `${clampedSpacing}px`,
          textAlign,
        }}
        data-marker-type={markerType}
      >
        {resolvedItems.map((item, index) => (
          <li
            key={item.id || index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              color: textColorCss,
              fontSize: `${clampedTextSize}px`,
              lineHeight: clampedLineHeight.toString(),
              fontWeight: TEXT_WEIGHT_MAP[fontWeight] ?? TEXT_WEIGHT_MAP.regular,
              fontFamily: resolvedFontFamily,
              letterSpacing: `${clampedLetterSpacing}px`,
              justifyContent:
                textAlign === 'center'
                  ? 'center'
                  : textAlign === 'right'
                    ? 'flex-end'
                    : 'flex-start',
              textAlign,
              textTransform: resolvedTextTransform,
            }}
          >
            {renderMarker(index)}
            <span style={{ wordBreak: 'break-word' }}>{item.text || 'Item da lista'}</span>
          </li>
        ))}
      </ListElement>
    </div>
  );
}
