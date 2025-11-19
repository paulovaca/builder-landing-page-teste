'use client';

import React from 'react';

import { LinkBlock, type LinkBlockProps } from '@/components/site-blocks/LinkBlock';
import { useTracking } from '@/lib/tracking/useTracking';

export type LinkRuntimeProps = LinkBlockProps;

export function LinkRuntime(props: LinkRuntimeProps) {
  const { trackEvent } = useTracking();
  const hasLink = Boolean(props.href && props.href.trim().length > 0);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasLink) {
      event.preventDefault();
      return;
    }

    if (props.tracking?.enabled) {
      trackEvent(props.tracking, {
        params: {
          ...(props.tracking.event.params ?? {}),
          link_url: props.href,
        },
      });
    }
  };

  return <LinkBlock {...props} onClick={handleClick} />;
}
