"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="nav-inner">
            <Link href="/" className="nav-logo" onClick={closeMenu}>
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="17" stroke="#C9922A" strokeWidth="1.5" />
                <path d="M18 8c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S23.523 8 18 8zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="#52B788" opacity=".3" />
                <path d="M22 16a4 4 0 11-5.657 5.657A4 4 0 0122 16z" fill="#C9922A" />
                <path d="M14 14l1.5 3.5M14 14l3.5 1.5" stroke="#FFF8F0" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div className="nav-logo-text">
                Friends of Pakistan<span>Humanitarian Foundation</span>
              </div>
            </Link>
            
            <div className="nav-links">
              <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
              <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>About</Link>
              <Link href="/projects" className={`nav-link ${pathname === "/projects" ? "active" : ""}`}>Projects</Link>
              <Link href="/impact" className={`nav-link ${pathname === "/impact" ? "active" : ""}`}>Impact</Link>
              <Link href="/media" className={`nav-link ${pathname === "/media" ? "active" : ""}`}>Media</Link>
              <Link href="/partners" className={`nav-link ${pathname === "/partners" ? "active" : ""}`}>Partners</Link>
              <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "active" : ""}`}>Contact</Link>
            </div>
            
            <Link href="/volunteer" className="btn btn-primary nav-cta">
              Get Involved
            </Link>
            
            <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={closeMenu}>×</button>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/projects" onClick={closeMenu}>Projects</Link>
        <Link href="/impact" onClick={closeMenu}>Impact</Link>
        <Link href="/media" onClick={closeMenu}>Media</Link>
        <Link href="/partners" onClick={closeMenu}>Partners</Link>
        <Link href="/volunteer" onClick={closeMenu}>Volunteer</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
      </div>
    </>
  );
}
