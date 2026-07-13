import React, { useEffect, useRef } from 'react';

const Projects = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // TILT EFFECT
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768) return;
    
    const maxTilt = 10;
    const cleanupFns = [];

    cardsRef.current.forEach(card => {
      if (!card) return;
      const spotlight = card.querySelector('.card-pro-spotlight');
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

          const glow = card.querySelector('.card-border-glow-pro');
          if (glow) {
            const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 135;
            if (card.classList.contains('card-b-pro')) {
              glow.style.background = `linear-gradient(${angle}deg,#0ea5e9,#3b82f6,transparent)`;
            } else if (card.classList.contains('card-a-pro')) {
              glow.style.background = `linear-gradient(${angle}deg,#1DB954,#2cc953,transparent)`;
            } else {
              glow.style.background = `linear-gradient(${angle}deg,#00f5c4,#7b61ff,transparent)`;
            }
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
    <section id="project">
      <h2 className="project-title">Projects <span className="accent"></span></h2>
      <div className="project-wrap !grid !grid-cols-1 lg:!grid-cols-2 !gap-8 !w-full !px-4 md:!px-12 lg:!px-0 !mx-auto">

        <div className="card-project card-a-pro !mx-auto !w-full" data-card ref={el => cardsRef.current[0] = el}>
          <div className="card-border-glow-pro"></div>
          <div className="card-pro-spotlight"></div>
          <div className="project-image">
            <img src="assets/spotify-logo.png" className="center-logo" alt="Spotify" />
          </div>
          <div className="project-content">
            <h3 className="card-title">Spotify UI Clone</h3>
            <p className="card-desc">A pixel-perfect Spotify web player clone with playlist management, responsive layout, and playback controls.</p>
            <div className="tech-stack">
              <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Responsive</span>
            </div>
            <div className="divider"></div>
            <div className="buttons">
              <a href="https://spotify-ui-01.netlify.app/" className="btn live">
                <span style={{ filter: 'grayscale(1) brightness(0)', fontSize: '14px' }}>🌐</span> Live Demo
              </a>
              <a href="https://github.com/shadanakram82-svg/spotify-UI-clone" className="btn github">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="17" height="17"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.55-.29-5.24-1.27-5.24-5.64 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .95-.3 3.1 1.16.9-.25 1.86-.37 2.82-.37s1.92.12 2.82.37c2.15-1.46 3.1-1.16 3.1-1.16.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.38-2.69 5.35-5.25 5.64.41.36.77 1.08.77 2.18 0 1.58-.01 2.85-.01 3.24 0 .3.21.65.79.54A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="card-project card-b-pro !mx-auto !w-full" data-card ref={el => cardsRef.current[1] = el}>
          <div className="card-border-glow-pro"></div>
          <div className="card-pro-spotlight"></div>
          <div className="project-image">
            <svg width="70" height="70" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20 L20 2 A18 18 0 0 1 38 20 Z" fill="#1DB954"/>
              <path d="M20 20 L38 20 A18 18 0 0 1 20 38 Z" fill="#E74C3C"/>
              <path d="M20 20 L20 38 A18 18 0 0 1 2 20 Z" fill="#F1C40F"/>
              <path d="M20 20 L2 20 A18 18 0 0 1 20 2 Z" fill="#3498DB"/>
              <circle cx="20" cy="20" r="5" fill="#1a1a2e"/>
            </svg>
          </div>
          <div className="project-content">
            <h3 className="card-title">Simon Game</h3>
            <p className="card-desc">A classic memory-based game where users repeat increasing color sequences, game-over states.</p>
            <div className="tech-stack-b">
              <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Responsive</span>
            </div>
            <div className="divider"></div>
            <div className="buttons">
              <a href="https://simon-game-711.netlify.app/" className="btn live">
                <span style={{ filter: 'grayscale(1) brightness(0)', fontSize: '14px' }}>🌐</span> Live Demo
              </a>
              <a href="https://github.com/shadanakram82-svg/Simon-Game" className="btn github">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="17" height="17"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.55-.29-5.24-1.27-5.24-5.64 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .95-.3 3.1 1.16.9-.25 1.86-.37 2.82-.37s1.92.12 2.82.37c2.15-1.46 3.1-1.16 3.1-1.16.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.38-2.69 5.35-5.25 5.64.41.36.77 1.08.77 2.18 0 1.58-.01 2.85-.01 3.24 0 .3.21.65.79.54A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
