"use client";

import { useState, useEffect } from "react";
import { Project, ProjectCategory } from "@/data/projects";
import { getProjects, saveProject, deleteProject, uploadProjectImage } from "@/utils/projectDb";
import styles from "./dashboard.module.css";

// Admin Credentials
const ADMIN_EMAIL = "admin@friendsofpakistan.org";
const ADMIN_PASSWORD = "FOP-Admin-Secure-2026!";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

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

  // Upload state
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Check login session
    if (typeof window !== "undefined") {
      const logged = sessionStorage.getItem("fop_admin_logged_in") === "true";
      if (logged) {
        setIsLoggedIn(true);
        loadData();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const loadData = () => {
    setLoading(true);
    const data = getProjects();
    setTimeout(() => {
      const sorted = [...data].sort((a, b) => {
        const aFeatured = (a as any).featured ? 1 : 0;
        const bFeatured = (b as any).featured ? 1 : 0;
        if (aFeatured !== bFeatured) return bFeatured - aFeatured;
        return ((a as any).order ?? 0) - ((b as any).order ?? 0);
      });
      setProjectsList(sorted);
      setLoading(false);
    }, 1000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput === ADMIN_EMAIL && passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("fop_admin_logged_in", "true");
      setIsLoggedIn(true);
      setLoginError("");
      loadData();
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("fop_admin_logged_in");
    setIsLoggedIn(false);
    setEmailInput("");
    setPasswordInput("");
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
    setUploadError("");
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
    setUploadError("");
    setIsEditing(true);
    
    window.scrollTo({ top: document.getElementById("project-form")?.offsetTop || 0, behavior: "smooth" });
  };

  const handleDelete = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
      showToast("Project deleted successfully!");
      setTimeout(() => loadData(), 800);
      if (id === projectId) resetForm();
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 2MB = 2 * 1024 * 1024 bytes
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError("Image size exceeds 2MB limit. Please upload a smaller image.");
      setImg("");
      e.target.value = ""; // clear input
      return;
    }

    setUploadError("");
    setUploadingImg(true);
    try {
      const downloadUrl = await uploadProjectImage(file);
      setImg(downloadUrl);
      showToast("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !date || !desc || !img) {
      alert("Please fill in all fields (make sure image URL is set or image is uploaded).");
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
    setTimeout(() => loadData(), 800);
  };

  // Calculate high-level stats
  const totalCount = projectsList.length;
  const featuredCount = projectsList.filter(p => (p as any).featured).length;
  const categoriesCount = {
    Housing: projectsList.filter(p => p.category === "Housing").length,
    Water: projectsList.filter(p => p.category === "Clean Water").length,
    Relief: projectsList.filter(p => p.category === "Disaster Relief").length,
  };

  if (!isLoggedIn) {
    return (
      <div 
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)",
          padding: "20px"
        }}
      >
        <div 
          className={styles.formCard}
          style={{
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            color: "white"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-playfair)", color: "var(--white)" }}>
              Admin Login
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginTop: "4px" }}>
              Friends of Pakistan Humanitarian Portal
            </p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className={styles.inputGroup}>
                <label className={styles.label} style={{ color: "white" }}>Email Address</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="admin@friendsofpakistan.org"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} style={{ color: "white" }}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                  required
                />
              </div>

              {loginError && (
                <div style={{ color: "#f87171", fontSize: "13px", fontWeight: 500, textAlign: "center" }}>
                  ❌ {loginError}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, var(--gold), var(--gold-light))" }}
              >
                Authenticate Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.titleArea}>
        <div>
          <h1 className={styles.dashboardHeading}>Project Dashboard</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
            Add, update, or remove direct-impact humanitarian projects
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-outline" onClick={resetForm}>
            ➕ Add New Project
          </button>
          <button className="btn btn-outline" style={{ borderColor: "#ef4444", color: "#ef4444" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
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
            <div style={{ padding: "20px", borderBottom: "1px solid var(--card-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className={styles.cardTitle} style={{ margin: 0 }}>All Projects</h2>
              <button className="editBtn" onClick={loadData}>🔄 Reload</button>
            </div>
            {loading ? (
              <div style={{ padding: "40px", textAlign: "center" }}>Loading projects from Firestore...</div>
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
                    <label className={styles.label}>Project Image URL</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="e.g., https://picsum.photos/400/260?random=105"
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                    />
                    
                    <div style={{ margin: "16px 0", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <hr style={{ flex: 1, border: "none", borderTop: "1px dashed var(--card-border)" }} />
                      <span>OR UPLOAD IMAGE FILE</span>
                      <hr style={{ flex: 1, border: "none", borderTop: "1px dashed var(--card-border)" }} />
                    </div>

                    <label className={styles.label}>Upload Image File (Max 2MB)</label>
                    <input
                      className={styles.input}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                    />
                    {uploadingImg && (
                      <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 600, marginTop: "4px", display: "block" }}>
                        Uploading to Firebase Storage... ⏳
                      </span>
                    )}
                    {uploadError && (
                      <span style={{ fontSize: "12px", color: "#ef4444", fontWeight: 500, marginTop: "4px", display: "block" }}>
                        ❌ {uploadError}
                      </span>
                    )}
                    {img && (
                      <div style={{ marginTop: "14px" }}>
                        <span style={{ fontSize: "12px", color: "var(--green-mid)", display: "block", marginBottom: "4px" }}>
                          ✓ Image Preview:
                        </span>
                        <img 
                          src={img} 
                          alt="Uploaded Preview" 
                          style={{ width: "100%", maxHeight: "120px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--card-border)" }} 
                        />
                      </div>
                    )}
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
                <button 
                  type="submit" 
                  className="btn btn-green" 
                  style={{ flex: 1 }}
                  disabled={uploadingImg}
                >
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
