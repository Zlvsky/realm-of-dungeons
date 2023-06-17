const loadFontsForPixi = () => {
  const Fondamento = new FontFace(
    "Fondamento",
    "url(src/assets/fonts/Fondamento-Regular.ttf)"
  );
  Fondamento.load().then((font) => {
    document.fonts.add(font);
  });

  const Almendra = new FontFace(
    "Almendra",
    "url(src/assets/fonts/Almendra-Regular.ttf)"
  );
  Almendra.load().then((font) => {
    document.fonts.add(font);
  });

  const MedievalSharp = new FontFace(
    "MedievalSharp",
    "url(src/assets/fonts/MedievalSharp-Regular.ttf)"
  );
  MedievalSharp.load().then((font) => {
    document.fonts.add(font);
  });
};

export default loadFontsForPixi;