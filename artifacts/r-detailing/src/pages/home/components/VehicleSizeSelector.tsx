import { sizeSubtitleMap } from '../../../mocks/services';

interface VehicleSize {
  id: string;
  label: string;
  imageUrl: string;
  iconScale: string;
}

const vehicleSizes: VehicleSize[] = [
  {
    id: 'pequeno',
    label: 'Pequeño',
    imageUrl: 'https://public.readdy.ai/ai/img_res/538fd74f-6daf-4250-ba7f-3f6366604f12.png',
    iconScale: 'scale-[0.85]',
  },
  {
    id: 'normal',
    label: 'Normal',
    imageUrl: 'https://public.readdy.ai/ai/img_res/8e63aff6-7ccc-40d4-961e-ab7af9a32891.png',
    iconScale: 'scale-100',
  },
  {
    id: 'grande',
    label: 'Grande',
    imageUrl: 'https://public.readdy.ai/ai/img_res/fdb42f0b-b8cf-4a12-9379-2ec9eaf870bd.png',
    iconScale: 'scale-[1.08]',
  },
];

interface VehicleSizeSelectorProps {
  onSelect: (size: string) => void;
  selected: string | null;
}

export default function VehicleSizeSelector({ onSelect, selected }: VehicleSizeSelectorProps) {
  const handleSelect = (sizeId: string) => {
    if (selected === sizeId) return;
    onSelect(sizeId);

    requestAnimationFrame(() => {
      const el = document.getElementById('services');
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  };

  return (
    <section
      id="vehicle-size-selector"
      className="relative py-8 md:py-12 flex flex-col items-center px-4"
      style={{ background: 'linear-gradient(135deg, #FFB800 0%, #FFA500 100%)' }}
    >
      {/* Fade top */}
      <div className="absolute top-0 left-0 right-0 h-10 md:h-14 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 100%)' }} />
      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 md:h-14 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }} />

      <p className="relative z-20 text-black text-xs md:text-sm font-black tracking-[0.25em] uppercase mb-1 md:mb-2">
        ¿Qué vehículo traes?
      </p>
      <p className="relative z-20 text-black/50 text-[10px] md:text-xs font-medium tracking-wider uppercase mb-6 md:mb-8">
        Elige el tamaño para ver el precio
      </p>

      <div className="relative z-20 flex items-stretch gap-3 md:gap-5">
        {vehicleSizes.map((size) => {
          const isActive = selected === size.id;
          const subtitle = sizeSubtitleMap[size.id];
          return (
            <button
              key={size.id}
              onClick={() => handleSelect(size.id)}
              className={`flex flex-col items-center justify-center gap-2 md:gap-2.5 rounded-2xl px-4 py-4 md:px-7 md:py-5 transition-all duration-150 cursor-pointer min-w-[80px] md:min-w-[120px] shadow-md ${
                isActive
                  ? 'bg-black scale-105 shadow-black/40'
                  : 'bg-white/30 hover:bg-white/50 active:scale-95'
              }`}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center overflow-hidden ${size.iconScale}`}>
                <img
                  src={size.imageUrl}
                  alt={size.label}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  style={{ filter: isActive ? 'brightness(0) invert(1)' : 'none' }}
                />
              </div>

              <span
                className={`text-[10px] md:text-sm font-bold tracking-wide uppercase text-center leading-tight ${
                  isActive ? 'text-[#FFB800]' : 'text-black'
                }`}
              >
                {size.label}
              </span>

              {subtitle && (
                <span
                  className={`text-[7px] md:text-[10px] text-center leading-tight font-medium ${
                    isActive ? 'text-white/60' : 'text-black/50'
                  }`}
                >
                  {subtitle}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
