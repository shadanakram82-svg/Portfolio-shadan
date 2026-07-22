import React from 'react';

const Achievements = () => {
  return (
    <section id="achievements">
      <h2 className="ach-title">Achievements & <span className="accent">Highlights</span></h2>
      <div className="achievement-container">
        <div className="achievement-card">
          <div className="icon-box">🏆</div>
          <h3>Winner – Prayog Technical Event</h3>
          <p>Achieved 1st position in Prayog through strong teamwork, where we collaboratively built and presented a solution with clear logic, effective execution, and impactful delivery.</p>
          <button className="tag">Top Achievement</button>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
