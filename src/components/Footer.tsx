import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Friends of Pakistan</div>
            <p className="footer-tagline">
              Serving humanity through housing, clean water, and disaster relief since 2021. Every project. Every family. Every life — it matters.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/friends-of-pakistan" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer-social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/projects">Our Projects</Link></li>
              <li><Link href="/impact">Our Impact</Link></li>
              <li><Link href="/media">Media</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/dashboard" style={{ color: "var(--gold-light)" }}>Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Our Work</div>
            <ul className="footer-links">
              <li><Link href="/projects">Housing Projects</Link></li>
              <li><Link href="/projects">Clean Water Wells</Link></li>
              <li><Link href="/projects">Disaster Relief</Link></li>
              <li><Link href="/projects">Food Aid</Link></li>
              <li><Link href="/projects">Education Support</Link></li>
              <li><Link href="/volunteer">Volunteer</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Contact Info</div>
            <div className="footer-contact-item"><span className="footer-contact-icon">📧</span><span>info@friendsofpakistan.org</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon">📞</span><span>+92 300 1234567</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon">📍</span><span>Clifton, Karachi, Pakistan</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon">🕐</span><span>Mon–Sat: 9AM – 6PM</span></div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Friends of Pakistan. All rights reserved.</span>
          <span>Founded 2021 | Serving humanity</span>
        </div>
      </div>
    </footer>
  );
}
