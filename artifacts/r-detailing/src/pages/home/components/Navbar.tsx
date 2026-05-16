interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* MOBILE NAV */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 px-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-around gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#FFB800]/15 shadow-lg shadow-black/30">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-white/80 text-[9px] tracking-[0.12em] uppercase font-light whitespace-nowrap cursor-pointer active:text-[#FFB800] transition-colors px-1"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('vehicle-size-selector')}
            className="text-white/80 text-[9px] tracking-[0.12em] uppercase font-light whitespace-nowrap cursor-pointer active:text-[#FFB800] transition-colors px-1"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white/80 text-[9px] tracking-[0.12em] uppercase font-light whitespace-nowrap cursor-pointer active:text-[#FFB800] transition-colors px-1"
          >
            Contacto
          </button>
        </div>
      </nav>

      {/* DESKTOP NAV */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white hover:text-[#FFB800] transition-colors duration-300 font-medium whitespace-nowrap cursor-pointer"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('vehicle-size-selector')}
                className="text-white hover:text-[#FFB800] transition-colors duration-300 font-medium whitespace-nowrap cursor-pointer"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-[#FFB800] transition-colors duration-300 font-medium whitespace-nowrap cursor-pointer"
              >
                Contacto
              </button>
            </div>

            <a
              href="https://wa.me/+34676758480"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFB800] text-black px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-bold hover:bg-[#FFA500] transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Reservar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
