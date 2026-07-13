import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const typedTextRef = useRef(null);

  // Typing effect
  useEffect(() => {
    const phrases = ['Web Developer', 'UI Enthusiast', 'HTML & CSS Wizard', 'JavaScript Developer', 'Bootstrap Expert', 'Creative Coder'];
    let pi = 0, ci = 0, deleting = false;
    let timeoutId;

    const type = () => {
      const el = typedTextRef.current;
      if (!el) return;
      const cur = phrases[pi];
      if (!deleting) {
        el.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { 
          deleting = true; 
          timeoutId = setTimeout(type, 1400); 
          return; 
        }
      } else {
        el.textContent = cur.slice(0, --ci);
        if (ci === 0) { 
          deleting = false; 
          pi = (pi + 1) % phrases.length; 
        }
      }
      timeoutId = setTimeout(type, deleting ? 55 : 85);
    };

    timeoutId = setTimeout(type, 1800);
    return () => clearTimeout(timeoutId);
  }, []);

  // Canvas background
  useEffect(() => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, dots = [];
    let animationFrameId;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };

    const initDots = () => {
      dots = [];
      const n = Math.floor((W * H) / 14000);
      for (let i = 0; i < n; i++) dots.push({
        x: Math.random() * W, y: Math.random() * H,
        r: .8 + Math.random() * 1.5,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
        alpha: .2 + Math.random() * .5
      });
    };

    const handleResize = () => { resize(); initDots(); };
    window.addEventListener('resize', handleResize);
    
    resize();
    initDots();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      let r = 0, g = 245, b = 196;
      if (document.body.classList.contains('light-mode')) {
        r = 0; g = 179; b = 143;
      }

      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${d.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${.08 * (1 - dist / 120)})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero">
      <canvas id="hero-canvas"></canvas>
      <div className="hero-grid"></div>
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="hero-content !px-4 md:!px-12 lg:!px-[7rem]">
        <div className="hero-inner !flex !flex-col-reverse lg:!flex-row !pt-24 lg:!pt-0 !text-center lg:!text-left">
          <div className="hero-text-col !w-full lg:!w-[57%] !min-w-0 !flex !flex-col !items-center lg:!items-start !mb-10 lg:!mb-[3rem]">
            <div className="hero-tag fade-in">✦ Available for Freelance</div>
            <h1 className="hero-title slide-up">
              <span className="hello !text-4xl md:!text-6xl lg:!text-[clamp(3rem,6.5vw,6rem)]">Hey, I'm</span>
              <div className="name-line fade-in"><span className="my-name !text-3xl md:!text-5xl lg:!text-[clamp(2rem,5.2vw,4rem)]">Shadan Akram</span></div>
              <div className="role-text fade-in !text-2xl md:!text-3xl lg:!text-[clamp(2.5rem,2.6vw,2.3rem)]">Frontend Developer</div>
            </h1>
            <div className="typing-wrap fade-in">
              &gt;&nbsp;<span className="typed-text" id="typedText" ref={typedTextRef}></span><span className="cursor"></span>
            </div>
            <div className="hero-btns fade-in !justify-center lg:!justify-start">
              <a href="#contact" className="btn-primary-custom">Get In Touch</a>
              <a href="assets/Shadan_Akram_CV.pdf" className="btn-outline-custom">Download CV</a>
            </div>
            <div className="hero-socials fade-in !justify-center lg:!justify-start">
              <a href="https://github.com/shadanakram82-svg" target="_blank" rel="noreferrer" className="social-circle"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/shadan-akram-36167135a/" target="_blank" rel="noreferrer" className="social-circle"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/shadan_akram09/" target="_blank" rel="noreferrer" className="social-circle"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="hero-img-col !w-full lg:!w-[40%] !max-w-full !mb-10 lg:!mb-0">
            <div className="hero-image-wrap !mb-0 lg:!mb-[6rem] !scale-75 md:!scale-100">
              <div className="hero-image-ring" id="heroImg">
                <div className="ring-outer"><div className="ring-dot"></div></div>
                <div className="ring-inner"></div>
                <div className="hero-img">
                  <img src="assets/shadan-img.png" alt="Shadan Akram" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
