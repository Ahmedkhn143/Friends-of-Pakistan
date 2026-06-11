import ScrollReveal from "./ScrollReveal";

interface TestimonialCardProps {
  stars: string;
  quote: string;
  avatar: string;
  name: string;
  loc: string;
  delay?: number;
  isDark?: boolean;
}

export default function TestimonialCard({
  stars,
  quote,
  avatar,
  name,
  loc,
  delay = 0,
  isDark = false,
}: TestimonialCardProps) {
  return (
    <ScrollReveal 
      delay={delay} 
      className={`testi-card ${isDark ? "testi-card-dark" : ""}`}
      style={isDark ? {
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
      } : {}}
    >
      <div className="testi-stars">{stars}</div>
      <p className="testi-quote" style={isDark ? { color: "rgba(255, 255, 255, 0.95)" } : {}}>"{quote}"</p>
      <div className="testi-author">
        <div 
          className="testi-avatar" 
          style={isDark ? { 
            border: "2px solid var(--gold-light)",
            background: "linear-gradient(135deg, var(--green-dark), var(--green-mid))"
          } : {}}
        >
          {avatar}
        </div>
        <div>
          <div className="testi-name" style={isDark ? { color: "var(--white)" } : {}}>{name}</div>
          <div className="testi-loc" style={isDark ? { color: "rgba(255, 255, 255, 0.6)" } : {}}>{loc}</div>
        </div>
      </div>
    </ScrollReveal>
  );
}
