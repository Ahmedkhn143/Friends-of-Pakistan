import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import StatsStrip from "@/components/StatsStrip";
import MissionCard from "@/components/MissionCard";
import CauseCard from "@/components/CauseCard";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import { projects } from "@/data/projects";

export default function Home() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <>
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-pattern"></div>
        <div className="hero-img"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">🇵🇰 Serving Pakistan since 2021</div>
            <h1 className="hero-title">
              Serving <strong>Humanity,</strong><br />One Project<br />at a Time
            </h1>
            <p className="hero-sub">
              Making real change — one family, one well, one home at a time.
            </p>
            <div className="hero-causes">
              <span className="hero-cause">Housing</span>
              <span className="hero-cause">Clean Water</span>
              <span className="hero-cause">Disaster Relief</span>
            </div>
            <div className="hero-btns">
              <Link href="/projects" className="btn btn-primary">
                Explore Our Work
              </Link>
              <Link href="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-arrow"></div>
        </div>
      </section>

      <StatsStrip />

      <section className="section" style={{ background: "var(--white)", paddingTop: 0, paddingBottom: 0 }}>
        <div className="mission-grid">
          <MissionCard 
            icon="🎯"
            title="Our Mission"
            text="To serve the most vulnerable communities in Pakistan with dignity, providing essential housing, clean water, and emergency relief to those who need it most."
          />
          <MissionCard 
            icon="🤝"
            title="Our Approach"
            text="We work directly on the ground with local communities, ensuring every rupee reaches those in need. No bureaucracy. No delays. Just impact — fast and transparent."
            delay={1}
          />
          <MissionCard 
            icon="🌍"
            title="Our Reach"
            text="From Sindh to KPK, from flood zones to drought-stricken villages — Friends of Pakistan is everywhere Pakistanis need a helping hand."
            delay={2}
          />
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
            <CauseCard 
              title="Safe Homes for Families"
              desc="We build and restore homes for families displaced by floods, poverty, and disasters. Every family deserves four walls and a roof — not a promise."
              img="https://picsum.photos/500/300?random=21"
              badge="Housing"
              count={430}
              countLabel="Homes Built"
            />
            <CauseCard 
              title="Clean Water Access"
              desc="We install hand pumps, filtration systems, and water tanks in villages where clean water is a distant dream. Water is life — we make it reachable."
              img="https://picsum.photos/500/300?random=22"
              badge="Clean Water"
              badgeColor="#1565C0"
              count={200}
              countLabel="Wells Installed"
              delay={1}
            />
            <CauseCard 
              title="Emergency Disaster Relief"
              desc="When floods, earthquakes, or crises strike, we mobilize within hours. Food packages, shelter kits, medicines — delivered directly to those who can't wait."
              img="https://picsum.photos/500/300?random=23"
              badge="Disaster Relief"
              badgeColor="#B71C1C"
              count={380}
              countLabel="Relief Operations"
              delay={2}
            />
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
              View All 1000+ Projects
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
                "Before Friends of Pakistan came, my children slept under open sky for three months. Now we have walls, a roof, and hope again."
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
                  <div className="story-author-loc">📍 Dadu, Sindh — Housing Beneficiary 2022</div>
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
            tagColor="var(--gold-light)" 
            title="What Our Donors Say" 
            titleColor="var(--white)"
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
          <h2 className="cta-title">Want to Make a Real Difference?</h2>
          <p className="cta-sub">Join hundreds of volunteers and donors who are changing lives across Pakistan.</p>
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
