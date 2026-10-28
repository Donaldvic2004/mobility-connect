document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Tab Switcher
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetIndex = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabPanels.forEach(panel => {
                if (panel.dataset.panel === targetIndex) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = document.getElementById('formSuccess');
            successMsg.style.display = 'block';
            contactForm.reset();
            setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sent!';
            btn.style.background = 'var(--wine-main)';
            newsletterForm.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // --- NEW: Auto-scroll mobile nav to show the active link ---
    const activeLink = document.querySelector('.nav-links a.active');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if it's mobile view and active link exists
    if (activeLink && navLinks && window.innerWidth <= 768) {
        // Small timeout ensures layout is fully rendered before calculating positions
        setTimeout(() => {
            const scrollLeft = activeLink.offsetLeft - (navLinks.clientWidth / 2) + (activeLink.clientWidth / 2);
            navLinks.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }, 150); 
    }
           // --- PARALLAX SCROLL EFFECT FOR HERO IMAGES ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImages = document.querySelectorAll('.hero-image, .hero-bg');
        
        heroImages.forEach(img => {
            // Only animate if the image is currently visible on screen
            if (img.getBoundingClientRect().bottom > 0) {
                // Negative translateY moves the image UP as you scroll DOWN, 
                // revealing the bottom of the picture.
                // scale(1.3) ensures the image is big enough that it never shows a white gap.
                img.style.transform = `translateY(${scrolled * -0.15}px) scale(1.3)`;
            }
        });
    }, { passive: true });
});
