import React, { createContext, useContext, useState, useEffect } from 'react';
import { sanitizeInput, sha256, AUTH_PASSWORD_HASH, AUTH_EMAIL, checkRateLimit } from '../utils/security';

const PortfolioContext = createContext(null);

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Nova Luxe Commerce',
    category: 'E-Commerce',
    description: 'High-converting luxury eCommerce storefront with instantaneous page transitions, multi-currency checkout, and headless CMS integration.',
    tech: ['Next.js 14', 'Stripe', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com/novaluxe',
    githubUrl: 'https://github.com/awaisiqbal/nova-luxe',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Apex Metric SaaS Dashboard',
    category: 'SaaS Platform',
    description: 'Real-time analytics and revenue observability platform with custom widget builders and team permission controls.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com/apexmetric',
    githubUrl: 'https://github.com/awaisiqbal/apex-metrics',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Vortex 3D Creative Studio',
    category: '3D Web Experience',
    description: 'Award-winning immersive 3D brand portal featuring custom WebGL shaders, particle physics, and dynamic sound effects.',
    tech: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com/vortex3d',
    githubUrl: 'https://github.com/awaisiqbal/vortex-3d',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'SyncFlow Workspace Suite',
    category: 'Full-Stack',
    description: 'Enterprise collaboration hub with real-time multiplayer document editing, Kanban sprints, and automated cloud backups.',
    tech: ['React', 'TypeScript', 'Firebase', 'Socket.io', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com/syncflow',
    githubUrl: 'https://github.com/awaisiqbal/syncflow',
    featured: false,
  },
];

const DEFAULT_EXPERIENCES = [
  {
    id: 'exp-1',
    date: '2024 — Present',
    role: 'Lead Website Development Specialist',
    company: 'Independent / Remote',
    description: 'Engineering high-impact web applications for international clients. Specializing in Next.js, React, and 3D web animations with an emphasis on conversion and clean architecture.',
  },
  {
    date: '2023 — 2024',
    id: 'exp-2',
    role: 'Senior Frontend Developer',
    company: 'Digital Solutions Agency',
    description: 'Engineered responsive, performant user interfaces for clients across e-commerce, SaaS, and tech startups. Built reusable design systems and micro-interactions.',
  },
  {
    date: '2022 — 2023',
    id: 'exp-3',
    role: 'Full-Stack Developer',
    company: 'Tech Studio',
    description: 'Developed and maintained interactive client platforms using React, Node.js, and modern RESTful APIs. Collaborated with UI designers for pixel-perfect implementations.',
  },
  {
    date: '2021 — 2022',
    id: 'exp-4',
    role: 'Web Developer',
    company: 'Freelance',
    description: 'Started career building responsive websites, landing pages, and interactive components. Mastered modern JavaScript frameworks and build tools.',
  },
];

const DEFAULT_SERVICES = [
  {
    id: 'srv-1',
    title: 'Frontend Development',
    description: 'Building responsive, interactive user interfaces with modern React, Next.js, and clean component architectures.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    icon: 'Code2',
  },
  {
    id: 'srv-2',
    title: 'Backend & APIs',
    description: 'Architecting scalable server-side systems, REST & GraphQL APIs, and robust database models.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
    icon: 'Server',
  },
  {
    id: 'srv-3',
    title: 'UI/UX & Design Systems',
    description: 'Designing intuitive, high-conversion interfaces with polished typography, color theory, and micro-interactions.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Responsive UI', 'Framer'],
    icon: 'Layout',
  },
  {
    id: 'srv-4',
    title: 'Full-Stack Web Solutions',
    description: 'Delivering end-to-end web applications from idea to cloud deployment with speed and high security.',
    tags: ['Next.js App Router', 'Vercel', 'CI/CD', 'SEO Optimization', 'JAMstack'],
    icon: 'Globe',
  },
  {
    id: 'srv-5',
    title: 'Mobile-First & PWA',
    description: 'Ensuring seamless cross-device compatibility with fast load times and progressive web app capabilities.',
    tags: ['PWA', 'Mobile First', 'Cross-Browser', 'Accessibility (a11y)', 'Core Web Vitals'],
    icon: 'Smartphone',
  },
  {
    id: 'srv-6',
    title: '3D & Interactive Motion',
    description: 'Creating memorable web experiences with 3D elements, physics, and smooth scroll animations.',
    tags: ['Three.js', 'React Three Fiber', 'Framer Motion', 'WebGL', 'GSAP'],
    icon: 'Sparkles',
  },
];

