import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
}

export default function PageHero({ title, subtitle, breadcrumbLabel }: PageHeroProps) {
  return (
    <div className="page-hero">
      <div className="container">
        <div className="page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> › <span>{breadcrumbLabel}</span>
          </div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
