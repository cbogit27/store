// components/ProductVideo.tsx
'use client';

import { useRef } from 'react';

interface ProductVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function ProductVideo({ src, poster, className }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch((err) => console.log("Video play interrupted:", err));
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    />
  );
}
