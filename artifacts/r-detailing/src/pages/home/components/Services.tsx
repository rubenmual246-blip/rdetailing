import { useState, useMemo, useEffect, useRef } from 'react';
import {
  basicService,
  detailedServices,
  detailedPriceBySize,
  durationBySize,
  sizeLabelMap,
  absoluteImagesBySize,
} from '../../../mocks/services';
import BasicService from './BasicService';

interface ServicesProps {
  selectedVehicleSize: string | null;
}

export default function Services({ selectedVehicleSize }: ServicesProps) {
  const [absoluteExpanded, setAbsoluteExpanded] = useState(false);
  const absoluteCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!absoluteExpanded) return;
    const handler = (e: MouseEvent) => {
      if (absoluteCardRef.current && !absoluteCardRef.current.contains(e.target as Node)) {
        setAbsoluteExpanded(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [absoluteExpanded]);

  const size = selectedVehicleSize || 'pequeno';
  const vehicleLabel = sizeLabelMap[size] ?? size;

  const absoluteService = detailedServices[0];
  const absolutePrice = detailedPriceBySize[size]?.absolute ?? absoluteService.price;
  const absoluteDuration = durationBySize['absolute']?.[size] ?? absoluteService.duration;
  const absoluteImage = absoluteImagesBySize[size] ?? absoluteService.image;

  const absoluteWhatsappUrl = useMemo(() => {
    const lines = [
      `*${vehicleLabel}*`,
      `*${absoluteService.name}*`,
      `Total: ${absolutePrice}€`,
    ];
    return `https://wa.me/34676758480?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [vehicleLabel, absoluteService.name, absolutePrice]);

  return (
    <section id="services" className="bg-black px-4 sm:px-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">

        {/* Section title */}
        <div className="text-center pt-2">
          <p className="text-[#FFB800] text-xs md:text-sm font-light tracking-[0.25em] uppercase">
            Para vehículo: <span className="font-bold">{vehicleLabel}</span>
          </p>
        </div>

        {/* Basic Service */}
        <BasicService service={basicService} vehicleSize={selectedVehicleSize} />

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#FFB800]/20"></div>
          <span className="text-[#FFB800]/40 text-xs tracking-widest uppercase">o</span>
          <div className="flex-1 h-px bg-[#FFB800]/20"></div>
        </div>

        {/* Absolute Detailing */}
        <div ref={absoluteCardRef} className="w-full rounded-2xl overflow-hidden border border-[#FFB800]/40" style={{ background: '#111' }}>
          <div className="relative overflow-hidden" style={{ height: 'clamp(140px, 28vw, 240px)' }}>
            <img
              src={absoluteImage}
              alt={absoluteService.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 pointer-events-none"></div>
          </div>

          <div className="bg-[#111] px-3 md:px-5 pt-3 md:pt-4 pb-3 md:pb-4">
            {absoluteService.slogan && (
              <p className="text-[#FFB800] text-[8px] md:text-xs font-light tracking-[0.15em] uppercase mb-0.5">
                {absoluteService.slogan}
              </p>
            )}
            <h3 className="text-white text-sm md:text-xl font-light tracking-[0.1em] uppercase mb-1 md:mb-1.5 leading-tight">
              {absoluteService.name}
            </h3>
            <p className="text-[#FFB800] text-xl md:text-4xl font-bold mb-0.5 leading-none">
              {absolutePrice}€
            </p>
            {absoluteDuration && (
              <p className="text-white/40 text-[8px] md:text-xs font-light mb-3 md:mb-4">
                {absoluteDuration}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setAbsoluteExpanded(!absoluteExpanded)}
                className="flex-1 border border-[#FFB800]/60 text-[#FFB800] py-1.5 md:py-2 rounded-full font-light text-[8px] md:text-[11px] tracking-[0.1em] uppercase hover:bg-[#FFB800]/10 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                {absoluteExpanded ? 'MENOS INFO' : 'MÁS INFO'}
              </button>
              <a
                href={absoluteWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#FFB800] text-black py-1.5 md:py-2 rounded-full font-light text-[8px] md:text-[11px] tracking-[0.1em] uppercase hover:bg-[#FFA500] transition-all duration-300 text-center flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-whatsapp-line text-xs md:text-sm"></i>
                RESERVAR
              </a>
            </div>
          </div>

          {/* Expandable details */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: absoluteExpanded ? '1200px' : '0px' }}
          >
            <div className="px-3 md:px-5 pb-4 md:pb-5 pt-3 md:pt-4 border-t border-[#FFB800]/10">
              <p className="text-[#FFB800] text-[8px] md:text-xs font-light tracking-[0.15em] uppercase mb-2 md:mb-3">
                ¿Qué incluye?
              </p>
              <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-5">
                {absoluteService.included.map((item, i) => (
                  <li key={i} className="leading-relaxed flex items-start gap-1.5 text-white/60 text-[9px] md:text-xs">
                    <span className="flex-shrink-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-[#FFB800]/60 flex items-center justify-center mt-0">
                      <i className="ri-check-line text-[#FFB800] text-[6px] md:text-[8px]"></i>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={absoluteWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FFB800] text-black py-2 md:py-3 rounded-full font-bold text-[9px] md:text-sm tracking-[0.1em] uppercase text-center flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#FFA500] transition-colors"
              >
                <i className="ri-whatsapp-line text-xs md:text-base"></i>
                RESERVAR ABSOLUTE DETAILING
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
