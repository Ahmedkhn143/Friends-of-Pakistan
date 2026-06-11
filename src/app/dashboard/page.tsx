"use client";

import { useState, useEffect } from "react";
import { Project, ProjectCategory } from "@/data/projects";
import { getProjects, saveProject, deleteProject } from "@/utils/projectDb";
import styles from "./dashboard.module.css";

// Admin Credentials
const ADMIN_EMAIL = "admin@friendsofpakistan.org";
const ADMIN_PASSWORD = "FOP-Admin-Secure-2026!";

// 20 High-Quality Demo Projects Data
const demoProjectsList: Omit<Project, "id">[] = [
  { title: "Flood Relief — Dadu District", category: "Disaster Relief", location: "Dadu, Sindh", date: "Aug 2022", desc: "Emergency food packages and shelter kits distributed to 200 flood-affected families within 48 hours.", beneficiaries: 200, img: "https://picsum.photos/400/260?random=101" },
  { title: "Hand Pump Installation — Dera Ghazi Khan", category: "Clean Water", location: "Dera Ghazi Khan, Punjab", date: "Mar 2023", desc: "5 hand pumps installed in remote villages, providing clean drinking water to over 600 people.", beneficiaries: 600, img: "https://picsum.photos/400/260?random=102" },
  { title: "Flood Housing — Larkana", category: "Housing", location: "Larkana, Sindh", date: "Oct 2022", desc: "30 permanent homes constructed for families who lost everything in the 2022 super floods.", beneficiaries: 150, img: "https://picsum.photos/400/260?random=103" },
  { title: "Winter Food Drive — Quetta", category: "Food Aid", location: "Quetta, Balochistan", date: "Dec 2023", desc: "2,000 monthly ration packs distributed to destitute families during the harsh Balochistan winter.", beneficiaries: 2000, img: "https://picsum.photos/400/260?random=104" },
  { title: "Solar Tube Well — Thar Desert", category: "Clean Water", location: "Tharparkar, Sindh", date: "May 2023", desc: "Solar-powered tube well installed providing year-round water supply to an entire desert village.", beneficiaries: 350, img: "https://picsum.photos/400/260?random=105" },
  { title: "Earthquake Relief — Swat Valley", category: "Disaster Relief", location: "Swat, KPK", date: "Oct 2023", desc: "Emergency relief kits, blankets, and medical supplies delivered to earthquake-affected families.", beneficiaries: 500, img: "https://picsum.photos/400/260?random=106" },
  { title: "Prefab Homes — Rajanpur", category: "Housing", location: "Rajanpur, Punjab", date: "Jan 2024", desc: "50 prefabricated flood-resistant homes built for displaced families in Southern Punjab.", beneficiaries: 250, img: "https://picsum.photos/400/260?random=107" },
  { title: "School Roof Restoration — Mirpurkhas", category: "Education", location: "Mirpurkhas, Sindh", date: "Feb 2024", desc: "Restored roofs and classrooms for 3 flood-damaged government schools serving 800 students.", beneficiaries: 800, img: "https://picsum.photos/400/260?random=108" },
  { title: "Water Filtration Plant — Rahim Yar Khan", category: "Clean Water", location: "Rahim Yar Khan, Punjab", date: "Jun 2023", desc: "Community water filtration unit installed, eliminating waterborne diseases in a village of 400 people.", beneficiaries: 400, img: "https://picsum.photos/400/260?random=109" },
  { title: "Cyclone Relief — Gwadar", category: "Disaster Relief", location: "Gwadar, Balochistan", date: "Nov 2023", desc: "Immediate relief for 150 fishing families hit by Cyclone Dana — nets, food, and temporary shelter.", beneficiaries: 750, img: "https://picsum.photos/400/260?random=110" },
  { title: "Brick Homes — Jacobabad", category: "Housing", location: "Jacobabad, Sindh", date: "Apr 2024", desc: "25 permanent brick homes with proper roofing built for chronically poor families in rural Jacobabad.", beneficiaries: 125, img: "https://picsum.photos/400/260?random=111" },
  { title: "Ramadan Food Packages — Nationwide", category: "Food Aid", location: "Multiple Districts", date: "Mar 2024", desc: "5,000 Ramadan food packages distributed across 8 districts during the holy month.", beneficiaries: 5000, img: "https://picsum.photos/400/260?random=112" },
  { title: "Tent City Setup — Lal Suhanra", category: "Disaster Relief", location: "Bahawalpur, Punjab", date: "Sep 2022", desc: "600 tents erected for flood-displaced families awaiting permanent housing.", beneficiaries: 3000, img: "https://picsum.photos/400/260?random=131" },
  { title: "Village Hand Pump — Lodhran", category: "Clean Water", location: "Lodhran, Punjab", date: "Jul 2023", desc: "Hand pump serving 300 villagers previously walking 2km daily for water.", beneficiaries: 300, img: "https://picsum.photos/400/260?random=132" },
  { title: "Transitional Shelter — Nowshera", category: "Housing", location: "Nowshera, KPK", date: "Nov 2022", desc: "Transitional shelters for 40 families in KPK while permanent housing was being constructed.", beneficiaries: 200, img: "https://picsum.photos/400/260?random=133" },
  { title: "Eid Food Packages — Karachi", category: "Food Aid", location: "Karachi, Sindh", date: "Apr 2023", desc: "1,500 Eid hampers distributed to deserving families in Karachi's katchi abadis.", beneficiaries: 1500, img: "https://picsum.photos/400/260?random=134" },
  { title: "Borehole Drilling — Khuzdar", category: "Clean Water", location: "Khuzdar, Balochistan", date: "Aug 2023", desc: "Deep borehole drilled providing clean water to a community that had none for 3 years.", beneficiaries: 450, img: "https://picsum.photos/400/260?random=135" },
  { title: "Emergency Shelter Kits — Zhob", category: "Disaster Relief", location: "Zhob, Balochistan", date: "Jan 2024", desc: "Emergency tarpaulins, ropes, and blankets for 100 families displaced by flash floods.", beneficiaries: 500, img: "https://picsum.photos/400/260?random=136" },
  { title: "Mobile Medical Unit — Chaman", category: "Disaster Relief", location: "Chaman, Balochistan", date: "Mar 2024", desc: "Equipped medical van providing free checkups and medicines to 1,200 border community residents.", beneficiaries: 1200, img: "https://picsum.photos/400/260?random=137" },
  { title: "Skills Center Setup — Multan", category: "Education", location: "Multan, Punjab", date: "Jun 2023", desc: "Vocational skills training center equipped with sewing machines for 50 widowed women.", beneficiaries: 100, img: "https://picsum.photos/400/260?random=138" }
];

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

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
    }, 1000); // Small timeout to ensure data is fetched from firestore callback
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
    setTimeout(() => loadData(), 800);
  };

  const handleSeedProjects = async () => {
    if (confirm("This will seed 20 realistic demo projects into your Firestore. Proceed?")) {
      setSeeding(true);
      try {
        for (let i = 0; i < demoProjectsList.length; i++) {
          const project = demoProjectsList[i];
          await saveProject({
            ...project,
            featured: i < 6, // mark first 6 as featured
            order: i + 1
          });
        }
        showToast("Successfully seeded 20 projects!");
        setTimeout(() => {
          loadData();
          setSeeding(false);
        }, 1000);
      } catch (e) {
        console.error("Seeding error:", e);
        setSeeding(false);
        alert("Failed to seed projects.");
      }
    }
  };

  // If user is not logged in, show Pine Green / Gold Login panel
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
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            className="btn btn-outline" 
            onClick={handleSeedProjects} 
            disabled={seeding}
            style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            {seeding ? "⏳ Seeding..." : "🌱 Seed 20 Demo Projects"}
          </button>
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
                <p>Click "Seed 20 Demo Projects" to populate your dashboard.</p>
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
