'use client';

import Image from 'next/image';
import { useState } from 'react';

// Planet ID type
export type PlanetId =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

// Size variants in pixels
const sizeMap = {
  sm: 20,
  md: 32,
  lg: 48,
} as const;

type Size = keyof typeof sizeMap;

// Planet colors for glow effects
const planetColors: Record<PlanetId, string> = {
  sun: 'rgba(255, 200, 0, 0.5)',
  moon: 'rgba(200, 200, 220, 0.5)',
  mercury: 'rgba(180, 180, 180, 0.5)',
  venus: 'rgba(255, 180, 120, 0.5)',
  mars: 'rgba(220, 80, 60, 0.5)',
  jupiter: 'rgba(200, 160, 100, 0.5)',
  saturn: 'rgba(210, 180, 140, 0.5)',
  uranus: 'rgba(130, 210, 220, 0.5)',
  neptune: 'rgba(80, 120, 200, 0.5)',
  pluto: 'rgba(160, 140, 180, 0.5)',
};

interface PlanetIconProps {
  planet: PlanetId;
  size?: Size;
  className?: string;
}

export default function PlanetIcon({
  planet,
  size = 'md',
  className = '',
}: PlanetIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const pixelSize = sizeMap[size];
  const glowColor = planetColors[planet];

  // Dynamic styles for hover glow
  const glowStyle = isHovered
    ? {
        filter: `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor})`,
      }
    : {};

  return (
    <div
      className={`inline-flex items-center justify-center transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        ...glowStyle,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={`${planet} planet icon`}
    >
      <Image
        src={`/icons/planets/${planet}.svg`}
        alt={`${planet}`}
        width={pixelSize}
        height={pixelSize}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Export planet colors and type for use in other components
export { planetColors, sizeMap };
