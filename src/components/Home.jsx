import { useRef, useEffect } from 'react';
import { Camera, Send, Play } from 'lucide-react';
import './Home.css';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const pips = [];
    const PIP_COUNT = 80;

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

    class Pip {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = 2 + Math.random() * 3;
        this.opacity = 0.15 + Math.random() * 0.5;
        this.color = `hsla(${40 + Math.random()*15}, 70%, ${50 + Math.random()*30}%, ${this.opacity})`;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) { this.vx *= -1; this.x = Math.max(0, Math.min(w, this.x)); }
        if (this.y < 0 || this.y > h) { this.vy *= -1; this.y = Math.max(0, Math.min(h, this.y)); }
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowColor = 'rgba(212,175,55,0.15)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      resize();
      pips.length = 0;
      for (let i = 0; i < PIP_COUNT; i++) {
        const p = new Pip();
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        pips.push(p);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(212,175,55,0.03)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      pips.forEach(p => { p.update(); p.draw(ctx); });
      for (let i = 0; i < pips.length; i++) {
        for (let j = i + 1; j < pips.length; j++) {
          const dx = pips[i].x - pips[j].x;
          const dy = pips[i].y - pips[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(pips[i].x, pips[i].y);
            ctx.lineTo(pips[j].x, pips[j].y);
            ctx.strokeStyle = `rgba(212,175,55,${0.03 * (1 - dist/80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      const barCount = 12;
      for (let i = 0; i < barCount; i++) {
        const x = (i / barCount) * w + 20;
        const barH = 20 + Math.sin(i * 1.7 + Date.now() / 3000) * 12;
        const y = h / 2 - barH / 2 + Math.sin(i * 2.3 + Date.now() / 4000) * 8;
        ctx.fillStyle = i % 2 === 0 ? 'rgba(212,175,55,0.08)' : 'rgba(212,175,55,0.04)';
        ctx.fillRect(x, y, 4, barH);
        ctx.fillStyle = 'rgba(212,175,55,0.06)';
        ctx.fillRect(x + 6, y + 2, 2, barH - 4);
      }
      requestAnimationFrame(animate);
    };

    init();
    animate();
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home">
      <div className="home-left">
        <div className="badge">Forex Trader & Analyst</div>
        <h1>Shodhan Raj <span className="gold">S R</span></h1>
        <p className="title">Forex Trader | Market Analyst | Content Creator</p>
        <p className="desc">
          Focused on technical analysis, risk management, and trading psychology.<br />
          Helping traders understand market structure, develop discipline, and improve consistency.
        </p>
        <div className="home-btns">
          <a href="#journey" className="btn-primary">Explore My Journey</a>
          <a href="#contact" className="btn-outline">Join Course</a>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="Instagram"><Camera size={28} /></a>
          <a href="#" aria-label="Telegram"><Send size={28} /></a>
          <a href="#" aria-label="YouTube"><Play size={28} /></a>
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
