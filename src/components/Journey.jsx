import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCoins, faChartLine, faGlobeAsia, faBrain, 
  faBullseye, faBolt, faFlag 
} from '@fortawesome/free-solid-svg-icons';
import './Journey.css';

export default function Journey() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Calculate scroll progress: 0 = top of section hits bottom of screen, 1 = bottom hits top
      let rawProgress = 0;
      
      // Only calculate if the section is in view
      if (rect.top < viewHeight && rect.bottom > 0) {
        const distanceFromTop = viewHeight - rect.top;
        const sectionHeight = rect.height + viewHeight;
        rawProgress = distanceFromTop / sectionHeight;
      } else if (rect.top >= viewHeight) {
        rawProgress = 0; // Scrolled up past the section
      } else if (rect.bottom <= 0) {
        rawProgress = 1; // Scrolled down past the section
      }

      // Clamp and set
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineData = [
    { year: '2020', title: 'Began exploring cryptocurrency markets', desc: 'Started learning the fundamentals of trading and understanding how digital assets move.', side: 'left', icon: faCoins },
    { year: '2021', title: 'Focused on studying trading strategies', desc: 'Dived deep into technical analysis, market behavior, and various trading methodologies.', side: 'right', icon: faChartLine },
    { year: '2022', title: 'Expanded into the Indian stock market', desc: 'Broadened my market experience by studying and trading the Indian equity markets.', side: 'left', icon: faGlobeAsia },
    { year: '2023', title: 'Entered the Forex market', desc: 'Started learning market structure, price action, and risk management in the global Forex space.', side: 'right', icon: faFlag },
    { year: '2024', title: 'Researched Smart Money Concepts (SMC)', desc: 'Studied ICT concepts, the 2-Candle Theory, and actively traded Forex, Gold, and Bitcoin.', side: 'left', icon: faBrain },
    { year: '2025', title: 'Refined my trading approach', desc: 'Focused on identifying high-probability key levels and developed a structured strategy based on market behavior and discipline.', side: 'right', icon: faBullseye },
    { year: '2026', title: 'Established my personal trading edge', desc: 'Developed the PMSS (Precision Market Structure System) and began sharing educational content to help beginners and traders who feel overwhelmed.', side: 'left', icon: faBolt }
  ];

  // Determine which node the gold line has reached
  const activeNodeIndex = Math.floor(progress * timelineData.length);

  return (
    <section id="journey">
      <h2 className="section-heading">My <span className="gold">Trading Journey</span></h2>
      <p className="section-sub">A continuous journey of learning, adaptation, and refinement.</p>

      <div className="timeline-container" ref={containerRef}>
        {/* Static Grey Line */}
        <div className="timeline-line"></div>
        
        {/* Dynamic Gold Fill - grows/shrinks smoothly up/down */}
        <div className="timeline-fill" style={{ height: `${progress * 100}%` }}></div>

        {/* Items */}
        {timelineData.map((item, index) => {
          // Node becomes active if the gold line has passed it (works both up and down)
          const isActive = index < activeNodeIndex || (index === activeNodeIndex && progress > 0);

          return (
            <div key={index} className={`timeline-item ${item.side === 'left' ? 'left-align' : 'right-align'}`}>
              {/* Text */}
              <div className="text-col">
                <div className="year-label">{item.year}</div>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-desc">{item.desc}</p>
              </div>

              {/* Node (Icon) */}
              <div className="node-col">
                <div className={`node-circle ${isActive ? 'active' : ''}`}>
                  <FontAwesomeIcon icon={item.icon} className="node-icon" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Mission Block */}
        <div className="mission-block">
          <h4>Mission:</h4>
          <p>“To simplify trading concepts, promote disciplined risk management, and help aspiring traders build confidence through education and structured analysis.”</p>
        </div>
      </div>
    </section>
  );
}