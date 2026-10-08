import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const LINKS = {
  github: 'https://github.com/Vasundraa',
  linkedin: 'https://linkedin.com/in/vasundraa-s',
  email: 'mailto:vasundraas@gmail.com?subject=Portfolio%20Enquiry',
  resume: '/assets/Vasundraa_S_Resume.pdf',
};

const projects = [
  {
    id: 'buyoganic', title: 'Buyoganic', eyebrow: 'FULL-STACK DEVELOPMENT', category: 'Development',
    description: 'A recycling and eco-products platform connecting plastic-waste generators, recyclers and eco-product makers.',
    stack: ['Django', 'Python', 'PostgreSQL', 'HTML/CSS/JS'],
    tags: ['Backend', 'Web App', 'Sustainability'],
    highlights: ['PlastiCycle for scheduled waste collection and truck tracking', 'Re-Gen Market for collected plastic categories', 'Eco-Choice Hub for eco-friendly product discovery and orders'],
    links: [{ label: 'GitHub', url: 'https://github.com/Vasundraa/buyogan' }, { label: 'Live demo', url: 'https://buyoganic.pythonanywhere.com/' }],
    image: '/assets/buyoganic/home.png',
    gallery: [['/assets/buyoganic/home.png','Home / Landing Page'], ['/assets/buyoganic/modules.png','Core Modules']],
    visualType: 'dashboard', tone: 'green'
  },
  {
    id: 'shishu', title: 'Shishu Aagaar', eyebrow: 'WEB + MOBILE DEVELOPMENT', category: 'Development',
    description: 'An educational newborn-care platform supporting first-time mothers with regular baby-detail forms and guided follow-up.',
    stack: ['React JS', 'Django', 'SQLite', 'Android Studio'],
    tags: ['React', 'Healthcare', 'Mobile'],
    highlights: ['Regular forms collect baby-care details for supervised review', 'Nursing-student review supports follow-up guidance by phone', 'Educational content and animated videos; web app deployed on Netlify and converted to APK for testing'],
    links: [{ label: 'GitHub', url: 'https://github.com/Vasundraa/shishuaagaar' }, { label: 'Live demo', url: 'https://shishuaagaar.netlify.app/Home' }],
    image: '/assets/shishu-logo.png',
    visualType: 'logo', tone: 'rose'
  },
  {
    id: 'cura', title: 'Cura', eyebrow: 'SOFTWARE DEVELOPMENT INTERNSHIP', category: 'Development',
    description: 'A real prototype I contributed to during a software-development internship, focused on health tracking and application data workflows.',
    stack: ['React JS', 'Firebase'],
    tags: ['Internship', 'Prototype', 'Real-world'],
    highlights: ['Contributed to real-time health-tracking and alert functionality', 'Worked with application data retrieval, display and updates', 'Source code is private and the prototype is not publicly hosted'],
    image: 'https://raw.githubusercontent.com/rishi-saran/Cura/main/profile_pics/clogo.jpg',
    visualType: 'logo',
    links: [], tone: 'violet', private: true
  },
  {
    id: 'freshmart', title: 'FreshMart', eyebrow: 'EXCEL • SALES ANALYTICS', category: 'Analytics',
    description: 'Retail sales dashboard translating transaction data into management-focused views of revenue, profit, stores, products, channels and discounts.',
    stack: ['Excel', 'PivotTables', 'Charts', 'Business Analysis'],
    tags: ['Retail', 'Dashboard', 'Profitability'],
    image: '/assets/freshmart.png',
    metrics: [['Revenue', '₹28.95L'], ['Profit', '₹7.42L'], ['Margin', '25.63%']],
    highlights: ['In-Store contributes about 69% of revenue', 'Beverages leads revenue while Bakery leads total profit', 'Higher discount levels are associated with lower aggregated profit margin'],
    links: [{ label: 'GitHub / Case study', url: 'https://github.com/Vasundraa/Data-Analytics-Portfolio/tree/main/Excel/Projects/FreshMart' }], tone: 'lime'
  },
  {
    id: 'trendkart', title: 'TrendKart', eyebrow: 'EXCEL • PROFITABILITY ANALYTICS', category: 'Analytics',
    description: 'Fashion-retail dashboard focused on profitability leakage, discount patterns, returns, regional performance and sales channels.',
    stack: ['Excel', 'PivotTables', 'Charts', 'Business Analysis'],
    tags: ['Retail', 'Profitability', 'Decision Support'],
    image: '/assets/trendkart.png',
    metrics: [['Sales', '₹92.27L'], ['Profit', '₹18.29L'], ['Margin', '19.82%'], ['Return rate', '4.87%']],
    highlights: ['Profit margin falls from 28.45% at 0% discount to 3.95% at 30%', 'Handbags have the highest return rate at 28.29%', 'South Zone 3 has the highest regional profit margin at 20.28%'],
    links: [{ label: 'GitHub / Case study', url: 'https://github.com/Vasundraa/Data-Analytics-Portfolio/tree/main/Excel/Projects/Trendkart' }], tone: 'blue'
  },
  {
    id: 'medicare', title: 'MediCare', eyebrow: 'SQL • HEALTHCARE ANALYTICS', category: 'Analytics',
    description: 'A relational healthcare database and analysis project covering data profiling, cleaning, relationships, billing and operational KPIs.',
    stack: ['MySQL', 'SQL', 'Data Cleaning', 'BRD Analysis'],
    tags: ['Healthcare', 'Database', 'SQL'],
    image: '/assets/sql/medicare-erd.png',
    visualType: 'erd',
    highlights: ['Designed relational tables and primary/foreign-key relationships', 'Profiled duplicates, nulls, distinct values and data-quality issues', 'Analyzed hospital, department, doctor, patient, billing and payment activity'],
    links: [{ label: 'GitHub / SQL project', url: 'https://github.com/Vasundraa/Data-Analytics-Portfolio/tree/main/SQL/Projects/MediCare' }], tone: 'cyan'
  },
  {
    id: 'healthplus', title: 'HealthPlus Care', eyebrow: 'SQL • HEALTHCARE ANALYTICS', category: 'Analytics',
    description: 'A BRD-driven healthcare service, financial and member-experience analytics project built around a multi-table relational dataset.',
    stack: ['MySQL', 'SQL', 'Data Cleaning', 'BRD Analysis'],
    tags: ['Healthcare', 'Utilization', 'Finance'],
    image: '/assets/sql/healthplus-erd.png',
    visualType: 'erd',
    highlights: ['Worked across members, clinics, specialists, consultations, claims, billing, payments and feedback', 'Validated and cleaned inconsistent values, dates, emails and financial fields', 'Answered business questions around clinic activity, specialist workload, member activity and service utilization'],
    links: [{ label: 'GitHub / SQL project', url: 'https://github.com/Vasundraa/Data-Analytics-Portfolio/tree/main/SQL/Projects/HealthPlus%20Care' }], tone: 'teal'
  },
  {
    id: 'novitech', title: 'Novitech Manufacturing', eyebrow: 'POWER BI • MANUFACTURING ANALYTICS', category: 'Analytics',
    description: 'A seven-page management dashboard connecting production, quality, efficiency, cost, procurement, supply chain and workforce signals.',
    stack: ['Power BI', 'Power Query', 'DAX', 'Business Analysis'],
    tags: ['Manufacturing', 'Executive Dashboard', 'Supply Chain'],
    image: '/assets/novitech/executive-overview.png',
    gallery: [
      ['/assets/novitech/executive-overview.png', 'Executive Overview'],
      ['/assets/novitech/production-plant.png', 'Production & Plant Performance'],
      ['/assets/novitech/quality-efficiency.png', 'Quality & Operational Efficiency'],
      ['/assets/novitech/finance-cost.png', 'Finance & Cost Analysis'],
      ['/assets/novitech/procurement-supplier.png', 'Procurement & Supplier Performance'],
      ['/assets/novitech/raw-materials.png', 'Raw Materials & Supply Chain Risk'],
      ['/assets/novitech/operator-shift.png', 'Operator & Shift Performance']
    ],
    metrics: [['Production', '1,029,692'], ['Defects', '17,649'], ['Downtime', '1,436h'], ['Delay rate', '10.69%']],
    highlights: ['Production is concentrated across specific plants, products and shifts', 'Quality, downtime and energy signals identify areas for management review', 'Supplier delays, procurement concentration and shared material dependencies highlight supply-chain exposure'],
    links: [{ label: 'GitHub / Case study', url: 'https://github.com/Vasundraa/Data-Analytics-Portfolio/tree/main/PowerBI/Projects/NoviTech' }], tone: 'electric'
  },
  {
    id: 'energymate', title: 'EnergyMate', eyebrow: 'AI • ENERGY MONITORING', category: 'AI / ML',
    description: 'A smart energy-monitoring project combining an application interface with energy-consumption analysis and prediction work.',
    stack: ['Python', 'Deep Learning', 'NILM'],
    tags: ['AI', 'Energy', 'Research'],
    highlights: ['Contributed to the dashboard and project documentation/research paper', 'Presented the work as a research-oriented energy monitoring solution', 'Project work connected energy usage with machine-learning-based appliance monitoring'],
    image: '/assets/energymate/dashboard.png',
    visualType: 'dashboard',
    links: [{ label: 'Project demo', url: 'https://rishisaran07.pythonanywhere.com/' }], tone: 'amber'
  }
];

