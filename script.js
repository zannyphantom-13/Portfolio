document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const links = document.querySelectorAll('.nav-links li');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
        navOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
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

    // Smooth Scrolling for Anchor Links (Optional, CSS scroll-behavior usually handles this but this provides more control if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation (Simple Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

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
