"use client";

import { useState, useEffect } from "react";
import { Project, ProjectCategory } from "@/data/projects";
import { getProjects, saveProject, deleteProject } from "@/utils/projectDb";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [id, setId] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Housing");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [beneficiaries, setBeneficiaries] = useState(0);
  const [img, setImg] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(1);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getProjects();
    // Sort projects: Featured first, then by custom order index
    const sorted = [...data].sort((a, b) => {
      const aFeatured = (a as any).featured ? 1 : 0;
      const bFeatured = (b as any).featured ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;
      return ((a as any).order ?? 0) - ((b as any).order ?? 0);
    });
    setProjectsList(sorted);
    setLoading(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const resetForm = () => {
    setId(undefined);
    setTitle("");
    setCategory("Housing");
    setLocation("");
    setDate("");
    setDesc("");
    setBeneficiaries(0);
    setImg("");
    setFeatured(false);
    setOrder(projectsList.length + 1);
    setIsEditing(false);
  };

  const handleEdit = (project: Project) => {
    setId(project.id);
    setTitle(project.title);
    setCategory(project.category);
    setLocation(project.location);
    setDate(project.date);
    setDesc(project.desc);
    setBeneficiaries(project.beneficiaries);
    setImg(project.img);
    setFeatured((project as any).featured || false);
    setOrder((project as any).order || project.id);
    setIsEditing(true);
    
    // Scroll to form on mobile
    window.scrollTo({ top: document.getElementById("project-form")?.offsetTop || 0, behavior: "smooth" });
  };

  const handleDelete = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
      showToast("Project deleted successfully!");
      loadData();
      if (id === projectId) resetForm();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !date || !desc || !img) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      id,
      title,
      category,
      location,
      date,
      desc,
      beneficiaries: Number(beneficiaries),
      img,
      featured,
      order: Number(order),
    };

    saveProject(payload);
    showToast(isEditing ? "Project updated successfully!" : "Project added successfully!");
    resetForm();
    loadData();
  };

  // Calculate high-level stats
  const totalCount = projectsList.length;
  const featuredCount = projectsList.filter(p => (p as any).featured).length;
  const categoriesCount = {
    Housing: projectsList.filter(p => p.category === "Housing").length,
    Water: projectsList.filter(p => p.category === "Clean Water").length,
    Relief: projectsList.filter(p => p.category === "Disaster Relief").length,
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.titleArea}>
        <div>
          <h1 className={styles.dashboardHeading}>Project Dashboard</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
            Add, update, or remove direct-impact humanitarian projects
          </p>
        </div>
        <button className="btn btn-outline" onClick={resetForm}>
          ➕ Add New Project
        </button>
      </div>

      {/* Stats Summary Panel */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Projects</div>
          <div className={styles.statValue}>{loading ? "..." : totalCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Featured (Shows First)</div>
          <div className={styles.statValue}>{loading ? "..." : featuredCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Housing Projects</div>
          <div className={styles.statValue}>{loading ? "..." : categoriesCount.Housing}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Clean Water / Relief</div>
          <div className={styles.statValue}>
            {loading ? "..." : categoriesCount.Water + categoriesCount.Relief}
          </div>
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Left column: Projects Table List */}
        <div>
          <div className={styles.tableContainer}>
            <div style={{ padding: "20px", borderBottom: "1px solid var(--card-border)" }}>
              <h2 className={styles.cardTitle} style={{ margin: 0 }}>All Projects</h2>
            </div>
            {loading ? (
              <div style={{ padding: "40px", textAlign: "center" }}>Loading projects...</div>
            ) : projectsList.length === 0 ? (
              <div className={styles.emptyState}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>📂</div>
                <h3>No projects in database</h3>
                <p>Click "Add New Project" to populate your dashboard.</p>
              </div>
            ) : (
              <table className={styles.projectTable}>
                <thead>
                  <tr>
                    <th>Title & Location</th>
                    <th>Category</th>
                    <th>Priority (Order)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsList.map((project) => (
                    <tr key={project.id} className={styles.projectRow}>
                      <td>
                        <div className={styles.projectTitleCell}>{project.title}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                          📍 {project.location} ({project.date})
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${styles.regularBadge}`}>
                          {project.category}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {(project as any).order ?? project.id}
                      </td>
                      <td>
                        {(project as any).featured ? (
                          <span className={`${styles.badge} ${styles.featuredBadge}`}>
                            ⭐ Featured
                          </span>
                        ) : (
                          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Regular</span>
                        )}
                      </td>
                      <td>
                        <div className={styles.actionsCell}>
                          <button className={styles.editBtn} onClick={() => handleEdit(project)}>
                            Edit
                          </button>
                          <button className={styles.deleteBtn} onClick={() => handleDelete(project.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right column: Add / Edit Project Form */}
        <div id="project-form">
          <div className={styles.formCard}>
            <h2 className={styles.cardTitle}>
              {isEditing ? "📝 Edit Project Details" : "➕ Add Humanitarian Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formFullWidth}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Project Title *</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="e.g., Solar Tube Well — Thar Desert"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Category *</label>
                  <select
                    className={styles.select}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  >
                    <option value="Housing">Housing</option>
                    <option value="Clean Water">Clean Water</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Education">Education</option>
                    <option value="Food Aid">Food Aid</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Location *</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="e.g., Tharparkar, Sindh"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Date *</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="e.g., May 2023"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Beneficiaries count</label>
                  <input
                    className={styles.input}
                    type="number"
                    value={beneficiaries}
                    onChange={(e) => setBeneficiaries(Number(e.target.value))}
                  />
                </div>

                <div className={styles.formFullWidth}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Image URL *</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="e.g., https://picsum.photos/400/260?random=105"
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formFullWidth}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Description *</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Describe the direct action, impact metrics, and community transformation..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Display Order / Position</label>
                  <input
                    className={styles.input}
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                    Featured / Show First
                  </label>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className="btn btn-green" style={{ flex: 1 }}>
                  {isEditing ? "Save Changes" : "Create Project"}
                </button>
                {isEditing && (
                  <button type="button" className="btn btn-outline" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {toastMessage && <div className={styles.toast}>✨ {toastMessage}</div>}
    </div>
  );
}
