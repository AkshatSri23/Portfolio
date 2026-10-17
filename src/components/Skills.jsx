import React from 'react';
import { PenTool, LayoutTemplate, Image, Layers, Terminal } from 'lucide-react';
import {
  SiFigma,
  SiReact,
  SiVite,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { skillsContent } from '../data/content';
import { SectionBackdrop } from './SectionBackdrop';

// Map each skill name to its icon component and display label
const SKILL_ICONS = {
  Figma:                    { Icon: SiFigma,         label: 'Figma' },
  Canva:                    { Icon: Layers,          label: 'Canva' },
  'UI/UX Design':           { Icon: PenTool,         label: 'UI/UX Design' },
  'Web Design':             { Icon: LayoutTemplate,  label: 'Web Design' },
  'Poster Design':          { Icon: Image,           label: 'Poster Design' },
  Java:                     { Icon: FaJava,          label: 'Java' },
  React:                    { Icon: SiReact,         label: 'React' },
  Vite:                     { Icon: SiVite,          label: 'Vite' },
  'Competitive Programming':{ Icon: Terminal,        label: 'Competitive Programming' },
  Git:                      { Icon: SiGit,           label: 'Git' },
  GitHub:                   { Icon: SiGithub,        label: 'GitHub' },
};

function SkillTile({ skillName }) {
  const entry = SKILL_ICONS[skillName];
  if (!entry) return null;
  const { Icon, label } = entry;
  return (
    <div
      className="
        group flex flex-col items-center justify-center gap-2.5
        border border-[#DCDDD4] bg-[#F7F6F0] rounded-[2px]
        cursor-default select-none
        transition-all duration-200
        hover:border-[#176B52] hover:bg-[#EFEFE7]
      "
      style={{ height: '112px' }}
    >
      <Icon
        size={28}
        className="text-[#172522] group-hover:text-[#176B52] transition-colors duration-200"
      />
      <span className="font-sans text-[15px] font-medium text-[#172522] group-hover:text-[#176B52] transition-colors duration-200 text-center px-2 leading-tight">
        {label}
      </span>
    </div>
  );
}

export function Skills() {
  const { sectionTitle, sectionSubtitle, categories } = skillsContent;

  return (
    <section id="skills" className="relative w-full bg-[#EFEFE7] border-b border-[#DCDDD4] py-20 md:py-28 overflow-hidden">
      <SectionBackdrop variant="surface" seed={4} />

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

        {/* Editorial rows with hairline separators */}
        <div className="flex flex-col divide-y divide-[#DCDDD4]">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-12"
            >
              {/* Left: category name */}
              <div className="md:col-span-4">
                <h3
                  className="font-serif font-normal text-[#172522]"
                  style={{ fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
                >
                  {cat.name}
                </h3>
              </div>

              {/* Right: icon tile grid */}
              <div className="md:col-span-8">
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(132px, 1fr))' }}
                >
                  {cat.items.map((skillName) => (
                    <SkillTile key={skillName} skillName={skillName} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
