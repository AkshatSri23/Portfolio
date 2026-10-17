import React from 'react';
import { PenTool, GraduationCap, MapPin, CircleDot } from 'lucide-react';
import { aboutContent } from '../data/content';
import { SectionBackdrop } from './SectionBackdrop';

export function About() {
  const {
    sectionTitle,
    sectionSubtitle,
    bio,
    profileCard,
    timeline,
  } = aboutContent;

  // Map icon names to lucide components
  const iconMap = {
    Role: PenTool,
    Education: GraduationCap,
    Location: MapPin,
    Status: CircleDot,
  };

  return (
    <section id="about" className="relative w-full bg-[#EFEFE7] border-b border-[#DCDDD4] py-20 md:py-28 overflow-hidden">
      <SectionBackdrop variant="surface" seed={1} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14 md:mb-16">
          <h2
            style={{ letterSpacing: '-0.01em', lineHeight: 1.05 }}
            className="font-serif font-normal text-[#172522] text-[clamp(40px,5.5vw,72px)] mb-3"
          >
            {sectionTitle}
          </h2>
          <p className="text-[#5C6662] text-[15px] sm:text-base md:text-lg">
            {sectionSubtitle}
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bio + Overview Card */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p className="max-w-[62ch] text-[#172522] text-[17px] leading-[1.7] font-normal text-pretty">
              {bio}
            </p>

            {/* Overview Card — icon + block layout */}
            <div
              className="border border-[#DCDDD4] bg-[#F7F6F0] rounded-[2px]"
              style={{ padding: '28px' }}
            >
              <h3 className="font-sans font-semibold text-[14px] uppercase tracking-[0.08em] text-[#5C6662] mb-6 pb-3 border-b border-[#DCDDD4]">
                Overview
              </h3>

              {/* First two: full-width blocks */}
              <div className="flex flex-col gap-5 mb-5">
                {profileCard.slice(0, 2).map((row, idx) => {
                  const Icon = iconMap[row.label] || PenTool;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 border border-[#DCDDD4] flex items-center justify-center shrink-0 mt-0.5 rounded-[2px]">
                        <Icon className="w-4 h-4 text-[#172522]" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-sans text-[12px] uppercase tracking-[0.07em] text-[#5C6662] font-medium">
                          {row.label}
                        </span>
                        <span className="font-sans text-[15px] text-[#172522] font-normal leading-snug">
                          {row.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Last two: side by side (or stacked on mobile) */}
              <div className="border-t border-[#DCDDD4] pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {profileCard.slice(2).map((row, idx) => {
                  const Icon = iconMap[row.label] || MapPin;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 border border-[#DCDDD4] flex items-center justify-center shrink-0 mt-0.5 rounded-[2px]">
                        <Icon className="w-4 h-4 text-[#172522]" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-sans text-[12px] uppercase tracking-[0.07em] text-[#5C6662] font-medium">
                          {row.label}
                        </span>
                        <span className="font-sans text-[15px] text-[#172522] font-normal leading-snug flex items-center gap-1.5">
                          {row.hasDot && (
                            <span className="w-2 h-2 rounded-full bg-[#176B52] animate-pulse shrink-0" />
                          )}
                          {row.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Combined Vertical Timeline (Education & Experience) */}
          <div className="lg:col-span-7">
            <div className="border border-[#DCDDD4] bg-[#F7F6F0] p-6 sm:p-8 rounded-[2px]">
              <h3 className="font-sans font-semibold text-[18px] text-[#172522] mb-8 pb-3 border-b border-[#DCDDD4]">
                Education &amp; Experience
              </h3>

              {/* Timeline Container with thin vertical line and square nodes */}
              <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#DCDDD4]">
                {timeline.map((item, idx) => {
                  const hasPeriod = Boolean(item.period && item.period.trim());
                  const hasPoints = item.points && item.points.length > 0;

                  return (
                    <div key={idx} className="relative group">
                      {/* Square Node */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-3 h-3 border border-[#172522] bg-[#F7F6F0] group-hover:bg-[#176B52] group-hover:border-[#176B52] transition-colors"
                      />

                      {/* Content */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-[17px] font-semibold text-[#172522]">
                            {item.title}
                          </h4>
                          {hasPeriod && (
                            <span className="font-mono text-[13px] tabular-nums px-2.5 py-0.5 border border-[#DCDDD4] bg-[#EFEFE7] text-[#172522] rounded-[2px]">
                              {item.period}
                            </span>
                          )}
                        </div>

                        <div className="text-[15px] text-[#5C6662]">
                          <span>{item.institution}</span>
                          {item.location && <span> · {item.location}</span>}
                        </div>

                        {hasPoints && (
                          <ul className="mt-2 space-y-1.5">
                            {item.points.map((pt, pIdx) => (
                              <li
                                key={pIdx}
                                className="text-[15px] text-[#172522] leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-[#176B52] font-mono mt-0.5 shrink-0">—</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
