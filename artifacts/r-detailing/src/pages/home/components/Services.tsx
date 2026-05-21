import { useState, useMemo } from 'react';

const WHATSAPP_NUMBER = '34676758480';

interface Extra {
  name: string;
  price: number | null;
}

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  included: string[];
  extras: Extra[];
}

const services: Service[] = [
  {
    id: 'mantenimiento',
    name: 'MANTENIMIENTO',
    price: 30,
    description: 'Para vehículos mantenidos regularmente y con suciedad moderada.',
    included: [
      'Lavado exterior básico',
      'Limpieza de llantas',
      'Aspirado básico',
      'Limpieza de salpicadero y plásticos',
      'Limpieza de cristales',
    ],
    extras: [
      { name: 'Limpieza estética de motor', price: 35 },
      { name: 'Limpieza de tapicería', price: null },
      { name: 'Limpieza profunda de alfombrillas', price: null },
    ],
  },
  {
    id: 'profunda',
    name: 'LIMPIEZA PROFUNDA',
    price: 60,
    description: 'Para vehículos con más de 3 meses sin mantenimiento, pelos de mascota, arena o suciedad acumulada.',
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
      { name: 'Limpieza estética de motor', price: 35 },
    ],
  },
  {
    id: 'premium',
    name: 'LIMPIEZA PREMIUM',
    price: 110,
    description: 'Limpieza minuciosa interior/exterior con acabado premium.',
    included: [
      'Prelavado premium',
      'Lavado exterior con técnica de doble cubo y baño de microfibra',
      'Limpieza de llantas y eliminación de restos férricos',
      'Limpieza exterior de puertas y gomas con brocha',
      'Limpieza interior a vapor',
      'Limpieza de tapicerías',
      'Tratamiento para alcántara, textiles y cuero',
      'Limpieza detallada de interiores',
      'Limpieza de cristales',
      'Atención máxima al detalle',
    ],
    extras: [
      { name: 'Limpieza estética de motor', price: 35 },
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

  return (
    <div
      className={`
        group relative flex flex-col rounded-2xl border bg-[#0d0d0d]
        transition-all duration-500 ease-out
        ${expanded ? 'border-[#FFB800]/60 shadow-[0_0_30px_rgba(255,184,0,0.08)]' : 'border-white/10 hover:border-[#FFB800]/30'}
      `}
    >
      <button
        className="w-full text-left px-5 pt-5 pb-4 cursor-pointer focus:outline-none"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <p className="text-[#FFB800]/60 text-[9px] font-light tracking-[0.3em] uppercase mb-2.5">
          Servicio
        </p>
        <h3 className="text-white text-sm md:text-base font-light tracking-[0.12em] uppercase leading-tight mb-3">
          {service.name}
        </h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-[#FFB800]/70 text-xs font-light">Desde</span>
          <span className="text-[#FFB800] text-3xl md:text-4xl font-bold leading-none">{service.price}</span>
          <span className="text-[#FFB800]/70 text-sm font-light">€</span>
        </div>
        <p className="text-white/40 text-[10px] md:text-xs leading-relaxed font-light mb-4">
          {service.description}
        </p>

        <div className="flex items-center gap-2 text-[#FFB800]/70">
          <span className="text-[9px] tracking-[0.2em] uppercase font-light">
            {expanded ? 'Ocultar detalles' : 'Ver detalles'}
          </span>
          <span
            className={`text-xs transition-transform duration-300 ease-out ${expanded ? 'rotate-180' : 'rotate-0'}`}
          >
            ▾
          </span>
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: expanded ? '800px' : '0px', opacity: expanded ? 1 : 0, transition: 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out' }}
      >
        <div className="px-5 pb-5 pt-1">
          <div className="border-t border-[#FFB800]/10 pt-4 mb-4">
            <p className="text-[#FFB800]/70 text-[9px] tracking-[0.25em] uppercase font-light mb-3">
              ¿Qué incluye?
            </p>
            <ul className="space-y-2">
              {service.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full border border-[#FFB800]/50 flex items-center justify-center">
                    <i className="ri-check-line text-[#FFB800] text-[6px]" />
                  </span>
                  <span className="text-white/55 text-[10px] md:text-[11px] leading-relaxed font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.extras.length > 0 && (
            <div className="mb-5">
              <p className="text-[#FFB800]/70 text-[9px] tracking-[0.25em] uppercase font-light mb-3">
                Extras opcionales
              </p>
              <div className="flex flex-wrap gap-2">
                {service.extras.map((extra, i) => {
                  const isSelected = !!selectedExtras[i];
                  return (
                    <button
                      key={i}
                      onClick={() => toggleExtra(i)}
                      className={`
                        relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] md:text-[10px]
                        font-light tracking-[0.08em] border cursor-pointer
                        transition-all duration-300 ease-out
                        ${isSelected
                          ? 'bg-[#FFB800] border-[#FFB800] text-black shadow-[0_0_12px_rgba(255,184,0,0.25)]'
                          : 'bg-white/[0.04] border-white/15 text-white/50 hover:border-white/30 hover:text-white/70 hover:bg-white/[0.07]'
                        }
                      `}
                    >
                      {isSelected && (
                        <i className="ri-check-line text-[9px]" />
                      )}
                      <span>{extra.name}</span>
                      {extra.price !== null && (
                        <span className={`font-semibold ${isSelected ? 'text-black/70' : 'text-white/30'}`}>
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
            className="w-full bg-[#FFB800] text-black py-2.5 rounded-full font-bold text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-center flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#FFC933] transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="ri-whatsapp-line text-xs md:text-sm" />
            RESERVAR
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-black px-4 sm:px-6 pb-20 md:pb-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#FFB800]/60 text-[9px] md:text-[10px] font-light tracking-[0.4em] uppercase mb-3">
            Servicios
          </p>
          <h2 className="text-white text-xl md:text-2xl font-light tracking-[0.12em] uppercase">
            Elige tu servicio
          </h2>
          <div className="flex items-center justify-center mt-5" aria-hidden="true">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFB800]/40" />
            <div className="w-1 h-1 rounded-full bg-[#FFB800]/60 mx-2" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFB800]/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <p className="text-white/20 text-[9px] font-light text-center mt-8 tracking-wide">
          Precios orientativos. El coste definitivo se confirma tras valoración presencial.
        </p>
      </div>
    </section>
  );
}