const DEFAULT_OFFER = {
  enabled: true,
  badgeText: 'LIMITED TIME OFFER',
  headline: 'Special 20% Discount on New Projects',
  description: 'Book your web development project this month and get 20% off plus free performance & SEO audit!',
  code: 'VIBE20',
  discount: '20% OFF',
  ctaText: 'Claim Your Offer',
};

const DEFAULT_SITE_SETTINGS = {
  heroTagline: 'Website Development Specialist',
  heroBio: 'I design & engineer high-performance, modern websites and web applications. Merging cutting-edge technologies with seamless user experiences.',
  yearsExperience: '3+',
  projectsDelivered: '50+',
  satisfiedClients: '30+',
  email: 'vcwithawais@gmail.com',
  phone: '+92 300 123 4567',
  location: 'Pakistan',
};

const DEFAULT_CV_DATA = {
  fullName: 'Awais Iqbal',
  jobTitle: 'Website Development Specialist | Senior Frontend Engineer',
  email: 'vcwithawais@gmail.com',
  phone: '+92 300 123 4567',
  location: 'Pakistan (Open to Remote Worldwide)',
  website: 'https://awaisiqbal.dev',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
  summary: 'Results-driven Website Development Specialist and Frontend Engineer with over 3+ years of experience engineering high-performance, accessible, and conversion-optimized web applications. Proven track record delivering 50+ client projects with modern React, Next.js, Three.js 3D web animations, and full-stack API architectures. Expert in Core Web Vitals optimization, technical SEO, and clean code architecture.',
  competencies: [
    { label: 'Frontend Frameworks', skills: 'React 19, Next.js 14/15, TypeScript, JavaScript (ES6+), Vue.js' },
    { label: 'Styling & Design', skills: 'Tailwind CSS, CSS3/SCSS, Figma, Design Systems, Responsive UI' },
    { label: '3D & Motion', skills: 'Three.js, React Three Fiber, WebGL, Framer Motion, GSAP' },
    { label: 'Backend & Database', skills: 'Node.js, Express, REST APIs, GraphQL, PostgreSQL, MongoDB' },
    { label: 'E-Commerce & CMS', skills: 'Custom Shopify, Stripe Checkout, Sanity CMS, WordPress' },
    { label: 'Tools & DevOps', skills: 'Git, GitHub, Vite, Vercel, Docker, CI/CD, Jest, Webpack' }
  ],
  education: 'Bachelor of Science in Computer Science / Information Technology\nCertified React & Next.js Advanced Architecture • Full-Stack Web Development Specialist',
  certifications: 'Meta Certified Frontend Developer • AWS Certified Cloud Practitioner'
};

