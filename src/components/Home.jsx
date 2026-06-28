import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTelegram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import './Home.css';

export default function Home() {
  const canvasRef = useRef(null);
  const monitorRef = useRef(null);
  
  // 3D Hover states
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // --- CHART LOGIC (Same as before) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    let priceData = [];
    let animationFrameId;
    let tickInterval;

    const initData = () => {
      let price = 14192.0;
      const data = [];
      for (let i = 0; i < 50; i++) {
        const change = (Math.random() - 0.5) * 8;
        price += change;
        const open = price;
        const close = price + (Math.random() - 0.5) * 10;
        const high = Math.max(open, close) + Math.random() * 4;
        const low = Math.min(open, close) - Math.random() * 4;
        data.push({ open, high, low, close });
        price = close;
      }
      return data;
    };
    priceData = initData();

    const addNewCandle = () => {
      const last = priceData[priceData.length - 1];
      const change = (Math.random() - 0.5) * 8;
      const newClose = last.close + change;
      priceData.push({
        open: last.close,
        high: Math.max(last.close, newClose) + Math.random() * 3,
        low: Math.min(last.close, newClose) - Math.random() * 3,
        close: newClose
      });
      if (priceData.length > 50) priceData.shift();
    };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width * dpr;
      h = rect.height * dpr;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const drawChart = () => {
      ctx.clearRect(0, 0, w, h);
      const pad = { top: 30 * (w / 500), right: 50 * (w / 500), bottom: 30 * (w / 500), left: 10 * (w / 500) };
      const chartW = w - pad.left - pad.right;
      const chartH = h - pad.top - pad.bottom;

      const allPrices = priceData.flatMap(c => [c.high, c.low]);
      const minPrice = Math.min(...allPrices) - 1.5;
      const maxPrice = Math.max(...allPrices) + 1.5;
      const priceRange = maxPrice - minPrice;

      const getY = (val) => pad.top + chartH - ((val - minPrice) / priceRange) * chartH;
      const spacing = chartW / priceData.length;
      const candleWidth = spacing * 0.7;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 6; i++) {
        const y = pad.top + (i / 6) * chartH;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
      }
      for (let i = 0; i <= 10; i++) {
        const x = pad.left + (i / 10) * chartW;
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, h - pad.bottom); ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = `600 ${10 * (w / 500)}px sans-serif`;
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      for (let i = 0; i <= 6; i++) {
        const priceVal = maxPrice - (i / 6) * priceRange;
        const y = pad.top + (i / 6) * chartH;
        ctx.fillText(priceVal.toFixed(1), w - pad.right + 45, y);
      }

      // ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      // ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      // ctx.font = `400 ${11 * (w / 500)}px sans-serif`;
      // ctx.fillText('Mar 2018', pad.left + 15, h - pad.bottom + 6);
      // ctx.fillText('Apr 2018', w - pad.right - 15, h - pad.bottom + 6);

      priceData.forEach((c, i) => {
        const x = pad.left + i * spacing + spacing / 2;
        const isGreen = c.close >= c.open;
        const color = isGreen ? '#2ecc71' : '#e74c3c';
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(x, getY(c.high)); ctx.lineTo(x, getY(c.low)); ctx.stroke();
        const top = getY(Math.max(c.open, c.close));
        const bottom = getY(Math.min(c.open, c.close));
        const height = Math.max(1, bottom - top);
        ctx.fillRect(x - candleWidth / 2, top, candleWidth, height);
      });

      ctx.fillStyle = '#d4af37';
      ctx.font = `700 ${14 * (w / 500)}px sans-serif`;
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText('EUR/USD', pad.left + 6, pad.top + 4);
      
      // ctx.fillStyle = '#E63A3A';
      // ctx.fillRect(pad.left + 6, pad.top + 24, 24 * (w/500), 24 * (w/500));
      // ctx.fillStyle = '#ffffff';
      // ctx.font = `900 ${16 * (w / 500)}px sans-serif`;
      // ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      // ctx.fillText('IG', pad.left + 6 + 12 * (w/500), pad.top + 24 + 12 * (w/500));
    };

    const animate = () => {
      drawChart();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    tickInterval = setInterval(addNewCandle, 2000);
    animate();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(tickInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- 3D HOVER MOUSE EVENTS ---
  const handleMouseMove = (e) => {
    if (!monitorRef.current) return;
    const rect = monitorRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the monitor (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    
    // Map to degrees (Max tilt ±10 degrees)
    setTiltX(y * -10); // Y movement controls X-axis rotation
    setTiltY(x * 10);  // X movement controls Y-axis rotation
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <section id="home">
      <div className="home-left">
        <div className="badge"> Forex Trader & Analyst</div>
        <h1>Shodhan Raj <span className="gold">S R</span></h1>
        <p className="title">Forex Trader • Market Analyst • Content Creator</p>
        <p className="desc">
          Focused on technical analysis, risk management, and trading psychology.<br />
          Helping traders understand market structure, develop discipline, and improve consistency.
        </p>
        <div className="home-btns">
          <a href="#journey" className="btn-primary">Explore My Journey</a>
          <a href="#contact" className="btn-outline">Join Course</a>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
          <a href="#" aria-label="Telegram"><FontAwesomeIcon icon={faTelegram} size="2x" /></a>
          <a href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
        </div>
      </div>
      
      <div className="home-right">
        {/* The monitor wrap gets the 3D perspective and transform */}
        <div 
          className="monitor-wrap" 
          ref={monitorRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isHovering 
              ? `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)` 
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <div className="monitor-screen">
            <canvas ref={canvasRef} />
            <div className="monitor-label">LIVE MARKETS</div>
          </div>
          <div className="monitor-stand"></div>
        </div>
      </div>
    </section>
  );
}