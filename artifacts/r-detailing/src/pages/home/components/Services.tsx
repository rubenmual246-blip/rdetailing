import { useState, useMemo } from 'react';

const WHATSAPP_NUMBER = '34676758480';

interface Extra {
  name: string;
  price: number | null;
}

interface Service {
  id: string;
  name: string;
  tag: string;
  price: number;
  description: string;
  image: string;
  accent: string;
  included: string[];
  extras: Extra[];
}

const services: Service[] = [
  {
    id: 'mantenimiento',
    name: 'MANTENIMIENTO',
    tag: 'Cuidado regular',
    price: 30,
    description: 'Para vehículos mantenidos regularmente y con suciedad moderada.',
    image: 'https://readdy.ai/api/search-image?query=black+luxury+car+exterior+hand+wash+foam+soap+professional+detailing+studio+dark+moody+lighting+water+droplets+shiny+paint+no+people&width=800&height=400&seq=mant-v2&orientation=landscape',
    accent: '#FFB800',
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
    tag: 'Interior detallado',
    price: 60,
    description: 'Para vehículos con más de 3 meses sin mantenimiento, pelos de mascota, arena o suciedad acumulada.',
    image: 'https://readdy.ai/api/search-image?query=car+interior+deep+cleaning+vacuum+professional+detailing+dark+studio+moody+lighting+seats+dashboard+no+people+close+up&width=800&height=400&seq=prof-v2&orientation=landscape',
    accent: '#FFB800',
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
    tag: 'Acabado de lujo',
    price: 110,
    description: 'Limpieza minuciosa interior/exterior con acabado premium.',
    image: 'https://readdy.ai/api/search-image?query=luxury+car+steam+detailing+premium+interior+leather+seats+professional+workshop+dark+dramatic+lighting+no+people+high+end&width=800&height=400&seq=prem-v2&orientation=landscape',
    accent: '#FFB800',
    included: [
      'Prelavado premium',
      'Lavado exterior con técnica de doble cubo y baño de microfibra',
      'Limpieza de llantas y eliminación de restos férricos',
      'Limpieza exterior de puertas y gomas con brocha',
      'Aspirado profundo con sistema Tornador',
      'Limpieza interior a vapor',
      'Limpieza de tapicerías',
      'Tratamiento para alcántara, textiles y cuero',
      'Limpieza detallada de interiores',
      'Limpieza profunda de alfombrillas',
      'Limpieza de cristales',
      'Atención máxima al detalle',
    ],
    extras: [
      { name: 'Limpieza estética de vano motor', price: 35 },
    ],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
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
        transition-all duration-500 ease-out
        ${expanded
          ? 'shadow-[0_8px_40px_rgba(255,184,0,0.12),0_2px_8px_rgba(0,0,0,0.6)]'
          : 'shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_32px_rgba(255,184,0,0.1),0_4px_16px_rgba(0,0,0,0.6)]'
        }
      `}
      style={{
        background: 'linear-gradient(160deg, #141414 0%, #0d0d0d 60%, #111111 100%)',
        border: expanded
          ? '1px solid rgba(255,184,0,0.45)'
          : isPremium
            ? '1px solid rgba(255,184,0,0.22)'
            : '1px solid rgba(255,255,255,0.07)',
        animationDelay: `${index * 80}ms`,
      }}
    >
      {isPremium && (
        <div className="absolute top-3 right-3 z-20">
          <span className="bg-[#FFB800] text-black text-[7px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full">
            Más popular
          </span>
        </div>
      )}

      <div className="relative h-[110px] md:h-[120px] overflow-hidden flex-shrink-0">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(13,13,13,1) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(255,184,0,0.06) 0%, transparent 60%)',
        }} />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2.5">
          <span className="text-[#FFB800]/70 text-[8px] font-light tracking-[0.35em] uppercase">
            {service.tag}
          </span>
        </div>
      </div>

      <div
        className="absolute left-0 right-0 h-px"
        style={{
          top: '110px',
          background: expanded
            ? 'linear-gradient(90deg, transparent, rgba(255,184,0,0.5), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,184,0,0.15), transparent)',
          transition: 'background 0.5s ease',
        }}
      />

      <button
        className="w-full text-left px-5 pt-4 pb-4 cursor-pointer focus:outline-none"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <h3 className="text-white text-[11px] md:text-[13px] font-light tracking-[0.15em] uppercase leading-tight mb-2.5">
          {service.name}
        </h3>

        <div className="flex items-baseline gap-1 mb-2.5">
          <span className="text-[#FFB800]/60 text-[9px] font-light">Desde</span>
          <span
            className="font-bold leading-none"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#FFB800',
              textShadow: '0 0 20px rgba(255,184,0,0.3)',
            }}
          >
            {service.price}
          </span>
          <span className="text-[#FFB800]/60 text-xs font-light">€</span>
        </div>

        <p className="text-white/35 text-[9px] md:text-[10px] leading-relaxed font-light mb-4">
          {service.description}
        </p>

        <div
          className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-full border
            transition-all duration-300 ease-out
            ${expanded
              ? 'border-[#FFB800]/50 bg-[#FFB800]/10 text-[#FFB800]'
              : 'border-white/15 bg-white/[0.03] text-white/50 group-hover:border-[#FFB800]/30 group-hover:text-[#FFB800]/60'
            }
          `}
        >
          <span
            className={`
              w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
              transition-all duration-300
              ${expanded ? 'border-[#FFB800] bg-[#FFB800]/20 rotate-45' : 'border-white/25'}
            `}
          >
            <span className="text-[8px] leading-none">+</span>
          </span>
          <span className="text-[9px] tracking-[0.18em] uppercase font-light">
            {expanded ? 'Cerrar' : 'Más información'}
          </span>
        </div>
      </button>

      <div
        className="overflow-hidden"
        style={{
          maxHeight: expanded ? '900px' : '0px',
          opacity: expanded ? 1 : 0,
          transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
        }}
      >
        <div className="px-5 pb-5">
          <div
            className="rounded-xl px-4 py-3 mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(255,184,0,0.04) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,184,0,0.1)',
            }}
          >
            <p className="text-[#FFB800]/60 text-[8px] tracking-[0.3em] uppercase font-light mb-2.5">
              Incluye
            </p>
            <ul className="space-y-1.5">
              {service.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,184,0,0.2), rgba(255,184,0,0.05))',
                      border: '1px solid rgba(255,184,0,0.4)',
                    }}
                  >
                    <i className="ri-check-line text-[#FFB800] text-[6px]" />
                  </span>
                  <span className="text-white/60 text-[9px] md:text-[10px] leading-relaxed font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.extras.length > 0 && (
            <div className="mb-4">
              <p className="text-[#FFB800]/60 text-[8px] tracking-[0.3em] uppercase font-light mb-2.5">
                Extras opcionales
              </p>
              <div className="flex flex-wrap gap-1.5">
                {service.extras.map((extra, i) => {
                  const isSelected = !!selectedExtras[i];
                  return (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); toggleExtra(i); }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-300 ease-out"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, rgba(255,184,0,0.2), rgba(255,184,0,0.1))'
                          : 'rgba(255,255,255,0.04)',
                        border: isSelected
                          ? '1px solid rgba(255,184,0,0.6)'
                          : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: isSelected ? '0 0 12px rgba(255,184,0,0.15)' : 'none',
                      }}
                    >
                      <span
                        className="flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isSelected ? '#FFB800' : 'transparent',
                          border: isSelected ? '1px solid #FFB800' : '1px solid rgba(255,255,255,0.25)',
                        }}
                      >
                        {isSelected && <i className="ri-check-line text-black text-[7px]" />}
                      </span>
                      <span
                        className="text-[9px] font-light leading-snug transition-colors duration-300"
                        style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)' }}
                      >
                        {extra.name}
                      </span>
                      {extra.price !== null && (
                        <span
                          className="text-[8px] font-semibold transition-colors duration-300"
                          style={{ color: isSelected ? '#FFB800' : 'rgba(255,255,255,0.25)' }}
                        >
                          +{extra.price}€
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl font-bold text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-center flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FFB800, #FFA500)',
              color: '#000',
              boxShadow: '0 4px 16px rgba(255,184,0,0.25)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 24px rgba(255,184,0,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(255,184,0,0.25)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <i className="ri-whatsapp-line text-sm" />
            Reservar ahora
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: expanded
            ? 'linear-gradient(90deg, transparent, rgba(255,184,0,0.3), transparent)'
            : 'transparent',
          transition: 'background 0.5s ease',
        }}
      />
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-black px-4 sm:px-6 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#FFB800]/50 text-[8px] md:text-[9px] font-light tracking-[0.5em] uppercase mb-3">
            Servicios
          </p>
          <h2 className="text-white text-xl md:text-2xl font-light tracking-[0.12em] uppercase">
            Elige tu servicio
          </h2>
          <div className="flex items-center justify-center mt-5" aria-hidden="true">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFB800]/35" />
            <div className="w-1 h-1 rounded-full bg-[#FFB800]/50 mx-2.5" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFB800]/35" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <p className="text-white/15 text-[8px] font-light text-center mt-8 tracking-wide">
          Precios orientativos. El coste definitivo se confirma tras valoración presencial.
        </p>
      </div>
    </section>
  );
}
