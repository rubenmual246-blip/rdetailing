import { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import WhatIsDetailing from './components/WhatIsDetailing';
import VehicleSizeSelector from './components/VehicleSizeSelector';
import Services from './components/Services';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

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
  const [scrolled, setScrolled] = useState(false);
  const [selectedVehicleSize, setSelectedVehicleSize] = useState<string | null>('pequeno');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden pt-8 md:pt-0">
      <Navbar scrolled={scrolled} />
      <Hero />
      <div className="hidden md:block">
        <SectionDivider />
      </div>
      <WhatIsDetailing />
      <VehicleSizeSelector onSelect={setSelectedVehicleSize} selected={selectedVehicleSize} />
      <section className="bg-black h-10 md:h-14 w-full" aria-hidden="true" />
      <Services selectedVehicleSize={selectedVehicleSize} />
      <Footer />
    </div>
  );
}
