import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logo from '../assets/manpreet singh logo.jpeg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Logo & Info */}
          <div>
            <Link to="/" className="logo-link" style={{ marginBottom: '20px' }}>
              <img src={logo} alt="Manpreet Singh - Mortgage Agent Logo" className="footer-logo" />
            </Link>
            <p className="footer-logo-desc">
              Professional, transparent mortgage brokerage services tailored to your financial goals. Dedicated to finding your best rates and securing flexible terms with access to 40+ lenders across Canada.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/calculators">Calculators</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><Link to="/services#first-time">First-Time Buyers</Link></li>
              <li><Link to="/services#purchase">Purchase Mortgage</Link></li>
              <li><Link to="/services#refinancing">Mortgage Refinancing</Link></li>
              <li><Link to="/services#self-employed">Self-Employed</Link></li>
              <li><Link to="/services#private">Private Lending</Link></li>
              <li><Link to="/services#debt-consolidation">Debt Consolidation</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="footer-contact-icon" />
              <span>6685 Tomken Rd Unit 208,<br />Mississauga, ON L5T 2C5</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="footer-contact-icon" />
              <a href="tel:6472227071" style={{ color: 'inherit', textDecoration: 'none' }}>647-222-7071</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="footer-contact-icon" />
              <a href="mailto:info@mortgageswithmanpreet.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@mortgageswithmanpreet.com</a>
            </div>
            <div className="footer-contact-item">
              <Clock size={18} className="footer-contact-icon" />
              <span>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM (By Appt)</span>
            </div>
          </div>
        </div>

        {/* Legal Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Manpreet Singh - Mortgage Agent Level 2 (Lic #M22002134). Under Premium Financial Services (Brokerage Lic #12953). All Rights Reserved.</p>
          <div className="footer-legal">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
