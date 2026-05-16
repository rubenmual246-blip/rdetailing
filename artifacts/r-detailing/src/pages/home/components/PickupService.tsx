export default function PickupService() {
  return (
    <section className="bg-black pt-16 md:pt-28 pb-10 md:pb-16 flex justify-center px-4">
      <div className="inline-flex items-center gap-3 md:gap-5 px-4 md:px-8 py-3 md:py-5 rounded-full border border-[#FFB800]/30 bg-[#FFB800]/10 backdrop-blur-sm max-w-full">
        <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
          <i className="ri-truck-line text-[#FFB800] text-xl md:text-3xl"></i>
        </div>
        <div className="flex flex-col items-start gap-0.5 md:gap-1 min-w-0 pr-6 md:pr-0">
          <p className="text-white text-[9px] md:text-base tracking-widest uppercase font-semibold whitespace-nowrap text-left">
            Servicio de recogida a domicilio
          </p>
          <p className="text-[#FFB800]/70 text-[8px] md:text-sm font-light tracking-wide whitespace-nowrap text-left">
            A partir de 10 km, suplemento de 5€
          </p>
        </div>
      </div>
    </section>
  );
}
