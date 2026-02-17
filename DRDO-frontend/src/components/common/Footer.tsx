import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-800 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About / Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <div className="font-bold text-lg">DRDO Portal</div>
                <div className="text-xs text-primary-200">Defence Research</div>
              </div>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed">
              Advancing India's defence capabilities through cutting-edge research and innovation.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white transition-colors text-sm">
                  About Organisation
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Research & Development
                </Link>
              </li>
              <li>
                <Link to="/labs" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Laboratories
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-primary-200 hover:text-white transition-colors text-sm">
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/careers" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link to="/tenders" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Tenders & Procurement
                </Link>
              </li>
              <li>
                <Link to="/technology" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Technology Areas
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-200">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>DRDO Bhawan, Rajaji Marg, New Delhi - 110011</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-200">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91-11-2300-0000</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-200">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@drdo.gov.in</span>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="mt-6">
              <h5 className="font-medium text-sm mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-700 hover:bg-accent-400 flex items-center justify-center transition-colors focus-ring"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-700 hover:bg-accent-400 flex items-center justify-center transition-colors focus-ring"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-700 hover:bg-accent-400 flex items-center justify-center transition-colors focus-ring"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-700 hover:bg-accent-400 flex items-center justify-center transition-colors focus-ring"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-200">
            <p>© {currentYear} DRDO Portal. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
