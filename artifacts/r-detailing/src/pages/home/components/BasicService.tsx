import { useState, useCallback, useMemo } from 'react';
import { basePriceBySize, extraPriceBySize, essentialImagesBySize } from '../../../mocks/services';

const sizeLabelMap: Record<string, string> = {
  pequeno: 'Pequeño',
  normal: 'Normal',
  grande: 'Grande',
  furgon: 'Furgón',
};

interface Extra {
  name: string;
  price: number;
}

interface BasicServiceProps {
  service: {
    id: string;
    name: string;
    slogan?: string;
    price: number;
    duration?: string;
    image: string;
    included: string[];
    extras: Extra[];
  };
  vehicleSize?: string | null;
}

export default function BasicService({ service, vehicleSize }: BasicServiceProps) {
  const [selectedExtras, setSelectedExtras] = useState<Record<number, boolean>>({});
  const [hasPetHair, setHasPetHair] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const size = vehicleSize || 'pequeno';
  const basePrice = basePriceBySize[size] ?? service.price;
  const currentImage = essentialImagesBySize[size] ?? service.image;

  const adjustedExtras = service.extras.map((extra) => ({
    ...extra,
    price: extraPriceBySize[extra.name]?.[size] ?? extra.price,
  }));

  const petHairPrice = extraPriceBySize['Eliminación de pelos de mascota']?.[size] ?? 15;

  const totalPrice =
    basePrice +
    (hasPetHair ? petHairPrice : 0) +
    adjustedExtras.reduce((sum, extra, i) => sum + (selectedExtras[i] ? extra.price : 0), 0);

  const selectedExtrasList = adjustedExtras.filter((_, i) => selectedExtras[i]);

  const whatsappUrl = useMemo(() => {
    const vehicleLabel = sizeLabelMap[size] ?? size;
    const lines = [`*${vehicleLabel}*`, `*${service.name}*`];
    selectedExtrasList.forEach((extra) => lines.push(`+${extra.name}`));
    if (hasPetHair) lines.push('+Eliminación pelos mascota');
    lines.push(`Total: ${totalPrice}€`);
    return `https://wa.me/34676758480?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [size, service.name, selectedExtrasList, hasPetHair, totalPrice]);

  const toggleExtra = useCallback((index: number) => {
    setSelectedExtras((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="w-full">
      <div className="block md:hidden">
        <div className="rounded-2xl overflow-hidden border border-[#FFB800]/40 bg-[#111]" onClick={toggleExpanded}>
          <div className="relative h-[180px] overflow-hidden">
            <img src={currentImage} alt={service.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 pointer-events-none" />
          </div>
          <div className="px-4 pt-2.5 pb-3">
            {service.slogan && <p className="text-[#FFB800] text-[9px] font-light tracking-[0.2em] uppercase mb-0.5">{service.slogan}</p>}
            <h3 className="text-white text-sm font-light tracking-[0.1em] uppercase mb-1 leading-tight">{service.name}</h3>
            <p className="text-[#FFB800] text-xl font-bold mb-0.5">{basePrice}€</p>
            {service.duration && <p className="text-white/40 text-[9px] font-light mb-2">{service.duration}</p>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
              className="self-start border border-[#FFB800]/60 text-[#FFB800] py-1 px-3 rounded-full text-[9px] tracking-[0.12em] uppercase cursor-pointer"
            >
              {isExpanded ? 'MENOS INFO' : 'MÁS INFO'}
            </button>
          </div>
          <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isExpanded ? '400px' : '0px' }}>
            <div className="px-4 pb-3 pt-2 border-t border-[#FFB800]/10">
              <p className="text-[#FFB800] text-[9px] font-light tracking-[0.15em] uppercase mb-2">Incluye:</p>
              <ul className="space-y-1">
                {service.included.map((item, i) => (
                  <li key={i} className="text-white/70 text-[10px] flex items-start gap-1.5">
                    <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full border border-[#FFB800]/60 flex items-center justify-center">
                      <i className="ri-check-line text-[#FFB800] text-[6px]" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-3 px-1">
          <p className="text-[#FFB800] text-[9px] font-light tracking-[0.2em] uppercase mb-2">Extras disponibles:</p>
          <div className="space-y-2">
            {adjustedExtras.map((extra, i) => {
              const isSelected = !!selectedExtras[i];
              return (
                <button
                  key={i}
                  onClick={() => toggleExtra(i)}
                  className={`w-full flex items-center justify-between gap-2 py-3.5 px-3 rounded-xl border transition-all duration-100 text-left cursor-pointer ${isSelected ? 'border-[#FFB800] bg-[#FFB800]/10' : 'border-white/15 bg-white/5'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#FFB800] bg-[#FFB800]' : 'border-white/40'}`}>
                      {isSelected && <i className="ri-check-line text-black text-[10px]" />}
                    </span>
                    <span className={`text-[11px] leading-snug ${isSelected ? 'text-white' : 'text-white/70'}`}>{extra.name}</span>
                  </div>
                  <span className={`flex-shrink-0 text-[10px] font-semibold ${isSelected ? 'text-[#FFB800]' : 'text-white/50'}`}>+{extra.price}€</span>
                </button>
              );
            })}
          </div>

          <div className={`mt-3 rounded-xl border px-3 py-3 ${hasPetHair ? 'border-[#FFB800] bg-[#FFB800]/10' : 'border-white/15 bg-white/5'}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-white/80 text-[10px] font-semibold leading-snug">¿Tu vehículo tiene pelos de mascota?</p>
              <button
                onClick={() => setHasPetHair((prev) => !prev)}
                className={`relative w-12 h-7 rounded-full border transition-all duration-200 ${hasPetHair ? 'bg-[#FFB800] border-[#FFB800]' : 'bg-white/10 border-white/20'}`}
                aria-pressed={hasPetHair}
                aria-label="Activar eliminación de pelos de mascota"
              >
                <span className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white transition-all duration-200 ${hasPetHair ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
            <p className="text-white/40 text-[9px] mt-2">Si tu coche tiene pelos de mascota, es obligatorio marcar esta casilla.</p>
          </div>

          <div className="flex items-center justify-between border-t border-[#FFB800]/20 pt-3 mt-3 mb-1">
            <span className="text-white/50 text-[9px] tracking-wider uppercase">Total estimado</span>
            <span className="text-[#FFB800] text-xl font-bold">{totalPrice}€</span>
          </div>
          <p className="text-white/30 text-[8px] italic text-center mb-3 px-2 leading-relaxed">Precio orientativo. El coste definitivo se confirma tras valoración presencial.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-[#FFB800] text-black py-2.5 rounded-full font-semibold text-[10px] tracking-[0.12em] uppercase text-center flex items-center justify-center gap-1.5 cursor-pointer">
            <i className="ri-whatsapp-line text-xs" />
            RESERVAR LAVADO BÁSICO
          </a>
        </div>
      </div>

      <div className="hidden md:flex gap-6 items-stretch">
        <div className="w-[340px] flex-shrink-0 rounded-2xl overflow-hidden border border-[#FFB800]/40 bg-[#111] flex flex-col" onClick={toggleExpanded}>
          <div className="relative flex-1 min-h-[240px] overflow-hidden">
            <img src={currentImage} alt={service.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 pointer-events-none" />
          </div>
          <div className="flex-shrink-0 px-5 py-4">
            {service.slogan && <p className="text-[#FFB800] text-[10px] font-light tracking-[0.2em] uppercase mb-1">{service.slogan}</p>}
            <h3 className="text-white text-lg font-light tracking-[0.12em] uppercase mb-1.5 leading-tight">{service.name}</h3>
            <p className="text-[#FFB800] text-3xl font-bold mb-0.5">{basePrice}€</p>
            {service.duration && <p className="text-white/40 text-[10px] font-light">{service.duration}</p>}
            <div className="mt-3 pt-3 border-t border-[#FFB800]/10">
              <p className="text-[#FFB800] text-[9px] font-light tracking-[0.15em] uppercase mb-2">Incluye:</p>
              <ul className="space-y-1">
                {service.included.map((item, i) => (
                  <li key={i} className="text-white/60 text-xs flex items-start gap-1.5">
                    <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full border border-[#FFB800]/60 flex items-center justify-center mt-0.5">
                      <i className="ri-check-line text-[#FFB800] text-[7px]" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <p className="text-[#FFB800] text-xs font-light tracking-[0.2em] uppercase mb-4">Personaliza tu servicio:</p>
          <div className="space-y-3 flex-1">
            {adjustedExtras.map((extra, i) => {
              const isSelected = !!selectedExtras[i];
              return (
                <button
                  key={i}
                  onClick={() => toggleExtra(i)}
                  className={`w-full flex items-center justify-between gap-3 py-4 px-4 rounded-2xl border transition-all duration-100 text-left cursor-pointer ${isSelected ? 'border-[#FFB800] bg-[#FFB800]/10' : 'border-white/15 bg-[#1a1a1a] hover:bg-[#222]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#FFB800] bg-[#FFB800]' : 'border-white/40'}`}>
                      {isSelected && <i className="ri-check-line text-black text-xs" />}
                    </span>
                    <span className={`text-sm ${isSelected ? 'text-white' : 'text-white/70'}`}>{extra.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isSelected ? 'text-[#FFB800]' : 'text-white/50'}`}>+{extra.price}€</span>
                </button>
              );
            })}
            <div className={`rounded-2xl border px-4 py-4 ${hasPetHair ? 'border-[#FFB800] bg-[#FFB800]/10' : 'border-white/15 bg-[#1a1a1a]'}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-white/80 text-sm font-semibold">¿Tu vehículo tiene pelos de mascota?</p>
                <button
                  onClick={() => setHasPetHair((prev) => !prev)}
                  className={`relative w-14 h-8 rounded-full border transition-all duration-200 ${hasPetHair ? 'bg-[#FFB800] border-[#FFB800]' : 'bg-white/10 border-white/20'}`}
                  aria-pressed={hasPetHair}
                  aria-label="Activar eliminación de pelos de mascota"
                >
                  <span className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white transition-all duration-200 ${hasPetHair ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <p className="text-white/40 text-xs mt-2">Si tu coche tiene pelos de mascota, es obligatorio marcar esta casilla.</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#FFB800]/20 pt-5 mt-5 mb-2">
            <span className="text-white/50 text-sm tracking-wider uppercase">Total estimado</span>
            <span className="text-[#FFB800] text-4xl font-bold">{totalPrice}€</span>
          </div>
          <p className="text-white/30 text-xs italic text-center mb-4 px-2 leading-relaxed">Precio orientativo. El coste definitivo se confirma tras valoración presencial en función del estado del vehículo.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-[#FFB800] text-black py-3 rounded-full font-bold text-sm tracking-[0.12em] uppercase text-center flex items-center justify-center gap-2 cursor-pointer hover:bg-[#FFA500] transition-colors">
            <i className="ri-whatsapp-line text-base" />
            RESERVAR LAVADO BÁSICO
          </a>
        </div>
      </div>
    </div>
  );
}
