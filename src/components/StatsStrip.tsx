"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface StatProps {
  target: number;
  label: string;
  suffix?: string;
}

const stats: StatProps[] = [
  { target: 1000, label: "Projects Completed", suffix: "+" },
  { target: 50000, label: "Lives Impacted", suffix: "+" },
  { target: 200, label: "Clean Water Wells", suffix: "+" },
  { target: 15, label: "Districts Served", suffix: "+" },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animated = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          const duration = 1800;
          const start = performance.now();
          
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(eased * target);
            setCount(val);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="stat-num">{count.toLocaleString()}{suffix}</span>;
}

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <ScrollReveal key={i} delay={i} className="stat-item">
            <Counter target={stat.target} suffix={stat.suffix} />
            <div className="stat-label">{stat.label}</div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
