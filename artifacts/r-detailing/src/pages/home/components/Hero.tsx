import { useState } from 'react';

export default function Hero() {
  const [activeReservar, setActiveReservar] = useState(false);
  const [activeVerServicios, setActiveVerServicios] = useState(false);

  const scrollToServices = () => {
    const element = document.getElementById('vehicle-size-selector');
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden min-h-screen">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=professional%20car%20detailing%20process%20with%20foam%20washing%20on%20luxury%20black%20vehicle%2C%20water%20droplets%20on%20glossy%20paint%20surface%2C%20premium%20automotive%20care%20service%2C%20high-end%20car%20wash%20with%20golden%20reflections%20on%20wet%20car%20body%2C%20professional%20detailing%20equipment%20and%20microfiber%20cloths%2C%20clean%20modern%20detailing%20studio%20background%20with%20soft%20lighting&width=1920&height=1080&seq=hero-bg-001&orientation=landscape"
          alt="Professional Car Detailing"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/95"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6">
        <div className="text-center w-full max-w-screen-xl mx-auto">

          {/* Logo */}
          <div className="flex items-center justify-center mb-1 md:mb-2 select-none">
            <span
              className="drop-shadow-2xl leading-none"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 'clamp(32px, 8vw, 100px)',
                fontWeight: 300,
                display: 'inline-block',
                transform: 'scaleX(-1)',
                letterSpacing: '-2px',
                color: '#FFB800',
              }}
            >
              R
            </span>
            <span
              className="drop-shadow-2xl leading-none"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 'clamp(32px, 8vw, 100px)',
                fontWeight: 700,
                letterSpacing: 'clamp(1px, 0.5vw, 4px)',
                color: '#FFB800',
              }}
            >
              DETAILING
            </span>
          </div>

          <h1
            className="text-white font-bold leading-tight px-2 mt-2 md:mt-3"
            style={{ fontSize: 'clamp(13px, 3vw, 36px)' }}
          >
            LAVADO Y DETALLADO DE VEHÍCULOS
          </h1>

          <p
            className="text-[#FFB800] font-semibold tracking-widest uppercase mt-0.5 md:mt-1"
            style={{ fontSize: 'clamp(10px, 2vw, 18px)' }}
          >
            Cabezo de Torres · Murcia
          </p>

          <div className="text-white/25 text-[8px] md:text-sm font-light tracking-wider mt-1 md:mt-1.5 leading-relaxed">
            <span className="block">Recogida a domicilio</span>
            <span className="block">Más de 10 km · Suplemento de 5€</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-16 md:mt-32 px-4 w-full max-w-xs sm:max-w-none mx-auto">
            <a
              href="https://wa.me/+34676758480"
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={() => setActiveReservar(true)}
              onMouseUp={() => setActiveReservar(false)}
              onMouseLeave={() => setActiveReservar(false)}
              onTouchStart={() => setActiveReservar(true)}
              onTouchEnd={() => setActiveReservar(false)}
              style={{
                background: activeReservar ? '#000000' : 'linear-gradient(to right, #FFB800, #FFA500)',
                color: activeReservar ? '#FFB800' : '#000000',
                border: activeReservar ? '2px solid #FFB800' : '2px solid transparent',
                fontSize: 'clamp(10px, 1.3vw, 14px)',
              }}
              className="w-full sm:w-[180px] md:w-[200px] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-whatsapp-line" style={{ fontSize: 'clamp(14px, 2.5vw, 24px)' }}></i>
              RESERVAR CITA
            </a>

            <button
              onClick={scrollToServices}
              onMouseDown={() => setActiveVerServicios(true)}
              onMouseUp={() => setActiveVerServicios(false)}
              onMouseLeave={() => setActiveVerServicios(false)}
              onTouchStart={() => setActiveVerServicios(true)}
              onTouchEnd={() => setActiveVerServicios(false)}
              style={{
                background: activeVerServicios ? '#FFB800' : 'transparent',
                color: activeVerServicios ? '#000000' : '#FFB800',
                fontSize: 'clamp(10px, 1.3vw, 14px)',
              }}
              className="w-full sm:w-[180px] md:w-[200px] border-2 border-[#FFB800] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold transition-all duration-150 whitespace-nowrap cursor-pointer flex items-center justify-center"
            >
              VER SERVICIOS
            </button>
          </div>

          {/* Social media */}
          <div className="flex items-center justify-center gap-3 mt-4 sm:mt-8 md:mt-12">
            <a
              href="https://www.instagram.com/rdetailing__"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#FFB800]/20 border border-[#FFB800]/60 rounded-full hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 cursor-pointer group flex-shrink-0"
            >
              <i className="ri-instagram-line text-[#FFB800] group-hover:text-black text-sm md:text-lg"></i>
            </a>
            <a
              href="https://www.tiktok.com/@_r.detailing_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#FFB800]/20 border border-[#FFB800]/60 rounded-full hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 cursor-pointer group flex-shrink-0"
            >
              <i className="ri-tiktok-line text-[#FFB800] group-hover:text-black text-sm md:text-lg"></i>
            </a>
            <a
              href="tel:+34676758480"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#FFB800]/20 border border-[#FFB800]/60 rounded-full hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 cursor-pointer group flex-shrink-0"
            >
              <i className="ri-phone-line text-[#FFB800] group-hover:text-black text-sm md:text-lg"></i>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
