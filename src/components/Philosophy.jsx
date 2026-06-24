import { TrendingUp, CheckCircle } from 'lucide-react';
import './Philosophy.css';

export default function Philosophy() {
  const points = [
    'Managing risk effectively',
    'Following a proven strategy',
    'Maintaining emotional discipline',
    'Focusing on long-term consistency',
    'Learning from every trade'
  ];

  return (
    <section id="trading-philosophy">
      <div className="philosophy-wrap">
        <div className="philosophy-img">
          <div className="placeholder-icon"><TrendingUp size={80} /></div>
        </div>
        <div className="philosophy-content">
          <h2>My <span className="gold">Trading Philosophy</span></h2>
          <p className="sub">Principles that guide every trade.</p>
          <p className="desc">
            Successful trading is not about predicting every market move.<br />
            It is about:
          </p>
          <ul className="philosophy-list">
            {points.map((p, i) => (
              <li key={i}><span className="icon"><CheckCircle size={20} /></span> {p}</li>
            ))}
          </ul>
          <p className="desc" style={{ marginTop: '1.2rem', fontWeight: '500' }}>
            The goal is not to win every trade.<br />
            The goal is to become a <span className="gold">consistently profitable trader</span> over time.
          </p>
        </div>
      </div>
    </section>
  );
}