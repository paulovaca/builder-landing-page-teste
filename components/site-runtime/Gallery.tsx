'use client';

import { X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

import { GalleryBlock } from '@/components/site-blocks/GalleryBlock';
import type { GalleryBlockProps, GalleryImageItem } from '@/lib/site-renderer/types';
import { useTracking } from '@/lib/tracking/useTracking';
import styles from '@/components/site-blocks/gallery-block.module.css';

export type GalleryProps = Omit<GalleryBlockProps, 'innerRef' | 'wrapperProps' | 'onImageClick'>;

type GalleryBaseProps = GalleryProps & {
  innerRef?: React.Ref<HTMLDivElement>;
};

const sanitizeImages = (images?: GalleryImageItem[]) =>
  Array.isArray(images)
    ? images.filter((image) => typeof image?.src === 'string' && image.src.trim().length > 0)
    : [];

export function GalleryBase({
  images,
  tracking,
  openInModal,
  innerRef,
  ...rest
}: GalleryBaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { trackEvent } = useTracking();

  const sanitizedImages = useMemo(() => sanitizeImages(images), [images]);
  const safeActiveIndex = useMemo(() => {
    if (!openInModal) return null;
    if (activeIndex === null) return null;
    const lastIndex = sanitizedImages.length - 1;
    if (lastIndex < 0) return null;
    return Math.max(0, Math.min(activeIndex, lastIndex));
  }, [activeIndex, openInModal, sanitizedImages.length]);

  useEffect(() => {
    if (safeActiveIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeActiveIndex]);

  const handleOpen = (image: GalleryImageItem, index: number) => {
    if (!openInModal) return;
    setActiveIndex(index);

    if (tracking?.enabled) {
      trackEvent(tracking, {
        name: tracking.event?.name || 'view_item',
        params: {
          ...(tracking.event.params ?? {}),
          image_src: image.src,
          image_alt: image.alt,
          image_index: index,
        },
      });
    }
  };

  const activeImage = safeActiveIndex !== null ? sanitizedImages[safeActiveIndex] : undefined;
  const closeLightbox = () => setActiveIndex(null);
  const resolvedAlt = activeImage?.alt?.trim() || 'Imagem ampliada';

  return (
    <>
      <GalleryBlock
        {...rest}
        images={sanitizedImages}
        openInModal={openInModal}
        innerRef={innerRef}
        onImageClick={openInModal ? handleOpen : undefined}
      />

      {openInModal && activeImage ? (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={resolvedAlt}
          onClick={closeLightbox}
        >
          <div className={styles.lightboxContent} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeLightbox}
              aria-label="Fechar galeria"
            >
              <X size={18} />
            </button>

            <div className={styles.lightboxImageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element -- renderiza imagem controlada pelo usuário */}
              <img src={activeImage.src} alt={resolvedAlt} className={styles.lightboxImage} />
            </div>

            {activeImage.caption || activeImage.alt ? (
              <p className={styles.lightboxCaption}>{activeImage.caption ?? activeImage.alt}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export const GalleryRuntime = (props: GalleryProps) => <GalleryBase {...props} />;
