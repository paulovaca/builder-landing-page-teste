'use client';

import { ButtonRuntime } from './Button';
import { CardRuntime } from './Card';
import { ContainerRuntime } from './Container';
import { HeadingRuntime } from './Heading';
import { IconRuntime } from './Icon';
import { LinkRuntime } from './Link';
import { DividerRuntime } from './Divider';
import { SpacerRuntime } from './Spacer';
import { BadgeRuntime } from './Badge';
import { ListRuntime } from './List';
import { TextRuntime } from './Text';
import { VideoRuntime } from './Video';
import { ImagePlaceholderRuntime } from './ImagePlaceholder';

export const siteRuntimeResolver = {
  Container: ContainerRuntime,
  Text: TextRuntime,
  Button: ButtonRuntime,
  Icon: IconRuntime,
  Heading: HeadingRuntime,
  Link: LinkRuntime,
  Image: ImagePlaceholderRuntime,
  Card: CardRuntime,
  Video: VideoRuntime,
  Divider: DividerRuntime,
  Spacer: SpacerRuntime,
  Badge: BadgeRuntime,
  List: ListRuntime,
  TestControlsBlock: () => null,
};
