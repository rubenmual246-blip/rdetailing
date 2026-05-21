import { useState, useMemo } from 'react';

const WHATSAPP_NUMBER = '34676758480';

interface Extra {
  name: string;
  price: number | null;
}

interface Service {
  id: string;
  name: string;
  badge: string;
  price: number;
  description: string;
  image: string;
  included: string[];
  extras: Extra[];
}

const services: Service[] = [
  {
    id: 'mantenimiento',
    name: 'MANTENIMIENTO',
    badge: 'Esencial',
    price: 30,
    description: 'Para vehículos mantenidos regularmente y con suciedad moderada.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=700&h=320&fit=crop&auto=format',
    included: [
      'Lavado exterior básico',
      'Limpieza de llantas',
      'Aspirado básico',
      'Limpieza de salpicadero y plásticos',
      'Limpieza de cristales',
    ],
    extras: [
      { name: 'Limpieza estética de vano motor', price: 35 },
      { name: 'Limpieza de tapicería', price: null },
      { name: 'Limpieza profunda de alfombrillas', price: null },
    ],
  },
  {
    id: 'profunda',
    name: 'LIMPIEZA PROFUNDA',
    badge: 'Popular',
    price: 60,
    description: 'Para vehículos con más de 3 meses sin mantenimiento, pelos de mascota, arena o suciedad acumulada.',
    image: 'https://images.unsplash.com/photo-1621963416880-a0e9fe1e8b65?w=700&h=320&fit=crop&auto=format',
    included: [
      'Interior detallado',
      'Aspirado profundo con Tornador',
      'Limpieza con brochas en zonas difíciles y ranuras',
      'Eliminación de pelos de mascota',
      'Limpieza profunda de alfombrillas',
      'Limpieza detallada de plásticos y zonas interiores',
      'Limpieza más exhaustiva del vehículo',
    ],
    extras: [
      { name: 'Limpieza estética de vano motor', price: 35 },
    ],
  },
  {
    id: 'premium',
    name: 'LIMPIEZA PREMIUM',
    badge: 'Premium',
    price: 110,
    description: 'Limpieza minuciosa interior/exterior con acabado de máxima calidad.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&h=320&fit=crop&auto=format',
    included: [
      'Prelavado premium',
      'Lavado exterior con técnica de doble cubo y baño de microfibra',
      'Limpieza de llantas y eliminación de restos férricos',
      'Limpieza exterior de puertas y gomas con brocha',
      'Aspirado profundo con sistema Tornador',
      'Limpieza interior a vapor',
      'Limpieza de tapicerías',
      'Tratamiento para alcántara, textiles y cuero',
      'Limpieza profunda de alfombrillas',
      'Limpieza detallada de interiores',
      'Limpieza de cristales',
      'Atención máxima al detalle',
    ],
    extras: [
      { name: 'Limpieza estética de vano motor', price: 35 },
    ],
  },
];

