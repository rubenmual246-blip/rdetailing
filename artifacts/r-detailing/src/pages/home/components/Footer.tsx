export default function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-br from-[#1a1a1a] via-black to-[#1a1a1a] py-12 md:py-16">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,184,0,.1) 35px, rgba(255,184,0,.1) 70px)',
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex justify-start mb-8 md:mb-12">
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-[#FFB800] text-sm md:text-base font-bold uppercase">
              Contacto
            </h4>
            <div className="space-y-1.5 md:space-y-2">
              <a
                href="tel:+34676758480"
                className="flex items-center gap-2 text-white hover:text-[#FFB800] transition-colors duration-300 cursor-pointer text-xs md:text-sm"
              >
                <i className="ri-phone-line text-[#FFB800] text-xs"></i>
                <span>+34 676 758 480</span>
              </a>
              <a
                href="https://wa.me/+34676758480"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#FFB800] transition-colors duration-300 cursor-pointer text-xs md:text-sm"
              >
                <i className="ri-whatsapp-line text-[#FFB800] text-xs"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FFB800]/30 pt-6 md:pt-8">
          <p className="text-center text-gray-500 text-xs">
            © 2025 R Detailing. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
