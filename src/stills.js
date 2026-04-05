const createImage = (id, widths, width, height, alt) => ({
  id,
  basePath: `/fotografia/edu-pimenta/${id}`,
  widths,
  width,
  height,
  alt,
});

const eduPimentaImages = [
  createImage('edu-pimenta-01', [600], 600, 900, 'Retrato de Jair Rodrigues fotografado por Edu Pimenta'),
  createImage('edu-pimenta-02', [700, 1400, 2200, 5262], 5262, 3508, 'Retrato de Piero Lissoni fotografado por Edu Pimenta'),
  createImage('edu-pimenta-03', [700, 1200], 1200, 1076, 'Fotografia de Edu Pimenta 03'),
  createImage('edu-pimenta-04', [700, 1200], 1200, 800, 'Fotografia de Edu Pimenta 04'),
  createImage('edu-pimenta-05', [600], 600, 600, 'Fotografia de Edu Pimenta 05'),
  createImage('edu-pimenta-06', [600], 600, 600, 'Fotografia de Edu Pimenta 06'),
  createImage('edu-pimenta-07', [600], 600, 772, 'Fotografia de Edu Pimenta 07'),
  createImage('edu-pimenta-08', [700, 1200], 1200, 1500, 'Fotografia de Edu Pimenta 08'),
  createImage('edu-pimenta-09', [700, 1400, 1800], 1800, 1200, 'Fotografia de Edu Pimenta 09'),
  createImage('edu-pimenta-10', [700, 1200], 1200, 1200, 'Fotografia de Edu Pimenta 10'),
  createImage('edu-pimenta-11', [700, 1400, 1500], 1500, 1500, 'Fotografia de Edu Pimenta 11'),
];

export const photographers = [
  {
    id: 1,
    slug: 'edu-pimenta',
    name: 'Edu Pimenta',
    cover: eduPimentaImages[1],
    coverAlt: 'Galeria de fotografias de Edu Pimenta',
    images: eduPimentaImages,
  },
];

export const getPhotographerBySlug = (slug) =>
  photographers.find((photographer) => photographer.slug === slug);
