import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaFigma 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTailwindcss, SiCplusplus, SiExpress, SiVite, SiNpm, SiNetlify, SiVercel 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { BsRobot } from 'react-icons/bs';
import { FiMonitor, FiCode, FiServer, FiGitBranch, FiTool, FiUploadCloud, FiPenTool, FiCpu, FiLayout } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 1,
    title: "Frontend Development",
    icon: <FiMonitor size={20} />,
    iconColor: "text-[#0ea5e9]", // light blue
    description: "Building responsive and interactive user interfaces.",
    cardClass: "card-a",
    technologies: [
      { name: "HTML5", icon: <FaHtml5 />, color: "hover:text-[#E34F26] hover:border-[#E34F26] hover:shadow-[0_0_15px_rgba(227,79,38,0.4)]" },
      { name: "CSS3", icon: <FaCss3Alt />, color: "hover:text-[#1572B6] hover:border-[#1572B6] hover:shadow-[0_0_15px_rgba(21,114,182,0.4)]" },
      { name: "JavaScript", icon: <SiJavascript />, color: "hover:text-[#F7DF1E] hover:border-[#F7DF1E] hover:shadow-[0_0_15px_rgba(247,223,30,0.4)]" },
      { name: "React.js", icon: <FaReact />, color: "hover:text-[#61DAFB] hover:border-[#61DAFB] hover:shadow-[0_0_15px_rgba(97,218,251,0.4)]" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "hover:text-[#06B6D4] hover:border-[#06B6D4] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]" },
      { name: "Bootstrap", icon: <FaBootstrap />, color: "hover:text-[#7952B3] hover:border-[#7952B3] hover:shadow-[0_0_15px_rgba(121,82,179,0.4)]" },
    ]
  },
  {
    id: 2,
    title: "Programming",
    icon: <FiCode size={20} />,
    iconColor: "text-[#10b981]", // emerald
    description: "Problem solving and core programming fundamentals.",
    cardClass: "card-b",
    technologies: [
      { name: "C++", icon: <SiCplusplus />, color: "hover:text-[#00599C] hover:border-[#00599C] hover:shadow-[0_0_15px_rgba(0,89,156,0.4)]" },
    ]
  },
  {
    id: 3,
    title: "Backend",
    icon: <FiServer size={20} />,
    iconColor: "text-[#8b5cf6]", // violet
    description: "Learning server-side development and REST APIs.",
    badge: "Learning",
    cardClass: "card-c",
    technologies: [
      { name: "Node.js", icon: <FaNodeJs />, color: "hover:text-[#339933] hover:border-[#339933] hover:shadow-[0_0_15px_rgba(51,153,51,0.4)]" },
      { name: "Express.js", icon: <SiExpress />, color: "hover:text-[#FFFFFF] hover:border-[#FFFFFF] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" },
    ]
  },
  {
    id: 4,
    title: "Version Control",
    icon: <FiGitBranch size={20} />,
    iconColor: "text-[#f97316]", // orange
    description: "Managing source code and collaboration.",
    cardClass: "card-d",
    technologies: [
      { name: "Git", icon: <FaGitAlt />, color: "hover:text-[#F05032] hover:border-[#F05032] hover:shadow-[0_0_15px_rgba(240,80,50,0.4)]" },
      { name: "GitHub", icon: <FaGithub />, color: "hover:text-[#FFFFFF] hover:border-[#FFFFFF] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" },
    ]
  },
  {
    id: 5,
    title: "Development Tools",
    icon: <FiTool size={20} />,
    iconColor: "text-[#ec4899]", // pink
    description: "Daily development workflow.",
    cardClass: "card-a",
    technologies: [
      { name: "VS Code", icon: <VscVscode />, color: "hover:text-[#007ACC] hover:border-[#007ACC] hover:shadow-[0_0_15px_rgba(0,122,204,0.4)]" },
      { name: "Vite", icon: <SiVite />, color: "hover:text-[#646CFF] hover:border-[#646CFF] hover:shadow-[0_0_15px_rgba(100,108,255,0.4)]" },
      { name: "npm", icon: <SiNpm />, color: "hover:text-[#CB3837] hover:border-[#CB3837] hover:shadow-[0_0_15px_rgba(203,56,55,0.4)]" },
    ]
  },
  {
    id: 6,
    title: "Deployment",
    icon: <FiUploadCloud size={20} />,
    iconColor: "text-[#06b6d4]", // cyan
    description: "Deploying production-ready web applications.",
    cardClass: "card-b",
    technologies: [
      { name: "Netlify", icon: <SiNetlify />, color: "hover:text-[#00C7B7] hover:border-[#00C7B7] hover:shadow-[0_0_15px_rgba(0,199,183,0.4)]" },
      { name: "Vercel", icon: <SiVercel />, color: "hover:text-[#FFFFFF] hover:border-[#FFFFFF] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" },
    ]
  },
  {
    id: 7,
    title: "Design Tools",
    icon: <FiPenTool size={20} />,
    iconColor: "text-[#f43f5e]", // rose
    description: "Designing clean and modern user interfaces.",
    cardClass: "card-c",
    technologies: [
      { name: "Figma", icon: <FaFigma />, color: "hover:text-[#F24E1E] hover:border-[#F24E1E] hover:shadow-[0_0_15px_rgba(242,78,30,0.4)]" },
      { name: "Canva", icon: <FiLayout />, color: "hover:text-[#00C4CC] hover:border-[#00C4CC] hover:shadow-[0_0_15px_rgba(0,196,204,0.4)]" },
    ]
  },
  {
    id: 8,
    title: "AI Tools",
    icon: <FiCpu size={20} />,
    iconColor: "text-[#eab308]", // yellow
    description: "AI-powered tools used during development.",
    cardClass: "card-d",
    technologies: [
      { name: "ChatGPT", icon: <BsRobot />, color: "hover:text-[#10A37F] hover:border-[#10A37F] hover:shadow-[0_0_15px_rgba(16,163,127,0.4)]" },
    ]
  }
];