function ServiceCard({ service }: { service: Service }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Record<number, boolean>>({});

  const toggleExtra = (i: number) => {
    setSelectedExtras((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const whatsappUrl = useMemo(() => {
    const lines = [
      'Hola, me interesa reservar:',
      `*Servicio: ${service.name}*`,
    ];
    service.extras.forEach((extra, i) => {
      if (selectedExtras[i]) lines.push(`+ ${extra.name}`);
    });
    lines.push('¡Muchas gracias!');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [service, selectedExtras]);

  const isPremium = service.id === 'premium';

  return (
    <div
      className={`
        group relative flex flex-col rounded-2xl overflow-hidden
        border-2 transition-all duration-500 ease-out
        ${expanded
          ? 'border-[#FFB800] shadow-[0_0_40px_rgba(255,184,0,0.25),0_12px_40px_rgba(0,0,0,0.8)]'
          : 'border-[#FFB800]/30 hover:border-[#FFB800]/70 shadow-[0_4px_28px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_40px_rgba(255,184,0,0.12),0_12px_48px_rgba(0,0,0,0.8)]'
        }
      `}
      style={{ background: 'linear-gradient(165deg, #141414 0%, #0b0b0b 100%)' }}
    >
      {/* Golden glow line at top */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] z-10 transition-all duration-500 ${expanded ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}`}
        style={{ background: 'linear-gradient(90deg, transparent 0%, #FFB800 50%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Image banner */}
      <div className="relative overflow-hidden" style={{ height: '152px' }}>
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 55%, rgba(11,11,11,0.97) 100%)' }}
          aria-hidden="true"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`text-[7px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full ${
              isPremium
                ? 'bg-[#FFB800] text-black'
                : 'bg-black/60 border border-[#FFB800]/50 text-[#FFB800] backdrop-blur-sm'
            }`}
          >
            {service.badge}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="px-5 pt-4 pb-1 flex-1 flex flex-col">
        <p className="text-[#FFB800]/50 text-[7.5px] font-light tracking-[0.35em] uppercase mb-1.5">
          Servicio
        </p>
        <h3 className="text-white text-[13px] md:text-[14px] font-light tracking-[0.1em] uppercase leading-tight mb-3">
          {service.name}
        </h3>

        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-[#FFB800]/60 text-[10px] font-light">Desde</span>
          <span className="text-[#FFB800] text-[30px] md:text-[34px] font-bold leading-none tracking-tight">
            {service.price}
          </span>
          <span className="text-[#FFB800]/60 text-sm font-light">€</span>
        </div>

        <p className="text-white/35 text-[10px] leading-[1.65] font-light mb-4">
          {service.description}
        </p>

        <div className="mt-auto pb-4">
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={`
              group/btn w-full flex items-center justify-between
              px-4 py-2.5 rounded-xl border cursor-pointer
              transition-all duration-300 ease-out
              ${expanded
                ? 'border-[#FFB800]/60 bg-[#FFB800]/10 text-[#FFB800]'
                : 'border-[#FFB800]/20 bg-white/[0.03] text-white/50 hover:border-[#FFB800]/50 hover:bg-[#FFB800]/[0.05] hover:text-[#FFB800]/90'
              }
            `}
          >
            <span className="text-[9px] tracking-[0.2em] uppercase font-light">
              {expanded ? 'Cerrar' : 'Más información'}
            </span>
            <span
              className={`
                flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center
                transition-all duration-300
                ${expanded
                  ? 'border-[#FFB800]/70 bg-[#FFB800]/15 rotate-45'
                  : 'border-[#FFB800]/25 group-hover/btn:border-[#FFB800]/60'
                }
              `}
            >
              <span className="text-[11px] leading-none font-light select-none">+</span>
            </span>
          </button>
        </div>
      </div>

      {/* Expandable section */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: expanded ? '900px' : '0px',
          opacity: expanded ? 1 : 0,
          transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease-in-out',
        }}
      >
        <div className="px-5 pb-5">
          <div
            className="h-px w-full mb-4"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,184,0,0.25), transparent)' }}
            aria-hidden="true"
          />

          <p className="text-[#FFB800]/60 text-[7.5px] tracking-[0.3em] uppercase font-light mb-3">
            Incluye
          </p>
          <ul className="space-y-[8px] mb-5">
            {service.included.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-[2px] w-[14px] h-[14px] rounded-full border border-[#FFB800]/50 bg-[#FFB800]/[0.08] flex items-center justify-center">
                  <i className="ri-check-line text-[#FFB800] text-[6px]" />
                </span>
                <span className="text-white/50 text-[10px] leading-[1.6] font-light">{item}</span>
              </li>
            ))}
          </ul>

          {service.extras.length > 0 && (
            <>
              <div
                className="h-px w-full mb-4"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,184,0,0.15), transparent)' }}
                aria-hidden="true"
              />
              <p className="text-[#FFB800]/60 text-[7.5px] tracking-[0.3em] uppercase font-light mb-3">
                Extras opcionales
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {service.extras.map((extra, i) => {
                  const isSelected = !!selectedExtras[i];
                  return (
                    <button
                      key={i}
                      onClick={() => toggleExtra(i)}
                      className={`
                        inline-flex items-center gap-1.5
                        px-3 py-[7px] rounded-full border cursor-pointer
                        transition-all duration-300 ease-out text-left
                        ${isSelected
                          ? 'bg-[#FFB800] border-[#FFB800] text-black shadow-[0_0_20px_rgba(255,184,0,0.3)]'
                          : 'bg-white/[0.03] border-[#FFB800]/20 text-white/50 hover:border-[#FFB800]/50 hover:bg-[#FFB800]/[0.07] hover:text-white/80'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex-shrink-0 w-[14px] h-[14px] rounded-full border flex items-center justify-center
                          transition-all duration-200
                          ${isSelected ? 'border-black/30 bg-black/20' : 'border-[#FFB800]/30'}
                        `}
                      >
                        {isSelected
                          ? <i className="ri-check-line text-[7px] text-black" />
                          : <span className="text-[8px] leading-none text-[#FFB800]/60">+</span>
                        }
                      </span>
                      <span className="text-[9px] md:text-[10px] font-light tracking-[0.05em]">
                        {extra.name}
                      </span>
                      {extra.price !== null && (
                        <span className={`text-[9px] font-semibold ${isSelected ? 'text-black/60' : 'text-[#FFB800]/40'}`}>
                          +{extra.price}€
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FFB800] text-black font-bold text-[9px] md:text-[10px] tracking-[0.18em] uppercase cursor-pointer hover:bg-[#FFC933] transition-colors duration-300 shadow-[0_4px_24px_rgba(255,184,0,0.3)]"
          >
            <i className="ri-whatsapp-line text-xs md:text-sm" />
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-black px-4 sm:px-6 pb-20 md:pb-28">
      <div className="max-w-[920px] mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#FFB800]/50 text-[8px] md:text-[9px] font-light tracking-[0.45em] uppercase mb-3">
            Servicios
          </p>
          <h2 className="text-white text-xl md:text-2xl font-light tracking-[0.12em] uppercase">
            Elige tu servicio
          </h2>
          <div className="flex items-center justify-center mt-5" aria-hidden="true">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#FFB800]/40" />
            <div className="w-[5px] h-[5px] rounded-full bg-[#FFB800]/60 mx-2.5" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#FFB800]/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <p className="text-white/20 text-[8.5px] font-light text-center mt-8 tracking-wide">
          Precios orientativos. El coste definitivo se confirma tras valoración presencial.
        </p>
      </div>
    </section>
  );
}
