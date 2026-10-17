import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteMetadata, navigationLinks, person } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { SectionBackdrop } from './SectionBackdrop';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasResume, setHasResume] = useState(false);
  const [visibleSections, setVisibleSections] = useState(() =>
    navigationLinks.map((l) => l.id)
  );

  // Observe which section IDs actually exist in the DOM
  useEffect(() => {
    function checkSections() {
      setVisibleSections(
        navigationLinks.map((l) => l.id).filter((id) => !!document.getElementById(id))
      );
    }
    checkSections();
    const t = setTimeout(checkSections, 1200);
    return () => clearTimeout(t);
  }, []);

  const activeId = useScrollSpy(visibleSections);

  useEffect(() => {
    if (!person.resumeFile) return;
    fetch(person.resumeFile, { method: 'HEAD' })
      .then((res) => { if (res.ok) setHasResume(true); })
      .catch(() => setHasResume(false));
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Only show nav links for sections that exist in the DOM
  const visibleLinks = navigationLinks.filter((l) => visibleSections.includes(l.id));

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F6F0] border-b border-[#DCDDD4]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Monogram ONLY (no name text) */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
          aria-label="Akshat Srivastava, home"
        >
          <div className="w-7 h-7 border border-[#172522] flex items-center justify-center font-mono text-xs font-semibold text-[#172522] transition-colors group-hover:border-[#176B52] group-hover:text-[#176B52]">
            {siteMetadata.monogram}
          </div>
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium tracking-[0.01em] text-[#172522]">
          {visibleLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative py-1 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#176B52]'
                    : 'text-[#172522] hover:text-[#176B52]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[#176B52]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Resume + Mobile Hamburger) */}
        <div className="flex items-center gap-3">
          {/* Resume Button */}
          {hasResume && (
            <a
              href={person.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 border border-[#0F4434] bg-[#0F4434] text-[#F7F6F0] font-sans font-medium text-[13px] sm:text-[14px] rounded-[2px] transition-all duration-200 hover:bg-[#0B3528] hover:border-[#0B3528] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4434]"
            >
              <span>Resume</span>
              <span className="text-xs">↗</span>
            </a>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 border border-[#172522] flex items-center justify-center text-[#172522] rounded-[2px] hover:border-[#176B52] hover:text-[#176B52] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[#F7F6F0] z-40 flex flex-col justify-between p-6 sm:p-8 border-t border-[#DCDDD4] overflow-hidden"
          >
            {/* Background geometry & subtle wash matching the site */}
            <SectionBackdrop variant="light" seed={7} />

            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Navigation Links with Editorial Indexing */}
              <nav className="flex flex-col divide-y divide-[#DCDDD4]/80 pt-2">
                {visibleLinks.map((link, idx) => {
                  const isActive = activeId === link.id;
                  const numStr = String(idx + 1).padStart(2, '0');
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group flex items-baseline justify-between py-4 transition-colors"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs tabular-nums text-[#176B52] font-medium">
                          {numStr}
                        </span>
                        <span
                          className={`font-serif text-[26px] tracking-tight transition-colors ${
                            isActive
                              ? 'text-[#176B52]'
                              : 'text-[#172522] group-hover:text-[#176B52]'
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#176B52]" />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Drawer Footer with Status & Location */}
              <div className="pt-6 border-t border-[#DCDDD4] flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-sans text-[#5C6662]">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#176B52] animate-pulse" />
                    Open to internships
                  </span>
                  <span className="font-mono">{siteMetadata.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
