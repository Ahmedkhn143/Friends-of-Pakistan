"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // 0, 1, 2, 3, 4 (maps to .reveal-delay-X)
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: observer.disconnect() if we only want to reveal once
        }
      },
      {
        rootMargin: "0px 0px -60px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
  const combinedClasses = `reveal ${isVisible ? "visible" : ""} ${delayClass} ${className}`.trim();

  return (
    <div ref={ref} className={combinedClasses}>
      {children}
    </div>
  );
}