const Skills = () => {
  const cardsRef = useRef([]);
  
  useEffect(() => {
    // GSAP Scroll Animation
    ScrollTrigger.create({
      trigger: '#skill',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(cardsRef.current, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
        );
      }
    });

    // TILT EFFECT
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768) return;
    
    const maxTilt = 4;
    const cleanupFns = [];

    cardsRef.current.forEach(card => {
      if (!card) return;
      const spotlight = card.querySelector('.card-skill-spotlight');
      let rafId;
      let rect = card.getBoundingClientRect();

      const handleMouseEnter = () => {
        rect = card.getBoundingClientRect();
        card.style.transition = 'transform 0.1s ease-out';
        if (spotlight) spotlight.style.opacity = '1';
      };

      const handleMouseMove = (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const dx = x - rect.width / 2;
          const dy = y - rect.height / 2;
          const rx = -(dy / (rect.height / 2)) * maxTilt;
          const ry = (dx / (rect.width / 2)) * maxTilt;

          card.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`;

          if (spotlight) {
            card.style.setProperty('--spotlight-x', ((x / rect.width) * 100).toFixed(2) + '%');
            card.style.setProperty('--spotlight-y', ((y / rect.height) * 100).toFixed(2) + '%');
          }

          rafId = null;
        });
      };

      const handleMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        if (spotlight) spotlight.style.opacity = '0';
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanupFns.push(() => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <section id="skill">
      <h2 className="about-title">Technical Arsenal <span className="accent"></span></h2>
      <div className="about-outer">
        {/* Categories Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, index) => (
              <div 
                key={cat.id}
                ref={el => cardsRef.current[index] = el}
                className={`card-skill ${cat.cardClass} !w-full !m-0 !p-6 !flex !flex-col`}
                style={{ opacity: 0 }}
              >
                <div className="card-border-glow"></div>
                <div className="card-skill-spotlight"></div>
                
                <div className="flex items-center justify-between mb-4 z-10 relative">
                  <div className="flex items-center gap-3">
                    <div className={cat.iconColor}>
                      {cat.icon}
                    </div>
                    <h3 className="card-title !m-0 !text-xl !pb-0">{cat.title}</h3>
                  </div>
                  {cat.badge && (
                    <span className="card-tag !text-[10px] !px-2 !py-0.5 !bg-[#7b61ff]/20 !text-[#7b61ff] !border !border-[#7b61ff]/30">
                      {cat.badge}
                    </span>
                  )}
                </div>
                
                <p className="card-desc !text-sm !mb-6 !flex-grow z-10 relative">{cat.description}</p>
                
                <div className="flex flex-wrap gap-2.5 z-10 relative mt-auto">
                  {cat.technologies.map((tech, idx) => (
                    <div
                      key={idx}
                      className={`skill-pill flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm transition-all duration-300 ${tech.color} cursor-default`}
                    >
                      <span className="text-base">{tech.icon}</span>
                      <span className="font-medium tracking-wide">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Skills;
