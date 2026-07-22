import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { MdMenu, MdClose } from 'react-icons/md';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach(s => {
        const top = s.offsetTop - 100;
        const bottom = top + s.offsetHeight;
        const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
        if (link) {
          if (window.scrollY >= top && window.scrollY < bottom) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    let x = e?.clientX || 0;
    let y = e?.clientY || 0;
    
    if (x === 0 && y === 0 && e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!document.startViewTransition) {
      // Fallback custom spread animation for browsers like Safari
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = newTheme === 'dark' ? '#050810' : '#ffffff';
      overlay.style.zIndex = '999999';
      overlay.style.pointerEvents = 'none';
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      overlay.style.webkitClipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      const animation = overlay.animate(
        { 
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          webkitClipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] 
        },
        { duration: 600, easing: 'ease-in-out' }
      );

      animation.onfinish = () => {
        setTheme(newTheme);
        setTimeout(() => overlay.remove(), 100);
      };
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 600,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  return (
    <>
      <nav id="navbar" className={`navbar navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
        <div className="w-full px-4 md:px-12 lg:px-[7rem] d-flex align-items-center justify-content-between flex-nowrap">

          {/* Left Group: Hamburger + Brand */}
          <div className="d-flex align-items-center gap-2 md:gap-3">
            <button
              className="navbar-toggler p-1 m-0 d-lg-none"
              type="button"
              onClick={() => setIsNavOpen(true)}
              aria-label="Open navigation"
            >
              <MdMenu className="icon-menu" size={24} />
            </button>

            <a className="nav-brand navbar-brand" href="#hero">Shadan<span>Dev</span></a>
          </div>

          {/* Mobile Theme Toggle */}
          <button className="theme-btn d-lg-none m-0" aria-label="Toggle Theme" onClick={toggleTheme}>
            {theme === 'light' ? (
              <svg key="light" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg key="dark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex" id="navMenuDesktop">
            <ul className="navbar-nav align-items-center gap-1 me-2">
              <li className="nav-item"><a className="nav-link" href="#about">about</a></li>
              <li className="nav-item"><a className="nav-link" href="#skill">skills</a></li>
              <li className="nav-item"><a className="nav-link" href="#project">projects</a></li>
              <li className="nav-item"><a className="nav-link" href="#achievements">achievements</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">contact</a></li>
            </ul>
            <a href="#contact" className="nav-cta nav-link me-1">hire me</a>
            <button id="theme-toggle" className="theme-btn d-none d-lg-flex" aria-label="Toggle Theme" onClick={toggleTheme}>
              {theme === 'light' ? (
                <svg key="light" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg key="dark" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu for Mobile */}
      <div className={`mobile-overlay-menu ${isNavOpen ? 'open' : ''}`}>
        <div className="overlay-header">
          <span className="overlay-title">EXPLORE ARCHIVE</span>
          <button className="overlay-close-btn" onClick={() => setIsNavOpen(false)} aria-label="Close navigation">
            <MdClose size={28} />
          </button>
        </div>

        <div className="overlay-content">
          <ul className="overlay-nav-list">
            <li><a href="#about" onClick={() => setIsNavOpen(false)}><span className="overlay-nav-num">01</span> ABOUT</a></li>
            <li><a href="#skill" onClick={() => setIsNavOpen(false)}><span className="overlay-nav-num">02</span> SKILLS</a></li>
            <li><a href="#project" onClick={() => setIsNavOpen(false)}><span className="overlay-nav-num">03</span> PROJECTS</a></li>
            <li><a href="#achievements" onClick={() => setIsNavOpen(false)}><span className="overlay-nav-num">04</span> ACHIEVEMENTS</a></li>
            <li><a href="#contact" onClick={() => setIsNavOpen(false)}><span className="overlay-nav-num">05</span> CONTACT</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
