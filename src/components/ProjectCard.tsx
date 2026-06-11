"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Project, catClass } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
              <button 
                onClick={handleOpenModal} 
                className="project-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  color: "var(--gold)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center"
                }}
              >
                View details →
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Render modal directly under body via Portal to escape parent z-index constraints */}
      {isModalOpen && mounted && createPortal(
        <div 
          className="project-modal-overlay" 
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999, // Ensure modal is above absolute header
            padding: "20px",
            animation: "fadeIn 0.3s ease"
          }}
        >
          <div 
            className="project-modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "24px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: "var(--shadow-lg)",
              animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--cream-dark)",
                border: "1px solid var(--card-border)",
                color: "var(--text-dark)",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 100000,
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#e2e8f0"}
              onMouseOut={(e) => e.currentTarget.style.background = "var(--cream-dark)"}
            >
              ×
            </button>

            {/* Modal Body Grid */}
            <div className="project-modal-grid">
              <div 
                style={{
                  height: "320px",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <img 
                  src={project.img} 
                  alt={project.title} 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <span 
                  className={`cat-badge ${catClass[project.category] || "cat-relief"}`}
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: "50px",
                    color: "white"
                  }}
                >
                  {project.category}
                </span>
              </div>

              <div style={{ padding: "32px" }}>
                <h3 
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "var(--text-dark)",
                    fontFamily: "var(--font-playfair)",
                    marginBottom: "16px",
                    lineHeight: "1.2"
                  }}
                >
                  {project.title}
                </h3>

                <div 
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--card-border)"
                  }}
                >
                  <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 500 }}>
                    📍 {project.location}
                  </span>
                  <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 500 }}>
                    📅 {project.date}
                  </span>
                  <span style={{ fontSize: "14px", color: "var(--green-dark)", fontWeight: 600 }}>
                    👥 {project.beneficiaries.toLocaleString()} beneficiaries helped
                  </span>
                </div>

                <p 
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                    color: "var(--text-muted)",
                    margin: 0,
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {project.desc}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
