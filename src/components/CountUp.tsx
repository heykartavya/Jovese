import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  formatIndian?: boolean;
}

export default function CountUp({ end, duration = 1.5, suffix = '', prefix = '', formatIndian = false }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing out quadratic
        const easeProgress = progress * (2 - progress);
        const currentCount = easeProgress * end;
        
        setCount(currentCount);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  const displayValue = () => {
    const rounded = Math.round(count);
    if (formatIndian) {
      return rounded.toLocaleString('en-IN');
    }
    return rounded.toString();
  };

  return (
    <div ref={ref} className="inline-block transition-all">
      {prefix}
      {displayValue()}
      {suffix}
    </div>
  );
}
