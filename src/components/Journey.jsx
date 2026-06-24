import { useRef, useEffect, useState } from 'react';
import './Journey.css';

export default function Journey() {
  const timelineRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(items).indexOf(entry.target);
          setVisibleItems(prev => [...new Set([...prev, idx])]);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const timeline = [
    { year: '2020', label: 'Started Learning Forex' },
    { year: '2021', label: 'Developed Trading Discipline' },
    { year: '2022', label: 'Focused on Risk Management' },
    { year: '2023', label: 'Started Sharing Educational Content' },
    { year: '2024', label: 'Built Trading Community' },
    { year: '2025', label: 'Raja Trades Edge Brand Expansion' },
  ];

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.timeline-item');
    const total = items.length;
    const visibleCount = visibleItems.length;
    if (visibleCount === 0) return;
    const ratio = visibleCount / total;
    let fill = el.querySelector('.timeline-fill');
    if (!fill) {
      fill = document.createElement('div');
      fill.className = 'timeline-fill';
      fill.style.cssText =
        'position:absolute;left:8px;top:0;width:3px;background:#d4af37;border-radius:4px;box-shadow:0 0 20px rgba(212,175,55,0.3);transition:height 0.6s ease;z-index:0;';
      el.appendChild(fill);
    }
    fill.style.height = `${ratio * 100}%`;
  }, [visibleItems]);

  return (
    <section id="journey">
      <h2 className="section-heading">My <span className="gold">Trading Journey</span></h2>
      <p className="section-sub">A roadmap of growth, discipline, and community building.</p>
      <div className="timeline" ref={timelineRef}>
        {timeline.map((t, i) => (
          <div className={`timeline-item ${visibleItems.includes(i) ? 'visible' : ''}`} key={i}>
            <span className="year">{t.year}</span>
            <span className="label">-&gt; {t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
