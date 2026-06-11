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
        <div className="nav-inner" style={{ width: "100%" }}>
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            <img 
              src="/logo_dark.png" 
              alt="Handshake Logo Icon" 
              style={{ 
                height: "36px", 
                width: "auto", 
                display: "block",
                marginRight: "8px"
              }} 
            />
            <div className="nav-logo-text">
              Friends of Pakistan<span>Serving humanity</span>
            </div>
          </Link>

          <div className="nav-links" style={{ marginLeft: "48px", marginRight: "auto" }}>
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
