import './style.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom/client';
import GaveCarousel from './src/components/GaveCarousel.jsx';
import { properties } from './data.js';
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

// Function to initialize Coverage Leaflet Map on Home Page
function initHomeCoverageMap() {
    const mapEl = document.getElementById('home-coverage-map');
    if (mapEl && !mapEl.dataset.initialized) {
        mapEl.dataset.initialized = "true";
        try {
            // Center on Armenia / property location
            const defaultLat = properties[0]?.lat || 4.5428;
            const defaultLng = properties[0]?.lng || -75.6792;
            const defaultZoom = 13;

            const map = L.map('home-coverage-map', {
                center: [defaultLat, defaultLng],
                zoom: defaultZoom,
                zoomControl: true,
                scrollWheelZoom: false
            });

            // Clean Voyager tiles from CartoDB / OSM
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 18
            }).addTo(map);

            // Add active properties zones fixed to real coordinates
            properties.forEach(prop => {
                if (prop.lat && prop.lng) {
                    // Fixed geographic circle on map
                    L.circle([prop.lat, prop.lng], {
                        color: '#3E7751',
                        fillColor: '#3E7751',
                        fillOpacity: 0.28,
                        weight: 2.5,
                        radius: prop.zoneRadius || 400,
                        dashArray: '6, 6'
                    }).addTo(map);

                    // Custom pulsing pin marker
                    const pinIcon = L.divIcon({
                        className: 'home-map-pin',
                        html: `
                            <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                                <div style="position: absolute; inset: 0; border-radius: 50%; background: rgba(62, 119, 81, 0.45); animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                                <div style="position: relative; width: 30px; height: 30px; border-radius: 50%; background: #00375D; border: 2.5px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                            </div>
                        `,
                        iconSize: [34, 34],
                        iconAnchor: [17, 17]
                    });

                    const marker = L.marker([prop.lat, prop.lng], { icon: pinIcon }).addTo(map);
                    
                    marker.bindPopup(`
                        <div style="font-family: Inter, sans-serif; padding: 4px; color: #00375D; min-width: 150px;">
                            <strong style="font-size: 13px; display: block; margin-bottom: 2px;">${prop.title}</strong>
                            <span style="font-size: 11px; color: #3E7751; font-weight: 600;">Sector ${prop.sector || prop.location}</span>
                            <a href="/property.html?id=${prop.id}" style="display: block; margin-top: 6px; font-size: 11px; color: #00375D; font-weight: 700; text-decoration: underline;">Ver propiedad →</a>
                        </div>
                    `);
                }
            });

            setTimeout(() => {
                map.invalidateSize();
            }, 300);

        } catch (e) {
            console.error("Home Leaflet map error:", e);
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initReactCarousel();
        initHomeCoverageMap();
    });
} else {
    initReactCarousel();
    initHomeCoverageMap();
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
                // Close
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            } else {
                // Open
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
