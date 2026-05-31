"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface ProgressItemProps {
  label: string;
  pct: number;
}

const progressItems: ProgressItemProps[] = [
  { label: "Housing Projects", pct: 72 },
  { label: "Clean Water Wells", pct: 58 },
  { label: "Disaster Relief Operations", pct: 85 },
  { label: "Volunteer Network Growth", pct: 45 },
];

function ProgressBar({ label, pct }: ProgressItemProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setTimeout(() => {
            setAnimated(true);
          }, 100);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div className="progress-item" ref={ref}>
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-pct">{pct}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: animated ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function ProgressBars() {
  return (
    <div className="progress-section">
      {progressItems.map((item, i) => (
        <ScrollReveal key={i}>
          <ProgressBar label={item.label} pct={item.pct} />
        </ScrollReveal>
      ))}
    </div>
  );
}
