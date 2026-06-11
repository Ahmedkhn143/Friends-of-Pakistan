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
// import ImpactCalculator from "@/components/ImpactCalculator";
import { Project } from "@/data/projects";
import { getProjects } from "@/utils/projectDb";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const data = getProjects();
    // Sort projects: Featured first, then order
    const sorted = [...data].sort((a, b) => {
      const aFeatured = (a as any).featured ? 1 : 0;
      const bFeatured = (b as any).featured ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;
      return ((a as any).order ?? 0) - ((b as any).order ?? 0);
    });
    // Slice top 6 for the homepage recent work
    setFeaturedProjects(sorted.slice(0, 6));
  }, []);

  return (
    <>
      <section id="hero">
        {/* Background Atmosphere */}
        <div className="hero-bg"></div>
        <div className="hero-pattern"></div>
        <div className="hero-img"></div>
        
        {/* Glowing Orbs for Visual Depth */}
        <div className="glow-orb glow-green"></div>
        <div className="glow-orb glow-gold"></div>

        {/* Urdu Calligraphy Decorative Watermarks */}
        <div 
          className="urdu-watermark urdu-hope"
          style={{ fontFamily: "'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif" }}
        >
          امید
        </div>
        <div 
          className="urdu-watermark urdu-humanity"
          style={{ fontFamily: "'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif" }}
        >
          انسانیت
        </div>

        <div className="container">
          {/* Left: Headline and Copy */}
          <div className="hero-content" style={{ maxWidth: "800px" }}>
            <div className="hero-badge">🇵🇰 Serving Pakistan since 2021</div>
            <h1 className="hero-title">
              Bringing <strong>Hope</strong> Home,<br />One Family<br />at a Time
            </h1>
            <p className="hero-sub">
              Together we build more than houses—we restore dignity, secure water resources, and rebuild lives across Pakistan.
            </p>
            <div className="hero-causes">
              <span className="hero-cause">Housing</span>
              <span className="hero-cause">Clean Water</span>
              <span className="hero-cause">Disaster Relief</span>
            </div>
            <div className="hero-btns">
              <Link href="/projects" className="btn btn-green">
                Explore Our Work
              </Link>
              <Link href="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </div>

          {/* Right: Live Impact Calculator (Source code remains in components/ImpactCalculator.tsx)
          <ScrollReveal className="hero-calculator-wrap" delay={1}>
            <ImpactCalculator />
          </ScrollReveal>
          */}
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-arrow"></div>
        </div>
      </section>

      <StatsStrip />

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
          <div className="testi-grid">
            <TestimonialCard 
              stars="★★★★★"
              quote="I've donated to many organizations, but Friends of Pakistan is different. They send field photos within days. You can see exactly where your money goes."
              avatar="AK"
              name="Ahmed Khan"
              loc="Donor since 2022 · Lahore"
            />
            <TestimonialCard 
              stars="★★★★★"
              quote="As a corporate partner, we needed full transparency and documented impact. Friends of Pakistan delivered quarterly reports with GPS-tagged photos. Exceptional."
              avatar="SR"
              name="Sana Rehman"
              loc="Corporate Partner · Karachi"
              delay={1}
            />
            <TestimonialCard 
              stars="★★★★★"
              quote="My monthly contribution of Rs 5,000 has funded two water pumps. I see real people drinking clean water because of it. This is what giving should feel like."
              avatar="MF"
              name="Muhammad Farooq"
              loc="Regular Donor · Islamabad"
              delay={2}
            />
          </div>
        </div>
      </section>

      <section className="section-sm partners-bg">
        <div className="container">
          <SectionHeading tag="Trusted by" title="Our Partners & Supporters" align="center" />
          <div className="partners-logos">
            <div className="partner-logo">Al-Khair Foundation</div>
            <div className="partner-logo">Pakistan Relief Trust</div>
            <div className="partner-logo">Edhi Foundation</div>
            <div className="partner-logo">JDC Welfare</div>
            <div className="partner-logo">Humanity First</div>
          </div>
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