const internships = [
  {
    company: 'Cura', role: 'Software Development Intern', period: 'Feb 2025 – Sept 2025 · 8 months',
    stack: ['React JS', 'Firebase', 'Application Data'],
    tone: 'violet',
    points: [
      'Developed and enhanced real-time health-tracking and alert modules for a patient-monitoring platform.',
      'Worked on retrieving, displaying, and updating application data while contributing to user-focused features.',
      'Contributed to overall application usability through practical software-development work.'
    ]
  },
  {
    company: 'Pinesphere Solutions', role: 'Frontend Development Intern', period: 'Mar 2024 – Apr 2024 · 1 month',
    stack: ['React JS', 'Frontend', 'Component-based UI'],
    tone: 'rose',
    points: [
      'Developed frontend features for the Shishu Aagaar child health and nutrition application using React JS.',
      'Implemented component-based interfaces for infant growth tracking and baby-care information.'
    ]
  },
  {
    company: 'Pinesphere Solutions', role: 'Project Intern', period: 'Jul 2023 – Aug 2023 · 10 days',
    stack: ['Python', 'Django', 'Backend'],
    tone: 'green',
    points: [
      'Developed a Django-based web application to record and track recycling and waste-collection data.',
      'Worked with Python and Django to implement backend functionality and support full-stack application development.'
    ]
  }
];

