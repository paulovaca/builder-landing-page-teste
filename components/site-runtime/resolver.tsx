'use client';

import { ButtonRuntime } from './Button';
import { CardRuntime } from './Card';
import { ContainerRuntime } from './Container';
import { HeadingRuntime } from './Heading';
import { ImageRuntime } from './Image';
import { IconRuntime } from './Icon';
import { LinkRuntime } from './Link';
import { DividerRuntime } from './Divider';
import { SpacerRuntime } from './Spacer';
import { TextRuntime } from './Text';
import { VideoRuntime } from './Video';

export const siteRuntimeResolver = {
  Container: ContainerRuntime,
  Text: TextRuntime,
  Button: ButtonRuntime,
  Image: ImageRuntime,
  Icon: IconRuntime,
  Heading: HeadingRuntime,
  Link: LinkRuntime,
  Card: CardRuntime,
  Video: VideoRuntime,
  Divider: DividerRuntime,
  Spacer: SpacerRuntime,
  TestControlsBlock: () => null,
};
