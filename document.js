document.addEventListener('DOMContentLoaded', function () {
    // Toggle Menu for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight Active Section in Navbar on Scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(id)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Typing Effect
    const typingText = document.querySelector('.typing-text span');
    if (typingText) {
        const words = ["Web Developer", "Software Developer", "Web Designer", "AI Enthusiast", "Mathematician"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 100);
            }
        }

        type();
    }

    // Animate Sections on Scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const isVisible = sectionTop < window.innerHeight && sectionBottom >= 0;

            if (isVisible) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Lazy Loading Images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const config = {
            rootMargin: '0px 0px 50px 0px',
            threshold: 0.01
        };

        let observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    preloadImage(entry.target);
                    self.unobserve(entry.target);
                }
            });
        }, config);

        images.forEach(image => {
            observer.observe(image);
        });

        function preloadImage(img) {
            const src = img.getAttribute('data-src');
            if (!src) return;
            img.src = src;
        }
    };

    lazyLoadImages();

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = 'Toggle Dark Mode';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.querySelector('header').appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    // Add CSS for Dark Mode
    const style = document.createElement('style');
    style.textContent = `
        body.dark-mode {
            background-color: #121212;
            color: #ffffff;
        }
        body.dark-mode header {
            background-color: #1e1e1e;
        }
        body.dark-mode nav a {
            color: #ffffff;
        }
        body.dark-mode nav a:hover,
        body.dark-mode nav a.active {
            color: #b74b4b;
        }
        body.dark-mode .service-item,
        body.dark-mode .skill-item,
        body.dark-mode .education-item,
        body.dark-mode .experience-item {
            background-color: #2c2c2c;
        }
    `;
    document.head.appendChild(style);
});