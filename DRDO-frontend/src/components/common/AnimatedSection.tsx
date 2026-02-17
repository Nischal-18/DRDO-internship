import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';

export interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  className = '',
  once = true,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Initial state based on animation type
    const initialState: gsap.TweenVars = {
      opacity: 0,
    };

    const animateState: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
    };

    switch (animation) {
      case 'fadeInUp':
        initialState.y = 50;
        animateState.y = 0;
        break;
      case 'slideInLeft':
        initialState.x = -30;
        animateState.x = 0;
        break;
      case 'slideInRight':
        initialState.x = 30;
        animateState.x = 0;
        break;
      case 'scaleIn':
        initialState.scale = 0.95;
        animateState.scale = 1;
        break;
      case 'fadeIn':
        // Only opacity animation (already set)
        break;
    }

    // Set initial state
    gsap.set(element, initialState);

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check if we should animate only once
            if (once && hasAnimated.current) return;

            // Animate in
            gsap.to(element, animateState);
            hasAnimated.current = true;

            // If once is true, disconnect observer after animation
            if (once) {
              observer.disconnect();
            }
          } else if (!once && hasAnimated.current) {
            // If not once, reset to initial state when out of view
            gsap.to(element, {
              ...initialState,
              duration: 0.3,
            });
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [animation, delay, duration, threshold, once]);

  return (
    <div ref={sectionRef} className={`animated ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;
