"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import StatsStrip from "@/components/StatsStrip";
import MissionCard from "@/components/MissionCard";
import CauseCard from "@/components/CauseCard";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Project } from "@/data/projects";
import { getProjects, fetchProjectsFromFirebase, getReviews, fetchReviewsFromFirebase, ReviewItem } from "@/utils/projectDb";

function HeroCauseCard() {
  const [activeCause, setActiveCause] = useState("housing");
  const [donationAmount, setDonationAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const finalAmount = donationAmount === "custom" ? customAmount : donationAmount;
    if (!finalAmount || isNaN(Number(finalAmount)) || Number(finalAmount) <= 0) {
      alert("Please select or enter a valid donation amount.");
      return;
    }
    alert(`Thank you for your generosity! Initiating donation of $${finalAmount} for ${activeCause === 'housing' ? 'Safe Housing' : activeCause === 'water' ? 'Clean Water' : 'Disaster Relief'}...`);
  };

  return (
    <div className="new-hero-card" aria-label="Choose a cause">
      <div className="new-cause-card">
        <p className="new-cause-card-title">Choose a cause</p>

        <div 
          className={`new-cause-item ${activeCause === "housing" ? "active" : ""}`}
          onClick={() => setActiveCause("housing")}
          role="button"
          tabIndex={0}
          aria-pressed={activeCause === "housing"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveCause("housing");
            }
          }}
        >
          <div className="new-cause-icon housing" aria-hidden="true">🏠</div>
          <div className="new-cause-info">
            <div className="new-cause-name">Safe Housing</div>
            <div className="new-cause-sub">430+ homes built</div>
          </div>
          <span className="new-cause-arrow" aria-hidden="true">&#8250;</span>
        </div>

        <div 
          className={`new-cause-item ${activeCause === "water" ? "active" : ""}`}
          onClick={() => setActiveCause("water")}
          role="button"
          tabIndex={0}
          aria-pressed={activeCause === "water"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveCause("water");
            }
          }}
        >
          <div className="new-cause-icon water" aria-hidden="true">💧</div>
          <div className="new-cause-info">
            <div className="new-cause-name">Clean Water</div>
            <div className="new-cause-sub">200+ wells installed</div>
          </div>
          <span className="new-cause-arrow" aria-hidden="true">&#8250;</span>
        </div>

        <div 
          className={`new-cause-item ${activeCause === "relief" ? "active" : ""}`}
          onClick={() => setActiveCause("relief")}
          role="button"
          tabIndex={0}
          aria-pressed={activeCause === "relief"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveCause("relief");
            }
          }}
        >
          <div className="new-cause-icon relief" aria-hidden="true">📦</div>
          <div className="new-cause-info">
            <div className="new-cause-name">Disaster Relief</div>
            <div className="new-cause-sub">380+ operations</div>
          </div>
          <span className="new-cause-arrow" aria-hidden="true">&#8250;</span>
        </div>

        {/* Dynamic Donation Amounts Panel */}
        <div style={{ marginTop: "14px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px" }}>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", fontWeight: "600" }}>Select Amount (USD)</p>
          <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
            {["25", "50", "100", "custom"].map((amt) => (
              <button
                key={amt}
                onClick={() => setDonationAmount(amt)}
                style={{
                  flex: 1,
                  background: donationAmount === amt ? "#1a7a4a" : "rgba(255,255,255,0.06)",
                  border: donationAmount === amt ? "1px solid #4ade80" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "5px",
                  padding: "6px 0",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {amt === "custom" ? "Custom" : `$${amt}`}
              </button>
            ))}
          </div>

          {donationAmount === "custom" && (
            <input
              type="number"
              placeholder="Enter Amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "5px",
                padding: "8px",
                color: "#fff",
                fontSize: "12px",
                marginBottom: "8px",
                outline: "none"
              }}
            />
          )}
        </div>

        <button 
          className="new-cause-donate-btn"
          onClick={handleDonate}
        >
          Start Donation &rarr;
        </button>
      </div>
    </div>
  );
}

