import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTelegram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import './Home.css';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    // Chart data store
    let priceData = [];
    let animationFrameId;
    let tickInterval;

    // Initialize Fake Live Data
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

    // Update with a new candlestick every 2 seconds (simulate live feed)
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
      if (priceData.length > 50) priceData.shift(); // keep last 50 candles
    };

    // Resize handler
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

    // --- CHART DRAWING ENGINE ---
    const drawChart = () => {
      ctx.clearRect(0, 0, w, h);

      // 1. Chart Margins
      const pad = { top: 30 * (w / 500), right: 50 * (w / 500), bottom: 30 * (w / 500), left: 10 * (w / 500) };
      const chartW = w - pad.left - pad.right;
      const chartH = h - pad.top - pad.bottom;

      // 2. Calculate Price Range
      const allPrices = priceData.flatMap(c => [c.high, c.low]);
      const minPrice = Math.min(...allPrices) - 1.5;
      const maxPrice = Math.max(...allPrices) + 1.5;
      const priceRange = maxPrice - minPrice;

      const getY = (val) => pad.top + chartH - ((val - minPrice) / priceRange) * chartH;
      const spacing = chartW / priceData.length;
      const candleWidth = spacing * 0.7;

      // 3. Draw Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 6; i++) {
        const y = pad.top + (i / 6) * chartH;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();
      }
      for (let i = 0; i <= 10; i++) {
        const x = pad.left + (i / 10) * chartW;
        ctx.beginPath();
        ctx.moveTo(x, pad.top);
        ctx.lineTo(x, h - pad.bottom);
        ctx.stroke();
      }

      // 4. Draw Y-Axis Labels (Prices - Right Side)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = `600 ${10 * (w / 500)}px sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let i = 0; i <= 6; i++) {
        const priceVal = maxPrice - (i / 6) * priceRange;
        const y = pad.top + (i / 6) * chartH;
        ctx.fillText(priceVal.toFixed(1), w - pad.right + 45, y);
      }

      // 5. Draw X-Axis Labels (Dates - Bottom)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = `400 ${11 * (w / 500)}px sans-serif`;
      // ctx.fillText('Mar 2026', pad.left + 15, h - pad.bottom + 6);
      // ctx.fillText('Apr 2026', w - pad.right - 15, h - pad.bottom + 6);

      // 6. Draw Candlesticks
      priceData.forEach((c, i) => {
        const x = pad.left + i * spacing + spacing / 2;
        const isGreen = c.close >= c.open;
        const color = isGreen ? '#2ecc71' : '#e74c3c'; // Green / Red

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 0.8;

        // Wick
        ctx.beginPath();
        ctx.moveTo(x, getY(c.high));
        ctx.lineTo(x, getY(c.low));
        ctx.stroke();

        // Body
        const top = getY(Math.max(c.open, c.close));
        const bottom = getY(Math.min(c.open, c.close));
        const height = Math.max(1, bottom - top);
        ctx.fillRect(x - candleWidth / 2, top, candleWidth, height);
      });

      // 7. Top-Left Branding (GBP/USD)
      ctx.fillStyle = '#d4af37';
      ctx.font = `700 ${14 * (w / 500)}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('EUR/USD', pad.left + 6, pad.top + 4);

      // Fake IG Logo
      // ctx.fillStyle = '';
      // ctx.fillRect(pad.left + 6, pad.top + 24, 24 * (w/500), 24 * (w/500));
      // ctx.fillStyle = '#ffffff';
      // ctx.font = `900 ${16 * (w / 500)}px sans-serif`;
      // ctx.textAlign = 'center';
      // ctx.textBaseline = 'middle';
      // ctx.fillText('', pad.left + 6 + 12 * (w/500), pad.top + 24 + 12 * (w/500));
    };

    // 8. Animation Loop
    const animate = () => {
      drawChart();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    tickInterval = setInterval(addNewCandle, 2000); // New candle every 2 seconds
    animate();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(tickInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home">
      <div className="home-left">
        <div className="badge">📊 Forex Trader & Analyst</div>
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
          <a href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="#" aria-label="Telegram">
            <FontAwesomeIcon icon={faTelegram} size="2x" />
          </a>
          <a href="#" aria-label="YouTube">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        </div>
      </div>
      
      <div className="home-right">
        <div className="monitor-wrap">
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