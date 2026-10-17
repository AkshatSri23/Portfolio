import React, { useState, useEffect } from 'react';
import { projectsContent } from '../data/content';
import { SectionBackdrop } from './SectionBackdrop';

function ProjectItem({ project }) {
  const [hasRealScreenshot, setHasRealScreenshot] = useState(false);

  useEffect(() => {
    if (!project.screenshot) {
      setHasRealScreenshot(false);
      return;
    }
    const img = new Image();
    img.src = project.screenshot;
    img.onload = () => setHasRealScreenshot(true);
    img.onerror = () => setHasRealScreenshot(false);
  }, [project.screenshot]);

  const hasTools = project.tools && project.tools.length > 0;
  const hasYear = Boolean(project.year && project.year.trim());
  const hasLive = Boolean(project.links && project.links.live);

  return (
    <div className="py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group">
      {/* Content Column: spans full 12 cols if no screenshot exists, else 7 cols */}
      <div className={hasRealScreenshot ? 'lg:col-span-7' : 'lg:col-span-12'}>
        {/* Project Name in Newsreader (Ivory) */}
        <h3 className="font-serif font-normal text-3xl sm:text-4xl text-[#F7F6F0] leading-tight mb-4 transition-transform duration-200 group-hover:translate-x-1.5">
          {project.name}
        </h3>

        {/* Bullet Points in Readable Inter 16px (Ivory at ~85% opacity) */}
        <ul className="space-y-2.5 mb-7">
          {project.points.map((pt, pIdx) => (
            <li
              key={pIdx}
              className="text-[16px] text-[#F7F6F0]/85 leading-relaxed flex items-start gap-3"
            >
              <span className="text-[#4FB08C] font-mono text-sm mt-0.5 shrink-0">—</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        {/* Tool Chips, Year, and Live Link (Empty tools = no chips) */}
        <div className="flex flex-wrap items-center gap-2.5 pt-5 border-t border-white/[0.12]">
          {hasTools &&
            project.tools.map((tool, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 border border-white/25 bg-white/[0.04] text-[13px] font-mono text-[#F7F6F0] rounded-[2px]"
              >
                {tool}
              </span>
            ))}

          {hasYear && (
            <span className="px-2 py-1 text-[13px] font-mono tabular-nums text-[#F7F6F0]/60">
              [{project.year}]
            </span>
          )}

          {/* Visit site link (Render ONLY if URL exists) */}
          {hasLive && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-[15px] font-sans font-medium text-[#F7F6F0] hover:text-[#4FB08C] transition-colors"
            >
              <span>Visit site</span>
              <span className="transition-colors group-hover:text-[#4FB08C]">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Clickable Real Screenshot Frame (Only rendered if actual image exists) */}
      {hasRealScreenshot && (
        <div className="lg:col-span-5 w-full">
          {hasLive ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-white/[0.18] bg-black/40 rounded-[2px] overflow-hidden transition-all duration-200 group-hover:border-[#4FB08C] group/frame"
              title={`Visit ${project.name}`}
            >
              <div className="bg-[#172522] border-b border-white/[0.12] px-4 py-2 flex items-center justify-between font-mono text-[13px] text-[#F7F6F0]/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20 bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20 bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20 bg-white/10" />
                </div>
                <span className="truncate max-w-[220px] text-[#F7F6F0] font-mono text-[13px]">
                  {project.domain || project.name.toLowerCase()}
                </span>
                <span className="text-xs text-[#4FB08C] group-hover/frame:underline">
                  open ↗
                </span>
              </div>
              <div className="aspect-[16/10] overflow-hidden bg-black/30">
                <img
                  src={project.screenshot}
                  alt={project.alt || `Screenshot of ${project.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/frame:scale-[1.01]"
                />
              </div>
            </a>
          ) : (
            <div className="border border-white/[0.18] bg-black/40 rounded-[2px] overflow-hidden">
              <div className="bg-[#172522] border-b border-white/[0.12] px-4 py-2 flex items-center justify-between font-mono text-[13px] text-[#F7F6F0]/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20 bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20 bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20 bg-white/10" />
                </div>
                <span className="truncate max-w-[220px] text-[#F7F6F0] font-mono text-[13px]">
                  {project.domain || project.name.toLowerCase()}
                </span>
                <span className="text-xs text-[#F7F6F0]/50">preview</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden bg-black/30">
                <img
                  src={project.screenshot}
                  alt={project.alt || `Screenshot of ${project.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SelectedWork() {
  const { sectionTitle, sectionSubtitle, items } = projectsContent;

  return (
    <section id="projects" className="dark-band relative w-full bg-[#172522] text-[#F7F6F0] border-b border-white/[0.12] py-20 md:py-28 overflow-hidden">
      <SectionBackdrop variant="dark" seed={2} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
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

        {/* Editorial Project List Separated by 1px rgba(255,255,255,0.12) Hairlines */}
        <div className="border-t border-white/[0.12] divide-y divide-white/[0.12]">
          {items.map((project) => (
            <ProjectItem key={project.index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
