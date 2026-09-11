import './style.css';
import { createIcons } from 'lucide';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize icons safely
try {
    createIcons();
} catch (e) {
    console.error("Lucide error:", e);
}

// Ensure execution happens after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU LOGIC (Vanilla, foolproof)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = !mobileMenu.classList.contains('translate-x-full');
            
            if (isOpen) {
                // Close
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            } else {
                // Open
                mobileMenu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. NAVBAR SCROLL LOGIC
    const navbar = document.getElementById('navbar');
    const updateNavbar = () => {
        if (!navbar) return;
        navbar.classList.add('bg-white', 'shadow-md', 'py-2');
    };
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // 3. MODERN INTERACTIVE TEAM CAROUSEL (Auto-play + Manual Controls)
    const slides = document.querySelectorAll('.team-slide');
    const dots = document.querySelectorAll('.team-dot');
    const prevBtn = document.getElementById('team-prev-btn');
    const nextBtn = document.getElementById('team-next-btn');
    const container = document.getElementById('team-carousel-container');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval = null;
        const totalSlides = slides.length;
        const autoPlayDelay = 4000; // 4 seconds

        const showSlide = (index) => {
            // Handle bounds
            let targetIndex = index;
            if (targetIndex >= totalSlides) targetIndex = 0;
            if (targetIndex < 0) targetIndex = totalSlides - 1;

            currentSlide = targetIndex;

            slides.forEach((slide, idx) => {
                if (idx === targetIndex) {
                    slide.classList.remove('hidden');
                    // Trigger fade & slight transform
                    requestAnimationFrame(() => {
                        slide.classList.remove('opacity-0', 'translate-x-4');
                        slide.classList.add('opacity-100', 'translate-x-0');
                    });
                } else {
                    slide.classList.remove('opacity-100', 'translate-x-0');
                    slide.classList.add('opacity-0', 'translate-x-4');
                    // Hide after transition
                    setTimeout(() => {
                        if (currentSlide !== idx) {
                            slide.classList.add('hidden');
                        }
                    }, 300);
                }
            });

            // Update dot pill indicators
            dots.forEach((dot, idx) => {
                if (idx === targetIndex) {
                    dot.classList.remove('w-2.5', 'bg-white/30');
                    dot.classList.add('w-8', 'bg-gave-secondary', 'shadow-sm', 'shadow-emerald-500/30');
                } else {
                    dot.classList.remove('w-8', 'bg-gave-secondary', 'shadow-sm', 'shadow-emerald-500/30');
                    dot.classList.add('w-2.5', 'bg-white/30');
                }
            });
        };

        const startAutoPlay = () => {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, autoPlayDelay);
        };

        const pauseAutoPlay = () => {
            if (slideInterval) clearInterval(slideInterval);
        };

        // Navigation button listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                startAutoPlay(); // Restart timer
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                startAutoPlay(); // Restart timer
            });
        }

        // Dot button listeners
        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const target = parseInt(e.currentTarget.getAttribute('data-target') || '0', 10);
                showSlide(target);
                startAutoPlay();
            });
        });

        // Hover pause / resume
        if (container) {
            container.addEventListener('mouseenter', pauseAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
            
            // Touch swipe support on mobile
            let touchStartX = 0;
            let touchEndX = 0;

            container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                pauseAutoPlay();
            }, { passive: true });

            container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 45) {
                    // Swiped left -> Next
                    showSlide(currentSlide + 1);
                } else if (touchEndX - touchStartX > 45) {
                    // Swiped right -> Prev
                    showSlide(currentSlide - 1);
                }
                startAutoPlay();
            }, { passive: true });
        }

        // Initialize first slide and start auto-play
        showSlide(0);
        startAutoPlay();
    }

    // 4. ANIMATIONS
    try {
        if (document.querySelector('.hero-bg')) {
            const tl = gsap.timeline();
            tl.fromTo('.hero-bg', 
                { scale: 1.05, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
            .fromTo('.animate-on-load > *', 
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
                "-=0.5"
            );
        }

        const revealElements = document.querySelectorAll('.gs-reveal');
        revealElements.forEach(elem => {
            gsap.fromTo(elem, 
                { y: 40, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 92%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    } catch (e) {
        console.error("GSAP Error:", e);
    }
});
