/* =====================================================
   FILHOS DE MARTE - RELÍQUIAS DA VERDADE
   Landing Page - JavaScript
   Pure Vanilla JS (ES6) - No frameworks
   ===================================================== */

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll functionality
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fdm-visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeInElements = document.querySelectorAll('.fdm-fade-in');
    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // ===== PARALLAX SCROLL EFFECT =====
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.fdm-parallax');
        
        parallaxElements.forEach(el => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Listen to scroll events
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

    // ===== LAZY LOADING FOR BACKGROUND IMAGES =====
    const lazyBackgrounds = document.querySelectorAll('.fdm-hero-bg, .fdm-final-cta-bg');
    
    const lazyBackgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyBackgroundObserver.unobserve(entry.target);
            }
        });
    });

    lazyBackgrounds.forEach(bg => {
        lazyBackgroundObserver.observe(bg);
    });

    // ===== PRELOAD CRITICAL IMAGES =====
    const criticalImages = [
        'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1920&q=80',
        'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=1920&q=80'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ===== PERFORMANCE: DEBOUNCE RESIZE EVENTS =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate positions if needed
            updateParallax();
        }, 250);
    });

    // ===== SCROLL TO TOP ON PAGE LOAD =====
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

});