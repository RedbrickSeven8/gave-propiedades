import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import GaveCarousel from './src/components/GaveCarousel.jsx';
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

// Function to mount React carousel
function initReactCarousel() {
    const reactMount = document.getElementById('react-team-carousel');
    if (reactMount && !reactMount.dataset.mounted) {
        reactMount.dataset.mounted = "true";
        const root = ReactDOM.createRoot(reactMount);
        
        // Responsive baseWidth
        const isMobile = window.innerWidth < 480;
        const width = isMobile ? Math.min(window.innerWidth - 32, 340) : 380;
        
        root.render(
            <GaveCarousel 
                baseWidth={width}
                autoplay={true}
                autoplayDelay={3500}
                pauseOnHover={true}
                loop={true}
            />
        );
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReactCarousel);
} else {
    initReactCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU LOGIC
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = !mobileMenu.classList.contains('translate-x-full');
            
            if (isOpen) {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            }
        });
        
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

    // 3. ANIMATIONS
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
