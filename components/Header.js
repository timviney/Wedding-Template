import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { WEDDING_DETAILS } from '../constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const root = document.getElementById("__next");

  const scrollToTop = () => {
    root?.scrollTo(0, 0);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/details', label: 'Details' },
    { href: '/rsvp', label: 'RSVP' },
  ];

  const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <header className={`sticky top-0 z-50 bg-primary ${isHomePage ? '' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-text-light hover:text-secondary transition-colors"
            onClick={() => scrollToTop()}
          >
            {WEDDING_DETAILS.initials}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-light tracking-wide text-text-light hover:text-secondary transition-colors relative group"
                onClick={() => scrollToTop()}
                >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              scrollToTop();
            }}
            className="md:hidden p-2 text-text-light hover:text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-light font-light tracking-wide hover:text-secondary transition-colors py-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToTop();
                  }}                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}