function AnimatedCounter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.toString().replace(/,/g, ""), 10);
    if (isNaN(end)) return;
    
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = Math.max(Math.ceil(end / steps), 1);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

function TickerSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="new-ticker" role="marquee" aria-label="Impact highlights" aria-live="off">
      <div 
        className={`new-ticker-inner ${isPaused ? "paused" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Original set */}
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">430+ Homes Built in Pakistan</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">200+ Clean Water Wells Installed</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">380+ Disaster Relief Operations</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">33+ Districts Served Across Pakistan</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">100% Donation Efficiency — Admin costs raised separately</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">48-hour Emergency Mobilization</span></span>
        {/* Duplicate set for seamless loop */}
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">430+ Homes Built in Pakistan</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">200+ Clean Water Wells Installed</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">380+ Disaster Relief Operations</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">33+ Districts Served Across Pakistan</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">100% Donation Efficiency — Admin costs raised separately</span></span>
        <span className="new-ticker-item"><span className="new-ticker-dot"></span><span className="new-ticker-text">48-hour Emergency Mobilization</span></span>
      </div>
    </div>
  );
}


export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    if (reviewsList.length > 3) {
      const interval = setInterval(() => {
        setSliderIndex((prev) => (prev + 1) % reviewsList.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviewsList.length]);

  useEffect(() => {
    // 1. Handle projects dynamic load
    const loadProjects = (list: Project[]) => {
      const sorted = [...list].sort((a, b) => {
        const aFeatured = (a as any).featured ? 1 : 0;
        const bFeatured = (b as any).featured ? 1 : 0;
        if (aFeatured !== bFeatured) return bFeatured - aFeatured;
        return ((a as any).order ?? 0) - ((b as any).order ?? 0);
      });
      setFeaturedProjects(sorted.slice(0, 6));
    };

    loadProjects(getProjects());
    fetchProjectsFromFirebase().then((fresh) => {
      if (fresh && fresh.length > 0) {
        loadProjects(fresh);
      }
    });

    // 2. Handle reviews dynamic load
    setReviewsList(getReviews());
    fetchReviewsFromFirebase().then((freshReviews) => {
      if (freshReviews && freshReviews.length > 0) {
        setReviewsList(freshReviews);
      }
    });
  }, []);

  return (
    <>
      {/* ═══════════════════════════
           1. ANNOUNCEMENT BAR
      ════════════════════════════ */}
      <div 
        style={{
          width: "100%",
          background: "#1a7a4a",
          color: "#fff",
          textAlign: "center",
          padding: "7px 1rem",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.1px",
          position: "relative",
          zIndex: 101,
        }}
        role="banner" 
        aria-label="Site announcement"
      >
        2024 Flood Relief Active&nbsp;&nbsp;|&nbsp;&nbsp;We are on the ground in Sindh &amp; Balochistan&nbsp;&nbsp;|&nbsp;&nbsp;
        <a 
          href="#donate" 
          onClick={(e) => {
            e.preventDefault();
            alert("Thank you for your generosity!\nRedirecting to the donation page...");
          }}
          style={{
            color: "#fff",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Donate Now &rarr;
        </a>
      </div>

      {/* Custom Styles for New Hero & Ticker & Trust Bar */}
      <style jsx global>{`
        /* pulse badge keyframes */
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(1.6); opacity: 0.4; }
        }

        /* ticker scroll animation */
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .new-hero {
          min-height: 520px;
          background: linear-gradient(to right, rgba(10, 31, 20, 0.94) 30%, rgba(10, 31, 20, 0.8) 70%, rgba(10, 31, 20, 0.94) 100%), 
                      url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 40px 0;
        }

        .new-hero-stripe {
          position: absolute;
          left: 0;
          top: 0;
          width: 5px;
          height: 100%;
          background: #1a7a4a;
          z-index: 1;
        }

        .new-hero-pattern {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            #fff 0,
            #fff 1px,
            transparent 1px,
            transparent 60px
          );
          opacity: 0.07;
          z-index: 0;
          pointer-events: none;
        }

        .new-hero-orb-1 {
          position: absolute;
          top: -100px;
          right: -50px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,122,74,0.35) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .new-hero-orb-2 {
          position: absolute;
          bottom: -80px;
          left: 30%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,122,74,0.2) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .new-hero-content {
          position: relative;
          z-index: 2;
          padding: 3.5rem 2.5rem;
          max-width: 58%;
        }

        .new-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(26,122,74,0.25);
          border: 0.5px solid rgba(26,122,74,0.6);
          border-radius: 20px;
          padding: 5px 14px;
          margin-bottom: 1.25rem;
        }

        .new-hero-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          position: relative;
          flex-shrink: 0;
        }

        .new-hero-pill-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 2s ease-out infinite;
        }

        .new-hero-pill-text {
          font-size: 12px;
          font-weight: 600;
          color: #7de0a8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .new-hero-urdu {
          display: block;
          direction: rtl;
          font-size: 28px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          margin-bottom: 4px;
          line-height: 1.3;
          font-family: inherit;
        }

        .new-hero-h1 {
          font-size: 38px;
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 1.25rem;
          font-family: var(--font-playfair), serif;
        }

        .new-hero-h1 .highlight {
          color: #4ade80;
        }

        .new-hero-para {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 2rem;
        }

        .new-hero-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .new-btn-primary {
          background: #1a7a4a;
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .new-btn-primary:hover {
          background: #22a060;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26,122,74,0.4);
        }

        .new-btn-outline {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 7px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }

        .new-btn-outline:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }

        .new-hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .new-stat-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .new-stat-number {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }

        .new-stat-number .new-stat-plus {
          color: #4ade80;
        }

        .new-stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          font-weight: 500;
        }

        .new-stat-divider {
          width: 0.5px;
          height: 40px;
          background: rgba(255,255,255,0.15);
          align-self: center;
          flex-shrink: 0;
        }

         .new-hero-card {
          position: relative;
          z-index: 3;
          width: 240px;
        }

        .new-cause-card {
          background: rgba(255,255,255,0.07);
          border: 0.5px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 1.25rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .new-cause-card-title {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .new-cause-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 8px;
          margin-bottom: 6px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          border: 0.5px solid transparent;
        }

        .new-cause-item.active {
          background: rgba(26,122,74,0.35);
          border-color: rgba(26,122,74,0.5);
        }

        .new-cause-item:not(.active):hover {
          background: rgba(255,255,255,0.06);
        }

        .new-cause-icon {
          width: 32px;
          height: 32px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        .new-cause-icon.housing { background: rgba(26,122,74,0.4);  }
        .new-cause-icon.water   { background: rgba(37,99,235,0.3);  }
        .new-cause-icon.relief  { background: rgba(234,88,12,0.3);  }

        .new-cause-info {
          flex: 1;
          min-width: 0;
        }

        .new-cause-name {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 2px;
        }

        .new-cause-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          line-height: 1;
        }

        .new-cause-arrow {
          color: rgba(255,255,255,0.4);
          font-size: 16px;
          font-weight: 300;
          flex-shrink: 0;
        }

        .new-cause-donate-btn {
          margin-top: 12px;
          width: 100%;
          background: #1a7a4a;
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .new-cause-donate-btn:hover {
          background: #22a060;
          transform: translateY(-1px);
        }

        /* Ticker */
        .new-ticker {
          background: #1a7a4a;
          padding: 8px 0;
          overflow: hidden;
        }

        .new-ticker-inner {
          display: flex;
          gap: 2rem;
          white-space: nowrap;
          animation: ticker-scroll 18s linear infinite;
        }

        .new-ticker-inner.paused {
          animation-play-state: paused;
        }

        .new-ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .new-ticker-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          flex-shrink: 0;
        }

        .new-ticker-text {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
        }

        /* Trust Bar */
        .new-trust-bar {
          background: #0f1f15;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          padding: 14px 2.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .new-trust-label {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .new-trust-items {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .new-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .new-trust-check {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(74,222,128,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .new-trust-check-mark {
          font-size: 8px;
          color: #4ade80;
          font-weight: 700;
          line-height: 1;
        }

        .new-trust-item-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }

        /* Responsive overrides */
        @media (max-width: 768px) {
          .new-hero-card { display: none; }
          .new-hero-content {
            max-width: 100%;
            padding: 2rem 1.5rem;
          }
          .new-hero-h1 { font-size: 28px; }
          .new-hero-urdu { font-size: 20px; }
          .new-hero-stats {
            flex-wrap: wrap;
            gap: 1rem;
          }
          .new-stat-divider { display: none; }
          .new-trust-bar { padding: 14px 1.25rem; gap: 1rem; }
          .new-trust-items { gap: 1rem; }
        }

        @media (max-width: 480px) {
          .new-hero-cta-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .new-btn-primary,
          .new-btn-outline {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* ═══════════════════════════
           3. NEW HERO SECTION
      ════════════════════════════ */}
      <section className="new-hero" aria-label="Hero — Rebuilding Lives">
        <div className="new-hero-pattern" aria-hidden="true"></div>
        <div className="new-hero-orb-1" aria-hidden="true"></div>
        <div className="new-hero-orb-2" aria-hidden="true"></div>

        <div className="container" style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
          {/* 3a. LEFT CONTENT */}
          <div className="new-hero-content" style={{ padding: "3.5rem 0", maxWidth: "58%" }}>
            <div className="new-hero-pill" role="note">
              <span className="new-hero-pill-dot" aria-hidden="true"></span>
              <span className="new-hero-pill-text">Pakistan's Trusted Humanitarian Foundation</span>
            </div>

            <span className="new-hero-urdu" lang="ur">
              انسانیت کی خدمت — ہمارا مشن
            </span>

            <h1 className="new-hero-h1">
              Rebuilding Lives, Restoring <span className="highlight">Dignity.</span>
            </h1>

            <p className="new-hero-para">
              From flood-stricken villages in Sindh to drought-hit communities in Balochistan — 
              Friends of Pakistan delivers housing, clean water, and emergency relief directly to 
              those who need it most. No bureaucracy. 100% impact.
            </p>

            <div className="new-hero-cta-row">
              <button 
                className="new-btn-primary" 
                onClick={() => alert("Thank you for your generosity!\nRedirecting to the donation page...")}
              >
                Donate Today &rarr;
              </button>
              <Link href="/projects" className="new-btn-outline">
                View Our Projects
              </Link>
            </div>

            <div className="new-hero-stats" role="list" aria-label="Impact statistics">
              <div className="new-stat-item" role="listitem">
                <span className="new-stat-number"><AnimatedCounter target="1000" /><span className="new-stat-plus">+</span></span>
                <span className="new-stat-label">Projects Completed</span>
              </div>
              <div className="new-stat-divider" aria-hidden="true"></div>
              <div className="new-stat-item" role="listitem">
                <span className="new-stat-number"><AnimatedCounter target="50000" /><span className="new-stat-plus">+</span></span>
                <span className="new-stat-label">Lives Impacted</span>
              </div>
              <div className="new-stat-divider" aria-hidden="true"></div>
              <div className="new-stat-item" role="listitem">
                <span className="new-stat-number"><AnimatedCounter target="200" /><span className="new-stat-plus">+</span></span>
                <span className="new-stat-label">Clean Water Wells</span>
              </div>
              <div className="new-stat-divider" aria-hidden="true"></div>
              <div className="new-stat-item" role="listitem">
                <span className="new-stat-number"><AnimatedCounter target="15" /><span className="new-stat-plus">+</span></span>
                <span className="new-stat-label">Districts Served</span>
              </div>
            </div>
          </div>

          {/* 3b. RIGHT CARD (INTERACTIVE) */}
          <div style={{ position: "relative", zIndex: 3, paddingLeft: "20px" }}>
            <HeroCauseCard />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
           4. SCROLLING TICKER
      ════════════════════════════ */}
      <TickerSection />

      {/* ═══════════════════════════
           5. TRUST BAR
      ════════════════════════════ */}
      <div className="new-trust-bar" role="complementary" aria-label="Trust indicators">
        <span className="new-trust-label">Trusted By</span>
        <div className="new-trust-items">
          <div className="new-trust-item">
            <div className="new-trust-check" aria-hidden="true">
              <span className="new-trust-check-mark">&#10003;</span>
            </div>
            <span className="new-trust-item-label">Verified Donors Worldwide</span>
          </div>

          <div className="new-trust-item">
            <div className="new-trust-check" aria-hidden="true">
              <span className="new-trust-check-mark">&#10003;</span>
            </div>
            <span className="new-trust-item-label">100% Transparent Accounts</span>
          </div>

          <div className="new-trust-item">
            <div className="new-trust-check" aria-hidden="true">
              <span className="new-trust-check-mark">&#10003;</span>
            </div>
            <span className="new-trust-item-label">Direct Field Operations</span>
          </div>

          <div className="new-trust-item">
            <div className="new-trust-check" aria-hidden="true">
              <span className="new-trust-check-mark">&#10003;</span>
            </div>
            <span className="new-trust-item-label">Serving Since 2021</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ background: "transparent", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container">
          <SectionHeading 
            tag="Our Core Mission" 
            title="Building a Ground-up Impact Network"
            subtitle="No bureaucracy. No delays. Just direct action and extreme financial accountability."
            align="center"
          />
          <div className="bento-grid">
            <div className="bento-main">
              <MissionCard 
                icon="🎯"
                title="Our Mission"
                text="To serve the most vulnerable communities in Pakistan with dignity, providing essential housing, clean water, and emergency relief to those who need it most."
              />
            </div>
            <div className="bento-secondary">
              <MissionCard 
                icon="🤝"
                title="Our Approach"
                text="We work directly on the ground with local communities, ensuring every rupee reaches those in need. Admin costs are raised separately, ensuring 100% donation efficiency."
                delay={1}
              />
            </div>
            <div className="bento-secondary">
              <MissionCard 
                icon="🌍"
                title="Our Reach"
                text="From Sindh to KPK, from flood zones to drought-stricken villages — Friends of Pakistan is everywhere Pakistanis need a helping hand."
                delay={2}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading 
            tag="What we do" 
            title="Three Pillars of Our Work" 
            subtitle="Every project we undertake falls under one of our three core causes — each chosen because the need is urgent and the impact is transformative."
          />
          <div className="causes-grid">
            <div className="bento-main">
              <CauseCard 
                title="Safe Homes for Families"
                desc="We build and restore concrete, flood-resilient homes for families displaced by disasters. Every family deserves a strong roof over their heads."
                img="https://picsum.photos/500/500?random=21"
                badge="Housing"
                count={430}
                countLabel="Homes Built"
              />
            </div>
            <div className="bento-secondary">
              <CauseCard 
                title="Clean Water Access"
                desc="We install hand pumps, deep wells, and filtration systems in remote villages where clean water is a distant dream."
                img="https://picsum.photos/500/250?random=22"
                badge="Clean Water"
                badgeColor="#10b981"
                count={200}
                countLabel="Wells Installed"
                delay={1}
              />
            </div>
            <div className="bento-secondary">
              <CauseCard 
                title="Emergency Disaster Relief"
                desc="When crisis strikes, we mobilize within 48 hours to deliver emergency ration packages, tents, medical kits, and relief supplies directly."
                img="https://picsum.photos/500/250?random=23"
                badge="Disaster Relief"
                badgeColor="#b91c1c"
                count={380}
                countLabel="Operations Run"
                delay={2}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-bg">
        <div className="container">
          <SectionHeading 
            tag="Recent work" 
            title="Projects from the Field" 
            subtitle="A glimpse of our most recent work across Pakistan."
          />
          <div className="projects-grid">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i % 3} />
            ))}
          </div>
          <div className="load-more-wrap">
            <Link href="/projects" className="btn btn-green">
              View All 1,000+ Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story-grid">
            <ScrollReveal className="story-img-wrap">
              <div className="story-img">
                <img src="https://picsum.photos/600/750?random=50" alt="Family helped by Friends of Pakistan" />
              </div>
              <div className="story-badge">
                <span className="story-badge-num">1,200+</span>
                <span className="story-badge-text">Families Housed</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <SectionHeading tag="A story of change" title="From Rubble to Home" />
              <blockquote className="story-quote">
                "Before Friends of Pakistan came, my children slept under the open sky for three months. Now we have walls, a roof, and hope again."
              </blockquote>
              <p className="story-text">In the aftermath of Pakistan's devastating 2022 floods, the Mirza family of Dadu, Sindh lost everything — their home, their belongings, and their sense of security. Like 33 million others, they were left with nothing.</p>
              <p className="story-text">Friends of Pakistan mobilized within 48 hours of the disaster. Our field teams assessed the damage, and within weeks, construction began. Today, the Mirza family lives in a proper structure with clean water access — built to withstand future floods.</p>
              <p className="story-text">This is not one story. This is 1,200+ stories. And we're writing more every day.</p>
              
              <div className="story-author">
                <div className="story-avatar">
                  <img src="https://picsum.photos/100/100?random=60" alt="Fatima Mirza" />
                </div>
                <div>
                  <div className="story-author-name">Fatima Mirza</div>
                  <div className="story-author-loc">📍 Dadu, Sindh — Housing Beneficiary</div>
                </div>
              </div>
              <Link href="/impact" className="btn btn-green" style={{ marginTop: "32px" }}>
                See All Impact Stories
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section testi-bg">
        <div className="container">
          <SectionHeading 
            tag="Voices of change" 
            title="What Our Donors Say" 
          />
          {reviewsList.length > 3 ? (
            <div className="testi-slider-wrap">
              <div 
                className="testi-slider-track"
                style={{
                  transform: `translateX(-${sliderIndex * (100 / reviewsList.length)}%)`,
                  display: "flex",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  width: `${reviewsList.length * 100}%`
                }}
              >
                {reviewsList.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="testi-slide"
                    style={{ width: `${100 / reviewsList.length}%`, flexShrink: 0 }}
                  >
                    <div style={{ maxWidth: "850px", margin: "0 auto", padding: "0 24px" }}>
                      <div className="testi-slide-content">
                        <div className="testi-slider-stars">{rev.stars}</div>
                        <p className="testi-slider-quote">"{rev.quote}"</p>
                        <div className="testi-slider-author">
                          <div className="testi-slider-avatar">
                            {rev.avatar ? rev.avatar.substring(0, 2).toUpperCase() : rev.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="testi-slider-meta">
                            <div className="testi-slider-name">{rev.name}</div>
                            <div className="testi-slider-loc">{rev.loc}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Controls */}
              <div className="testi-slider-controls">
                <div className="testi-slider-dots">
                  {reviewsList.map((_, idx) => (
                    <button
                      key={idx}
                      className={`testi-slider-dot ${sliderIndex === idx ? "active" : ""}`}
                      onClick={() => setSliderIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="testi-grid">
              {reviewsList.map((rev, i) => (
                <TestimonialCard 
                  key={rev.id}
                  stars={rev.stars}
                  quote={rev.quote}
                  avatar={rev.avatar}
                  name={rev.name}
                  loc={rev.loc}
                  delay={i % 3}
                />
              ))}
            </div>
          )}
        </div>
      </section>


      <div className="cta-section">
        <div className="container">
          <h2 className="cta-title">Their Tomorrow Starts With You Today</h2>
          <p className="cta-sub">Join hundreds of volunteers and donors who are bringing hope and restoring dignity across Pakistan.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <Link href="/volunteer" className="btn btn-primary">
              Volunteer With Us
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
