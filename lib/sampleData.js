export const sampleResumeData = {
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/alexrivera-dev",
    portfolio: "https://alexrivera.io",
  },
  targetJob: {
    title: "Senior Full Stack Engineer",
    description: "Looking for an engineer experienced in Next.js, React, Node.js, and cloud systems to lead scalable architecture and collaborate with cross-functional product teams.",
  },
  summary: "Results-driven Senior Full Stack Engineer with 6+ years of experience designing and shipping high-scale web platforms. Specialized in modern JavaScript/TypeScript ecosystems, distributed microservices, and performance optimization. Track record of mentoring teams, driving 40% performance gains, and scaling apps to 1M+ active users.",
  experience: [
    {
      id: "exp-1",
      jobTitle: "Senior Software Engineer",
      company: "Veloce Technologies",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      description: "• Architected and migrated legacy frontend to Next.js App Router, decreasing initial page load times by 42% and boosting Core Web Vitals across 1.5M monthly visitors.\n• Engineered real-time collaboration pipeline using WebSocket and Redis pub/sub, cutting sync latency to sub-50ms.\n• Led code reviews and mentored 5 junior/mid engineers, cultivating engineering best practices and automated CI/CD testing coverage to 92%.",
    },
    {
      id: "exp-2",
      jobTitle: "Full Stack Developer",
      company: "Aura Cloud Systems",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description: "• Developed scalable RESTful and GraphQL APIs in Node.js and TypeScript handling over 10M daily transactions with 99.98% uptime.\n• Implemented automated PostgreSQL indexing and caching layers with Redis, slashing slow database query times by 65%.\n• Collaborated with UX designers and product managers to release 8 major features on schedule across 3 agile squads.",
    },
    {
      id: "exp-3",
      jobTitle: "Junior Frontend Engineer",
      company: "PixelCraft Labs",
      location: "Remote",
      startDate: "2018-01",
      endDate: "2019-05",
      current: false,
      description: "• Built accessible, responsive client dashboards using React, Redux, and Tailwind CSS, improving user task completion rate by 28%.\n• Integrated third-party payment processing (Stripe) and analytics pipelines (Segment, Google Analytics).",
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      graduationDate: "2018-05",
      gpa: "3.8 / 4.0",
    },
  ],
  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Tailwind CSS",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "GraphQL",
    "REST APIs",
    "Jest / Cypress",
    "Git & CI/CD"
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      id: "cert-2",
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "2021",
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "DevPulse - Real-time Developer Analytics",
      description: "Open-source telemetry dashboard for tracking GitHub workflows and deployment metrics in real time.",
      tech: "Next.js, Tailwind CSS, Go, PostgreSQL, Docker",
      link: "https://github.com/alexrivera-dev/devpulse",
    },
    {
      id: "proj-2",
      name: "CloudKeep - Encrypted File Vault",
      description: "End-to-end encrypted client-side storage application utilizing WebCrypto API and zero-knowledge architecture.",
      tech: "React, WebCrypto, Node.js, AWS S3",
      link: "https://github.com/alexrivera-dev/cloudkeep",
    }
  ]
};

export const emptyResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
  },
  targetJob: {
    title: "",
    description: "",
  },
  summary: "",
  experience: [
    {
      id: "exp-1",
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
    }
  ],
  skills: [],
  certifications: [],
  projects: []
};
