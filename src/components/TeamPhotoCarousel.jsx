import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    id: 1,
    img: '/img-asesora-1.png',
    alt: 'Asesora Inmobiliaria Comercial y Estratégica - Gave Propiedades',
    role: 'Consultoría Comercial & Valoración',
    name: 'Asesora Comercial'
  },
  {
    id: 2,
    img: '/img-asesora-2.png',
    alt: 'Asesora Inmobiliaria Jurídica y Estructural - Gave Propiedades',
    role: 'Acompañamiento Legal & Normativo',
    name: 'Asesora Jurídica'
  }
];

export default function TeamPhotoCarousel({ autoPlayInterval = 4000, transitionDuration = 800 }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
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
      className="relative w-full max-w-md md:max-w-lg mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative background glow accents */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-gave-primary/30 via-gave-secondary/20 to-transparent rounded-[2.5rem] transform rotate-2 blur-xl -z-10 opacity-70"></div>
      <div className="absolute -inset-2 bg-gradient-to-bl from-gave-secondary/30 via-gave-primary/20 to-transparent rounded-[2.5rem] transform -rotate-1 blur-lg -z-10 opacity-60"></div>

      {/* Main Luxury Frame with Aesthetic Bevel (Bisel Estético) */}
      <div 
        className="relative rounded-[2.2rem] overflow-hidden bg-[#0a121e] p-2.5 sm:p-3.5 transition-all duration-500"
        style={{
          boxShadow: `
            0 25px 50px -12px rgba(0, 35, 60, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.12),
            inset 0 1px 2px rgba(255, 255, 255, 0.25),
            inset 0 -2px 6px rgba(0, 0, 0, 0.6)
          `,
          background: 'linear-gradient(145deg, #162438 0%, #0c1524 50%, #060c16 100%)'
        }}
      >
        {/* Inner Bevel Border container */}
        <div 
          className="relative w-full aspect-[4/5] sm:aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-gray-900 border border-white/15"
          style={{
            boxShadow: 'inset 0 0 25px rgba(0,0,0,0.5)'
          }}
        >
          {/* Photo Slides */}
          {slides.map((slide, index) => {
            const isActive = index === current;
            return (
              <div
                key={slide.id}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1) translateY(0)' : 'scale(1.06) translateY(10px)',
                  transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : 1
                }}
              >
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                />

                {/* Subtle vignette and bottom gradient for aesthetic depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060c16]/80 via-transparent to-black/15 pointer-events-none"></div>

                {/* Aesthetic Bevel Overlay Light Reflex */}
                <div className="absolute inset-0 rounded-[1.8rem] border border-white/20 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>

                {/* Floating pill badge on top right */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Gave Asesoras
                  </span>
                </div>

                {/* Bottom identification caption bar */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-white flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-emerald-300 font-bold">{slide.role}</p>
                    <p className="text-sm font-bold text-white drop-shadow-sm">{slide.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white/70 font-medium">1 a 1</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows (Prev / Next Buttons) */}
          <button
            onClick={handlePrev}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-gave-secondary text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="transform group-hover:-translate-x-0.5 transition-transform">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Siguiente foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-gave-secondary text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="transform group-hover:translate-x-0.5 transition-transform">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Bottom Aesthetic Controls & Dot Indicators */}
        <div className="pt-3 pb-1 px-3 flex items-center justify-between text-white/80">
          <button 
            onClick={handlePrev}
            className="text-xs font-semibold hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>← Anterior</span>
          </button>

          {/* Pill Segment Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Ver foto ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'w-9 bg-gave-secondary shadow-md shadow-emerald-500/40'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>

          <button 
            onClick={handleNext}
            className="text-xs font-semibold hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Siguiente →</span>
          </button>
        </div>
      </div>

      {/* Helper text under carousel */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-gave-secondary">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Transición suave (800ms) · Automático y con controles táctiles
        </p>
      </div>
    </div>
  );
}
