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
        MIN_AGE: 21,

        init() {
            const ageGate = document.getElementById('age-gate');
            const monthSelect = document.getElementById('age-month');
            const daySelect = document.getElementById('age-day');
            const yearSelect = document.getElementById('age-year');
            const submitBtn = document.getElementById('age-submit');
            const errorEl = document.getElementById('age-error');

            if (!ageGate) return;

            // Check if user has already verified age
            if (this.isVerified()) {
                this.hideModal(ageGate);
                return;
            }

            // Populate day and year dropdowns
            this.populateDays(daySelect);
            this.populateYears(yearSelect);

            // Update days when month changes
            monthSelect?.addEventListener('change', () => {
                this.populateDays(daySelect, parseInt(monthSelect.value), parseInt(yearSelect.value));
            });

            yearSelect?.addEventListener('change', () => {
                if (monthSelect.value) {
                    this.populateDays(daySelect, parseInt(monthSelect.value), parseInt(yearSelect.value));
                }
            });

            // Show modal and prevent scrolling
            document.body.classList.add('no-scroll');

            // Submit button handler
            submitBtn?.addEventListener('click', () => {
                const month = parseInt(monthSelect.value);
                const day = parseInt(daySelect.value);
                const year = parseInt(yearSelect.value);

                // Validate all fields are filled
                if (!month || !day || !year) {
                    this.showError(errorEl, 'Please enter your complete date of birth.');
                    return;
                }

                // Calculate age
                const birthDate = new Date(year, month - 1, day);
                const age = this.calculateAge(birthDate);

                if (age >= this.MIN_AGE) {
                    this.setCookie();
                    this.hideModal(ageGate);
                    document.body.classList.remove('no-scroll');
                } else {
                    this.showError(errorEl, 'Sorry, you must be 21 or older to enter this site.');
                    setTimeout(() => {
                        window.location.href = 'https://www.responsibility.org/';
                    }, 2000);
                }
            });
        },

        populateDays(select, month = null, year = null) {
            const currentValue = select.value;
            const daysInMonth = month && year ? new Date(year, month, 0).getDate() : 31;
            
            // Clear existing options except placeholder
            select.innerHTML = '<option value="">DD</option>';
            
            for (let i = 1; i <= daysInMonth; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i.toString().padStart(2, '0');
                select.appendChild(option);
            }
            
            // Restore previous value if still valid
            if (currentValue && parseInt(currentValue) <= daysInMonth) {
                select.value = currentValue;
            }
        },

        populateYears(select) {
            const currentYear = new Date().getFullYear();
            const minYear = currentYear - 100;
            
            for (let year = currentYear; year >= minYear; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                select.appendChild(option);
            }
        },

        calculateAge(birthDate) {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        },

        showError(el, message) {
            if (el) {
                el.textContent = message;
                el.style.display = 'block';
            }
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


