import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ProgressBars from "@/components/ProgressBars";
import TestimonialCard from "@/components/TestimonialCard";

export default function ImpactPage() {
  return (
    <>
      <PageHero 
        title="Our Impact" 
        subtitle="Numbers don't lie — here's what we've achieved together."
        breadcrumbLabel="Our Impact"
      />

      <section className="section">
        <div className="container">
          <SectionHeading tag="By the numbers" title="4 Years of Measurable Change" />
          
          <div className="impact-metrics">
            <ScrollReveal className="metric-card">
              <div className="metric-num">1,000+</div>
              <div className="metric-label">Total Projects Completed</div>
            </ScrollReveal>
            <ScrollReveal delay={1} className="metric-card">
              <div className="metric-num">50,000+</div>
              <div className="metric-label">Lives Directly Impacted</div>
            </ScrollReveal>
            <ScrollReveal delay={2} className="metric-card">
              <div className="metric-num">200+</div>
              <div className="metric-label">Clean Water Wells Installed</div>
            </ScrollReveal>
            <ScrollReveal className="metric-card">
              <div className="metric-num">1,200+</div>
              <div className="metric-label">Families Housed</div>
            </ScrollReveal>
            <ScrollReveal delay={1} className="metric-card">
              <div className="metric-num">15+</div>
              <div className="metric-label">Districts Served Nationwide</div>
            </ScrollReveal>
            <ScrollReveal delay={2} className="metric-card">
              <div className="metric-num">200+</div>
              <div className="metric-label">Active Volunteers</div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-dark)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionHeading tag="Goals for 2025" title="Where We're Headed" />
          <ProgressBars />
        </div>
      </section>

      <section className="section testi-bg">
        <div className="container">
          <SectionHeading 
            tag="Beneficiary voices" 
            title="Stories from the Ground" 
            tagColor="var(--gold-light)" 
            titleColor="var(--white)" 
          />
          <div className="testi-grid">
            <TestimonialCard 
              stars="❤️❤️❤️❤️❤️"
              quote="My children were sick from dirty water every month. Since Friends of Pakistan installed our pump, we haven't had a single illness in a year. This is a miracle."
              avatar="HB"
              name="Hameeda Bibi"
              loc="Clean Water Beneficiary · Rahim Yar Khan"
            />
            <TestimonialCard 
              stars="❤️❤️❤️❤️❤️"
              quote="The flood took everything. Friends of Pakistan gave us a home in less than 30 days. I still can't believe it. We will make du'a for them every single day."
              avatar="GM"
              name="Ghulam Mustafa"
              loc="Housing Beneficiary · Dadu, Sindh"
              delay={1}
            />
            <TestimonialCard 
              stars="❤️❤️❤️❤️❤️"
              quote="When the earthquake hit our village, we had nothing. The relief kits from Friends of Pakistan arrived the next day. Food, blankets, medicine — everything we needed."
              avatar="NK"
              name="Noor Khan"
              loc="Disaster Relief Beneficiary · Swat, KPK"
              delay={2}
            />
          </div>
        </div>
      </section>
    </>
  );
}
