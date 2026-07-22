import React, { useState, useEffect } from 'react';
import '../index.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let startTime = null;
    const duration = 2000; // 2 seconds

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Easing function for smoother counter (easeOutQuart)
      const t = Math.min(elapsed / duration, 1);
      const easeT = 1 - Math.pow(1 - t, 4);
      const currentProgress = Math.min(Math.floor(easeT * 100), 100);
      
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Wait a bit at 100%, then trigger fade out
        setTimeout(() => {
          setIsFadingOut(true);
          // Wait for fade out animation to finish before unmounting
          setTimeout(() => {
            onComplete();
          }, 600); 
        }, 400); 
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <div className={`preloader-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-number">
          {progress}<span className="preloader-percent">%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="preloader-text">ENGINEERING DIGITAL EXPERIENCES</div>
        <div className="preloader-footer">SHADAN AKRAM &copy; 2026</div>
      </div>
    </div>
  );
};

export default Preloader;
