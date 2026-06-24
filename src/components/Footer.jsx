import { Camera, Send, Play, TrendingUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-socials">
        <a href="#" aria-label="Instagram"><Camera size={24} /></a>
        <a href="#" aria-label="Telegram"><Send size={24} /></a>
        <a href="#" aria-label="YouTube"><Play size={24} /></a>
        <a href="#" aria-label="Twitter"><TrendingUp size={24} /></a>
      </div>
      <div className="disclaimer">
        <strong>Important Disclaimer</strong><br />
        The information provided through Raja Trades Edge is for educational and informational purposes only.<br />
        It does not constitute financial, investment, or trading advice.<br />
        Trading financial markets involves substantial risk and may not be suitable for all investors.<br />
        Always conduct your own research and consult a qualified financial professional before making investment decisions.
      </div>
      <div className="credit">
        Designed by <span>jayanth</span>
      </div>
    </footer>
  );
}   