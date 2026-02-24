export const personal = {
    name: "Kumaran K",
    title: "Computer Science Engineering Student",
    tagline:
        "Final-year CSE student passionate about web development, data analytics, and machine learning — seeking entry-level roles to build scalable, data-driven applications.",
    email: "kumaran18v@gmail.com",
    phone: "9080879920",
    location: "Arakkonam, Tamil Nadu",
    linkedin: "https://www.linkedin.com/in/kumaran-k-636404293",
    github: "https://github.com/Kumaran18v",
    leetcode: "https://leetcode.com/u/Kumaran18v/",
    available: true,
};

export const stats = [
    { label: "Projects Built", value: 10, suffix: "+" },
    { label: "Internships", value: 3, suffix: "" },
    { label: "Certifications", value: 9, suffix: "+" },
    { label: "CGPA", value: 8.5, suffix: "" },
];

export const education = [
    {
        degree: "Bachelor of Engineering – Computer Science Engineering",
        institution: "Panimalar Engineering College",
        period: "2023 – 2027",
        detail: "CGPA: 8.5",
        type: "B.E / B.Tech",
        tags: ["Python", "Java", "DSA", "DBMS", "Web Dev"],
    },
    {
        degree: "Class XII – Tamil Nadu State Board",
        institution: "Royal Matriculation Higher Secondary School",
        period: "2021 – 2023",
        detail: "Percentage: 86.6%",
        type: "HSC",
        tags: ["Computer Science", "Maths"],
    },
    {
        degree: "Class X – Tamil Nadu State Board",
        institution: "Royal Matriculation Higher Secondary School",
        period: "2019 – 2021",
        detail: "Percentage: 100%",
        type: "SSLC",
        tags: ["Science", "Maths"],
    },
];

export const internships = [
    {
        role: "Data Expert Intern",
        company: "NDVTechsys Solutions",
        duration: "2 Months",
        type: "Internship",
        highlights: [
            "Applied Python-based data analysis with Pandas & NumPy for cleaning and transformation",
            "Implemented and evaluated ML models for pattern identification and predictive insights",
            "Automated data preprocessing workflows, reducing manual effort significantly",
        ],
        tags: ["Python", "Pandas", "NumPy", "Machine Learning"],
    },
    {
        role: "Data Analysis Intern",
        company: "Edunet Foundation",
        duration: "1 Month",
        type: "Internship",
        highlights: [
            "Worked with Microsoft Excel and Power BI for data cleaning, analysis, and visualization",
            "Created interactive dashboards using charts, slicers, and filters",
            "Supported Excel-based preprocessing using formulas and pivot tables",
        ],
        tags: ["Power BI", "Excel", "Data Visualization"],
    },
    {
        role: "Web Development Intern",
        company: "CODELEVATE",
        duration: "6 Weeks",
        type: "Internship",
        highlights: [
            "Built a responsive portfolio website and multiple landing pages with HTML, CSS, JS & Tailwind",
            "Applied modern UI/UX principles and ensured cross-browser compatibility",
            "Improved website performance and usability through optimization techniques",
        ],
        tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    },
];

export const skills = [
    {
        category: "Languages",
        icon: "code",
        color: "accent",
        items: [
            { name: "Python", pct: 82 },
            { name: "Java", pct: 72 },
            { name: "JavaScript", pct: 78 },
            { name: "C", pct: 65 },
        ],
        badges: ["Python", "Java", "JavaScript", "C"],
    },
    {
        category: "Web Development",
        icon: "globe",
        color: "green",
        items: [
            { name: "HTML & CSS", pct: 90 },
            { name: "React.js", pct: 75 },
            { name: "Node.js / Express", pct: 70 },
            { name: "RESTful APIs", pct: 75 },
        ],
        badges: ["React", "Node.js", "Express.js", "Tailwind CSS"],
    },
    {
        category: "Data, AI & Tools",
        icon: "bar-chart",
        color: "yellow",
        items: [
            { name: "SQL / MySQL", pct: 78 },
            { name: "Power BI", pct: 72 },
            { name: "Pandas / NumPy", pct: 75 },
            { name: "GenAI & LLMs", pct: 85 },
        ],
        badges: ["MongoDB", "Oracle", "Power BI", "Excel", "GenAI", "Git / GitHub"],
    },
];

