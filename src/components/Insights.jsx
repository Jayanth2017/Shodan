import { Activity, Target, Shield, Brain } from 'lucide-react';
import './Insights.css';

export default function Insights() {
  const cards = [
    { title: 'Forex Analysis', desc: 'Daily and weekly market structure breakdowns.', icon: <Activity size={32} /> },
    { title: 'Trade Setups', desc: 'Educational trade ideas based on technical analysis.', icon: <Target size={32} /> },
    { title: 'Risk Management Tips', desc: 'Strategies for protecting trading capital.', icon: <Shield size={32} /> },
    { title: 'Trading Psychology', desc: 'Mindset lessons from real trading experiences.', icon: <Brain size={32} /> },
  ];

  return (
    <section id="market-insights">
      <h2 className="section-heading">Market <span className="gold">Insights</span></h2>
      <p className="section-sub">Regular analysis and educational content to sharpen your edge.</p>
      <div className="insights-grid">
        {cards.map((card, i) => (
          <div className="insight-card" key={i}>
            <div className="img-wrap">
              <div className="placeholder-icon">{card.icon}</div>
            </div>
            <div className="body">
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}