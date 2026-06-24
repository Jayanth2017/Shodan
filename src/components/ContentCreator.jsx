import { Users } from 'lucide-react';
import './ContentCreator.css';

export default function ContentCreator() {
  const items = ['Price Action', 'Market Structure', 'Risk Management', 'Trading Psychology', 'Forex Market Fundamentals'];

  return (
    <section id="content">
      <div className="content-wrap">
        <div className="content-img">
          <div className="placeholder-icon"><Users size={80} /></div>
        </div>
        <div className="content-text">
          <h2>Educating The <span className="gold">Trading Community</span></h2>
          <p className="sub">Content that empowers traders.</p>
          <p>
            Through videos, articles, market breakdowns, and educational content,
            I help traders understand:
          </p>
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p style={{ marginTop: '1.2rem', color: '#666' }}>
            Every piece of content is designed to improve trader awareness and decision-making.
          </p>
        </div>
      </div>
    </section>
  );
}