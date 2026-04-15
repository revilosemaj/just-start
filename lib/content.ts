// ─────────────────────────────────────────────
// lib/content.ts
// Edit all portfolio text content here.
// ─────────────────────────────────────────────

// ── Nav ──────────────────────────────────────
export const SITE_LOGO = "OJA";

export const NAV_LINKS = [
  { id: "services",      label: "Services"      },
  { id: "projects",      label: "Portfolio"     },
  { id: "experience",    label: "Experience"    },
  { id: "contact",       label: "Contact"       },
];

// ── Hero ─────────────────────────────────────
export const HERO = {
  sectionLabel:  "My Name Is",
  firstName:     "Oliver James",
  lastName:      "Aco.",
  imageAlt:      "Oliver James Aco",
  subtitle:      "Web Developer & Frontend Specialist",
  bio:           "Developer from the Philippines with over +7 years of experience in the IT industry. I build high-quality, user-focused web applications using modern technologies and best practices.",
};

// ── Social links (shared by Hero & Footer) ───
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href:  "https://github.com/revilosemaj",
    // SVG path kept in component — only the editable fields live here
  },
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/in/oliver-james-aco-3596581ba/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BTbyA0CC5RDeFhERkm2nE6w%3D%3D",
  },
  {
    label: "Email",
    href:  "mailto:oliverjamesaco@gmail.com",
  },
];

// ── Services ─────────────────────────────────
export const SERVICES_SECTION = {
  label: "My Services",
  title: "Specialized In",
};

export const SERVICES = [
  {
    title: "UI/UX Design",
    desc:  "Crafting clean, intuitive interfaces that delight users. From wireframes to polished components with a focus on accessibility and great user experience.",
  },
  {
    title: "Application Development",
    desc:  "Building full-stack web applications with React, Next.js, and Node.js. Performant, scalable solutions deployed on modern cloud infrastructure.",
  },
  {
    title: "Web Development",
    desc:  "End-to-end web development from architecture to deployment. Responsive, cross-browser compatible sites built with modern frameworks and best practices.",
  },
];

// ── Projects ─────────────────────────────────
export const PROJECTS_SECTION = {
  label: "My Works",
  title: "Featured Portfolios",
};

export const PROJECTS = [
  {
    title:    "Feiwin Admin Dashboard",
    category: "Application Development",
    tags:     ["React", "TypeScript", "Redux", "Sass"],
    href:     "https://admin-h5.feiwin.dev/",
    image:    "/portfolio-feiwin.png",
  },
  {
    title:    "Xytron International",
    category: "Web Development",
    tags:     ["HTML", "CSS", "JavaScript", "PHP"],
    href:     "https://www.xytron.com/",
    image:    "/portfolio-xytron.png",
  },
  {
    title:    "OJA — Personal Portfolio",
    category: "Frontend Development",
    tags:     ["Next.js", "TypeScript", "Tailwind"],
    href:     "https://ojaco.dev/",
    image:    "/portfolio-ojaco.png",
  },
];

// ── Work Experience ───────────────────────────
export const EXPERIENCE_SECTION = {
  label: "Career Path",
  title: "Work Experience",
};

export const JOBS = [
  {
    role:    "Senior Web Developer(ReactJS/NextJS)",
    company: "WBridges Manpower Corporation",
    period:  "Feb 2024 - Oct 2024",
    desc:    "Engineered and scaled multiple production web applications with Next.js, TypeScript, and React-Redux, supporting international audiences via Next-intl. Streamlined deployments using Jenkins CI/CD and Docker on AWS EC2, reducing manual release overhead. Coordinated feature delivery and bug resolution through Confluence, Zentao, and Trello while maintaining clear communication with offshore clients across distributed teams.",
    tags:    ["React", "TypeScript", "Next.js","Redux","Sass","Zod","VideoJS","Lodash","NodeJS","Docker","Gitlab","Jenkins","AWS","Wordpress"],
  },
  {
    role:    "Frontend Developer",
    company: "NewStars Inc,",
    period:  "Jun 2023 - Feb 2024",
    desc:    "Built and maintained production-grade web applications with a modern stack — Next.js, TypeScript, Zustand for state management, Zod for schema validation, and React Hook Form for performant form handling — alongside Node.js for backend development. Delivered multilingual support via Next-intl and integrated third-party services using Axios and Lodash. Additionally developed a WordPress/Elementor blog site, demonstrating versatility across different tech ecosystems. Supported offshore clients effectively and upheld high code quality standards throughout all projects.",
    tags:    ["NextJS", "Typescript","Zustand", "Sass","BEM","Axios","I18n","Wordpress"],
  },
  {
    role:    "Software Engineering Analysis / Advanced App Engineering Senior Analyst",
    company: "Accenture in the Philippines",
    period:  "Aug 2021 - Apr 2023",
    desc:    "Drove quality assurance efforts by writing comprehensive test scenarios and functions from Salesforce user stories, reducing regression risks and improving release confidence. Managed the full defect lifecycle — from logging detailed Jira tickets to investigating and resolving customer-reported issues in ServiceNow — ensuring minimal disruption to end users. Supported offshore clients with a strong track record of on-time ticket resolution while adhering to Agile methodologies, contributing to predictable and reliable sprint outcomes.",
    tags:    ["React", "Redux", "Github", "Okta Administration","Zuora","ServiceNow","Graphql","Typescript","Styled-components","Salesforce Lightning","AWS"],
  },
  {
    role:    "Web Developer",
    company: "Xytron International Inc,",
    period:  "Apr 2018 - Apr 2021",
    desc:    "Delivered full-cycle web development across multiple projects — from building bulk email-sending applications and designing bank SOA email templates, to coding complete websites in HTML, CSS, JavaScript, PHP, and jQuery. Expanded the team's technical footprint by developing a VB.NET utility desktop application, demonstrating versatility across web and desktop environments. Sustained and enhanced a live web forum application through consistent maintenance and iterative feature additions, while overseeing database management to ensure stable and performant data operations.",
    tags:    ["HTML", "CSS", "PHP", "JQuery","Javascript","CodeIgniter","Bootstrap","Mysql","XAMPP"],
  },
];

