import React, { useState, useEffect } from 'react';
import { Mail, FileText, ArrowUpRight, Copy, Check } from 'lucide-react';
import { person, contactContent } from '../data/content';
import { SectionBackdrop } from './SectionBackdrop';

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Contact() {
  const { sectionTitle, sectionSubtitle, headline, description } = contactContent;
  const [copied, setCopied]     = useState(false);
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    if (!person.resumeFile) return;
    fetch(person.resumeFile, { method: 'HEAD' })
      .then((res) => { if (res.ok) setHasResume(true); })
      .catch(() => setHasResume(false));
  }, []);

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      className="dark-band relative w-full bg-[#172522] text-[#F7F6F0] overflow-hidden"
    >
      <SectionBackdrop variant="dark" seed={6} />

      <div className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-16 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14 md:mb-16">
          <h2
            style={{ letterSpacing: '-0.01em', lineHeight: 1.05 }}
            className="font-serif font-normal text-[#F7F6F0] text-[clamp(40px,5.5vw,72px)] mb-3"
          >
            {sectionTitle}
          </h2>
          <p className="text-[#F7F6F0]/70 text-[15px] sm:text-base md:text-lg">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Headline & Conversational Message */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-[#F7F6F0] mb-4">
              {headline}
            </h3>
            <p className="max-w-[62ch] text-[#F7F6F0]/85 text-[17px] leading-[1.7] mb-6 font-normal text-pretty">
              {description}
            </p>
          </div>

          {/* Right: Contact Action Rows */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {/* 1. GitHub Button */}
            {person.github && (
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-white/[0.15] bg-white/[0.04] rounded-[2px] transition-all duration-200 hover:border-l-[3px] hover:border-l-[#4FB08C] hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-[#F7F6F0] group-hover:text-[#4FB08C] transition-colors" />
                  <span className="text-[15px] font-medium text-[#F7F6F0]">GitHub</span>
                  <span className="font-mono text-xs text-[#F7F6F0]/60">@{person.githubUser}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#F7F6F0]/50 group-hover:text-[#4FB08C] transition-colors" />
              </a>
            )}

            {/* 2. Email Copy Button */}
            {person.email && (
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center justify-between p-4 border border-white/[0.15] bg-white/[0.04] rounded-[2px] text-left transition-all duration-200 hover:border-l-[3px] hover:border-l-[#4FB08C] hover:bg-white/[0.07] focus-visible:outline-none"
                aria-label={`Copy email: ${person.email}`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#F7F6F0] group-hover:text-[#4FB08C] transition-colors" />
                  <span className="text-[15px] font-medium text-[#F7F6F0]">Email</span>
                  <span className="font-mono text-xs sm:text-sm text-[#F7F6F0]/70">{person.email}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 border border-white/20 bg-white/[0.06] rounded-[2px] text-[#F7F6F0] group-hover:border-[#4FB08C] group-hover:text-[#4FB08C] transition-colors">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4FB08C]" />
                      <span>copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>click to copy</span>
                    </>
                  )}
                </div>
              </button>
            )}

            {/* 3. LinkedIn Button */}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-white/[0.15] bg-white/[0.04] rounded-[2px] transition-all duration-200 hover:border-l-[3px] hover:border-l-[#4FB08C] hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-[#F7F6F0] group-hover:text-[#4FB08C] transition-colors" />
                  <span className="text-[15px] font-medium text-[#F7F6F0]">LinkedIn</span>
                  <span className="text-sm text-[#F7F6F0]/70">Connect on LinkedIn</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#F7F6F0]/50 group-hover:text-[#4FB08C] transition-colors" />
              </a>
            )}

            {/* 4. Resume Button (Only if PDF exists in /public) */}
            {hasResume && (
              <a
                href={person.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-white/[0.15] bg-white/[0.04] rounded-[2px] transition-all duration-200 hover:border-l-[3px] hover:border-l-[#4FB08C] hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#F7F6F0] group-hover:text-[#4FB08C] transition-colors" />
                  <span className="text-[15px] font-medium text-[#F7F6F0]">Resume</span>
                  <span className="text-sm text-[#F7F6F0]/70">View curriculum vitae</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#F7F6F0]/50 group-hover:text-[#4FB08C] transition-colors" />
              </a>
            )}
          </div>
        </div>
      </div>
      {/* Footer completely removed. 96px bottom padding provided via paddingBottom on the section. */}
    </section>
  );
}
