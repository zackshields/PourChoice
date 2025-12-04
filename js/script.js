/**
 * ═══════════════════════════════════════════════════════════════════════════
 * POUR CHOICE TAPHOUSE - Main JavaScript
 * Handles age gate, navigation, and minor UI enhancements
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';

    // ─────────────────────────────────────────────────────────────────────────
    // Age Gate Modal
    // ─────────────────────────────────────────────────────────────────────────
    const AgeGate = {
        COOKIE_NAME: 'pourchoice_age_verified',
        COOKIE_DAYS: 1, // Session-like behavior - expires after 1 day

        init() {
            const ageGate = document.getElementById('age-gate');
            const yesBtn = document.getElementById('age-yes');
            const noBtn = document.getElementById('age-no');

            if (!ageGate) return;

            // Check if user has already verified age
            if (this.isVerified()) {
                this.hideModal(ageGate);
                return;
            }

            // Show modal and prevent scrolling
            document.body.classList.add('no-scroll');

            // Event listeners
            yesBtn?.addEventListener('click', () => {
                this.setCookie();
                this.hideModal(ageGate);
                document.body.classList.remove('no-scroll');
            });

            noBtn?.addEventListener('click', () => {
                // Redirect to a responsible drinking resource
                window.location.href = 'https://www.responsibility.org/';
            });
        },

        isVerified() {
            return document.cookie.includes(this.COOKIE_NAME + '=true');
        },

        setCookie() {
            const date = new Date();
            date.setTime(date.getTime() + (this.COOKIE_DAYS * 24 * 60 * 60 * 1000));
            document.cookie = `${this.COOKIE_NAME}=true; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
        },

        hideModal(modal) {
            modal.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                modal.style.display = 'none';
            }, 400);
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
        AgeGate.init();
        Navigation.init();
        Hours.init();
        Footer.init();
        SmoothScroll.init();
        LazyLoad.init();
        ScrollEffects.init();

        // Log initialization (remove in production)
        console.log('🍺 Pour Choice Taphouse website initialized');
    });

})();


