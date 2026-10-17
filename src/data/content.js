/**
 * CENTRAL DATA STORE: src/data/content.js
 * Source of truth: Resume data only.
 * No embellishments, no unconfirmed facts.
 */

export const person = {
  name: "Akshat Srivastava",
  subtitle: "UI/UX Designer · Web Developer",
  heroBio: "B.Tech CSE student at JSS Academy of Technical Education, Noida. I design interfaces in Figma and build them with React.",
  email: "sriakshat12@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshat-srivastava-522265407",
  github: "https://github.com/AkshatSri23",
  githubUser: "AkshatSri23",
  showPhone: false, // render phone ONLY if showPhone is true
  location: "Noida, India",
  resumeFile: "/akshat_srivastava_resume.pdf",
};

export const siteMetadata = {
  name: person.name,
  monogram: "AS",
  title: "Akshat Srivastava — UI/UX Designer & Web Developer",
  role: person.subtitle,
  location: person.location,
  coordinates: "28.5355° N, 77.3910° E",
  version: "v2026.1",
  status: {
    available: true,
    label: "open to internships",
  },
};

export const navigationLinks = [
  { id: "hero",    label: "Home",     href: "#hero" },
  { id: "about",   label: "About",    href: "#about" },
  { id: "projects",label: "Projects", href: "#projects" },
  { id: "posters", label: "Posters",  href: "#posters" },
  { id: "skills",  label: "Skills",   href: "#skills" },
  { id: "contact", label: "Contact",  href: "#contact" },
];

export const heroContent = {
  name: person.name,
  subtitle: person.subtitle,
  copy: person.heroBio,
  actions: [
    {
      label: "View projects",
      href: "#projects",
      symbol: "↓",
      primary: true,
    },
    {
      label: "Contact me",
      href: "#contact",
      symbol: "",
      primary: false,
    },
  ],
};

export const aboutContent = {
  sectionTitle: "About Me",
  sectionSubtitle: "Who I am and what I'm studying.",
  bio: "I'm a B.Tech Computer Science student at JSS Academy of Technical Education, Noida. I design interfaces in Figma and build web applications with React. I also work with Java.",
  profileCard: [
    { label: "Role",      value: "Designer and Web Developer" },
    { label: "Education", value: "B.Tech CSE, JSS Academy of Technical Education" },
    { label: "Location",  value: "Noida, India" },
    { label: "Status",    value: "Open to internships", hasDot: true },
  ],
  timeline: [
    {
      title: "Designer",
      institution: "MMIL Tech Society, JSS Academy of Technical Education",
      location: "Noida, Uttar Pradesh",
      period: "Present",
      points: [], // Bullet removed as instructed
    },
    {
      title: "B.Tech in Computer Science and Engineering",
      institution: "JSS Academy of Technical Education",
      location: "Noida, Uttar Pradesh",
      period: "2025 – 2029",
      points: [],
    },
    {
      title: "ISC (Class XII) – 93%",
      institution: "St. Mary's School",
      location: "Mirzapur, Uttar Pradesh",
      period: "",
      points: [],
    },
    {
      title: "ICSE (Class X) – 95%",
      institution: "St. Mary's School",
      location: "Mirzapur, Uttar Pradesh",
      period: "",
      points: [],
    },
  ],
};

export const projectsContent = {
  sectionTitle: "Selected Work",
  sectionSubtitle: "Things I've designed and built.",
  items: [
    {
      index: "01",
      name: "College Garba Event Website",
      tools: [],
      year: "2026",
      points: [
        "Worked on the official website for the college's garba event",
      ],
      links: {
        live: "https://garba-eve2k26-bwpe.vercel.app/",
      },
      screenshot: "/projects/garba.png",
      domain: "garba-eve2k26-bwpe.vercel.app",
      alt: "Screenshot of the garba event website homepage",
    },
    {
      index: "02",
      name: "MMIL Official Website",
      tools: ["Figma"],
      year: "",
      points: [
        "Designed the official MMIL website (mmil.club)",
      ],
      links: {
        live: "https://mmil.club",
      },
      screenshot: "/projects/mmil.png",
      domain: "mmil.club",
      alt: "Screenshot of the MMIL official website homepage",
    },
  ],
};

export const postersContent = {
  sectionTitle: "Poster Design",
  sectionSubtitle: "",
  posters: [
    {
      id: "poster-1",
      image: "/posters/poster-1.webp",
      title: "Recruitments 2026",
      description: "Theatrical recruitment poster featuring performance photography and a vintage film aesthetic.",
    },
    {
      id: "poster-2",
      image: "/posters/poster-2.webp",
      title: "Axiom",
      description: "Programming workshop poster designed with bold geometry and split-tone contrast.",
    },
  ],
};

export const skillsContent = {
  sectionTitle: "Skills & Tools",
  sectionSubtitle: "Tools I work with.",
  categories: [
    {
      name: "Design",
      items: ["Figma", "Canva", "UI/UX Design", "Web Design", "Poster Design"],
    },
    {
      name: "Development",
      items: ["Java", "React", "Competitive Programming"],
    },
    {
      name: "Tools",
      items: ["Git", "GitHub"],
    },
  ],
};

export const activitiesContent = {
  sectionTitle: "Beyond Code",
  sectionSubtitle: "Volunteering and campus involvement.",
  items: [
    {
      title: "Akshargyan",
      text: "Volunteer teaching underprivileged children",
    },
    {
      title: "Campus Activities",
      text: "Active participant in college activities including Nukkad Natak and Model UN",
    },
  ],
};

export const contactContent = {
  sectionTitle: "Get in Touch",
  sectionSubtitle: "Let's talk.",
  headline: "Have an interesting problem to solve?",
  description: "I'm currently looking for internships and opportunities to design and build thoughtful software. Feel free to reach out directly.",
};
