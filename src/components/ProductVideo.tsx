'use client';

import { useEffect, useRef } from 'react';

interface ProductVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
}

export default function ProductVideo({
  src,
  poster,
  className,
  autoPlay = false,
}: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (autoPlay) {
      videoRef.current?.play().catch(() => {});
    }
  }, [autoPlay]);

  const handleMouseEnter = () => {
    if (!autoPlay) {
      videoRef.current?.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!autoPlay) {
      videoRef.current?.pause();
      videoRef.current!.currentTime = 0;
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={autoPlay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    />
  );
}