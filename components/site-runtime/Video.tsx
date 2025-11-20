'use client';

import React, { useRef } from 'react';

import { VideoBlock } from '@/components/site-blocks/VideoBlock';
import type { VideoBlockProps } from '@/lib/site-renderer/types';
import { useTracking } from '@/lib/tracking/useTracking';

export type VideoRuntimeProps = VideoBlockProps;

export function VideoRuntime(props: VideoRuntimeProps) {
  const { trackEvent } = useTracking();
  const startedRef = useRef(false);

  const trackVideoEvent = (eventName: 'video_start' | 'video_complete') => {
    if (!props.tracking?.enabled) return;
    trackEvent(props.tracking, {
      name: eventName,
      params: {
        ...(props.tracking.event.params ?? {}),
        video_url: props.url,
      },
    });
  };

  const handleStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackVideoEvent('video_start');
    }
  };

  const handleEnded = () => {
    trackVideoEvent('video_complete');
  };

  return (
    <VideoBlock
      {...props}
      wrapperProps={{ onClick: handleStart }}
      onPlay={handleStart}
      onEnded={handleEnded}
    />
  );
}
