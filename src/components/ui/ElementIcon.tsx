'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type Element } from '@/types/zodiac';

// Size variants in pixels
const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
} as const;

type Size = keyof typeof sizeMap;

// Element colors for glow effects
const elementColors: Record<Element, string> = {
  fire: 'rgba(255, 111, 0, 0.5)',
  earth: 'rgba(45, 80, 22, 0.5)',
  air: 'rgba(6, 182, 212, 0.5)',
  water: 'rgba(0, 61, 165, 0.5)',
};

interface ElementIconProps {
  element: Element;
  size?: Size;
  animated?: boolean;
  className?: string;
}

export default function ElementIcon({
  element,
  size = 'md',
  animated = false,
  className = '',
}: ElementIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const pixelSize = sizeMap[size];
  const glowColor = elementColors[element];

  // Dynamic styles for hover glow
  const glowStyle = isHovered
    ? {
        filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 16px ${glowColor})`,
      }
    : {};

  // Animation classes for animated mode
  const animationClasses = animated
    ? 'transition-all duration-500 ease-in-out hover:scale-110'
    : 'transition-all duration-300';

  // Subtle float animation for animated mode
  const floatStyle = animated
    ? {
        animation: 'element-float 3s ease-in-out infinite',
      }
    : {};

  return (
    <>
      {/* Inline keyframes for subtle float animation */}
      {animated && (
        <style jsx>{`
          @keyframes element-float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-4px);
            }
          }
        `}</style>
      )}
      <div
        className={`inline-flex items-center justify-center ${animationClasses} ${className}`}
        style={{
          width: pixelSize,
          height: pixelSize,
          ...glowStyle,
          ...floatStyle,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="img"
        aria-label={`${element} element icon`}
      >
        <Image
          src={`/icons/elements/${element}.svg`}
          alt={`${element} element`}
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full object-contain"
        />
      </div>
    </>
  );
}

// Export element colors for use in other components
export { elementColors, sizeMap };
