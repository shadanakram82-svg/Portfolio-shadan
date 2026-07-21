import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    index: "01",
    badge: "PROPERTY MANAGEMENT SYSTEM",
    title: "ESTATE HUB",
    stack: "HTML / CSS / JS",
    description: "A comprehensive real estate property management dashboard offering property listings, client management, and detailed analytics for agents.",
    image: "assets/project_estate.png?v=5",
    liveLink: "https://estate-property-hub.vercel.app/",
    accent: "from-[#00f5c4] to-[#7b61ff]",
    textColor: "text-[#7b61ff]",
    bgGlow: "bg-[#7b61ff]"
  },
  {
    id: 2,
    index: "02",
    badge: "PRODUCTIVITY APP",
    title: "TASKFLOW",
    stack: "HTML / CSS / JS",
    description: "An intuitive kanban-based task manager designed for teams to organize workflows, track progress, and boost daily productivity.",
    image: "assets/project_task.png?v=5",
    liveLink: "https://smart-task-productivity-platform.vercel.app/",
    accent: "from-[#0ea5e9] to-[#3b82f6]",
    textColor: "text-[#3b82f6]",
    bgGlow: "bg-[#3b82f6]"
  },
  {
    id: 3,
    index: "03",
    badge: "E-COMMERCE / DELIVERY",
    title: "HUFF & PUFF",
    stack: "HTML / CSS / JS",
    description: "A modern food ordering platform featuring a sleek menu, real-time cart updates, secure checkout, and user authentication.",
    image: "assets/project_food.png?v=5",
    liveLink: "https://food-ordering-ui-rho.vercel.app/",
    accent: "from-[#f97316] to-[#00f5c4]",
    textColor: "text-[#f97316]",
    bgGlow: "bg-[#f97316]"
  },
  {
    id: 4,
    index: "04",
    badge: "TRAVEL & BOOKING",
    title: "TRAVELX",
    stack: "HTML / CSS / JS",
    description: "An immersive travel and tourism website showcasing beautiful destinations with smooth scrolling animations and an integrated booking system.",
    image: "assets/project_travel.png?v=5",
    liveLink: "https://travel-tour-spa.vercel.app/",
    accent: "from-[#1DB954] to-[#00f5c4]",
    textColor: "text-[#1DB954]",
    bgGlow: "bg-[#1DB954]"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const flexWrapperRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Only apply complex scroll pinning on desktop
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop && containerRef.current && rightRef.current) {
      
      // Pin the right container
      ScrollTrigger.create({
        trigger: flexWrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: rightRef.current,
        pinSpacing: false,
      });

      // Update active image based on scroll position
      const sections = gsap.utils.toArray('.project-section');
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
            }
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="project" className="relative w-full text-white bg-[#050505] lg:bg-transparent" ref={containerRef}>
      
      {/* Section Header */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 pt-24 pb-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5c4] to-[#3b82f6]">Works</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#00f5c4] to-[#3b82f6] mt-6 rounded-full mx-auto"></div>
        </div>
      </div>

      {/* Container Wrapper */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row relative" ref={flexWrapperRef}>
        
        {/* Left Side (Scrolling Project Details) */}
        <div className="w-full lg:w-1/2 flex flex-col" ref={leftRef}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              ref={el => sectionsRef.current[index] = el}
              className="project-section min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-0 border-b border-white/5 lg:border-none relative z-10"
            >
              
              {/* Top Row: Index & Badge */}
              <div className="flex items-center gap-6 mb-6 text-[#a0a0a0] mt-10 lg:mt-0">
                <span className={`text-lg md:text-xl font-bold font-mono tracking-widest ${project.textColor}`}>{project.index}</span>
                <div className="h-[1px] w-12 bg-white/20"></div>
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase border border-white/10 px-4 py-1.5 rounded-full">{project.badge}</span>
              </div>
              
              {/* Giant Title */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black uppercase tracking-tighter mb-6 leading-[1.1]">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>
              
              {/* Divider */}
              <div className={`h-[2px] w-16 ${project.bgGlow} mb-6`}></div>
              
              {/* Stack Info */}
              <div className="mb-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2 font-semibold">Stack & Architecture</p>
                <p className={`text-sm md:text-base font-bold tracking-widest ${project.textColor}`}>{project.stack}</p>
              </div>

              {/* Mobile Image Overlay (Hidden on Desktop) */}
              <div className="lg:hidden w-full aspect-video rounded-xl overflow-hidden mb-8 border border-white/10 shadow-2xl relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${project.accent} opacity-20 mix-blend-overlay pointer-events-none`}></div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-md leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Explore Button */}
              <a href={project.liveLink} className="group flex items-center justify-between border-b border-white/10 pb-4 mb-12 w-full cursor-pointer no-underline">
                <span className="text-sm md:text-base lg:text-lg font-bold tracking-[0.15em] uppercase transition-colors text-gray-400 group-hover:text-white no-underline">
                  Explore Live Project
                </span>
                <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-all text-gray-400 group-hover:bg-[#3b82f6] group-hover:border-[#3b82f6] group-hover:text-white shadow-[0_0_0_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <FiArrowUpRight size={18} />
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Right Side (Sticky Image Viewer - Desktop Only) */}
        <div 
          className="hidden lg:flex w-1/2 h-screen self-start items-center justify-center p-8 xl:p-16 z-0" 
          ref={rightRef}
        >
          <div className="w-full max-w-[700px] aspect-[4/3] max-h-[75vh] relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
            
            {projectsData.map((project, index) => (
              <div 
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
