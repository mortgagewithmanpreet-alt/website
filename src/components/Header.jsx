import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import logo from '../assets/manpreet singh logo.jpeg';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const servicesList = [
    { name: 'First-Time Home Buyers', path: '/services#first-time' },
    { name: 'Purchase Mortgage', path: '/services#purchase' },
    { name: 'Pre-Approval', path: '/services#pre-approval' },
    { name: 'Mortgage Refinancing', path: '/services#refinancing' },
    { name: 'Mortgage Renewal', path: '/services#renewal' },
    { name: 'Debt Consolidation', path: '/services#debt-consolidation' },
    { name: 'HELOC', path: '/services#heloc' },
    { name: 'Second Mortgages', path: '/services#second-mortgage' },
    { name: 'Self-Employed Mortgages', path: '/services#self-employed' },
    { name: 'Bad Credit Mortgages', path: '/services#bad-credit' },
    { name: 'New to Canada', path: '/services#new-to-canada' },
    { name: 'Investment Property', path: '/services#investment' },
    { name: 'Construction Financing', path: '/services#construction' },
    { name: 'Reverse Mortgage', path: '/services#reverse' },
    { name: 'Private Lending', path: '/services#private' },
  ];

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <img src={logo} alt="Manpreet Singh - Mortgage Agent Logo" className="header-logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Services <ChevronDown size={14} style={{ display: 'inline', marginLeft: '2px' }} />
              </NavLink>
              <div className="dropdown-menu">
                {servicesList.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    className="dropdown-link"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <NavLink to="/calculators" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Calculators
              </NavLink>
            </li>
            <li>
              <NavLink to="/faqs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Contact
              </NavLink>
            </li>
            <li>
              <Link to="/book-consultation" className="btn btn-primary btn-sm">
                Book Consultation
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
          About
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
          Services
        </NavLink>
        <NavLink to="/calculators" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
          Calculators
        </NavLink>
        <NavLink to="/faqs" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
          FAQs
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
          Contact
        </NavLink>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link to="/book-consultation" className="btn btn-primary" onClick={closeMobileMenu}>
            Book Consultation
          </Link>
          <a href="tel:6472227071" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={16} /> Call 647-222-7071
          </a>
        </div>
      </div>
    </header>
  );
}
