import React, { useState, useEffect } from 'react';
import { siteMetadata, navigationLinks, person } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';

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
    // Check immediately, and again after a short delay for async-rendered sections
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

        {/* Right: Resume Button only (no status dot) */}
        <div className="hidden sm:flex items-center">
          {hasResume && (
            <a
              href={person.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#176B52] bg-[#176B52] text-[#F7F6F0] font-sans font-medium text-[14px] rounded-[2px] transition-all duration-200 hover:bg-[#12523e] hover:border-[#12523e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
            >
              <span>Resume</span>
              <span className="text-xs">↗</span>
            </a>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden font-mono text-xs border border-[#DCDDD4] px-3 py-1.5 text-[#172522] hover:border-[#172522] transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? 'close [×]' : 'menu [=]'}
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#F7F6F0] z-40 flex flex-col justify-between p-8 border-t border-[#DCDDD4]">
          <nav className="flex flex-col gap-6 pt-4">
            {visibleLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-2xl font-serif flex items-center justify-between border-b border-[#DCDDD4] pb-3 transition-colors ${
                    isActive ? 'text-[#176B52]' : 'text-[#172522]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-sm font-sans text-[#5C6662]">
                    →
                  </span>
                </a>
              );
            })}

            {/* Resume inside mobile menu */}
            {hasResume && (
              <a
                href={person.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 p-3 border border-[#176B52] bg-[#176B52] text-[#F7F6F0] font-medium text-base rounded-[2px] hover:bg-[#12523e] hover:border-[#12523e] transition-colors"
              >
                <span>Resume</span>
                <span>↗</span>
              </a>
            )}
          </nav>

          <div className="pt-6 border-t border-[#DCDDD4] flex items-center justify-end font-sans text-sm text-[#5C6662]">
            <span>{siteMetadata.location}</span>
          </div>
        </div>
      )}
    </header>
  );
}
