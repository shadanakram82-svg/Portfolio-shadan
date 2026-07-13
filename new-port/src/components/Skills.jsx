import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // PROGRESS BAR ANIMATION
    ScrollTrigger.create({
      trigger: '#skill',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.card-skill').forEach(card => {
          const pct = getComputedStyle(card).getPropertyValue('--skill-level').trim();
          const bar = card.querySelector('.progress-bar');
          if (bar && pct) {
            bar.style.width = '0%';
            gsap.to(bar, { width: pct, duration: 1.3, ease: 'power2.out', delay: Math.random() * 0.4 });
          }
        });
      }
    });

    // TILT EFFECT
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768) return;
    
    const maxTilt = 6;
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
      <h2 className="skill-title">Technical Skills <span className="accent"></span></h2>
      <div className="card-wrap-skill !grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-6 lg:!gap-8 !w-full !px-4 md:!px-0">

        <div className="card-skill card-a !mx-auto !w-full" data-card style={{ '--skill-level': '95%' }} ref={el => cardsRef.current[0] = el}>
          <div className="card-border-glow"></div>
          <div className="card-skill-spotlight"></div>
          <span className="card-tag">Frontend</span>
          <div className="card-icon">🌐</div>
          <h3 className="card-title">HTML5</h3>
          <p className="card-desc">Semantic markup & accessibility</p>
          <div className="card-stat"><strong>95%</strong></div>
          <div className="progress"><div className="progress-bar"></div></div>
        </div>

        <div className="card-skill card-b !mx-auto !w-full" data-card style={{ '--skill-level': '95%' }} ref={el => cardsRef.current[1] = el}>
          <div className="card-border-glow"></div>
          <div className="card-skill-spotlight"></div>
          <span className="card-tag">Frontend</span>
          <div className="card-icon">🎨</div>
          <h3 className="card-title">CSS3</h3>
          <p className="card-desc">Layouts, animations & responsive UI</p>
          <div className="card-stat"><strong>95%</strong></div>
          <div className="progress"><div className="progress-bar"></div></div>
        </div>

        <div className="card-skill card-c !mx-auto !w-full" data-card style={{ '--skill-level': '90%' }} ref={el => cardsRef.current[2] = el}>
          <div className="card-border-glow"></div>
          <div className="card-skill-spotlight"></div>
          <span className="card-tag">Frontend</span>
          <div className="card-icon">📦</div>
          <h3 className="card-title">Bootstrap</h3>
          <p className="card-desc">Responsive grid & components</p>
          <div className="card-stat"><strong>90%</strong></div>
          <div className="progress"><div className="progress-bar"></div></div>
        </div>

        <div className="card-skill card-d !mx-auto !w-full" data-card style={{ '--skill-level': '95%' }} ref={el => cardsRef.current[3] = el}>
          <div className="card-border-glow"></div>
          <div className="card-skill-spotlight"></div>
          <span className="card-tag">Frontend</span>
          <div className="card-icon">⚡</div>
          <h3 className="card-title">JavaScript</h3>
          <p className="card-desc">ES6+, DOM, async & APIs</p>
          <div className="card-stat"><strong>95%</strong></div>
          <div className="progress"><div className="progress-bar"></div></div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
