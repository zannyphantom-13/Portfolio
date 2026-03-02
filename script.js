document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const links = document.querySelectorAll('.nav-links li');
    const adminNotifPanel = document.querySelector('#admin-notif-panel');
    const isMobile = window.innerWidth <= 768;

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
        navOverlay.classList.toggle('active');
        
        // Manage notification panel z-index when menu is open to prevent blocking
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            if (adminNotifPanel) {
                adminNotifPanel.style.zIndex = '1050';
                adminNotifPanel.style.pointerEvents = 'none';
            }
        } else {
            document.body.style.overflow = '';
            if (adminNotifPanel) {
                adminNotifPanel.style.zIndex = '1090';
                adminNotifPanel.style.pointerEvents = 'auto';
            }
        }
    };

    if (hamburger && navLinks && navOverlay) {
        hamburger.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile-specific profile animation on scroll
    if (isMobile) {
        const profilePlaceholder = document.querySelector('.profile-placeholder');
        if (profilePlaceholder) {
            let hasAnimated = false;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        entry.target.style.animation = 'mobileRoll 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) both';
                        hasAnimated = true;
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(profilePlaceholder);
        }
    }

    // Scroll Animation (Simple Reveal) with mobile enhancements
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add animation to project cards and testimonials on mobile
                if (isMobile && (entry.target.classList.contains('project-card') || entry.target.classList.contains('testimonial-card'))) {
                    entry.target.style.animation = 'mobileSlideUp 0.6s ease-out both';
                    entry.target.style.backdropFilter = 'blur(10px)';
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Animated buttons on mobile with ripple effect
    if (isMobile) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.95)';
                this.style.boxShadow = 'inset 0 0 20px rgba(123, 44, 191, 0.5)';
            });
            btn.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
            
            // Touch events for mobile
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.boxShadow = 'inset 0 0 20px rgba(123, 44, 191, 0.5)';
            });
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
        });
    }

    // Typing Effect
    const textElement = document.querySelector('.role');
    const textToType = "I build focused web experiences.";
    let index = 0;

    // Clear initial text
    textElement.textContent = "";

    function typeText() {
        if (index < textToType.length) {
            textElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }

    // Start typing after a slight delay
    setTimeout(typeText, 1000);

});
