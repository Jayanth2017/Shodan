import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="about-bg">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>
      <div className="about-content">
        {/* Glassmorphism wrapper */}
        <div className="about-glass">
          <h2>The Mind Behind <span className="gold">Raja Trades Edge</span></h2>
          <p className="sub">Discipline · Psychology · Risk Management</p>
          <p>
            Trading is more than buying and selling.<br />
            It is a combination of discipline, psychology, risk management, and continuous learning.<br />
            As a Forex Trader and Market Analyst, I focus on understanding market structure, identifying
            high-probability setups, and maintaining consistency through a systematic approach.<br />
            Through <strong>Raja Trades Edge</strong>, I share educational content, trading concepts,
            and market observations to help aspiring traders develop confidence and avoid common mistakes.<br />
            My mission is to simplify complex market movements and help traders build a process-driven
            mindset rather than chasing quick profits.
          </p>
        </div>
      </div>
    </section>
  );
}