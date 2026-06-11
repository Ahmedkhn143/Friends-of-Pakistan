import Link from "next/link";
import { Project, catClass } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <div className="project-card">
        <div className="project-card-img">
          <img src={project.img} alt={project.title} loading="lazy" />
          <span className={`cat-badge ${catClass[project.category] || "cat-relief"}`}>
            {project.category}
          </span>
        </div>
        <div className="project-card-body">
          <h4 className="project-title">{project.title}</h4>
          <div className="project-meta">
            <span>📍 {project.location}</span>
            <span>📅 {project.date}</span>
          </div>
          <p className="project-desc">{project.desc}</p>
          <div className="project-footer">
            <span className="project-beneficiaries">
              <strong>{project.beneficiaries.toLocaleString()}</strong> beneficiaries
            </span>
            <Link href={`/projects?search=${encodeURIComponent(project.title)}`} className="project-link">
              View details →
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