// ── Testimonials ─────────────────────────────
export const TESTIMONIALS_SECTION = {
  label: "My Clients",
  title: "Testimonials",
};

export const TESTIMONIALS = [
  {
    name:     "Mark Angelo Barnatcha",
    role:     "Sr. Software Engineer",
    company:  "Accenture Inc,",
    initials: "MB",
    src: "/mb_profile.jpg",
    text:     "Oliver is one of those rare people you can always count on. Whether it's a big project or a last-minute idea at midnight, he shows up — thoughtful, prepared, and somehow already three steps ahead. What impresses me most is how he combines that reliability with genuine creativity. He doesn't just get things done, he finds a better way to do them. Working alongside him, you quickly realize that his ideas aren't just clever — they actually work. Anyone lucky enough to have Oliver in their corner knows exactly what I mean.",
  },
  {
    name:     "Alfie Bangcong",
    role:     "Graphic Designer",
    company:  "Pacific Rim",
    initials: "AB",
    src: "/ab_profile.jpg",
    text:     "We are so thankful to have Oliver on our team. I can always count on him to come to me and talk about any challenges or concerns right away. He delivers clean, well-thought code and is an excellent communicator.",
  },
  {
    name:     "Melwin Sabales",
    role:     "ReactJS Developer",
    company:  "Stratpoint Technologies Inc,",
    initials: "MS",
    src: "/ms_profile.jpg",
    text:     "I am grateful to have a friend like Oliver, He is not only great friend, but also he's highly experience in Frontend design. His skills is impressive, and he has been valuable mentor to me. Through his guidance, I've developed interest in creating engaging, and beautiful designs using ReactJS. I sincerely appreciate his guidance and encouragement.",
  },
  
];

// ── Education & Skills ────────────────────────
export const EDUCATION_SECTION = {
  label:          "Learning Path",
  title:          "Education & Skills",
  educationLabel: "Education",
  skillsLabel:    "Technical Skills",
};

export const EDUCATION = [
  {
    degree: "Bachelor of Science",
    field:  "Information Technology",
    school: "Pamantasan ng Lungsod ng Marikina",
    year:   "2013 – 2017",
  },
  {
    degree: "Zero To Mastery Academy",
    field:  "Full-Stack Web Development",
    school: "Online Academy",
    year:   "2024 - 2025",
  },
];

export const SKILLS = [
  { name: "React / Next.js",      level: 92 }, // primary stack across 3 recent roles
  { name: "CSS / Sass",           level: 90 }, // used across all 4 jobs
  { name: "TypeScript",           level: 88 }, // consistent across 3 recent roles
  { name: "Redux / Zustand",      level: 82 }, // state management in 3 roles
  { name: "Node.js",              level: 75 }, // backend work in most recent role
  { name: "Docker / AWS / CI-CD", level: 72 }, // Jenkins, Docker, AWS in senior role
];

// ── Contact ───────────────────────────────────
export const CONTACT_SECTION = {
  label:            "Get In Touch",
  title:            "Got a Project in Mind?",
  subtitle:         "I'd love to hear from you. Send me a message and I'll get back to you.",
  namLabel:         "Your Name",
  namePlaceholder:  "John Doe",
  emailLabel:       "Your Email",
  emailPlaceholder: "you@example.com",
  messageLabel:     "Your Message",
  messagePlaceholder: "Tell me about your project...",
  submitLabel:      "Send Message",
  submittingLabel:  "Sending...",
  successMessage:   "Thank you! Your message has been sent successfully.",
  errorMessage:     "Sorry, there was an error sending your message. Please try again.",
  emailSubject:     "New Message from Portfolio Website",
};

// ── Footer ────────────────────────────────────
export const FOOTER = {
  logo:        "OJA",
  description: "Oliver James Aco — Web Developer from the Philippines crafting clean, performant web experiences.",
  contactLabel: "Contact",
  location:    "Philippines",
  email:       "oliverjamesaco@gmail.com",
  followLabel: "Follow",
  copyright:   "Oliver James Aco. All rights reserved.",
  builtWith:   "Built with Next.js & Tailwind CSS",
};
