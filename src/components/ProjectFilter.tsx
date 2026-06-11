"use client";

import { useState, useEffect } from "react";
import { Project, ProjectCategory } from "@/data/projects";
import { getProjects } from "@/utils/projectDb";
import ProjectCard from "./ProjectCard";
import styles from "./AdvancedFilter.module.css";

export default function ProjectFilter() {
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedMore, setLoadedMore] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    const data = getProjects();
    // Sort projects: Featured first, then order
    const sorted = [...data].sort((a, b) => {
      const aFeatured = (a as any).featured ? 1 : 0;
      const bFeatured = (b as any).featured ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;
      return ((a as any).order ?? 0) - ((b as any).order ?? 0);
    });
    setAllProjects(sorted);

    // Read search parameter from URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }
  }, []);

  const categories = [
    { id: "all", label: "All" },
    { id: "Housing", label: "Housing" },
    { id: "Clean Water", label: "Clean Water" },
    { id: "Disaster Relief", label: "Disaster Relief" },
    { id: "Education", label: "Education" },
    { id: "Food Aid", label: "Food Aid" },
  ];

  let displayProjects = loadedMore ? allProjects : allProjects.slice(0, 12);
  
  if (category !== "all") {
    displayProjects = displayProjects.filter(p => p.category === category);
  }
  
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    displayProjects = displayProjects.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.location.toLowerCase().includes(q)
    );
  }

  // Calculate stats based on currently filtered projects
  const totalShown = displayProjects.length;
  const housingCount = displayProjects.filter(p => p.category === "Housing").length;
  const cleanWaterCount = displayProjects.filter(p => p.category === "Clean Water").length;
  const reliefCount = displayProjects.filter(p => p.category === "Disaster Relief").length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px" }}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        Filter by category
      </div>

      <div className={styles.pills}>
        {categories.map(c => (
          <button
            key={c.id}
            className={`${styles.pill} ${category === c.id ? styles.active : ""}`}
            onClick={() => setCategory(c.id as ProjectCategory | "all")}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.searchBar}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          className={styles.searchInput}
          placeholder="Search by project name or location..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNum}>{totalShown}</div>
          <div className={styles.statLabel}>Total Shown</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum}>{housingCount}</div>
          <div className={styles.statLabel}>Housing</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum}>{cleanWaterCount}</div>
          <div className={styles.statLabel}>Clean Water</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum}>{reliefCount}</div>
          <div className={styles.statLabel}>Relief</div>
        </div>
      </div>
      
      <div className="projects-grid" style={{ marginTop: "16px" }}>
        {displayProjects.length > 0 ? (
          displayProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i % 3} />
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", color: "var(--green-dark)" }}>No projects found</h3>
            <p>Try adjusting your search or category filter.</p>
            <button 
              className="btn btn-outline" 
              style={{ color: "var(--green-dark)", borderColor: "var(--green-dark)", marginTop: "24px" }}
              onClick={() => { setCategory("all"); setSearchQuery(""); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {!loadedMore && allProjects.length > 12 && (
        <div className="load-more-wrap">
          <button className="btn btn-green" onClick={() => setLoadedMore(true)}>
            Load More Projects
          </button>
        </div>
      )}
    </div>
  );
}
