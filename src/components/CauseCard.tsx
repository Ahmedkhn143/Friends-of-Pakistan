import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface CauseCardProps {
  title: string;
  desc: string;
  img: string;
  badge: string;
  badgeColor?: string;
  count: number;
  countLabel: string;
  delay?: number;
}

export default function CauseCard({
  title,
  desc,
  img,
  badge,
  badgeColor,
  count,
  countLabel,
  delay = 0,
}: CauseCardProps) {
  return (
    <ScrollReveal delay={delay} className="cause-card">
      <div className="cause-img">
        <img src={img} alt={title} loading="lazy" />
        <span className="cause-badge" style={badgeColor ? { background: badgeColor } : {}}>
          {badge}
        </span>
      </div>
      <div className="cause-body">
        <h3 className="cause-title">{title}</h3>
        <p className="cause-text">{desc}</p>
        <div className="cause-meta">
          <span className="cause-count">
            <strong>{count}+</strong> {countLabel}
          </span>
          <Link href="/projects" className="cause-link">
            View projects{" "}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
