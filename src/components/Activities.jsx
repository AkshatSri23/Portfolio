import React from 'react';
import { HeartHandshake, Theater } from 'lucide-react';
import { activitiesContent } from '../data/content';
import { SectionBackdrop } from './SectionBackdrop';

const ICONS = [HeartHandshake, Theater];

export function Activities() {
  const { sectionTitle, sectionSubtitle, items } = activitiesContent;

  return (
    <section
      id="activities"
      className="relative w-full bg-[#F7F6F0] border-b border-[#DCDDD4] py-20 md:py-28 overflow-hidden"
    >
      <SectionBackdrop variant="light" seed={5} />

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

        {/* Asymmetric two-card grid: 7 cols + 5 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {items.map((act, idx) => {
            const Icon = ICONS[idx] || HeartHandshake;
            const isFirst = idx === 0;

            return (
              <div
                key={idx}
                className={`group border border-[#DCDDD4] bg-[#F7F6F0] rounded-[2px] flex flex-col gap-5 transition-all duration-200 hover:border-[#176B52] ${
                  isFirst ? 'md:col-span-7' : 'md:col-span-5'
                }`}
                style={{ padding: '32px' }}
              >
                {/* Icon box */}
                <div
                  className="w-11 h-11 bg-[#172522] flex items-center justify-center rounded-[2px] shrink-0 transition-colors duration-200 group-hover:bg-[#176B52]"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 text-[#F7F6F0]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3
                  className="font-serif font-normal text-[#172522]"
                  style={{ fontSize: 'clamp(22px,2.5vw,30px)', letterSpacing: '-0.01em', lineHeight: 1.15 }}
                >
                  {act.title}
                </h3>

                {/* Body text */}
                <p className="font-sans text-[17px] text-[#172522] leading-[1.7] font-normal text-pretty">
                  {act.text}
                </p>
                {/* Chips removed: Campus Activities card has icon, title, and sentence only */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
