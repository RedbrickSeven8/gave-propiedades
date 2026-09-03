
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
    console.log("DOM loaded. Initializing JS...");

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
    } else {
        console.error("Mobile menu elements not found!");
    }

    // 2. NAVBAR SCROLL LOGIC
    const navbar = document.getElementById('navbar');
    const desktopLinks = document.querySelectorAll('.nav-link');
    
    const updateNavbar = () => {
    // Navbar is now always white for better logo contrast
    if (!navbar) return;
    navbar.classList.add('bg-white', 'shadow-md', 'py-2');
    navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gave-primary');
    });
    if(mobileBtn) {
        mobileBtn.classList.remove('text-white', 'bg-black/20', 'border-white/10');
        mobileBtn.classList.add('text-gave-primary', 'bg-gray-100', 'border-gray-200');
    }
};
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // 3. CAROUSEL LOGIC (Native Scroll)
    const carousel = document.getElementById('asesoras-carousel');
    if (carousel) {
        let isSlide1 = true;
        setInterval(() => {
            if (isSlide1) {
                // Scroll to slide 2
                carousel.scrollTo({
                    left: carousel.offsetWidth,
                    behavior: 'smooth'
                });
            } else {
                // Scroll to slide 1
                carousel.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }
            isSlide1 = !isSlide1;
        }, 3500);
    }

    // 4. ANIMATIONS
    try {
        if (document.querySelector('.hero-bg')) {
            const tl = gsap.timeline();
            tl.fromTo('.hero-bg', 
                { scale: 1.1, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
            .fromTo('.animate-on-load > *', 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'power2.out' },
                "-=1"
            );
        }

        const revealElements = document.querySelectorAll('.gs-reveal');
        revealElements.forEach(elem => {
            gsap.fromTo(elem, 
                { y: 50, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 95%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    } catch (e) {
        console.error("GSAP Error:", e);
    }
});

// --- Catalog Filter Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    if(filterBtns.length > 0) {
        // Tag cards based on comments for simplicity
        propertyCards.forEach(card => {
            const html = card.innerHTML;
            if(html.includes('DATA:casa')) card.dataset.type = (card.dataset.type || '') + ' casa';
            if(html.includes('DATA:apartamento')) card.dataset.type = (card.dataset.type || '') + ' apartamento';
            if(html.includes('DATA:lote')) card.dataset.type = (card.dataset.type || '') + ' lote';
            if(html.includes('DATA:venta') || html.includes('En Venta')) card.dataset.type = (card.dataset.type || '') + ' venta';
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('bg-gave-primary', 'text-white');
                    b.classList.add('bg-white', 'text-gray-700');
                });
                btn.classList.remove('bg-white', 'text-gray-700');
                btn.classList.add('bg-gave-primary', 'text-white');
                
                const filterValue = btn.getAttribute('data-filter');
                
                propertyCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const types = card.dataset.type || '';
                        if (types.includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});
