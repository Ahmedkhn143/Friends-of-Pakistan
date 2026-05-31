interface SectionHeadingProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tagColor?: string;
  titleColor?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  tagColor,
  titleColor,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div style={{ textAlign: align, marginBottom: align === "center" ? "36px" : "0" }}>
      <div 
        className="tag" 
        style={{ 
          color: tagColor, 
          justifyContent: align === "center" ? "center" : "flex-start",
          display: align === "center" ? "flex" : "inline-block" 
        }}
      >
        {tag}
      </div>
      <h2 
        className="section-heading" 
        style={{ 
          color: titleColor,
          fontSize: align === "center" ? "32px" : undefined
        }}
      >
        {title}
      </h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  );
}
