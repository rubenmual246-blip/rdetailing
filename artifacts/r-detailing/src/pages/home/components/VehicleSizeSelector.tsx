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
        const offset = window.innerWidth < 768 ? window.innerHeight * 0.22 : 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  };

  return (
    <section
      id="vehicle-size-selector"
      className="bg-[#111] pt-4 md:pt-7 pb-6 md:pb-10 flex flex-col items-center px-4 border-y border-white/10"
    >
      <p className="text-white text-base md:text-xl tracking-widest uppercase mb-5 md:mb-7 font-bold">
        Elige el tamaño del vehículo
      </p>

      <div className="flex items-stretch gap-2.5 md:gap-5 max-w-4xl w-full justify-center">
        {vehicleSizes.map((size) => {
          const isActive = selected === size.id;
          const subtitle = sizeSubtitleMap[size.id];
          return (
            <button
              key={size.id}
              onClick={() => handleSelect(size.id)}
              className={`flex flex-col items-center justify-center gap-1 md:gap-1.5 rounded-xl border px-4 py-4 md:px-6 md:py-5 transition-all duration-150 cursor-pointer min-w-[88px] md:min-w-[124px] ${
                isActive
                  ? 'border-white/60 bg-white/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
              }`}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center overflow-hidden ${size.iconScale}`}>
                <img
                  src={size.imageUrl}
                  alt={size.label}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <span
                className={`text-[10px] md:text-sm font-semibold tracking-wide uppercase text-center leading-tight ${
                  isActive ? 'text-white' : 'text-white/60'
                }`}
              >
                {size.label}
              </span>

              {subtitle && (
                <span
                  className={`text-[8px] md:text-[11px] text-center leading-tight ${
                    isActive ? 'text-white/60' : 'text-white/25'
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
