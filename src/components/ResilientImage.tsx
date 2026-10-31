import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-blue-950/40 text-zinc-300 p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-8 h-8 text-blue-500 mb-3 opacity-80" />
        <p className="font-display text-sm font-semibold text-zinc-100 tracking-tight">
          {fallbackTitle || alt}
        </p>
        {fallbackSubtitle && (
          <p className="text-xs text-zinc-400 mt-1">{fallbackSubtitle}</p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
