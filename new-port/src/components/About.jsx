import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    // GSAP animations removed to prevent conflict with App.jsx scroll-pop which already animates the container
    
    // TILT EFFECT
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768) return;
    
    const card = cardRef.current;
    if (!card) return;
    
    const maxTilt = 4;
    const spotlight = card.querySelector('.card-spotlight');
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

        card.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.03)`;

        const glow = card.querySelector('.card-border-glow');
        if (glow) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 135;
          glow.style.background = `linear-gradient(${angle}deg,#00f5c4,#7b61ff,transparent)`;
        }

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

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="about">
      <h2 className="about-title">About Me <span className="accent"></span></h2>
      <div className="about-outer">
        <div className="about-card card-a !flex !flex-col lg:!flex-row !gap-8 lg:!gap-12" data-card ref={cardRef}>
          <div className="card-border-glow"></div>
          <div className="card-spotlight"></div>
          {/* Left Bio */}
          <div className="card-a-left !w-full lg:!w-auto lg:!flex-1">
            <p className="about-text !text-sm md:!text-base">
              Hi, I'm <b>Shadan Akram</b> — a Front-End Web Developer who turns ideas into modern, responsive web experiences using clean code and thoughtful design.
            </p>
            <p className="about-text !text-sm md:!text-base">
              My journey into web development started with curiosity — tinkering with HTML files, styling with CSS, adding life with JavaScript. Today, I'm skilled at building modern, interactive interfaces using the latest tools and best practices.
            </p>
            <p className="about-text !text-sm md:!text-base">
              My goal is to grow into a highly skilled developer who builds impactful digital products and eventually dive deeper into AI-driven web applications.
            </p>
            <div className="about-tags !flex !flex-wrap !gap-2 !pt-4">
              <span className="about-tag">Problem Solver</span>
              <span className="about-tag">Creative Thinker</span>
              <span className="about-tag">Fast Learner</span>
            </div>
          </div>
          {/* Right Timeline */}
          <div className="about-timeline !w-full lg:!w-1/3 !mt-8 lg:!mt-0">
            <div className="timeline-entry">
              <div className="timeline-dot"></div>
              <div>
                <div className="tl-title !text-base md:!text-lg">10th performance</div>
                <div className="tl-desc !text-xs md:!text-sm">"Secured a perfect 70% in Secondary Education."</div>
              </div>
            </div>
            <hr className="tl-hr" />
            <div className="timeline-entry">
              <div className="timeline-dot"></div>
              <div>
                <div className="tl-title !text-base md:!text-lg">12th performance</div>
                <div className="tl-desc !text-xs md:!text-sm">"Secured a perfect 75% in Secondary Education."</div>
              </div>
            </div>
            <hr className="tl-hr" />
            <div className="timeline-entry">
              <div className="timeline-dot"></div>
              <div>
                <div className="tl-title !text-base md:!text-lg">B.tech performance</div>
                <div className="tl-desc !text-xs md:!text-sm">"Pursuing B.Tech (CSE) from I.K. Gujral Punjab Technical University, maintaining an 8 CGPA while actively developing front-end skills through real-world projects."</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
