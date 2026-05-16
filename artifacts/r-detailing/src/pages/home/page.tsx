import { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import WhatIsDetailing from './components/WhatIsDetailing';
import Services from './components/Services';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';

function SectionDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const draw = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const W = container.offsetWidth;
      canvas.width = W;
      canvas.height = 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, W, 2);
      ctx.strokeStyle = 'rgba(255,184,0,0.6)';
      ctx.lineWidth = 2;
      const dash = 55;
      const gap = 65;
      const count = Math.max(1, Math.floor((W - dash) / (dash + gap)) + 1);
      const totalDash = count * dash;
      const totalGap = W - totalDash;
      const actualGap = count > 1 ? totalGap / (count - 1) : 0;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const x = i * (dash + actualGap);
        ctx.moveTo(x, 1);
        ctx.lineTo(x + dash, 1);
      }
      ctx.stroke();
    };
    draw();
    const ro = new ResizeObserver(draw);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '2px', display: 'block' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '2px' }} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden">
      <Hero />
      <div className="hidden md:block">
        <SectionDivider />
      </div>
      <WhatIsDetailing />
      <Services selectedVehicleSize="pequeno" />
      <SocialMedia />
      <Footer />
    </div>
  );
}
