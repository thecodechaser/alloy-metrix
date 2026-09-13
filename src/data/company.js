// Company-wide details. Edit here — every page reads from this file.
export const company = {
  name: 'Alloy Metrix',
  legalName: 'Alloy Metrix — Analytical & Agro Solution',
  strapline: 'Analytical Precision. Agricultural Progress.',
  domain: 'alloymetrix.in',
  // TODO: switch to the branded mailbox (e.g. info@alloymetrix.in) once it is live.
  email: 'kadirhasan@gmail.com',
  phone: '+91 79065 35262',
  phoneHref: '+917906535262',
  whatsapp: '917906535262',
  address: {
    line1: 'Afzalgarh',
    line2: 'Bijnor, Uttar Pradesh',
    country: 'India',
  },
  hours: 'Monday – Saturday, 9:30 am – 6:30 pm IST',
}

export const divisions = [
  {
    id: 'analytical',
    name: 'Analytical & NDT Instruments',
    short: 'Analytical',
    slug: 'analytical',
    tagline: 'Inspection and measurement equipment for industry',
    description:
      'Magnetic particle, radiographic, ultrasonic and hardness testing equipment, handheld alloy analysers, light meters, consumables and accessories — supplied with calibration certificates and standards compliance.',
    image: '/img/products/led-film-viewers.jpg',
  },
  {
    id: 'agro',
    name: 'Agricultural Implements',
    short: 'Agro',
    slug: 'agro',
    tagline: 'Tractor implements built for Indian fields',
    description:
      'As authorised sales and distribution partner of Kisan King Agro Implements — manufacturing since 1985 — we supply ridgers, harrows, cultivators, ploughs, levellers and sugarcane implements across India.',
    image: '/img/products/ridger.jpg',
  },
]

export const categories = [
  { id: 'magnetic-particle-testing', name: 'Magnetic Particle Testing', division: 'analytical' },
  { id: 'radiographic-testing', name: 'Radiographic Testing', division: 'analytical' },
  { id: 'hardness-testing', name: 'Hardness Testing', division: 'analytical' },
  { id: 'ultrasonic-testing', name: 'Ultrasonic Testing', division: 'analytical' },
  { id: 'alloy-analysis', name: 'Alloy Analysis', division: 'analytical' },
  { id: 'light-meters', name: 'Digital Light Meters', division: 'analytical' },
  { id: 'consumables', name: 'MPT & DPT Consumables', division: 'analytical' },
  { id: 'accessories', name: 'NDT Accessories', division: 'analytical' },
  { id: 'tillage', name: 'Ploughing & Tillage', division: 'agro' },
  { id: 'sugarcane', name: 'Sugarcane & Row Crop', division: 'agro' },
  { id: 'land-shaping', name: 'Land Shaping & Traction', division: 'agro' },
]

export const partners = [
  { name: 'Magnafield', note: 'NDT instruments' },
  { name: 'SciAps', note: 'Handheld XRF & LIBS' },
  { name: 'MR Chemie', note: 'MPT & DPT consumables' },
  { name: 'Kisan King Agro', note: 'Agricultural implements since 1985' },
]

export const enquiryTypes = [
  'Product quotation',
  'Technical details & demo',
  'Dealer / distributor enquiry',
  'Bulk or institutional order',
  'Customised implement requirement',
  'Service, calibration & after-sales',
]
