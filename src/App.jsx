import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SelectedWork } from './components/SelectedWork';
import { PosterDesign } from './components/PosterDesign';
import { Skills } from './components/Skills';
import { Activities } from './components/Activities';
import { Contact } from './components/Contact';

export function App() {
  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#172522] flex flex-col font-sans selection:bg-[#176B52] selection:text-[#F7F6F0]">
      {/* Sticky Solid Hairline Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero — ivory #F7F6F0 */}
        <Hero />

        {/* About — surface #EFEFE7 */}
        <About />

        {/* Selected Work — charcoal #172522 */}
        <SelectedWork />

        {/* Poster Design — ivory #F7F6F0 (hidden if no posters exist) */}
        <PosterDesign />

        {/* Skills & Tools — surface #EFEFE7 */}
        <Skills />

        {/* Beyond Code — ivory #F7F6F0 */}
        <Activities />
      </main>

      {/* Contact — charcoal #172522, last section, no footer */}
      <Contact />
    </div>
  );
}

export default App;
