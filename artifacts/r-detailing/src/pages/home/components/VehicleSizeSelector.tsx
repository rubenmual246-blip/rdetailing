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
      className="bg-[#111] pt-3 md:pt-5 pb-5 md:pb-8 flex flex-col items-center px-4 border-y border-white/10"
    >
      <p className="text-white text-sm md:text-lg tracking-widest uppercase mb-4 md:mb-6 font-bold">
        Elige el tamaño del vehículo
      </p>

      <div className="flex items-stretch gap-2 md:gap-4 max-w-3xl">
        {vehicleSizes.map((size) => {
          const isActive = selected === size.id;
          const subtitle = sizeSubtitleMap[size.id];
          return (
            <button
              key={size.id}
              onClick={() => handleSelect(size.id)}
              className={`flex flex-col items-center justify-center gap-1 md:gap-1.5 rounded-xl border px-3 py-3 md:px-5 md:py-4 transition-all duration-150 cursor-pointer min-w-[72px] md:min-w-[100px] ${
                isActive
                  ? 'border-white/60 bg-white/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
              }`}
            >
              <div className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center overflow-hidden ${size.iconScale}`}>
                <img
                  src={size.imageUrl}
                  alt={size.label}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <span
                className={`text-[9px] md:text-xs font-semibold tracking-wide uppercase text-center leading-tight ${
                  isActive ? 'text-white' : 'text-white/60'
                }`}
              >
                {size.label}
              </span>

              {subtitle && (
                <span
                  className={`text-[7px] md:text-[10px] text-center leading-tight ${
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