const skills = [
  { name: 'Python', group: 'Programming', used: 'Buyoganic, EnergyMate, NumPy/Pandas/Seaborn and current ML learning', details: ['Python fundamentals, functions, conditions, loops and data structures', 'Used NumPy and Pandas for basic data handling and analysis', 'Used Seaborn for data visualization practice', 'Currently learning machine-learning workflows with Python'] },
  { name: 'Java', group: 'Programming', used: 'Coursework, DSA and problem solving', details: ['Core Java programming and object-oriented programming concepts', 'Practiced arrays, strings, collections and common DSA problems', 'Applied problem-solving through coding practice', 'Built a strong programming foundation through coursework'] },
  { name: 'SQL / MySQL', group: 'Data', used: 'MediCare, HealthPlus Care', details: ['SELECT, WHERE, GROUP BY, ORDER BY and aggregate functions', 'INNER/LEFT JOINs for combining related business data', 'Data profiling using counts, duplicates, NULL checks and distinct values', 'Data cleaning and validation for inconsistent values, dates and emails', 'Business analysis and KPI queries for healthcare datasets'] },
  { name: 'Excel', group: 'Analytics', used: 'FreshMart, TrendKart', details: ['Data cleaning and validation for business datasets', 'PivotTables and PivotCharts for summarizing sales data', 'VLOOKUP, XLOOKUP, IF, SUMIF and COUNTIF formulas', 'KPI creation, charts and dashboard preparation', 'Business reporting, trend analysis and insight presentation'] },
  { name: 'Power BI', group: 'Analytics', used: 'Novitech Manufacturing', details: ['Data preparation and transformation using Power Query', 'Data modeling and relationships between business tables', 'DAX measures for KPIs and analytical calculations', 'Interactive dashboards with charts, slicers and KPI cards', 'Production, quality, finance and supply-chain analysis'] },
  { name: 'Django', group: 'Backend', used: 'Buyoganic, Shishu Aagaar, earlier web projects', details: ['Built backend functionality using Python and Django', 'Worked with models, views, templates and application routing', 'Connected web applications with relational databases', 'Implemented application workflows for project requirements', 'Used Django in full-stack projects including Buyoganic and Shishu Aagaar'] },
  { name: 'React JS', group: 'Frontend', used: 'Shishu Aagaar, Cura', details: ['Built component-based user interfaces', 'Worked with reusable components and application state', 'Created responsive pages for web application workflows', 'Used React during the Shishu Aagaar frontend internship', 'Contributed to Cura application features during software development internship'] },
  { name: 'PostgreSQL', group: 'Database', used: 'Buyoganic', details: ['Used PostgreSQL as the relational database for Buyoganic', 'Worked with structured application data and database-backed workflows', 'Connected Django backend functionality with PostgreSQL', 'Applied relational database concepts in a full-stack application'] },
  { name: 'Git / GitHub', group: 'Tools', used: 'Project development and portfolio work', details: ['Used Git for source-code version control', 'Used GitHub to maintain and showcase project repositories', 'Worked with commits, repositories and project documentation', 'Preparing projects and dashboards for public portfolio presentation'] },
  { name: 'Machine Learning', group: 'AI / ML', used: 'Currently learning linear and logistic regression', details: ['Learning supervised machine-learning fundamentals', 'Currently studying Linear Regression and Logistic Regression', 'Learning the workflow from data preparation to model evaluation', 'Continuing to build ML foundations alongside Python and analytics'] }
];

