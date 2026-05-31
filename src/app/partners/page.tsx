import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export default function PartnersPage() {
  return (
    <>
      <PageHero 
        title="Our Partners" 
        subtitle="Organizations and individuals who make our work possible."
        breadcrumbLabel="Partners"
      />

      <section className="section">
        <div className="container">
          <SectionHeading tag="Partner organizations" title="Trusted Collaborators" />
          
          <div className="partners-logos" style={{ marginTop: "40px" }}>
            <div className="partner-logo">Al-Khair Foundation</div>
            <div className="partner-logo">Al Khidmat Foundation</div>
            <div className="partner-logo">JDC Welfare</div>
            <div className="partner-logo">Pakistan Relief Trust</div>
            <div className="partner-logo">Edhi Foundation</div>
            <div className="partner-logo">Humanity First Pak</div>
            <div className="partner-logo">MTJ Foundation</div>
            <div className="partner-logo">Imran Khan Foundation</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-dark)" }}>
        <div className="container">
          <SectionHeading tag="Why partner with us" title="What Sets Us Apart" />
          
          <div className="causes-grid" style={{ marginTop: "40px" }}>
            <ScrollReveal className="cause-card">
              <div className="cause-body">
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>📊</div>
                <h3 className="cause-title">Verified Impact Reports</h3>
                <p className="cause-text">Every partner receives GPS-tagged field reports with photos, beneficiary counts, and project completion certificates. No guesswork — only verified data.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={1} className="cause-card">
              <div className="cause-body">
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>🏔️</div>
                <h3 className="cause-title">Ground-Level Presence</h3>
                <p className="cause-text">Our 200+ field volunteers are embedded in communities across 15 districts. We reach places that large organizations cannot — quickly and effectively.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={2} className="cause-card">
              <div className="cause-body">
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>💯</div>
                <h3 className="cause-title">Zero Overhead Promise</h3>
                <p className="cause-text">Administrative costs are funded separately. Every partnership contribution goes 100% to projects. We will show you exactly how your funds were deployed.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <div className="container">
          <h2 className="cta-title">Become a Partner Organization</h2>
          <p className="cta-sub">Let's talk about how we can work together to serve Pakistan's most vulnerable.</p>
          <Link href="/contact" className="btn btn-primary" style={{ position: "relative" }}>
            Contact Us Today
          </Link>
        </div>
      </div>
    </>
  );
}
