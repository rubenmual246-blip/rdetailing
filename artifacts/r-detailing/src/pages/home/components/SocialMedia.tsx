export default function SocialMedia() {
  return (
    <section id="social" className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-3 md:mb-4">SÍGUENOS</h2>
          <p className="text-lg md:text-2xl text-gray-600 font-light">
            y descubre nuestros resultados reales
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-6 md:mt-10">
          <a
            href="https://www.instagram.com/rdetailing__"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 md:gap-4 cursor-pointer"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-black rounded-3xl flex items-center justify-center group-hover:bg-[#FFB800] transition-all duration-300 group-hover:scale-110 shadow-xl group-hover:shadow-[#FFB800]/50">
              <i className="ri-instagram-line text-[#FFB800] text-5xl md:text-6xl group-hover:text-black transition-colors duration-300"></i>
            </div>
            <span className="text-black text-base md:text-lg font-medium">@rdetailing__</span>
          </a>

          <a
            href="https://www.tiktok.com/@_r.detailing_"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 md:gap-4 cursor-pointer"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-black rounded-3xl flex items-center justify-center group-hover:bg-[#FFB800] transition-all duration-300 group-hover:scale-110 shadow-xl group-hover:shadow-[#FFB800]/50">
              <i className="ri-tiktok-line text-[#FFB800] text-5xl md:text-6xl group-hover:text-black transition-colors duration-300"></i>
            </div>
            <span className="text-black text-base md:text-lg font-medium">@_r.detailing_</span>
          </a>

          <a
            href="tel:+34676758480"
            className="group flex flex-col items-center gap-3 md:gap-4 cursor-pointer"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-black rounded-3xl flex items-center justify-center group-hover:bg-[#FFB800] transition-all duration-300 group-hover:scale-110 shadow-xl group-hover:shadow-[#FFB800]/50">
              <i className="ri-phone-line text-[#FFB800] text-5xl md:text-6xl group-hover:text-black transition-colors duration-300"></i>
            </div>
            <span className="text-black text-base md:text-lg font-medium">+34 676 758 480</span>
          </a>
        </div>
      </div>
    </section>
  );
}
