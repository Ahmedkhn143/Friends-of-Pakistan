import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="About Friends of Pakistan" 
        subtitle="Our story, mission, and the people who make it all possible."
        breadcrumbLabel="About Us"
      />

      <section className="section">
        <div className="container">
          <div className="story-grid">
            <ScrollReveal>
              <SectionHeading tag="Our story" title={<>Born from Crisis,<br />Built on Compassion</>} />
              <p className="story-text">Friends of Pakistan was founded in 2021 by a group of concerned Pakistanis who watched natural disasters devastate communities while aid was slow, bureaucratic, and often missing the most vulnerable.</p>
              <p className="story-text">We started with a simple WhatsApp group of 12 people and a first donation of Rs 50,000. Within six months, we had completed 47 projects. Today, four years later, we have crossed 1,000+ projects — without losing that original sense of urgency and personal responsibility.</p>
              <p className="story-text">We are not a corporation. We are not a government agency. We are Pakistanis helping Pakistanis — with full transparency, zero overhead waste, and an unshakeable belief that ordinary people can do extraordinary things.</p>
              <Link href="/contact" className="btn btn-green" style={{ marginTop: "28px" }}>
                Connect With Us
              </Link>
            </ScrollReveal>
            
            <ScrollReveal delay={1} className="story-img-wrap">
              <div className="story-img">
                <img src="https://picsum.photos/600/750?random=70" alt="Friends of Pakistan team in the field" />
              </div>
              <div className="story-badge">
                <span className="story-badge-num">2021</span>
                <span className="story-badge-text">Founded</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--cream-dark)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div style={{ background: "var(--green-dark)", color: "var(--white)", borderRadius: "var(--radius)", padding: "48px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "120px", opacity: 0.05, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>M</div>
              <div className="tag" style={{ color: "var(--gold-light)" }}>Our mission</div>
              <h3 style={{ fontSize: "28px", color: "var(--white)", marginBottom: "16px" }}>Serve with dignity,<br />impact with transparency.</h3>
              <p style={{ color: "rgba(255,255,255,.75)", lineHeight: 1.75, fontSize: "15px" }}>To provide immediate and lasting humanitarian relief to Pakistan's most vulnerable communities through housing, clean water, and disaster response — with total accountability to our donors and beneficiaries.</p>
            </div>
            
            <div style={{ background: "var(--gold)", color: "var(--white)", borderRadius: "var(--radius)", padding: "48px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "120px", opacity: 0.08, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>V</div>
              <div className="tag" style={{ color: "var(--white)" }}>Our vision</div>
              <h3 style={{ fontSize: "28px", color: "var(--white)", marginBottom: "16px" }}>A Pakistan where no family<br />goes without shelter or water.</h3>
              <p style={{ color: "rgba(255,255,255,.85)", lineHeight: 1.75, fontSize: "15px" }}>We envision a Pakistan where every citizen — regardless of disaster, poverty, or geography — has access to the basic necessities of a dignified life. We will not stop until that vision is real.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <SectionHeading tag="Core principles" title="Our Values" align="center" />
          <div className="values-grid">
            {[
              { icon: "🛡️", title: "Transparency", text: "GPS-tagged photos and financial reports for every project. See exactly where your money goes." },
              { icon: "🚀", title: "Urgency", text: "Disasters don't wait for paperwork. We aim to deploy funds within 48 hours of a crisis." },
              { icon: "0️⃣", title: "Zero Overhead", text: "Administrative costs are covered separately. 100% of your donation goes directly to the project." },
              { icon: "🤝", title: "Dignity", text: "We treat our beneficiaries not as charity cases, but as equals who deserve respect and quality support." }
            ].map((v, i) => (
              <ScrollReveal key={i} delay={i % 4} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h4 className="value-title">{v.title}</h4>
                <p className="value-text">{v.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