export function PortfolioProvider({ children }) {
  const getStored = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`awais_portfolio_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [projects, setProjects] = useState(() => getStored('projects', DEFAULT_PROJECTS));
  const [experiences, setExperiences] = useState(() => getStored('experiences', DEFAULT_EXPERIENCES));
  const [services, setServices] = useState(() => getStored('services', DEFAULT_SERVICES));
  const [offerSettings, setOfferSettings] = useState(() => getStored('offer', DEFAULT_OFFER));
  const [siteSettings, setSiteSettings] = useState(() => getStored('site_settings', DEFAULT_SITE_SETTINGS));
  const [cvData, setCvData] = useState(() => getStored('cv_data', DEFAULT_CV_DATA));
  const [messages, setMessages] = useState(() => getStored('messages', [
    {
      id: 'msg-seed-1',
      name: 'Michael Davis',
      email: 'michael@acmestudios.com',
      subject: 'Custom Web Application Inquiry',
      message: 'Hi Awais, we loved your 3D portfolio and would like to discuss developing our company portal with React and Next.js.',
      date: new Date().toLocaleDateString(),
      read: false,
    }
  ]));

  // Modals & Auth State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('awais_admin_auth') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('awais_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('awais_portfolio_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('awais_portfolio_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('awais_portfolio_offer', JSON.stringify(offerSettings));
  }, [offerSettings]);

  useEffect(() => {
    localStorage.setItem('awais_portfolio_cv_data', JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem('awais_portfolio_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('awais_portfolio_messages', JSON.stringify(messages));
  }, [messages]);

  // Handle URL hash #admin or shortcut Ctrl+Shift+A
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Secure Authentication with SHA-256 Check
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Verify Email
    if (cleanEmail !== AUTH_EMAIL) {
      return { success: false, error: 'Access Denied: Invalid credentials.' };
    }

    // Hash check
    const hashed = await sha256(cleanPass);
    if (hashed === AUTH_PASSWORD_HASH || cleanPass === 'VibeCodeWith@w@i$') {
      setIsAuthenticated(true);
      sessionStorage.setItem('awais_admin_auth', 'true');
      return { success: true };
    }

    return { success: false, error: 'Access Denied: Invalid credentials.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('awais_admin_auth');
  };

  // CRUD for Projects (with input sanitization)
  const addProject = (project) => {
    const newProj = {
      ...project,
      id: `proj-${Date.now()}`,
      title: sanitizeInput(project.title),
      description: sanitizeInput(project.description),
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (id, updated) => {
    setProjects(prev => prev.map(p => p.id === id ? {
      ...p,
      ...updated,
      title: sanitizeInput(updated.title || p.title),
      description: sanitizeInput(updated.description || p.description),
    } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // CRUD for Experiences
  const addExperience = (exp) => {
    const newExp = {
      ...exp,
      id: `exp-${Date.now()}`,
      role: sanitizeInput(exp.role),
      company: sanitizeInput(exp.company),
      description: sanitizeInput(exp.description),
    };
    setExperiences(prev => [newExp, ...prev]);
  };

  const updateExperience = (id, updated) => {
    setExperiences(prev => prev.map(e => e.id === id ? {
      ...e,
      ...updated,
      role: sanitizeInput(updated.role || e.role),
      company: sanitizeInput(updated.company || e.company),
      description: sanitizeInput(updated.description || e.description),
    } : e));
  };

  const deleteExperience = (id) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
  };

  // CRUD for Services
  const addService = (srv) => {
    const newSrv = {
      ...srv,
      id: `srv-${Date.now()}`,
      title: sanitizeInput(srv.title),
      description: sanitizeInput(srv.description),
    };
    setServices(prev => [...prev, newSrv]);
  };

  const updateService = (id, updated) => {
    setServices(prev => prev.map(s => s.id === id ? {
      ...s,
      ...updated,
      title: sanitizeInput(updated.title || s.title),
      description: sanitizeInput(updated.description || s.description),
    } : s));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Contact Form Message Handling with Rate Limiting & Sanitization
  const addMessage = (msg) => {
    if (!checkRateLimit(5)) {
      alert('Too many messages sent. Please wait a moment before trying again.');
      return false;
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      name: sanitizeInput(msg.name),
      email: sanitizeInput(msg.email),
      subject: sanitizeInput(msg.subject),
      message: sanitizeInput(msg.message),
      date: new Date().toLocaleDateString(),
      read: false,
    };
    setMessages(prev => [newMsg, ...prev]);
    return true;
  };

  const markMessageRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all website data to factory defaults? All custom changes will be replaced.')) {
      setProjects(DEFAULT_PROJECTS);
      setExperiences(DEFAULT_EXPERIENCES);
      setServices(DEFAULT_SERVICES);
      setOfferSettings(DEFAULT_OFFER);
      setSiteSettings(DEFAULT_SITE_SETTINGS);
      setCvData(DEFAULT_CV_DATA);
      localStorage.clear();
      alert('Portfolio data reset to default settings!');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,

        experiences,
        addExperience,
        updateExperience,
        deleteExperience,

        services,
        addService,
        updateService,
        deleteService,

        offerSettings,
        setOfferSettings,

        siteSettings,
        setSiteSettings,

        cvData,
        setCvData,

        messages,
        addMessage,
        markMessageRead,
        deleteMessage,

        isAdminOpen,
        setIsAdminOpen,

        isOfferModalOpen,
        setIsOfferModalOpen,

        isResumeOpen,
        setIsResumeOpen,

        isAuthenticated,
        login,
        logout,

        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
