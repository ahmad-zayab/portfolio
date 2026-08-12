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
  { value: '1+',   label: 'Years Experience' },
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
    period: 'Mar 2025 – Present',
    type: 'Full-time',
    description:
      'Architected and developed a full-stack Attendance Management System using React.js and Node.js, improving employee tracking efficiency across departments. Designed and built RESTful APIs with Node.js and Express.js, enabling seamless client-server communication and reducing API response latency. Also developed a Smart City Complaint & Utility Management System for resident complaint submission, lifecycle tracking, and utility bill management.',
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
      'Developed dynamic, full-stack web applications using React.js and Django, delivering 3+ full-stack features per sprint within tight deadlines. Developed and integrated RESTful APIs using Python (Django REST Framework), enabling efficient data exchange between front-end and back-end services.',
    tags: ['React.js', 'Django', 'Python', 'Django REST Framework', 'PostgreSQL'],
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
    liveUrl: 'https://aiproof-m32s3oxjs-zayab.vercel.app/',
    image: '/ai-proof.webp',
    color: '#6c5ce7',
  },
  {
    id: 1,
    title: 'HR Attendance Management System',
    badge: 'Live',
    description:
      'Web-based system for tracking employee attendance and managing leave requests with role-based access for admins and employees. Built RESTful APIs and integrated a database for authentication, records, and report generation.',
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
      'Platform for residents to submit complaints and track their lifecycle until resolution. Features utility bill tracking and service management, reducing complaint resolution time by 40% through automated lifecycle tracking.',
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
      'Full-stack web application for managing restaurant menus and processing customer orders, with a React front-end and Django REST back-end.',
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
      'Automated Python pipeline leveraging the Donut Transformer model for intelligent extraction of geological bore log data. Reduced manual data extraction time by 70%, processing 50+ bore log documents.',
    tags: ['Python', 'Donut Transformer', 'ML', 'Computer Vision'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/ahmad-zayab',
    liveUrl: '',
    color: '#059669',
  },
];

export const projectCategories = ['All', 'Web', 'AI/ML'];
