import { useState } from 'react';

interface ArtImageProps {
  src: string;
  alt: string;
  className?: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1582236166547-49d9c223c6c1?auto=format&fit=crop&q=80&w=1200';

export default function ArtImage({ src, alt, className = "" }: ArtImageProps) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? FALLBACK_IMAGE : src}
      alt={alt}
      onError={() => !error && setError(true)}
      className={`object-cover w-full h-full ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
