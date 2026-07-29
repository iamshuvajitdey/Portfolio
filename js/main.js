/**
 * Portfolio - Main JavaScript
 * Handles navigation, scroll animations, form validation, and interactivity
 */

// ================================
// DOM Elements
// ================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const revealElements = document.querySelectorAll('.reveal');
const revealLeft = document.querySelectorAll('.reveal-left');
const revealRight = document.querySelectorAll('.reveal-right');
const skillBars = document.querySelectorAll('.skill-bar');
const statsContainer = document.getElementById('stats-container');
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');
const pageLoader = document.getElementById('page-loader');
const typingElement = document.getElementById('typing-title');
const tiltCards = document.querySelectorAll('.tilt-card');

// ================================
// Page Preloader
// ================================
window.addEventListener('load', () => {
    setTimeout(() => {
        pageLoader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 800);
});

// ================================
// Mobile Navigation
// ================================
function toggleNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

navToggle.addEventListener('click', toggleNav);

navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeNav();
    }
});

// Close menu on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
});

// ================================
// Navbar Scroll Effect
// ================================
function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll);

// ================================
// Scroll Progress Bar
// ================================
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// ================================
// Active Navigation Link
// ================================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ================================
// Scroll Reveal Animation
// ================================
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });

    revealLeft.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });

    revealRight.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ================================
// Skill Bar Animation
// ================================
function animateSkillBars() {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (barTop < windowHeight - 100) {
            const level = bar.getAttribute('data-level');
            if (!bar.style.width || bar.style.width === '0px') {
                bar.style.width = `${level}%`;
            }
        }
    });
}

window.addEventListener('scroll', animateSkillBars);

// ================================
// Counter Animation
// ================================
let countersAnimated = false;

function animateCounters() {
    if (!statsContainer || countersAnimated) return;

    const rect = statsContainer.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        countersAnimated = true;

        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = Math.max(1, Math.floor(target / 60));
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    return;
                }
                counter.textContent = current;
                requestAnimationFrame(() => setTimeout(updateCounter, 30));
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ================================
// Smooth Scroll for Navigation
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Back to Top Button
// ================================
function handleBackToTop() {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleBackToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// Typing Effect
// ================================
function typeWriter(element, words, speed = 80, deleteSpeed = 40, delay = 2000) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, delay);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
            return;
        }

        setTimeout(type, isDeleting ? deleteSpeed : speed);
    }

    type();
}

if (typingElement) {
    const words = ['Integration Developer', 'MuleSoft Expert', 'Workato Specialist', 'API Architect', 'Automation Engineer'];
    typeWriter(typingElement, words);
}

// ================================
// 3D Tilt Effect
// ================================
function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
}

tiltCards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
});

// ================================
// Contact Form Handling
// ================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    clearErrors();

    if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
    }

    if (!email) {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }

    if (!subject) {
        showError('subject', 'Please enter a subject');
        isValid = false;
    }

    if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#ef4444';

    let errorDiv = field.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #ef4444; font-size: 0.85rem; margin-top: 0.5rem; animation: fadeInUp 0.3s ease;';
        field.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;

    field.addEventListener('input', function handler() {
        field.style.borderColor = '';
        const err = field.parentElement.querySelector('.error-message');
        if (err) err.remove();
        field.removeEventListener('input', handler);
    }, { once: true });
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(f => {
        f.style.borderColor = '';
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            btnText.textContent = 'Sending...';
            btnIcon.style.display = 'none';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                btnText.textContent = 'Send Message';
                btnIcon.style.display = '';
                submitBtn.disabled = false;
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
            }, 1500);
        }
    });
}

// ================================
// Parallax Effect for Hero
// ================================
function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
}

window.addEventListener('scroll', handleParallax);

// ================================
// Client-side Resume Download Tracking
// ================================
const resumeLink = document.querySelector('a[download]');
if (resumeLink) {
    resumeLink.addEventListener('click', () => {
        console.log('Resume download initiated');
    });
}

// ================================
// Intersection Observer (Performance)
// ================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('reveal') ||
                entry.target.classList.contains('reveal-left') ||
                entry.target.classList.contains('reveal-right')) {
                entry.target.classList.add('active');
            }

            if (entry.target.classList.contains('skill-card')) {
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar && (!skillBar.style.width || skillBar.style.width === '0px')) {
                    const level = skillBar.getAttribute('data-level');
                    skillBar.style.width = `${level}%`;
                }
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-card').forEach(el => {
    observer.observe(el);
});

// ================================
// Console Easter Egg
// ================================
console.log('%c👋 Hello there!', 'font-size: 2rem; font-weight: bold;');
console.log('%cThanks for checking out my portfolio.', 'font-size: 1rem; color: #0891b2;');
console.log('%cBuilt with HTML, CSS & JavaScript.', 'font-size: 0.9rem; color: #94a3b8;');
console.log('%cShuvajit Dey - Integration Developer', 'font-size: 1.2rem; color: #14b8a6; font-weight: bold;');
