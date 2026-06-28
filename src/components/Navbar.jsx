import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Expertise', 'Trading Philosophy', 'Market Insights', 'Content', 'Journey', 'Contact'];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          Raja <span>Trades</span>
        </div>
        
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <X size={24} color="#fff" /> : <><span></span><span></span><span></span></>}
        </button>
        
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(/\s/g,'-')}`} onClick={() => setOpen(false)}>
                {link}
              </a>
            </li>
          ))}
          <li><a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Get In Touch</a></li>
        </ul>
      </div>
    </nav>
  );
}