'use client';

import { ButtonRuntime } from './Button';
import { CardRuntime } from './Card';
import { ContainerRuntime } from './Container';
import { HeadingRuntime } from './Heading';
import { IconRuntime } from './Icon';
import { IconCardRuntime } from './IconCard';
import { CalloutRuntime } from './Callout';
import { StatRuntime } from './Stat';
import { TimelineRuntime } from './Timeline';
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
import { AccordionRuntime } from './Accordion';
import { GalleryRuntime } from './Gallery';
import { AvatarRuntime } from './Avatar';
import { ImageOverlayRuntime } from './ImageOverlay';

const ColumnCanvasSlotRuntime = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
const TabPanelCanvasRuntime = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
const AccordionItemCanvasRuntime = ({ children }: { children?: React.ReactNode }) => (
  <>{children}</>
);

export const siteRuntimeResolver = {
  Container: ContainerRuntime,
  Section: SectionRuntime,
  Text: TextRuntime,
  Button: ButtonRuntime,
  Icon: IconRuntime,
  IconCard: IconCardRuntime,
  Callout: CalloutRuntime,
  Stat: StatRuntime,
  Timeline: TimelineRuntime,
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
  Accordion: AccordionRuntime,
  AccordionItemCanvas: AccordionItemCanvasRuntime,
  Gallery: GalleryRuntime,
  Avatar: AvatarRuntime,
  ImageOverlay: ImageOverlayRuntime,
  TestControlsBlock: () => null,
};
