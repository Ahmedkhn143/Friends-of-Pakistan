export const galleryImgs = Array.from(
  {length: 12}, 
  (_, i) => `https://picsum.photos/${400+i*17}/${280+i*11}?random=${200+i}`
);
