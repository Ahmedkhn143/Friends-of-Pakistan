"use client";

import { useState, useEffect } from "react";
import { Project, ProjectCategory } from "@/data/projects";
import { 
  getProjects, saveProject, deleteProject, uploadProjectImage,
  getVideos, saveVideo, deleteVideo, VideoItem,
  getReviews, saveReview, deleteReview, ReviewItem
} from "@/utils/projectDb";
import styles from "./dashboard.module.css";

// Admin Credentials
const ADMIN_EMAIL = "admin@friendsofpakistan.org";
const ADMIN_PASSWORD = "FOP-Admin-Secure-2026!";

type Tab = "projects" | "videos" | "reviews";

export default function DashboardClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [loading, setLoading] = useState(true);

  // Stats
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [videosList, setVideosList] = useState<VideoItem[]>([]);
  const [reviewsList, setReviewList] = useState<ReviewItem[]>([]);

  // ==================== FORM STATES ====================
  // Projects
  const [projId, setProjId] = useState<number | undefined>(undefined);
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState<ProjectCategory>("Housing");
  const [projLocation, setProjLocation] = useState("");
  const [projDate, setProjDate] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projBeneficiaries, setProjBeneficiaries] = useState(0);
  const [projImg, setProjImg] = useState("");
  const [projFeatured, setProjFeatured] = useState(false);
  const [projOrder, setProjOrder] = useState(1);

  // Videos
  const [vidId, setVidId] = useState<number | undefined>(undefined);
  const [vidTitle, setVidTitle] = useState("");
  const [vidDuration, setVidDuration] = useState("5:00");
  const [vidImg, setVidImg] = useState("");
  const [vidUrl, setVidUrl] = useState("");

  // Reviews
  const [revId, setRevId] = useState<number | undefined>(undefined);
  const [revName, setRevName] = useState("");
  const [revStars, setRevStars] = useState("★★★★★");
  const [revQuote, setRevQuote] = useState("");
  const [revAvatar, setRevAvatar] = useState("");
  const [revLoc, setRevLoc] = useState("");

  // Upload state
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const logged = sessionStorage.getItem("fop_admin_logged_in") === "true";
      if (logged) {
        setIsLoggedIn(true);
        loadAllData();
      } else {
        setLoading(false);
      }
    }
    
    // Clear session when leaving the dashboard page (unmounting)
    return () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("fop_admin_logged_in");
      }
    };
  }, []);

  const loadAllData = () => {
    setLoading(true);
    // Trigger callbacks
    const projects = getProjects();
    const videos = getVideos();
    const reviews = getReviews();

    setTimeout(() => {
      setProjectsList(
        [...projects].sort((a, b) => {
          const aFeatured = (a as any).featured ? 1 : 0;
          const bFeatured = (b as any).featured ? 1 : 0;
          if (aFeatured !== bFeatured) return bFeatured - aFeatured;
          return ((a as any).order ?? 0) - ((b as any).order ?? 0);
        })
      );
      setVideosList(videos);
      setReviewList(reviews);
      setLoading(false);
    }, 1200);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput === ADMIN_EMAIL && passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("fop_admin_logged_in", "true");
      setIsLoggedIn(true);
      setLoginError("");
      loadAllData();
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

  const resetAllForms = () => {
    // Projects reset
    setProjId(undefined);
    setProjTitle("");
    setProjCategory("Housing");
    setProjLocation("");
    setProjDate("");
    setProjDesc("");
    setProjBeneficiaries(0);
    setProjImg("");
    setProjFeatured(false);
    setProjOrder(projectsList.length + 1);

    // Videos reset
    setVidId(undefined);
    setVidTitle("");
    setVidDuration("5:00");
    setVidImg("");
    setVidUrl("");

    // Reviews reset
    setRevId(undefined);
    setRevName("");
    setRevStars("★★★★★");
    setRevQuote("");
    setRevAvatar("");
    setRevLoc("");

    setUploadError("");
    setIsEditing(false);
  };

  // ==================== SUBMIT HANDLERS ====================
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projLocation || !projDate || !projDesc || !projImg) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      id: projId,
      title: projTitle,
      category: projCategory,
      location: projLocation,
      date: projDate,
      desc: projDesc,
      beneficiaries: Number(projBeneficiaries),
      img: projImg,
      featured: projFeatured,
      order: Number(projOrder),
    };

    saveProject(payload);
    showToast(isEditing ? "Project updated successfully!" : "Project added successfully!");
    resetAllForms();
    setTimeout(() => loadAllData(), 800);
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidTitle || !vidUrl) {
      alert("Please fill in the Video Title and YouTube Link.");
      return;
    }

    // Convert standard youtube link to embed url if needed
    let finalUrl = vidUrl;
    let ytId = "";
    if (vidUrl.includes("watch?v=")) {
      const vid = vidUrl.split("v=")[1]?.split("&")[0];
      if (vid) {
        finalUrl = `https://www.youtube.com/embed/${vid}`;
        ytId = vid;
      }
    } else if (vidUrl.includes("youtu.be/")) {
      const vid = vidUrl.split("youtu.be/")[1]?.split("?")[0];
      if (vid) {
        finalUrl = `https://www.youtube.com/embed/${vid}`;
        ytId = vid;
      }
    } else if (vidUrl.includes("embed/")) {
      const vid = vidUrl.split("embed/")[1]?.split("?")[0];
      if (vid) {
        ytId = vid;
      }
    }

    const resolvedThumbnail = vidImg || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1469504512102-900f29606341?w=800&q=80");

    const payload = {
      id: vidId,
      title: vidTitle,
      duration: vidDuration || "5:00",
      img: resolvedThumbnail,
      videoUrl: finalUrl
    };

    saveVideo(payload);
    showToast(isEditing ? "Video story updated!" : "Video story added!");
    resetAllForms();
    setTimeout(() => loadAllData(), 800);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName || !revQuote || !revLoc) {
      alert("Please fill in Name, Review Description, and Location details.");
      return;
    }

    const payload = {
      id: revId,
      stars: revStars,
      quote: revQuote,
      avatar: revAvatar || revName.substring(0, 2).toUpperCase(),
      name: revName,
      loc: revLoc
    };

    saveReview(payload);
    showToast(isEditing ? "Review updated!" : "Review added!");
    resetAllForms();
    setTimeout(() => loadAllData(), 800);
  };

  // ==================== EDIT & DELETE HANDLERS ====================
  const handleProjectEdit = (p: Project) => {
    setProjId(p.id);
    setProjTitle(p.title);
    setProjCategory(p.category);
    setProjLocation(p.location);
    setProjDate(p.date);
    setProjDesc(p.desc);
    setProjBeneficiaries(p.beneficiaries);
    setProjImg(p.img);
    setProjFeatured((p as any).featured || false);
    setProjOrder((p as any).order || p.id);
    setIsEditing(true);
    scrollToForm();
  };

  const handleVideoEdit = (v: VideoItem) => {
    setVidId(v.id);
    setVidTitle(v.title);
    setVidDuration(v.duration);
    setVidImg(v.img);
    setVidUrl(v.videoUrl);
    setIsEditing(true);
    scrollToForm();
  };

  const handleReviewEdit = (r: ReviewItem) => {
    setRevId(r.id);
    setRevName(r.name);
    setRevStars(r.stars);
    setRevQuote(r.quote);
    setRevAvatar(r.avatar);
    setRevLoc(r.loc);
    setIsEditing(true);
    scrollToForm();
  };

  const handleProjectDelete = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
      showToast("Project deleted successfully!");
      setTimeout(() => loadAllData(), 800);
      resetAllForms();
    }
  };

  const handleVideoDelete = (videoId: number) => {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteVideo(videoId);
      showToast("Video story deleted successfully!");
      setTimeout(() => loadAllData(), 800);
      resetAllForms();
    }
  };

  const handleReviewDelete = (reviewId: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReview(reviewId);
      showToast("Review deleted successfully!");
      setTimeout(() => loadAllData(), 800);
      resetAllForms();
    }
  };

  const scrollToForm = () => {
    window.scrollTo({ top: document.getElementById("entry-form")?.offsetTop || 0, behavior: "smooth" });
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldSetter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError("Image size exceeds 2MB limit. Please upload a smaller image.");
      fieldSetter("");
      e.target.value = "";
      return;
    }

    setUploadError("");
    setUploadingImg(true);
    try {
      const downloadUrl = await uploadProjectImage(file);
      fieldSetter(downloadUrl);
      showToast("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploadingImg(false);
    }
  };

  if (!mounted) {
    return <div style={{ minHeight: "100vh", background: "var(--cream-dark)" }} />;
  }

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
              Friends of Pakistan Portal CMS
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
          <h1 className={styles.dashboardHeading}>Friends of Pakistan CMS</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
            Select a tab below to manage portal dynamic content
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-outline" style={{ borderColor: "#ef4444", color: "#ef4444" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div style={{ 
        display: "flex", 
        gap: "8px", 
        marginBottom: "32px", 
        borderBottom: "1px solid var(--card-border)", 
        paddingBottom: "12px", 
        overflowX: "auto",
        whiteSpace: "nowrap",
        flexWrap: "nowrap",
        WebkitOverflowScrolling: "touch"
      }}>
        <button 
          onClick={() => { setActiveTab("projects"); resetAllForms(); }}
          style={{
            padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "14px", fontWeight: 600,
            background: activeTab === "projects" ? "var(--green-dark)" : "none",
            color: activeTab === "projects" ? "white" : "var(--text-muted)",
            flexShrink: 0
          }}
        >
          📂 Manage Projects ({projectsList.length})
        </button>
        <button 
          onClick={() => { setActiveTab("videos"); resetAllForms(); }}
          style={{
            padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "14px", fontWeight: 600,
            background: activeTab === "videos" ? "var(--green-dark)" : "none",
            color: activeTab === "videos" ? "white" : "var(--text-muted)",
            flexShrink: 0
          }}
        >
          🎬 Video Stories ({videosList.length})
        </button>
        <button 
          onClick={() => { setActiveTab("reviews"); resetAllForms(); }}
          style={{
            padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "14px", fontWeight: 600,
            background: activeTab === "reviews" ? "var(--green-dark)" : "none",
            color: activeTab === "reviews" ? "white" : "var(--text-muted)",
            flexShrink: 0
          }}
        >
          ⭐ Donor Reviews ({reviewsList.length})
        </button>
      </div>

      <div className={styles.mainLayout}>
        {/* Left Column: List/Table depending on active tab */}
        <div>
          <div className={styles.tableContainer}>
            <div style={{ padding: "20px", borderBottom: "1px solid var(--card-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className={styles.cardTitle} style={{ margin: 0 }}>
                {activeTab === "projects" && "Current Projects"}
                {activeTab === "videos" && "Video Stories"}
                {activeTab === "reviews" && "Donor Testimonials"}
              </h2>
              <button className="editBtn" onClick={loadAllData}>🔄 Reload</button>
            </div>

            {loading ? (
              <div style={{ padding: "40px", textAlign: "center" }}>Loading items from Firestore...</div>
            ) : (
              <>
                {/* 1. PROJECTS TAB TABLE */}
                {activeTab === "projects" && (
                  projectsList.length === 0 ? (
                    <div className={styles.emptyState}>No projects added yet.</div>
                  ) : (
                    <table className={styles.projectTable}>
                      <thead>
                        <tr>
                          <th>Title & Location</th>
                          <th>Category</th>
                          <th>Featured</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsList.map((p) => (
                          <tr key={p.id} className={styles.projectRow}>
                            <td>
                              <div className={styles.projectTitleCell}>{p.title}</div>
                              <div style={{ fontSize: "12px" }}>📍 {p.location}</div>
                            </td>
                            <td><span className={`${styles.badge} ${styles.regularBadge}`}>{p.category}</span></td>
                            <td>{(p as any).featured ? "⭐ Yes" : "No"}</td>
                            <td>
                              <div className={styles.actionsCell}>
                                <button className={styles.editBtn} onClick={() => handleProjectEdit(p)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => handleProjectDelete(p.id)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}

                {/* 2. VIDEOS TAB TABLE */}
                {activeTab === "videos" && (
                  videosList.length === 0 ? (
                    <div className={styles.emptyState}>No video stories added yet.</div>
                  ) : (
                    <table className={styles.projectTable}>
                      <thead>
                        <tr>
                          <th>Video Title</th>
                          <th>Duration</th>
                          <th>Thumbnail Preview</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videosList.map((v) => (
                          <tr key={v.id} className={styles.projectRow}>
                            <td>
                              <div className={styles.projectTitleCell}>{v.title}</div>
                              <div style={{ fontSize: "11px", color: "var(--text-muted)", wordBreak: "break-all" }}>
                                🔗 {v.videoUrl}
                              </div>
                            </td>
                            <td>{v.duration}</td>
                            <td>
                              <img src={v.img} alt="Thumb" style={{ width: "80px", height: "45px", objectFit: "cover", borderRadius: "6px" }} />
                            </td>
                            <td>
                              <div className={styles.actionsCell}>
                                <button className={styles.editBtn} onClick={() => handleVideoEdit(v)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => handleVideoDelete(v.id)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}

                {/* 3. REVIEWS TAB TABLE */}
                {activeTab === "reviews" && (
                  reviewsList.length === 0 ? (
                    <div className={styles.emptyState}>No reviews added yet.</div>
                  ) : (
                    <table className={styles.projectTable}>
                      <thead>
                        <tr>
                          <th>Donor Name & Loc</th>
                          <th>Stars</th>
                          <th>Quote / Message</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviewsList.map((r) => (
                          <tr key={r.id} className={styles.projectRow}>
                            <td>
                              <div className={styles.projectTitleCell}>{r.name}</div>
                              <div style={{ fontSize: "12px" }}>{r.loc}</div>
                            </td>
                            <td style={{ color: "var(--gold)" }}>{r.stars}</td>
                            <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {r.quote}
                            </td>
                            <td>
                              <div className={styles.actionsCell}>
                                <button className={styles.editBtn} onClick={() => handleReviewEdit(r)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => handleReviewDelete(r.id)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Column: Add/Edit Form depending on active tab */}
        <div id="entry-form">
          <div className={styles.formCard}>
            {/* 1. PROJECTS TAB FORM */}
            {activeTab === "projects" && (
              <>
                <h2 className={styles.cardTitle}>
                  {isEditing ? "📝 Edit Project Details" : "➕ Add Humanitarian Project"}
                </h2>
                <form onSubmit={handleProjectSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.formFullWidth}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Project Title *</label>
                        <input className={styles.input} type="text" placeholder="e.g. Solar Tube Well" value={projTitle} onChange={(e) => setProjTitle(e.target.value)} required />
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Category *</label>
                      <select className={styles.select} value={projCategory} onChange={(e) => setProjCategory(e.target.value as ProjectCategory)}>
                        <option value="Housing">Housing</option>
                        <option value="Clean Water">Clean Water</option>
                        <option value="Disaster Relief">Disaster Relief</option>
                        <option value="Education">Education</option>
                        <option value="Food Aid">Food Aid</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Location *</label>
                      <input className={styles.input} type="text" placeholder="e.g. Dadu, Sindh" value={projLocation} onChange={(e) => setProjLocation(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Date *</label>
                      <input className={styles.input} type="text" placeholder="e.g. Aug 2022" value={projDate} onChange={(e) => setProjDate(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Beneficiaries help count</label>
                      <input className={styles.input} type="number" value={projBeneficiaries} onChange={(e) => setProjBeneficiaries(Number(e.target.value))} />
                    </div>
                    <div className={styles.formFullWidth}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Project Image URL</label>
                        <input className={styles.input} type="text" placeholder="e.g. https://..." value={projImg} onChange={(e) => setProjImg(e.target.value)} />
                        
                        <div style={{ margin: "16px 0", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <hr style={{ flex: 1, border: "none", borderTop: "1px dashed var(--card-border)" }} />
                          <span>OR UPLOAD IMAGE FILE</span>
                          <hr style={{ flex: 1, border: "none", borderTop: "1px dashed var(--card-border)" }} />
                        </div>
                        
                        <label className={styles.label}>Upload Image File (Max 2MB)</label>
                        <input className={styles.input} type="file" accept="image/*" onChange={(e) => handleImageFileChange(e, setProjImg)} />
                        {uploadingImg && <span style={{ fontSize: "12px", color: "var(--gold)" }}>Uploading... ⏳</span>}
                        {uploadError && <span style={{ fontSize: "12px", color: "#ef4444" }}>❌ {uploadError}</span>}
                        {projImg && <img src={projImg} alt="Preview" style={{ width: "100%", maxHeight: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />}
                      </div>
                    </div>
                    <div className={styles.formFullWidth}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Description *</label>
                        <textarea className={styles.textarea} placeholder="Describe the project..." value={projDesc} onChange={(e) => setProjDesc(e.target.value)} required />
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Display Order</label>
                      <input className={styles.input} type="number" value={projOrder} onChange={(e) => setProjOrder(Number(e.target.value))} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label className={styles.checkboxLabel}>
                        <input type="checkbox" className={styles.checkbox} checked={projFeatured} onChange={(e) => setProjFeatured(e.target.checked)} />
                        Featured / Show First
                      </label>
                    </div>
                  </div>
                  <div className={styles.buttonGroup}>
                    <button type="submit" className="btn btn-green" style={{ flex: 1 }} disabled={uploadingImg}>
                      {isEditing ? "Save Changes" : "Create Project"}
                    </button>
                    {isEditing && <button type="button" className="btn btn-outline" onClick={resetAllForms}>Cancel</button>}
                  </div>
                </form>
              </>
            )}

            {/* 2. VIDEOS TAB FORM */}
            {activeTab === "videos" && (
              <>
                <h2 className={styles.cardTitle}>
                  {isEditing ? "📝 Edit Video Story" : "🎬 Add Video Story"}
                </h2>
                <form onSubmit={handleVideoSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.formFullWidth}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Video Title *</label>
                        <input className={styles.input} type="text" placeholder="e.g. Clean Water for Tharparkar" value={vidTitle} onChange={(e) => setVidTitle(e.target.value)} required />
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>YouTube Video Link *</label>
                      <input className={styles.input} type="text" placeholder="e.g. https://www.youtube.com/watch?v=..." value={vidUrl} onChange={(e) => setVidUrl(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Duration</label>
                      <input className={styles.input} type="text" placeholder="e.g. 4:32" value={vidDuration} onChange={(e) => setVidDuration(e.target.value)} />
                    </div>
                    <div className={styles.formFullWidth}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Thumbnail Image URL</label>
                        <input className={styles.input} type="text" placeholder="e.g. https://..." value={vidImg} onChange={(e) => setVidImg(e.target.value)} />
                        
                        <div style={{ margin: "16px 0", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <hr style={{ flex: 1, border: "none", borderTop: "1px dashed var(--card-border)" }} />
                          <span>OR UPLOAD THUMBNAIL FILE</span>
                          <hr style={{ flex: 1, border: "none", borderTop: "1px dashed var(--card-border)" }} />
                        </div>
                        
                        <label className={styles.label}>Upload Thumbnail File (Max 2MB)</label>
                        <input className={styles.input} type="file" accept="image/*" onChange={(e) => handleImageFileChange(e, setVidImg)} />
                        {uploadingImg && <span style={{ fontSize: "12px", color: "var(--gold)" }}>Uploading... ⏳</span>}
                        {uploadError && <span style={{ fontSize: "12px", color: "#ef4444" }}>❌ {uploadError}</span>}
                        {vidImg && <img src={vidImg} alt="Preview" style={{ width: "100%", maxHeight: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />}
                      </div>
                    </div>
                  </div>
                  <div className={styles.buttonGroup}>
                    <button type="submit" className="btn btn-green" style={{ flex: 1 }} disabled={uploadingImg}>
                      {isEditing ? "Save Video Details" : "Publish Video Story"}
                    </button>
                    {isEditing && <button type="button" className="btn btn-outline" onClick={resetAllForms}>Cancel</button>}
                  </div>
                </form>
              </>
            )}

            {/* 3. REVIEWS TAB FORM */}
            {activeTab === "reviews" && (
              <>
                <h2 className={styles.cardTitle}>
                  {isEditing ? "📝 Edit Review Details" : "⭐ Add Donor Testimonial"}
                </h2>
                <form onSubmit={handleReviewSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Donor Name *</label>
                      <input className={styles.input} type="text" placeholder="e.g. Ahmed Khan" value={revName} onChange={(e) => setRevName(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Stars *</label>
                      <select className={styles.select} value={revStars} onChange={(e) => setRevStars(e.target.value)}>
                        <option value="★★★★★">★★★★★ (5 Stars)</option>
                        <option value="★★★★☆">★★★★☆ (4 Stars)</option>
                        <option value="★★★☆☆">★★★☆☆ (3 Stars)</option>
                        <option value="★★☆☆☆">★★☆☆☆ (2 Stars)</option>
                        <option value="★☆☆☆☆">★☆☆☆☆ (1 Star)</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Avatar Initials</label>
                      <input className={styles.input} type="text" placeholder="e.g. AK (Defaults to name initials)" value={revAvatar} onChange={(e) => setRevAvatar(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Location / Date Details *</label>
                      <input className={styles.input} type="text" placeholder="e.g. Donor since 2022 · Lahore" value={revLoc} onChange={(e) => setRevLoc(e.target.value)} required />
                    </div>
                    <div className={styles.formFullWidth}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Review Quote / Message *</label>
                        <textarea className={styles.textarea} placeholder="Write the donor's description here..." value={revQuote} onChange={(e) => setRevQuote(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className={styles.buttonGroup}>
                    <button type="submit" className="btn btn-green" style={{ flex: 1 }}>
                      {isEditing ? "Save Review Details" : "Publish Testimonial"}
                    </button>
                    {isEditing && <button type="button" className="btn btn-outline" onClick={resetAllForms}>Cancel</button>}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {toastMessage && <div className={styles.toast}>✨ {toastMessage}</div>}
    </div>
  );
}
