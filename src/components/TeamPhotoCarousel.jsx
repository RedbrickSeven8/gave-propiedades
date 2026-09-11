import React, { useState, useEffect, useRef } from 'react';

const photos = [
  {
    id: 1,
    img: '/img-asesora-1.png',
    alt: 'Asesora Inmobiliaria Gave Propiedades',
  },
  {
    id: 2,
    img: '/img-asesora-2.png',
    alt: 'Asesora Inmobiliaria Gave Propiedades',
  }
];

export default function TeamPhotoCarousel({ autoPlayInterval = 3500, transitionDuration = 800 }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrent((prev) => (prev + 1) % photos.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 40) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 40) {
      handlePrev();
    }
    setIsPaused(false);
  };

  return (
    <div 
      className="relative w-full max-w-sm sm:max-w-md mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Marco con Bisel Estético de Alta Gama */}
      <div 
        className="relative rounded-[2.5rem] p-3 sm:p-4 transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, #1e3a5f 0%, #00375D 35%, #001f35 100%)',
          boxShadow: `
            0 25px 50px -12px rgba(0, 55, 93, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -3px 8px rgba(0, 0, 0, 0.6)
          `
        }}
      >
        {/* Contenedor de la foto con bisel interior */}
        <div 
          className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/20"
          style={{
            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Fotos con transición a 800ms */}
          {photos.map((photo, index) => {
            const isActive = index === current;
            return (
              <div
                key={photo.id}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1) translateY(0)' : 'scale(1.05) translateY(8px)',
                  transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : 1
                }}
              >
                <img
                  src={photo.img}
                  alt={photo.alt}
                  className="w-full h-full object-cover object-top"
                />

                {/* Reflejo de luz para realce del bisel */}
                <div 
                  className="absolute inset-0 rounded-[2rem] pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.4)'
                  }}
                />
              </div>
            );
          })}

          {/* Botón Flecha Izquierda */}
          <button
            onClick={handlePrev}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-gave-secondary text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          {/* Botón Flecha Derecha */}
          <button
            onClick={handleNext}
            aria-label="Siguiente foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-gave-secondary text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Barra de Controles y Botones Indicadores */}
        <div className="pt-3 pb-1 px-3 flex items-center justify-between text-white/90">
          <button 
            onClick={handlePrev}
            className="text-xs font-semibold hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← Anterior
          </button>

          {/* Botones Indicadores tipo Pill */}
          <div className="flex items-center gap-2">
            {photos.map((photo, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={photo.id}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Ver foto ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-gave-secondary shadow-md shadow-emerald-500/50'
                      : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              );
            })}
          </div>

          <button 
            onClick={handleNext}
            className="text-xs font-semibold hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
