'use client';

import { ButtonRuntime } from './Button';
import { CardRuntime } from './Card';
import { ContainerRuntime } from './Container';
import { HeadingRuntime } from './Heading';
import { ImageRuntime } from './Image';
import { LinkRuntime } from './Link';
import { TextRuntime } from './Text';
import { VideoRuntime } from './Video';

export const siteRuntimeResolver = {
  Container: ContainerRuntime,
  Text: TextRuntime,
  Button: ButtonRuntime,
  Image: ImageRuntime,
  Heading: HeadingRuntime,
  Link: LinkRuntime,
  Card: CardRuntime,
  Video: VideoRuntime,
  TestControlsBlock: () => null,
};