export const projects = [
    {
        title: "AI Smart Waste Reporting & Pickup System",
        description:
            "An AI-powered web platform where citizens report waste via images, a YOLOv8 CNN auto-classifies waste types, and admins manage optimised pickup scheduling with real-time location mapping and analytics dashboards.",
        tags: ["TypeScript", "YOLOv8", "CNN", "Leaflet.js", "Chart.js", "AI/ML"],
        category: "ai",
        gradient: "from-violet-600 to-purple-700",
        featured: true,
        github: "https://github.com/Kumaran18v/smart-waste-reporting-system",
        live: "#",
    },
    {
        title: "JobCheck – Fake Job Detection with NLP",
        description:
            "Full-stack AI platform that detects fraudulent job postings using NLP and ML. Built with Next.js 15 frontend and FastAPI + scikit-learn backend for real-time job listing analysis.",
        tags: ["Next.js 15", "FastAPI", "Python", "scikit-learn", "NLP"],
        category: "ai",
        gradient: "from-rose-500 to-pink-600",
        featured: true,
        github: "https://github.com/Kumaran18v/Fake-Job-Detection-using-NLP",
        live: "#",
    },
    {
        title: "Recipe Planner AI",
        description:
            "A full-stack recipe discovery and meal planning platform with a React frontend and FastAPI backend. Features pagination, sorting, filtering, and a detail view with responsive design.",
        tags: ["React", "FastAPI", "Python", "JavaScript", "Vercel"],
        category: "fullstack",
        gradient: "from-orange-500 to-amber-500",
        featured: true,
        github: "https://github.com/Kumaran18v/Recipe-planner",
        live: "https://recipe-planner-sable.vercel.app",
    },
    {
        title: "Agricultural Productivity Dashboard",
        description:
            "An interactive Power BI dashboard with Excel-based data preprocessing to analyze state-wise agricultural productivity across India, enabling data-driven insights.",
        tags: ["Power BI", "Excel", "Data Analytics", "Data Visualization"],
        category: "data",
        gradient: "from-emerald-500 to-teal-600",
        featured: false,
        github: "https://github.com/Kumaran18v/Analyzing-agricultural-productivity-across-indian-states-",
        live: "#",
    },
    {
        title: "Portfolio Website Template",
        description:
            "A modern developer portfolio template with dark mode, smooth scroll animations, skill bars, project cards, and contact form validation — built with pure HTML, CSS & JavaScript.",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "frontend",
        gradient: "from-blue-500 to-indigo-600",
        featured: false,
        github: "https://github.com/Kumaran18v/Portfolio-website-template-",
        live: "#",
    },
    {
        title: "Landing Page – Blue Black Team",
        description:
            "A clean, modern, and fully responsive landing page with a striking dark aesthetic, smooth CSS animations, and cross-browser compatibility.",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "frontend",
        gradient: "from-slate-600 to-blue-700",
        featured: false,
        github: "https://github.com/Kumaran18v/Landing-page-for-blue-black-team",
        live: "#",
    },
    {
        title: "Python Expense Tracker",
        description:
            "A CLI-based personal finance tool in Python. Track daily expenses, categorise spending, and persist data with JSON-based storage for budget management.",
        tags: ["Python", "CLI", "JSON"],
        category: "python",
        gradient: "from-yellow-500 to-orange-500",
        featured: false,
        github: "https://github.com/Kumaran18v/Python-Expense-tracker",
        live: "#",
    },
    {
        title: "Python Word Counter",
        description:
            "A lightweight utility tool that counts words, characters, and sentences in any given text input — built as a clean Python CLI utility.",
        tags: ["Python", "CLI", "Utility"],
        category: "python",
        gradient: "from-cyan-500 to-sky-600",
        featured: false,
        github: "https://github.com/Kumaran18v/Python-Word-Counter",
        live: "#",
    },
    {
        title: "Random Username Generator",
        description:
            "A Python utility that generates random, customisable usernames for social media and gaming — supports custom number and special character inclusion.",
        tags: ["Python", "CLI", "Utility"],
        category: "python",
        gradient: "from-fuchsia-500 to-purple-600",
        featured: false,
        github: "https://github.com/Kumaran18v/Python-projects-",
        live: "#",
    },
    {
        title: "Internship Projects Collection",
        description:
            "A collection of data science projects from internship: Spam Prediction Classification, Student Record Management, EDA on Titanic Dataset, Linear Regression, and Hypothesis Testing.",
        tags: ["Python", "Machine Learning", "EDA", "Data Science", "scikit-learn"],
        category: "data",
        gradient: "from-green-500 to-emerald-600",
        featured: false,
        github: "https://github.com/Kumaran18v/Internships",
        live: "#",
    },
];

export const certifications = [
    { name: "Participated in Adobe Hackathon", issuer: "Adobe", year: "2024" },
    { name: "Participated in Dreamflow Hackathon", issuer: "Dreamflow", year: "2024" },
    { name: "Introduction to Machine Learning", issuer: "NPTEL", year: "2025" },
    { name: "Oracle Cloud Infrastructure Gen AI", issuer: "Oracle", year: "2024" },
];

export const softSkills = [
    "Communication", "Team Collaboration", "Problem Solving",
    "Time Management", "Active Listening", "Adaptability",
    "Analytical Thinking", "Curiosity", "Creativity",
];
