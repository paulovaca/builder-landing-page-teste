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
import { GridRuntime } from './Grid';
import { TabsRuntime } from './Tabs';
import { SectionRuntime } from './Section';
import { ColumnsRuntime } from './Columns';

const ColumnCanvasSlotRuntime = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
const TabPanelCanvasRuntime = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export const siteRuntimeResolver = {
  Container: ContainerRuntime,
  Section: SectionRuntime,
  Text: TextRuntime,
  Button: ButtonRuntime,
  Icon: IconRuntime,
  Heading: HeadingRuntime,
  Link: LinkRuntime,
  Image: ImagePlaceholderRuntime,
  Card: CardRuntime,
  Tabs: TabsRuntime,
  TabPanelCanvas: TabPanelCanvasRuntime,
  Columns: ColumnsRuntime,
  ColumnCanvasSlot: ColumnCanvasSlotRuntime,
  Grid: GridRuntime,
  Video: VideoRuntime,
  Divider: DividerRuntime,
  Spacer: SpacerRuntime,
  Badge: BadgeRuntime,
  List: ListRuntime,
  TestControlsBlock: () => null,
};
