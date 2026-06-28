import { LineChart, Shield, Brain, Globe, BookOpen, BarChart3 } from 'lucide-react';
import './Expertise.css';

export default function Expertise() {
  const cards = [
    { title: 'Technical Analysis', desc: 'Market structure analysis, support and resistance, trend identification, and price action concepts.', icon: <LineChart size={32} /> },
    { title: 'Risk Management', desc: 'Capital preservation strategies, position sizing, and long-term sustainability.', icon: <Shield size={32} /> },
    { title: 'Trading Psychology', desc: 'Developing emotional control, patience, and consistency in decision making.', icon: <Brain size={32} /> },
    { title: 'Market Research', desc: 'Tracking global market events, economic news, and currency market trends.', icon: <Globe size={32} /> },
    { title: 'Educational Content', desc: 'Creating content that simplifies trading concepts for beginners and intermediate traders.', icon: <BookOpen size={32} /> },
    { title: 'Trade Journaling', desc: 'Performance review and continuous improvement through structured analysis.', icon: <BarChart3 size={32} /> },
  ];

  return (
    <section id="expertise">
      {/* Decorative animated background orbs */}
      <div className="expertise-bg">
        <div className="exp-orb exp-orb1"></div>
        <div className="exp-orb exp-orb2"></div>
      </div>

      <div className="expertise-container">
        <h2 className="section-heading">What I <span className="gold">Focus On</span></h2>
        <p className="section-sub">Core areas of expertise that drive consistent trading performance.</p>
        
        <div className="expertise-grid">
          {cards.map((card, i) => (
            <div className="expertise-card" key={i}>
              {/* 3D Icon Wrapper */}
              <div className="icon-3d-wrapper">
                <div className="icon-3d">
                  <div className="icon-inner">
                    {card.icon}
                  </div>
                </div>
              </div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}