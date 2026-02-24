import React, { useCallback, useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  particleCount = 50,
  className = '' 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticle = useCallback((id: number): Particle => {
    const colors = [
      'rgba(34, 211, 238, 0.4)',
      'rgba(34, 211, 238, 0.2)',
      'rgba(249, 115, 22, 0.2)',
      'rgba(249, 115, 22, 0.1)',
      'rgba(148, 163, 184, 0.15)',
    ];
    return {
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }, []);

  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }, (_, i) => createParticle(i));
    setParticles(initialParticles);

    let animationId: number;
    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: ((p.x + p.speedX + 100) % 100),
        y: ((p.y + p.speedY + 100) % 100),
      })));
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [particleCount, createParticle]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill={p.color}
            opacity={p.opacity}
          />
        ))}
        {/* Draw subtle lines between nearby particles */}
        {particles.slice(0, 20).map((p1, i) =>
          particles.slice(i + 1, 20).map((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 15) {
              return (
                <line
                  key={`${p1.id}-${p2.id}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="rgba(34, 211, 238, 0.06)"
                  strokeWidth="0.5"
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
};

export default ParticleBackground;
