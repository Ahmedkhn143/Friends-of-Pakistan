import ScrollReveal from "./ScrollReveal";

interface TestimonialCardProps {
  stars: string;
  quote: string;
  avatar: string;
  name: string;
  loc: string;
  delay?: number;
}

export default function TestimonialCard({
  stars,
  quote,
  avatar,
  name,
  loc,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <ScrollReveal delay={delay} className="testi-card">
      <div className="testi-stars">{stars}</div>
      <p className="testi-quote">"{quote}"</p>
      <div className="testi-author">
        <div className="testi-avatar">{avatar}</div>
        <div>
          <div className="testi-name">{name}</div>
          <div className="testi-loc">{loc}</div>
        </div>
      </div>
    </ScrollReveal>
  );
}
