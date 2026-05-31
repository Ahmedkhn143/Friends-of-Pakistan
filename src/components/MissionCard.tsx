import ScrollReveal from "./ScrollReveal";

interface MissionCardProps {
  icon: string;
  title: string;
  text: string;
  delay?: number;
}

export default function MissionCard({ icon, title, text, delay = 0 }: MissionCardProps) {
  return (
    <ScrollReveal delay={delay} className="mission-card">
      <div className="mission-icon">{icon}</div>
      <h3 className="mission-title">{title}</h3>
      <p className="mission-text">{text}</p>
    </ScrollReveal>
  );
}
