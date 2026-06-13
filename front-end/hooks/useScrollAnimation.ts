import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Stop observing after animation triggers
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px'
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}
