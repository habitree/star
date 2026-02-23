'use client';

import { useMemo } from 'react';
import type { ElementTheme } from '@/types/engagement';

interface ParticleEffectProps {
  type: ElementTheme['particleType'];
  color: string;
  count?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

const particleEmojis: Record<ElementTheme['particleType'], string[]> = {
  flame: ['🔥', '✨', '💫'],
  leaf: ['🍃', '🌿', '✨'],
  wind: ['💨', '✨', '🌬️'],
  droplet: ['💧', '✨', '🫧'],
};

export default function ParticleEffect({ type, color, count = 8 }: ParticleEffectProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.6 + Math.random() * 0.8,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      emoji: particleEmojis[type][i % particleEmojis[type].length],
    }));
  }, [type, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-particle-float opacity-30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
