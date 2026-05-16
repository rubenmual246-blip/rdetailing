import { useEffect, useRef, useState } from 'react';

export default function WhatIsDetailing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-8 md:py-12 lg:py-16 overflow-hidden hidden lg:block">
      <div className="relative max-w-7xl mx-auto px-5">
        <div className="hidden lg:flex flex-row items-center gap-10">
          <div
            className={`flex-1 space-y-8 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div>
              <h2 className="text-5xl font-light text-white mb-2">¿QUÉ ES EL</h2>
              <h3 className="text-7xl font-bold text-[#FFB800] mb-6">DETAILING?</h3>
              <div className="w-24 h-1 bg-[#FFB800]"></div>
            </div>
            <p className="text-white text-xl leading-relaxed">
              El <strong className="text-[#FFB800]">detailing</strong> es mucho más que un simple lavado de coche. Es un proceso técnico y artesanal de <strong className="text-[#FFB800]">limpieza profunda</strong>, <strong className="text-[#FFB800]">restauración estética</strong> y <strong className="text-[#FFB800]">cuidado profesional</strong> que devuelve a tu vehículo su máximo esplendor, como si acabara de salir del concesionario.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              A diferencia de un lavado convencional, el detailing trabaja cada centímetro del vehículo con productos específicos, herramientas profesionales y técnicas avanzadas. Desde la descontaminación de la pintura hasta la higienización completa del habitáculo, cada paso está diseñado para proteger y realzar tu coche al máximo nivel.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Nuestro equipo aplica métodos seguros que eliminan la suciedad incrustada, los residuos ferrosos, las manchas de tapicería y los olores sin dañar ninguna superficie. Utilizamos productos de pH neutro, microfibras de alto gramaje y maquinaria profesional para garantizar resultados impecables en cada servicio.
            </p>
          </div>
          <div
            className={`flex-1 relative max-w-xl w-full transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div className="relative rounded-3xl overflow-hidden h-[650px] shadow-2xl">
              <img
                src="https://readdy.ai/api/search-image?query=luxury%20sports%20car%20red%20ferrari%20parked%20on%20white%20marble%20floor%20inside%20bright%20showroom%20with%20warm%20golden%20spotlights%20reflections%20on%20polished%20paint%20professional%20automotive%20photography%20high%20contrast%20vivid%20colors%20clean%20minimal%20background&width=700&height=900&seq=detailing-car-showroom-02&orientation=portrait"
                alt="Detailing profesional resultado"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
