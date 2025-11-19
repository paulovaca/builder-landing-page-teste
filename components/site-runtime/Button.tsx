'use client';

import React from 'react';

import { ButtonBlock, type ButtonBlockProps } from '@/components/site-blocks/ButtonBlock';
import { useTracking } from '@/lib/tracking/useTracking';

export type ButtonRuntimeProps = ButtonBlockProps;

export function ButtonRuntime(props: ButtonRuntimeProps) {
  const { trackEvent } = useTracking();
  const hasLink = Boolean(props.href && props.href.trim().length > 0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (props.tracking?.enabled) {
      trackEvent(props.tracking, {
        params: {
          ...(props.tracking.event.params ?? {}),
          destination: props.href,
        },
      });
    }

    if (!hasLink) {
      event.preventDefault();
    }
  };

  return <ButtonBlock {...props} onClick={handleClick} />;
}
