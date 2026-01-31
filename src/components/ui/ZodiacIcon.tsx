'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type ZodiacSignId, type Element } from '@/types/zodiac';

// Element-based glow colors for hover effects
const elementGlowColors: Record<Element, string> = {
  fire: 'rgba(255, 111, 0, 0.4)',
  earth: 'rgba(45, 80, 22, 0.4)',
  air: 'rgba(6, 182, 212, 0.4)',
  water: 'rgba(0, 61, 165, 0.4)',
};

// Sign to element mapping
const signElements: Record<ZodiacSignId, Element> = {
  aries: 'fire',
  taurus: 'earth',
  gemini: 'air',
  cancer: 'water',
  leo: 'fire',
  virgo: 'earth',
  libra: 'air',
  scorpio: 'water',
  sagittarius: 'fire',
  capricorn: 'earth',
  aquarius: 'air',
  pisces: 'water',
};

// Size variants in pixels
const sizeMap = {
  sm: 24,
  md: 48,
  lg: 64,
  xl: 96,
} as const;

type Size = keyof typeof sizeMap;

interface ZodiacIconProps {
  sign: ZodiacSignId;
  size?: Size;
  animated?: boolean;
  className?: string;
}

export default function ZodiacIcon({
  sign,
  size = 'md',
  animated = false,
  className = '',
}: ZodiacIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const element = signElements[sign];
  const glowColor = elementGlowColors[element];
  const pixelSize = sizeMap[size];

  // Dynamic styles for glow effect
  const glowStyle = isHovered
    ? {
        filter: `drop-shadow(0 0 ${pixelSize / 4}px ${glowColor}) drop-shadow(0 0 ${pixelSize / 2}px ${glowColor})`,
      }
    : {};

  // Animation classes
  const animationClasses = animated
    ? 'transition-all duration-300 ease-out hover:scale-[1.08] hover:rotate-[5deg]'
    : 'transition-all duration-300';

  // Active pulse animation style
  const pulseAnimationStyle = isActive
    ? {
        animation: 'pulse-glow 2s ease-in-out infinite',
      }
    : {};

  return (
    <>
      {/* Inline keyframes for pulse-glow animation */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 ${pixelSize / 6}px ${glowColor});
          }
          50% {
            filter: drop-shadow(0 0 ${pixelSize / 3}px ${glowColor})
              drop-shadow(0 0 ${pixelSize / 2}px ${glowColor});
          }
        }
      `}</style>
      <div
        className={`inline-flex items-center justify-center ${animationClasses} ${className}`}
        style={{
          width: pixelSize,
          height: pixelSize,
          ...glowStyle,
          ...pulseAnimationStyle,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
        role="img"
        aria-label={`${sign} zodiac icon`}
      >
        <Image
          src={`/icons/zodiac/${sign}.svg`}
          alt={`${sign} zodiac sign`}
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full object-contain"
          priority={size === 'xl' || size === 'lg'}
        />
      </div>
    </>
  );
}

// Export utilities for use in other components
export { signElements, elementGlowColors, sizeMap };
