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
        <p className="new-cause-card-title">Choose a Cause</p>

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
        <div style={{ marginTop: "16px", borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
          <p style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px", fontWeight: "600" }}>Make an Impact Today</p>
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            {["25", "50", "100", "custom"].map((amt) => (
              <button
                key={amt}
                onClick={() => setDonationAmount(amt)}
                style={{
                  flex: 1,
                  background: donationAmount === amt ? "#1a7a4a" : "#f3f4f6",
                  border: donationAmount === amt ? "1px solid #1a7a4a" : "1px solid #e5e7eb",
                  borderRadius: "6px",
                  padding: "8px 0",
                  color: donationAmount === amt ? "#fff" : "#374151",
                  fontSize: "12px",
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
                background: "#fff",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px 12px",
                color: "#374151",
                fontSize: "13px",
                marginBottom: "10px",
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

function AnimatedCounter({ target, duration = 1500 }: { target: number | string; duration?: number }) {
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
          background: linear-gradient(to right, #ffffff 45%, rgba(255, 255, 255, 0.95) 55%, rgba(255, 255, 255, 0.15) 75%, transparent 100%), 
                      url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop') center right/cover no-repeat;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 60px 0 40px 0;
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
            #1a7a4a 0,
            #1a7a4a 1px,
            transparent 1px,
            transparent 60px
          );
          opacity: 0.03;
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
          background: radial-gradient(circle, rgba(26,122,74,0.15) 0%, transparent 70%);
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
          background: radial-gradient(circle, rgba(26,122,74,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .new-hero-content {
          position: relative;
          z-index: 2;
          padding: 1rem 0;
          max-width: 54%;
        }

        .new-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(26,122,74,0.06);
          border: 1px solid rgba(26,122,74,0.25);
          border-radius: 20px;
          padding: 5px 12px;
          margin-bottom: 1rem;
        }

        .new-hero-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1a7a4a;
          position: relative;
          flex-shrink: 0;
        }

        .new-hero-pill-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #1a7a4a;
          animation: pulse-ring 2s ease-out infinite;
        }

        .new-hero-pill-text {
          font-size: 11px;
          font-weight: 700;
          color: #1a7a4a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .new-hero-urdu {
          display: block;
          direction: rtl;
          font-size: 28px;
          color: rgba(15,47,31,0.7);
          font-weight: 500;
          margin-bottom: 4px;
          line-height: 1.3;
          font-family: inherit;
        }

        .new-hero-h1 {
          font-size: 38px;
          font-weight: 800;
          color: #0f2f1f;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
          font-family: var(--font-playfair), serif;
        }

        .new-hero-h1 .highlight {
          color: #1a7a4a;
        }

        .new-hero-para {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 1.5rem;
        }

        .new-hero-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
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
          background: #125734;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26,122,74,0.3);
        }

        .new-btn-outline {
          background: #ffffff;
          color: #0f2f1f;
          border: 1px solid rgba(15,47,31,0.2);
          border-radius: 7px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .new-btn-outline:hover {
          border-color: rgba(26,122,74,0.5);
          background: rgba(26,122,74,0.04);
          color: #1a7a4a;
          transform: translateY(-2px);
        }

        .new-hero-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          border-radius: 12px;
          padding: 12px 18px;
          width: fit-content;
        }

        .new-stat-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .new-stat-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        .new-stat-icon.green {
          background: rgba(26, 122, 74, 0.07);
        }

        .new-stat-icon.blue {
          background: rgba(37, 99, 235, 0.07);
        }

        .new-stat-info {
          display: flex;
          flex-direction: column;
        }

        .new-stat-number {
          font-size: 15px;
          font-weight: 800;
          color: #0f2f1f;
          line-height: 1.2;
        }

        .new-stat-number .new-stat-plus {
          color: #1a7a4a;
        }

        .new-stat-label {
          font-size: 9.5px;
          color: #6b7280;
          font-weight: 500;
          white-space: nowrap;
        }

        .new-stat-divider {
          width: 1px;
          height: 28px;
          background: rgba(0,0,0,0.06);
          flex-shrink: 0;
        }

        .new-hero-card {
          position: relative;
          z-index: 3;
          width: 290px;
        }

        .new-cause-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
        }

        .new-cause-card-title {
          font-size: 14px;
          color: #0f2f1f;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .new-cause-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .new-cause-item.active {
          background: rgba(26, 122, 74, 0.05);
          border-color: rgba(26, 122, 74, 0.25);
        }

        .new-cause-item:not(.active):hover {
          background: #f3f4f6;
        }

        .new-cause-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        .new-cause-icon.housing { background: rgba(26,122,74,0.08); }
        .new-cause-icon.water   { background: rgba(37,99,235,0.08); }
        .new-cause-icon.relief  { background: rgba(234,88,12,0.08); }

        .new-cause-info {
          flex: 1;
          min-width: 0;
        }

        .new-cause-name {
          font-size: 13px;
          font-weight: 700;
          color: #0f2f1f;
          line-height: 1.2;
          margin-bottom: 2px;
        }

        .new-cause-sub {
          font-size: 11px;
          color: #6b7280;
          line-height: 1;
        }

        .new-cause-arrow {
          color: #9ca3af;
          font-size: 16px;
          font-weight: 400;
          flex-shrink: 0;
        }

        .new-cause-donate-btn {
          margin-top: 14px;
          width: 100%;
          background: #1a7a4a;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .new-cause-donate-btn:hover {
          background: #125734;
        }

        /* Testimonial Quote Bubble Overlay */
        .new-hero-quote {
          background: rgba(6, 78, 59, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 14px 18px;
          color: #ffffff;
          max-width: 250px;
          position: absolute;
          bottom: 12px;
          left: 48%;
          z-index: 10;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .new-hero-quote::before {
          content: '“';
          font-size: 28px;
          color: rgba(74, 222, 128, 0.4);
          position: absolute;
          top: 4px;
          left: 10px;
          line-height: 1;
        }

        .new-hero-quote-text {
          font-size: 12px;
          line-height: 1.5;
          margin-bottom: 6px;
          padding-left: 12px;
          color: rgba(255, 255, 255, 0.9);
          font-style: italic;
        }

        .new-hero-quote-author {
          font-size: 10px;
          color: #4ade80;
          font-weight: 600;
          text-align: right;
          display: block;
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
          color: rgba(255,255,255,0.6);
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
          background: rgba(74,222,128,0.25);
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
          color: rgba(255,255,255,0.9);
          font-weight: 500;
        }

        /* Responsive overrides */
        @media (max-width: 991px) {
          .new-hero-quote {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .new-hero-card { display: none; }
          .new-hero {
            background: #ffffff;
            padding: 40px 0;
          }
          .new-hero-content {
            max-width: 100%;
            padding: 2rem 1.5rem;
          }
          .new-hero-h1 { font-size: 32px; }
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

        {/* Testimonial Quote Bubble Overlay */}
        <div className="new-hero-quote" aria-hidden="true">
          <p className="new-hero-quote-text">
            When we uplift one life, we uplift an entire community.
          </p>
          <span className="new-hero-quote-author">— Friends of Pakistan</span>
        </div>

        <div className="container" style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
          {/* 3a. LEFT CONTENT */}
          <div className="new-hero-content">
            <div className="new-hero-pill" role="note">
              <span className="new-hero-pill-dot" aria-hidden="true"></span>
              <span className="new-hero-pill-text">Pakistan's Trusted Humanitarian Foundation</span>
            </div>

            <h1 className="new-hero-h1">
              Rebuilding Lives.<br />Restoring <span className="highlight">Dignity.</span>
            </h1>

            <p className="new-hero-para">
              From flood-stricken villages in Sindh to drought-hit communities in Balochistan — 
              Friends of Pakistan delivers housing, clean water, and emergency relief directly to 
              those who need it most.
            </p>

            <div className="new-hero-cta-row">
              <button 
                className="new-btn-primary" 
                onClick={() => alert("Thank you for your generosity!\nRedirecting to the donation page...")}
              >
                Donate Today &rarr;
              </button>
              <a 
                href="#impact-section" 
                className="new-btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("videos");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    alert("Redirecting to the impact section...");
                  }
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: "4px" }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
                See Our Impact
              </a>
            </div>

            <div className="new-hero-stats" role="list" aria-label="Impact statistics">
              <div className="new-stat-item" role="listitem">
                <div className="new-stat-icon green">🏠</div>
                <div className="new-stat-info">
                  <span className="new-stat-number"><AnimatedCounter target="1000" /><span className="new-stat-plus">+</span></span>
                  <span className="new-stat-label">Projects Completed</span>
                </div>
              </div>
              <div className="new-stat-divider" aria-hidden="true"></div>
              <div className="new-stat-item" role="listitem">
                <div className="new-stat-icon green">👥</div>
                <div className="new-stat-info">
                  <span className="new-stat-number"><AnimatedCounter target="50000" /><span className="new-stat-plus">+</span></span>
                  <span className="new-stat-label">Lives Impacted</span>
                </div>
              </div>
              <div className="new-stat-divider" aria-hidden="true"></div>
              <div className="new-stat-item" role="listitem">
                <div className="new-stat-icon blue">💧</div>
                <div className="new-stat-info">
                  <span className="new-stat-number"><AnimatedCounter target="200" /><span className="new-stat-plus">+</span></span>
                  <span className="new-stat-label">Clean Water Wells</span>
                </div>
              </div>
              <div className="new-stat-divider" aria-hidden="true"></div>
              <div className="new-stat-item" role="listitem">
                <div className="new-stat-icon green">📍</div>
                <div className="new-stat-info">
                  <span className="new-stat-number"><AnimatedCounter target="15" /><span className="new-stat-plus">+</span></span>
                  <span className="new-stat-label">Districts Served</span>
                </div>
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
