// =============================================
//  DATA FILE — Ahmad Zayab's Portfolio Data
// =============================================

export const personalInfo = {
  name: 'Ahmad Zayab',
  firstName: 'Ahmad',
  lastName: 'Zayab',
  roles: ['Full Stack Developer', 'React.js Developer', 'Gym bro', 'Next.js Developer'],
  bio: 'I architect and build full-stack web applications, from designing databases and RESTful APIs to crafting polished React interfaces. Currently at Metalabs Tech, open to exciting new opportunities.',
  location: 'Lahore, Pakistan',
  availability: 'Open to Opportunities',
  yearsOfExp: '2+',
  email: 'ahmadzayab2003@gmail.com',
  phone: '+92 322 784 7489',
  github: 'https://github.com/ahmad-zayab',
  linkedin: 'https://www.linkedin.com/in/ahmad-zayab-26387b240/',
  cvUrl: '/resume.pdf',
};

export const stats = [
  { value: '2+',   label: 'Years Experience' },
  { value: '5+',   label: 'Projects Shipped' },
  { value: 'BSc',  label: 'Computer Science' },
  { value: 'PK',   label: 'Based in Lahore' },
];

export const aboutText = [
  'I am a Full Stack Developer based in Lahore, Pakistan, with hands-on experience building scalable web applications across the entire stack. I have worked at Metalabs Tech and interned at Arbisoft.',
  'I thrive on solving complex problems cleanly. Whether it\'s architecting a RESTful API, optimizing data flow in a React app, or extracting structured data with ML pipelines, I bring focus and craftsmanship to every project.',
];

export const quickFacts = [
  { label: 'Location',     value: 'Lahore, Pakistan' },
  { label: 'Availability', value: 'Open to Work' },
  { label: 'Languages',    value: 'English, Urdu' },
  { label: 'Education',    value: 'BSc CS, UET Lahore (2020–2024)' },
];

// =============================================
//  EXPERIENCE
// =============================================
export const experiences = [
  {
    id: 1,
    role: 'Associate Software Engineer',
    company: 'Metalabs Tech',
    companyUrl: 'https://metalabs.tech',
    period: 'Apr 2025 – Present',
    type: 'Full-time',
    description:
      'Improved cross-departmental attendance-tracking efficiency by architecting a full-stack Attendance Management System using React.js, Node.js, and Express.js, replacing manual spreadsheet-based tracking. Reduced API response latency by designing and implementing RESTful endpoints in Node.js/Express.js, enabling real-time client-server data synchronization.',
    tags: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB'],
  },
  {
    id: 2,
    role: 'Software Engineering Intern',
    company: 'Arbisoft',
    companyUrl: 'https://arbisoft.com',
    period: 'Jan 2025 – Mar 2025',
    type: 'Internship',
    description:
      'Delivered full-stack features under sprint deadlines by developing React.js front-end components integrated with a Django backend, using Agile/Scrum workflows.',
    tags: ['React.js', 'Django', 'Python', 'Django REST Framework', 'PostgreSQL'],
  },
  {
    id: 3,
    role: 'Freelance Full-Stack Developer',
    company: 'Self-Employed (UK Clients)',
    period: 'Feb 2024 – Dec 2024',
    type: 'Freelance',
    description:
      'Delivered custom full-stack web applications for multiple UK-based clients using the MERN stack (React.js, Node.js, Express.js, MongoDB), managing requirements, development, and delivery independently. Managed end-to-end client communication, timelines, and revisions across independent contract engagements, delivering production-ready features on schedule.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MERN Stack'],
  },
];

// =============================================
//  SKILLS
// =============================================
export const skills = [
  // Frontend
  { name: 'React.js',     icon: '⚛️',  category: 'Frontend' },
  { name: 'Next.js',      icon: '▲',   category: 'Frontend' },
  { name: 'TypeScript',   icon: '🟦',  category: 'Frontend' },
  { name: 'JavaScript',   icon: '🟨',  category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨',  category: 'Frontend' },
  { name: 'HTML/CSS',     icon: '🌐',  category: 'Frontend' },

  // Backend
  { name: 'Node.js',      icon: '🟩',  category: 'Backend' },
  { name: 'Express.js',   icon: '🚂',  category: 'Backend' },
  { name: 'NestJS',       icon: '🐱',  category: 'Backend' },
  { name: 'Django',       icon: '🎸',  category: 'Backend' },
  { name: 'Python',       icon: '🐍',  category: 'Backend' },
  { name: 'REST APIs',    icon: '🔌',  category: 'Backend' },
  { name: 'SQL',          icon: '🗄️',  category: 'Backend' },
  { name: 'MongoDB',      icon: '🍃',  category: 'Backend' },
  { name: 'Firebase',     icon: '🔥',  category: 'Backend' },

  // Tools
  { name: 'Git / GitHub', icon: '🐙',  category: 'Tools' },
  { name: 'VS Code',      icon: '💻',  category: 'Tools' },
  { name: 'Postman',      icon: '📮',  category: 'Tools' },
  { name: 'Agile/Scrum',  icon: '🔄',  category: 'Tools' },
  { name: 'OOP / MVC',    icon: '🏗️',  category: 'Tools' },
];

// =============================================
//  PROJECTS
// =============================================
export const projects = [
  {
    id: 5,
    title: 'AI-Proof',
    badge: 'Live',
    description:
      'A modern quiz application designed to evaluate a developer\'s resilience to AI coding assistants. Features dynamic Open Graph image generation and a sleek glassmorphism UI.',
    tags: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
    category: 'Web',
    githubUrl: '',
    liveUrl: 'https://aiproof-sage.vercel.app/',
    image: '/ai-proof.webp',
    color: '#6c5ce7',
  },
  {
    id: 1,
    title: 'HR Attendance Management System',
    badge: 'Live',
    description:
      'Streamlined attendance and leave management by building role-based access control (admin/employee) with RESTful APIs and database-backed report generation.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    category: 'Web',
    githubUrl: 'https://github.com/ahmad-zayab',
    liveUrl: '',
    color: '#c445f5',
  },
  {
    id: 2,
    title: 'Smart City Complaint & Utility System',
    badge: 'Live',
    description:
      'Reduced complaint resolution time by 40% by designing an end-to-end lifecycle-tracking platform with automated status updates and utility bill management.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
    category: 'Web',
    githubUrl: 'https://github.com/ahmad-zayab',
    liveUrl: '',
    color: '#7c3aed',
  },
  {
    id: 3,
    title: 'Restaurant Ordering System',
    badge: 'Complete',
    description:
      'Enabled end-to-end order processing by building a full-stack system with a React front-end and Django REST back-end, supporting real-time menu and order management.',
    tags: ['React.js', 'Django', 'Django REST Framework', 'Python'],
    category: 'Web',
    githubUrl: 'https://github.com/ahmad-zayab',
    liveUrl: '',
    color: '#2563eb',
  },
  {
    id: 4,
    title: 'Bore Log Data Extraction & Processing',
    badge: 'ML',
    description:
      'Reduced manual data-extraction time by 70% by engineering an automated Python pipeline using the Donut Transformer model to process 50+ geological bore log documents, eliminating manual OCR review.',
    tags: ['Python', 'Donut Transformer', 'ML', 'Computer Vision'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/ahmad-zayab',
    liveUrl: '',
    color: '#059669',
  },
];

export const projectCategories = ['All', 'Web', 'AI/ML'];
