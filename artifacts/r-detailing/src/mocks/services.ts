export const basicService = {
  id: 'basic',
  name: 'Lavado Básico',
  slogan: 'Limpieza de mantenimiento',
  price: 30,
  duration: 'Duración aproximada: 2 horas',
  image: 'https://readdy.ai/api/search-image?query=car%20detailing%20close%20up%20foam%20soap%20bubbles%20covering%20black%20car%20hood%20exterior%20wash%20no%20people%20nobody%20professional%20auto%20detailing%20studio%20dark%20background%20dramatic%20lighting%20shiny%20paint%20surface&width=800&height=600&seq=essential-noperson-v3&orientation=landscape',
  included: [
    'Lavado exterior con champú pH neutro y técnica de dos cubos',
    'Limpieza básica de llantas',
    'Aspirado interior con tornador',
    'Limpieza básica de plásticos interiores',
    'Limpieza de cristales',
    'Secado manual',
  ],
  extras: [
    { name: 'Tapicería (inyección y extracción)', price: 20 },
    { name: 'Alfombrillas profundas', price: 10 },
  ],
};

export const detailedServices = [
  {
    id: 'absolute',
    name: 'Absolute Detailing',
    slogan: '¡Excelencia absoluta!',
    price: 140,
    duration: 'Duración aproximada: 4 a 6 horas',
    image: 'https://readdy.ai/api/search-image?query=premium%20car%20interior%20leather%20seats%20close%20up%20detailing%20conditioning%20treatment%20beige%20cream%20leather%20no%20people%20nobody%20luxury%20vehicle%20cabin%20steering%20wheel%20detail%20studio%20lighting&width=800&height=600&seq=absolute-noperson-v3&orientation=landscape',
    included: [
      'Prelavado y lavado exterior con paño de microfibra y técnica de dos cubos',
      'Limpieza profunda de llantas y eliminación de restos férricos',
      'Tratamiento regenerador de plásticos interiores y exteriores',
      'Recuperador de neumáticos',
      'Limpieza de cristales',
      'Aspirado profundo con Tornador',
      'Limpieza de marcos de puerta y gomas con brocha',
      'Limpieza de rejillas y zonas de difícil acceso con brocha',
      'Limpieza de alfombrillas profundas con cepillo rotativo',
      'Eliminación de pelo de mascota con cepillos específicos',
      'Limpieza de tapicería por inyección y extracción profesional',
      'Eliminación de manchas persistentes',
      'Tratamiento para textiles, cueros o alcántara profesional',
      'Limpieza y desinfección interior a vapor',
    ],
  },
];

export const servicesData = [basicService, ...detailedServices];

export const basePriceBySize: Record<string, number> = {
  pequeno: 25,
  normal: 30,
  grande: 45,
};

export const extraPriceBySize: Record<string, Record<string, number>> = {
  'Tapicería (inyección y extracción)': {
    pequeno: 20,
    normal: 20,
    grande: 25,
  },
  'Alfombrillas profundas': {
    pequeno: 10,
    normal: 10,
    grande: 15,
  },
  'Eliminación de pelos de mascota': {
    pequeno: 15,
    normal: 15,
    grande: 20,
  },
};

export const detailedPriceBySize: Record<string, Record<string, number>> = {
  pequeno: { absolute: 120 },
  normal: { absolute: 140 },
  grande: { absolute: 170 },
};

export const durationBySize: Record<string, Record<string, string>> = {
  absolute: {
    pequeno: 'Duración aproximada: 4 a 6 horas',
    normal: 'Duración aproximada: 6 a 8 horas',
    grande: 'Duración aproximada: 6 a 8 horas',
  },
};

export const sizeLabelMap: Record<string, string> = {
  pequeno: 'Pequeño',
  normal: 'Normal',
  grande: 'Grande',
};

export const sizeSubtitleMap: Record<string, string> = {
  pequeno: '',
  normal: 'Berlinas / SUV',
  grande: '4x4, 7 plazas',
};

export const essentialImagesBySize: Record<string, string> = {
  pequeno: 'https://readdy.ai/api/search-image?query=small%20compact%20city%20car%20black%20paint%20being%20hand%20washed%20in%20dimly%20lit%20professional%20auto%20detailing%20garage%20soft%20overhead%20lighting%20water%20droplets%20on%20bodywork%20no%20people%20moody%20atmospheric%20dark%20concrete%20floor%20realistic%20elegant%20understated%20premium%20feel&width=800&height=600&seq=essential-util-v1&orientation=landscape',
  normal: 'https://readdy.ai/api/search-image?query=black%20suv%20luxury%20vehicle%20side%20profile%20being%20foam%20washed%20in%20professional%20detailing%20bay%20dark%20moody%20garage%20lighting%20soap%20suds%20running%20down%20doors%20realistic%20documentary%20style%20no%20people%20elegant%20premium%20understated%20dark%20atmosphere&width=800&height=600&seq=essential-suv-v1&orientation=landscape',
  grande: 'https://readdy.ai/api/search-image?query=dark%20silver%20family%20minivan%20rear%20view%20in%20auto%20detailing%20workshop%20being%20pressure%20washed%20professional%20lighting%20mist%20and%20water%20spray%20no%20people%20realistic%20candid%20shot%20dark%20garage%20environment%20elegant%20understated%20moody%20atmosphere&width=800&height=600&seq=essential-7plazas-v1&orientation=landscape',
};

export const absoluteImagesBySize: Record<string, string> = {
  pequeno: 'https://readdy.ai/api/search-image?query=compact%20car%20interior%20dashboard%20and%20steering%20wheel%20close%20up%20leather%20seats%20being%20detailed%20in%20dark%20professional%20studio%20soft%20warm%20lighting%20no%20people%20premium%20materials%20elegant%20understated%20moody%20atmosphere%20realistic%20textures&width=800&height=600&seq=absolute-util-v1&orientation=landscape',
  normal: 'https://readdy.ai/api/search-image?query=luxury%20suv%20interior%20leather%20seats%20and%20dashboard%20close%20up%20premium%20detailing%20treatment%20dark%20studio%20lighting%20no%20people%20elegant%20materials%20realistic%20textures%20warm%20soft%20light%20moody%20understated%20atmosphere%20professional%20car%20care&width=800&height=600&seq=absolute-suv-v1&orientation=landscape',
  grande: 'https://readdy.ai/api/search-image?query=family%20van%20interior%20back%20seats%20row%20being%20steam%20cleaned%20and%20detailed%20dark%20professional%20garage%20warm%20lighting%20no%20people%20realistic%20candid%20shot%20premium%20materials%20leather%20upholstery%20elegant%20understated%20moody%20atmosphere&width=800&height=600&seq=absolute-7plazas-v1&orientation=landscape',
};
