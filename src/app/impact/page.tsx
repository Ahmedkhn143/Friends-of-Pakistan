import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ProgressBars from "@/components/ProgressBars";
import TestimonialCard from "@/components/TestimonialCard";

export default function ImpactPage() {
  return (
    <>
      {/* Page Hero with Decorative Glows */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: "-20%",
          left: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1
        }} />
        <div style={{
          position: "absolute",
          bottom: "-20%",
          right: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1
        }} />
        <PageHero 
          title="Our Impact" 
          subtitle="Numbers don't lie — here's what we've achieved together."
          breadcrumbLabel="Our Impact"
        />
      </div>

      {/* Metrics Section */}
      <section className="section" style={{ background: "var(--cream)", position: "relative" }}>
        <div className="container">
          <SectionHeading tag="By the numbers" title="4 Years of Measurable Change" />
          
          <div className="impact-metrics" style={{ marginTop: "40px" }}>
            <ScrollReveal className="metric-card">
              <div className="metric-icon" style={{
                background: "rgba(16, 185, 129, 0.08)",
                color: "var(--green-mid)"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="metric-num">1,000+</div>
              <div className="metric-label" style={{ fontWeight: "600", color: "var(--text-dark)" }}>Total Projects Completed</div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
                Water, shelter, and medical camps fully deployed.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={1} className="metric-card">
              <div className="metric-icon" style={{
                background: "rgba(217, 119, 6, 0.08)",
                color: "var(--gold)"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="metric-num">50,000+</div>
              <div className="metric-label" style={{ fontWeight: "600", color: "var(--text-dark)" }}>Lives Directly Impacted</div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
                Families receiving clean water, housing, and emergency aid.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={2} className="metric-card">
              <div className="metric-icon" style={{
                background: "rgba(16, 185, 129, 0.08)",
                color: "var(--green-mid)"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a7 7 0 0 0 5-2.09c1.35-1.42 2-3.17 2-4.91 0-2.67-2-6-7-11-5 5-7 8.33-7 11 0 1.74.65 3.49 2 4.91A7 7 0 0 0 12 22z" />
                </svg>
              </div>
              <div className="metric-num">200+</div>
              <div className="metric-label" style={{ fontWeight: "600", color: "var(--text-dark)" }}>Clean Water Wells Installed</div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
                Solar power pumps and hand-pumps in desert areas.
              </p>
            </ScrollReveal>

            <ScrollReveal className="metric-card">
              <div className="metric-icon" style={{
                background: "rgba(217, 119, 6, 0.08)",
                color: "var(--gold)"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="metric-num">1,200+</div>
              <div className="metric-label" style={{ fontWeight: "600", color: "var(--text-dark)" }}>Families Housed</div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
                Resilient brick houses built post-floods.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={1} className="metric-card">
              <div className="metric-icon" style={{
                background: "rgba(16, 185, 129, 0.08)",
                color: "var(--green-mid)"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
              </div>
              <div className="metric-num">15+</div>
              <div className="metric-label" style={{ fontWeight: "600", color: "var(--text-dark)" }}>Districts Served Nationwide</div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
                Covering critical zones in Sindh, Punjab, and KPK.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={2} className="metric-card">
              <div className="metric-icon" style={{
                background: "rgba(217, 119, 6, 0.08)",
                color: "var(--gold)"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="metric-num">200+</div>
              <div className="metric-label" style={{ fontWeight: "600", color: "var(--text-dark)" }}>Active Volunteers</div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
                Dedicated members running operations on the field.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section" style={{ background: "var(--white)", borderTop: "1px solid var(--card-border)" }}>
        <div className="container">
          <SectionHeading tag="Our Journey" title="How We've Grown" />
          
          <div className="timeline-container">
            <ScrollReveal className="timeline-item">
              <div className="timeline-badge">🌱</div>
              <div className="timeline-content">
                <span className="timeline-year">2021</span>
                <h3 className="timeline-title">Founding & Core Vision</h3>
                <p className="timeline-text">
                  Friends of Pakistan was established with a singular mission: to provide immediate relief and long-term sustainable development to marginalized communities across Pakistan. We began with local water and food distribution drives.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1} className="timeline-item">
              <div className="timeline-badge">🌧️</div>
              <div className="timeline-content">
                <span className="timeline-year">2022</span>
                <h3 className="timeline-title">Disaster Response & Mobilization</h3>
                <p className="timeline-text">
                  During the historic and devastating floods, our team quickly pivoted to coordinate emergency rescue, deliver medical aid, and distribute thousands of dry ration packs to affected families in Sindh and Balochistan.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="timeline-item">
              <div className="timeline-badge">💧</div>
              <div className="timeline-content">
                <span className="timeline-year">2024</span>
                <h3 className="timeline-title">Clean Water & Infrastructure</h3>
                <p className="timeline-text">
                  We reached a major milestone of installing 200+ clean water hand pumps and solar water filtration plants, bringing safe drinking water to remote villages and dramatically reducing waterborne illnesses.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1} className="timeline-item">
              <div className="timeline-badge">🏠</div>
              <div className="timeline-content">
                <span className="timeline-year">2026</span>
                <h3 className="timeline-title">Sustainable Housing & Beyond</h3>
                <p className="timeline-text">
                  Transitioning from temporary shelters to permanent brick houses, we launched model village initiatives, building energy-efficient homes and scaling our network to over 200 active volunteers nationwide.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Targets and Progress Bars Card Section */}
      <section className="section" style={{ 
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", 
        borderTop: "1px solid var(--card-border)", 
        borderBottom: "1px solid var(--card-border)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Glow orb */}
        <div style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none"
        }} />
        
        <div className="container" style={{ maxWidth: "800px", position: "relative", zIndex: 2 }}>
          <SectionHeading tag="Future Milestones" title="Where We're Headed Next" />
          
          <ScrollReveal className="progress-container-card" style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(217, 119, 6, 0.15)",
            boxShadow: "var(--shadow-lg)",
            borderRadius: "20px",
            padding: "40px",
            marginTop: "32px",
            position: "relative"
          }}>
            {/* Top gold/green ribbon border */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, var(--green-mid), var(--gold))",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px"
            }} />
            
            <p style={{ 
              textAlign: "center", 
              color: "var(--text-muted)", 
              marginBottom: "32px",
              fontSize: "15px",
              lineHeight: "1.6"
            }}>
              Our targets for the upcoming year focus on expanding sustainable infrastructure, responding rapidly to emergencies, and building a stronger volunteer network across Pakistan.
            </p>
            
            <ProgressBars />
            
            <div style={{ 
              marginTop: "32px", 
              paddingTop: "24px", 
              borderTop: "1px solid rgba(0,0,0,0.06)", 
              fontSize: "13px", 
              color: "var(--text-muted)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px"
            }}>
              <div>
                <strong style={{ color: "var(--text-dark)" }}>🏠 Housing goal:</strong> Building 500+ disaster-resilient brick houses.
              </div>
              <div>
                <strong style={{ color: "var(--text-dark)" }}>💧 Clean water goal:</strong> Adding solar filtration plants for high yield output.
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ 
        background: "linear-gradient(135deg, #022c22 0%, #011611 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Glow effects */}
        <div style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          pointerEvents: "none"
        }} />

        <div className="container">
          <SectionHeading 
            tag="Beneficiary voices" 
            title="Stories from the Ground" 
            tagColor="var(--gold-light)" 
            titleColor="var(--white)" 
          />
          <div className="testi-grid">
            <TestimonialCard 
              stars="⭐⭐⭐⭐⭐"
              quote="My children were sick from dirty water every month. Since Friends of Pakistan installed our pump, we haven't had a single illness in a year. This is a miracle."
              avatar="HB"
              name="Hameeda Bibi"
              loc="Clean Water Beneficiary · Rahim Yar Khan"
              isDark={true}
            />
            <TestimonialCard 
              stars="⭐⭐⭐⭐⭐"
              quote="The flood took everything. Friends of Pakistan gave us a home in less than 30 days. I still can't believe it. We will make du'a for them every single day."
              avatar="GM"
              name="Ghulam Mustafa"
              loc="Housing Beneficiary · Dadu, Sindh"
              isDark={true}
              delay={1}
            />
            <TestimonialCard 
              stars="⭐⭐⭐⭐⭐"
              quote="When the earthquake hit our village, we had nothing. The relief kits from Friends of Pakistan arrived the next day. Food, blankets, medicine — everything we needed."
              avatar="NK"
              name="Noor Khan"
              loc="Disaster Relief Beneficiary · Swat, KPK"
              isDark={true}
              delay={2}
            />
          </div>
        </div>
      </section>
    </>
  );
}
