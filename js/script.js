/**
 * ═══════════════════════════════════════════════════════════════════════════
 * POUR CHOICE TAPHOUSE - Main JavaScript
 * Handles navigation and minor UI enhancements
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';

    // ─────────────────────────────────────────────────────────────────────────
    // NYE Popup
    // ─────────────────────────────────────────────────────────────────────────
    const NYEPopup = {
        init() {
            const popup = document.getElementById('nye-popup');
            const closeBtn = document.getElementById('nye-popup-close');
            const overlay = popup?.querySelector('.nye-popup__overlay');

            if (!popup || !closeBtn) return;

            // Check if popup was already dismissed in this session
            const dismissed = sessionStorage.getItem('nye-popup-dismissed');
            if (dismissed) {
                popup.classList.add('hidden');
                return;
            }

            // Show popup and prevent scrolling
            document.body.classList.add('no-scroll');

            // Close popup function
            const closePopup = () => {
                popup.classList.add('hidden');
                document.body.classList.remove('no-scroll');
                sessionStorage.setItem('nye-popup-dismissed', 'true');
            };

            // Close on button click
            closeBtn.addEventListener('click', closePopup);

            // Close on overlay click
            overlay?.addEventListener('click', closePopup);

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
                    closePopup();
                }
            });
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Mobile Navigation
    // ─────────────────────────────────────────────────────────────────────────
    const Navigation = {
        init() {
            const toggle = document.getElementById('nav-toggle');
            const menu = document.getElementById('nav-menu');
            const links = menu?.querySelectorAll('.nav__link');

            if (!toggle || !menu) return;

            // Toggle menu
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                menu.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });

            // Close menu when clicking a link
            links?.forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Hours Highlighting
    // ─────────────────────────────────────────────────────────────────────────
    const Hours = {
        init() {
            const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
            const hoursItems = document.querySelectorAll('.hours__day[data-day]');

            hoursItems.forEach(item => {
                const day = parseInt(item.dataset.day, 10);
                if (day === today) {
                    item.classList.add('today');
                }
            });
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Current Year in Footer
    // ─────────────────────────────────────────────────────────────────────────
    const Footer = {
        init() {
            const yearEl = document.getElementById('current-year');
            if (yearEl) {
                yearEl.textContent = new Date().getFullYear();
            }
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Smooth Scroll Enhancement
    // ─────────────────────────────────────────────────────────────────────────
    const SmoothScroll = {
        init() {
            // Add offset for fixed navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Lazy Loading Images (Native + Fallback)
    // ─────────────────────────────────────────────────────────────────────────
    const LazyLoad = {
        init() {
            // Use native lazy loading where supported
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            if ('loading' in HTMLImageElement.prototype) {
                // Native lazy loading supported
                return;
            }

            // Fallback for older browsers
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            observer.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            }
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Scroll-based Navigation Styling
    // ─────────────────────────────────────────────────────────────────────────
    const ScrollEffects = {
        init() {
            const nav = document.querySelector('.nav');
            if (!nav) return;

            let lastScroll = 0;
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const currentScroll = window.pageYOffset;
                        
                        // Add/remove scrolled class for styling
                        if (currentScroll > 100) {
                            nav.classList.add('nav--scrolled');
                        } else {
                            nav.classList.remove('nav--scrolled');
                        }

                        lastScroll = currentScroll;
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Initialize Everything
    // ─────────────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        NYEPopup.init();
        Navigation.init();
        Hours.init();
        Footer.init();
        SmoothScroll.init();
        LazyLoad.init();
        ScrollEffects.init();

        // Log initialization (remove in production)
        console.log('🍺 Pour Choice Taphouse website initialized');
        console.log('🎉 NYE Popup active');
    });

})();


