import React from 'react';
import { motion } from 'framer-motion';
import { heroContent } from '../data/content';
import { HeroBackground } from './HeroBackground';

export function Hero() {
  const { name, subtitle, copy, actions } = heroContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[88vh] flex items-center justify-center px-6 py-16 bg-[#F7F6F0] border-b border-[#DCDDD4] overflow-hidden"
    >
      {/* Pure Line Geometry Background (No text, no numbers, no clock) */}
      <HeroBackground />

      {/* Centered Editorial Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto"
      >
        {/* 1. Headline: Newsreader, regular 400, looser letter spacing, text-wrap: balance */}
        <motion.h1
          variants={itemVariants}
          style={{ letterSpacing: '-0.015em', lineHeight: 1.0 }}
          className="font-serif font-normal text-[#172522] text-[clamp(56px,10vw,144px)] select-text mb-4 text-balance"
        >
          {name}
        </motion.h1>

        {/* 2. Subtitle: UI/UX Designer · Web Developer */}
        <motion.p
          variants={itemVariants}
          className="font-sans font-medium text-[#172522] text-[clamp(18px,2.2vw,26px)] leading-snug mb-5"
        >
          {subtitle}
        </motion.p>

        {/* 3. One plain sentence: Inter 17px, line-height 1.7, color #172522, max-w-[62ch], text-wrap: pretty */}
        <motion.p
          variants={itemVariants}
          className="max-w-[62ch] text-[#172522] text-[17px] leading-[1.7] mb-8 font-normal text-pretty"
        >
          {copy}
        </motion.p>

        {/* 4. Two actions: View projects (solid charcoal -> forest green) and Contact me (outline -> green fill) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {actions.map((action, idx) => {
            if (action.primary) {
              return (
                <a
                  key={idx}
                  href={action.href}
                  className="group inline-flex items-center gap-2 bg-[#172522] text-[#F7F6F0] px-6 py-3 font-sans font-medium text-[15px] tracking-[0.01em] rounded-[2px] transition-colors duration-200 hover:bg-[#176B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
                >
                  <span>{action.label}</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-y-0.5"
                  >
                    {action.symbol}
                  </span>
                </a>
              );
            }
            return (
              <a
                key={idx}
                href={action.href}
                className="inline-flex items-center px-6 py-3 border border-[#172522] text-[#172522] font-sans font-medium text-[15px] tracking-[0.01em] rounded-[2px] bg-transparent transition-all duration-200 hover:bg-[#176B52] hover:border-[#176B52] hover:text-[#F7F6F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
              >
                <span>{action.label}</span>
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
