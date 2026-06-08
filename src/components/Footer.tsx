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
              <a href="https://www.linkedin.com/company/friends-of-pakistan" target="_blank" rel="noopener noreferrer" className="footer-social-btn">in</a>
              <a href="#" className="footer-social-btn">f</a>
              <a href="#" className="footer-social-btn">ig</a>
              <a href="#" className="footer-social-btn">yt</a>
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
