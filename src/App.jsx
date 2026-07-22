import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    // ── LENIS SMOOTH SCROLL ──
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.currentTarget.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(target);
      }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // ── PARTICLES ──
    const pc = document.getElementById('particles-container');
    if (pc) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.animationDuration = (12 + Math.random() * 10) + 's';
        p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
        pc.appendChild(p);
      }
    }

    // ── SCROLL REVEAL (IntersectionObserver) ──
    const initReveal = () => {
      const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { 
          if (e.isIntersecting) e.target.classList.add('visible'); 
        });
      }, { threshold: 0.12 });
      els.forEach(el => obs.observe(el));
      return obs;
    };
    const revealObs = initReveal();

    // ── SCROLL POP ──
    const popObservers = [];
    const initScrollPop = (selector, options = {}) => {
      const { stagger = 0, threshold = 0.18, rootMargin = '0px 0px -10% 0px', clearReveal = false } = options;
      const elements = Array.from(document.querySelectorAll(selector));
      if (!elements.length) return;

      elements.forEach((el, index) => {
        if (clearReveal) el.classList.remove('reveal', 'reveal-left', 'reveal-right', 'visible');
        el.classList.add('scroll-pop');
        el.style.setProperty('--pop-delay', `${index * stagger}s`);
      });

      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('pop-visible', entry.isIntersecting);
        });
      }, { threshold, rootMargin });

      elements.forEach(el => obs.observe(el));
      popObservers.push(obs);
    };

    initScrollPop('.about-title',           { threshold: 0.3 });
    // initScrollPop('#about .about-outer',    { threshold: 0.18, clearReveal: true }); // Disabled to fix invisibility bug
    initScrollPop('.skill-title',           { threshold: 0.3 });
    initScrollPop('#skill .card-wrap-skill',{ stagger: 0.12, threshold: 0.18 });
    initScrollPop('.project-title',         { threshold: 0.3 });
    initScrollPop('#project .project-wrap', { stagger: 0.14, threshold: 0.2 });
    initScrollPop('#achievements .ach-title',      { threshold: 0.22, clearReveal: true });
    initScrollPop('#achievements .achievement-card', { stagger: 0.08, threshold: 0.12 });
    initScrollPop('#contact .text-center.mb-5', { threshold: 0.22, clearReveal: true });
    initScrollPop('#contact .contact-info-col', { threshold: 0.18, clearReveal: true });
    initScrollPop('#contact .contact-form-col', { threshold: 0.18, clearReveal: true });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      lenis.destroy();
      if (pc) pc.innerHTML = '';
      revealObs.disconnect();
      popObservers.forEach(obs => obs.disconnect());
      document.querySelectorAll('.scroll-pop').forEach(el => {
        el.classList.remove('scroll-pop', 'pop-visible');
      });
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div id="particles-container"></div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}

export default App;