const journey = [
  { year: 'College years', title: 'Web Development Foundation', text: 'Started with HTML/CSS, Django and PostgreSQL for application projects, then expanded into React.' },
  { year: '2023–24', title: 'Project & Internship Development', text: 'Worked on recycling, newborn-care and frontend projects, building practical application experience.' },
  { year: '2025', title: 'Real-world Software Development', text: 'Contributed to Cura as a software development intern and worked with real application data and tracking workflows.' },
  { year: '2026', title: 'Data Analytics Path', text: 'Built a structured learning path: Excel → SQL → Statistics → Power BI → Python → foundations/DSA.' },
  { year: 'Now', title: 'Machine Learning', text: 'Continuing into ML with linear and logistic regression while combining development and analytics experience.' }
];

function App() {
  const [section, setSection] = useState('overview');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [skill, setSkill] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleProjects = useMemo(() => projects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const haystack = `${p.title} ${p.description} ${p.stack.join(' ')} ${p.tags.join(' ')}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [filter, query]);

  const go = (id) => { setSection(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark">VS</div><div><strong>Vasundraa S</strong><span>Portfolio / 2026</span></div></div>
      <nav>
        <button className={section === 'overview' ? 'active' : ''} onClick={() => go('overview')}><span>⌂</span> Overview</button>
        <button className={section === 'development' ? 'active' : ''} onClick={() => { setFilter('Development'); go('development'); }}><span>◈</span> Development</button>
        <button className={section === 'analytics' ? 'active' : ''} onClick={() => { setFilter('Analytics'); go('analytics'); }}><span>▦</span> Analytics</button>
        <button className={section === 'aiml' ? 'active' : ''} onClick={() => { setFilter('AI / ML'); go('aiml'); }}><span>⌁</span> AI / ML</button>
        <button className={section === 'internships' ? 'active' : ''} onClick={() => go('internships')}><span>◉</span> Internships</button>
        <button className={section === 'skills' ? 'active' : ''} onClick={() => go('skills')}><span>✦</span> Skills</button>
        <button className={section === 'journey' ? 'active' : ''} onClick={() => go('journey')}><span>↗</span> Learning path</button>
      </nav>
      <div className="sidebar-bottom">
        <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={LINKS.email}>Email ↗</a>
        <a href={LINKS.resume} download="Vasundraa_S_Resume.pdf">Resume ↓</a>
        </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
        <div className="crumb"><span>PORTFOLIO</span><i>/</i><b>{section === 'overview' ? 'OVERVIEW' : section.toUpperCase()}</b></div>
        <div className="top-actions"><span className="status-dot"/> Open to opportunities</div>
      </header>

      {section === 'overview' && <Overview onExplore={() => { setFilter('All'); go('projects'); }} />}
      {(section === 'development' || section === 'analytics' || section === 'aiml' || section === 'projects') && <ProjectSection section={section} filter={filter} setFilter={setFilter} query={query} setQuery={setQuery} visibleProjects={visibleProjects} onOpen={setSelected} onImage={setLightbox} />}
      {section === 'internships' && <Internships internships={internships} />}
      {section === 'skills' && <Skills skills={skills} selected={skill} setSelected={setSkill} />}
      {section === 'journey' && <Journey />}

      <footer><span>Vasundraa S</span><span>Developer • Data Analyst • ML Learner</span><span><a href={LINKS.email}>vasundraas@gmail.com</a> • <a href={LINKS.resume} download="Vasundraa_S_Resume.pdf">Download Resume</a></span></footer>
    </main>

    {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} onImage={setLightbox} />}
    {lightbox && <Lightbox image={lightbox.image} label={lightbox.label} onClose={() => setLightbox(null)} />}
  </div>;
}

function Overview({ onExplore }) {
  return <div className="content overview-page">
    <section className="hero-card">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"/> DEVELOPER × ANALYTICS × ML</div>
        <h1><strong>Vasundraa S</strong><span className="hero-role">Data Analyst • Developer • ML Learner</span><em>Building applications.<br/>Turning data into decisions.</em></h1>
        <p>I’m Vasundraa — a developer with hands-on web application experience and a growing data analytics and machine-learning toolkit.</p>
        <div className="hero-actions"><button className="primary" onClick={onExplore}>Explore projects <span>→</span></button><a className="ghost" href={LINKS.github} target="_blank" rel="noreferrer">View GitHub ↗</a><a className="ghost" href={LINKS.resume} download="Vasundraa_S_Resume.pdf">Download Resume ↓</a><a className="ghost" href={LINKS.email}>Email Me ↗</a></div>
      </div>
      <div className="hero-orbit"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="orbit-core"><b>VS</b><span>2026</span></div><div className="orbit-chip chip-a">React</div><div className="orbit-chip chip-b">SQL</div><div className="orbit-chip chip-c">Power BI</div><div className="orbit-chip chip-d">Python</div></div>
    </section>

    <section className="stat-grid">
      <Stat n="03" label="Development projects" note="Django • React • real-world prototype" />
      <Stat n="05" label="Analytics projects" note="Excel • SQL • Power BI" />
      <Stat n="01" label="AI / ML project" note="Energy monitoring + research" />
      <Stat n="06" label="Learning stages" note="Excel → SQL → Stats → BI → Python → ML" />
    </section>

    <section className="dashboard-grid">
      <div className="panel journey-preview">
        <PanelTitle kicker="CURRENT FOCUS" title="My learning dashboard" />
        <div className="learning-track"><div className="track-line"/>{['Excel','SQL','Statistics','Power BI','Python','ML'].map((x,i)=><div className={`track-step ${i < 5 ? 'done' : 'current'}`} key={x}><span>{i < 5 ? '✓' : '●'}</span><b>{x}</b></div>)}</div>
        <div className="focus-box"><span>NOW</span><div><b>Machine Learning</b><p>Linear & logistic regression — continuing to learn.</p></div><span className="arrow">→</span></div>
      </div>
      <div className="panel signal-panel">
        <PanelTitle kicker="WHAT I BRING" title="A hybrid toolkit" />
        <div className="signal-list"><Signal icon="01" title="Build" text="Web applications with Django and React"/><Signal icon="02" title="Analyze" text="Clean, query and interpret business data"/><Signal icon="03" title="Visualize" text="Create stakeholder-focused dashboards"/><Signal icon="04" title="Learn" text="Extend analytics into machine learning"/></div>
      </div>
    </section>

    <section className="featured-head"><div><span className="eyebrow">SELECTED WORK</span><h2>Projects worth exploring</h2></div><button className="text-button" onClick={onExplore}>View all projects →</button></section>
    <div className="featured-grid">{projects.slice(0,4).map(p => <ProjectCard key={p.id} project={p} compact />)}</div>
  </div>;
}

function ProjectSection({ section, filter, setFilter, query, setQuery, visibleProjects, onOpen, onImage }) {
  const title = section === 'development' ? 'Development' : section === 'analytics' ? 'Data Analytics' : section === 'aiml' ? 'AI / Machine Learning' : 'All Projects';
  const intro = section === 'development' ? 'Application projects and real-world development experience.' : section === 'analytics' ? 'Dashboards and SQL projects from my data analytics learning path.' : section === 'aiml' ? 'Applied AI work plus the machine-learning concepts I am currently building.' : 'A mix of development, analytics and AI/ML work.';
  const filters = ['All','Development','Analytics','AI / ML'];
  return <div className="content project-page">
    <section className="section-heading"><div><span className="eyebrow">PROJECT EXPLORER</span><h1>{title}</h1><p>{intro}</p></div><div className="project-count"><b>{visibleProjects.length}</b><span>visible</span></div></section>
    <div className="toolbar"><div className="filters">{filters.map(f=><button className={filter === f ? 'selected' : ''} key={f} onClick={() => setFilter(f)}>{f}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects, tools, topics..."/></label></div>
    {visibleProjects.length ? <div className="project-grid">{visibleProjects.map(p=><ProjectCard key={p.id} project={p} onOpen={onOpen} onImage={onImage}/>)}</div> : <div className="empty"><b>No projects found.</b><span>Try another search or category.</span></div>}
  </div>;
}

function ProjectCard({ project, onOpen, onImage, compact=false }) {
  return <article className={`project-card tone-${project.tone} ${compact ? 'compact' : ''}`}>
    <div className="card-top"><span className="category-pill">{project.category}</span>{project.private && <span className="private-pill">PRIVATE</span>}</div>
    {project.image && <button className={`thumb ${project.visualType || ''}`} onClick={() => onImage?.({ image: project.image, label: project.title })}><img src={project.image} alt={`${project.title} project preview`} /><span>View preview</span></button>}
    <div className="card-body"><span className="eyebrow">{project.eyebrow}</span><h3>{project.title}</h3><p>{project.description}</p>
      <div className="stack">{project.stack.map(s=><span key={s}>{s}</span>)}</div>
      <div className="card-bottom"><button className="details" onClick={() => onOpen?.(project)}>View case study <span>→</span></button>{project.links[0] && <a href={project.links[0].url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}>↗</a>}</div>
    </div>
  </article>;
}

function ProjectModal({ project, onClose, onImage }) {
  useEffect(() => { const f=e=>e.key==='Escape'&&onClose(); window.addEventListener('keydown',f); return()=>window.removeEventListener('keydown',f); }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal">
    <div className="modal-content"><button className="modal-close" onClick={onClose} aria-label="Close project details">×</button><div className="modal-heading"><div><span className="eyebrow">{project.eyebrow}</span><h2>{project.title}</h2></div><span className="category-pill">{project.category}</span></div>
      <p className="modal-desc">{project.description}</p>
      {project.metrics && <div className="metric-row">{project.metrics.map(([a,b])=><div key={a}><small>{a}</small><b>{b}</b></div>)}</div>}
      <div className="modal-columns"><div><h4>What I worked on</h4><ul>{project.highlights.map(h=><li key={h}>{h}</li>)}</ul></div><div><h4>Tech stack</h4><div className="stack large">{project.stack.map(s=><span key={s}>{s}</span>)}</div></div></div>
      {project.gallery && <div className="gallery"><h4>Dashboard pages</h4><div className="gallery-grid">{project.gallery.map(([src,label])=><button key={src} onClick={()=>onImage({image:src,label})}><img src={src} alt={label}/><span>{label}</span></button>)}</div></div>}
      <div className="modal-actions">{project.links.length ? project.links.map(l=><a key={l.url} className="primary" href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>) : <span className="private-note">Cura source is private; no public code/demo is linked.</span>}</div>
    </div>
  </div></div>;
}

function Internships({ internships }) {
  return <div className="content internships-page">
    <section className="section-heading"><div><span className="eyebrow">REAL-WORLD EXPERIENCE</span><h1>Internships</h1><p>Practical software-development experience across application development, frontend work and backend functionality.</p></div><div className="project-count"><b>03</b><span>internships</span></div></section>
    <div className="internship-grid">{internships.map((item, i) => <article className={`internship-card tone-${item.tone}`} key={`${item.company}-${item.role}`}>
      <div className="internship-index">0{i+1}</div>
      <div className="internship-main"><span className="eyebrow">{item.company}</span><h2>{item.role}</h2><p className="internship-period">{item.period}</p>
        <div className="stack">{item.stack.map(x=><span key={x}>{x}</span>)}</div>
        <h4>WHAT I WORKED ON</h4><ul>{item.points.map((x,j)=><li key={j}>{x}</li>)}</ul>
      </div>
    </article>)}</div>
  </div>;
}

function Skills({ skills, selected, setSelected }) {
  const groups = [...new Set(skills.map(s=>s.group))];
  return <div className="content skills-page"><section className="section-heading"><div><span className="eyebrow">SKILL MAP</span><h1>Tools I actually use</h1><p>Click a skill to see where it connects to my work and what I have learned.</p></div></section><div className="skills-layout"><div className="skill-cloud">{skills.map(s=><button className={selected?.name===s.name?'chosen':''} onClick={()=>setSelected(s)} key={s.name}><span>{s.name}</span><small>{s.group}</small></button>)}</div><div className="skill-detail">{selected ? <><span className="eyebrow">SELECTED SKILL</span><h2>{selected.name}</h2><span className="detail-group">{selected.group}</span><p className="skill-used"><b>Used in:</b> {selected.used}</p><h4>WHAT I LEARNED</h4><ul className="skill-learned">{selected.details.map((item,i)=><li key={i}>{item}</li>)}</ul></> : <><span className="eyebrow">INTERACTIVE</span><h2>Explore the map</h2><p>Select any technology to see how I have used or am learning it.</p></>}<div className="group-list">{groups.map(g=><span key={g}>{g}</span>)}</div></div></div></div>;
}

function Journey() { return <div className="content journey-page"><section className="section-heading"><div><span className="eyebrow">LEARNING PATH</span><h1>From building apps to building models.</h1><p>My path has moved from web development into analytics and now machine learning — while keeping the development foundation underneath.</p></div></section><div className="timeline">{journey.map((j,i)=><div className="timeline-item" key={j.year}><div className="time-dot">{String(i+1).padStart(2,'0')}</div><div className="time-content"><span>{j.year}</span><h3>{j.title}</h3><p>{j.text}</p></div></div>)}</div><div className="journey-cta"><span className="eyebrow">CURRENTLY LEARNING</span><h2>Linear regression → Logistic regression → more ML</h2><p>The portfolio will grow as the learning path grows.</p></div></div>; }

function Stat({n,label,note}) { return <div className="stat-card"><b>{n}</b><div><strong>{label}</strong><span>{note}</span></div></div> }
function PanelTitle({kicker,title}) { return <div className="panel-title"><span>{kicker}</span><h3>{title}</h3></div> }
function Signal({icon,title,text}) { return <div className="signal"><b>{icon}</b><div><strong>{title}</strong><span>{text}</span></div></div> }
function Lightbox({image,label,onClose}) { return <div className="lightbox" onClick={onClose}><div className="lightbox-inner" onClick={e=>e.stopPropagation()}><button onClick={onClose}>×</button><img src={image} alt={label}/><span>{label}</span></div></div> }

createRoot(document.getElementById('root')).render(<App />);
