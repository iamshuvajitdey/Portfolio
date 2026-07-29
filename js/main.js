const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const backToTop = document.getElementById('back-to-top');

let countersFired = false;

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

function handleScroll() {
    const scrollY = window.scrollY;

    navbar.classList.toggle('scrolled', scrollY > 50);
    backToTop.classList.toggle('visible', scrollY > 400);

    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - revealPoint) {
            el.classList.add('visible');
        }
    });

    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        if (bar.getBoundingClientRect().top < windowHeight - 80) {
            const level = bar.getAttribute('data-level');
            if (!bar.style.width || bar.style.width === '0px') {
                bar.style.width = `${level}%`;
            }
        }
    });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection && !countersFired && statsSection.getBoundingClientRect().top < windowHeight - 80) {
        countersFired = true;
        document.querySelectorAll('.stat-value[data-target]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1500;
            const step = Math.max(1, Math.floor(target / 50));
            let current = 0;
            function update() {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    return;
                }
                counter.textContent = current;
                requestAnimationFrame(() => setTimeout(update, 25));
            }
            update();
        });
    }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
        }
    });
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    document.querySelectorAll('.form-error').forEach(el => el.remove());
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(f => f.style.borderColor = '');

    let valid = true;

    if (!name) { showError('name', 'Name is required'); valid = false; }
    if (!email) { showError('email', 'Email is required'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Invalid email'); valid = false; }
    if (!subject) { showError('subject', 'Subject is required'); valid = false; }
    if (!message) { showError('message', 'Message is required'); valid = false; }

    if (valid) {
        const btn = contactForm.querySelector('button');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
        }, 1200);
    }
});

function showError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#ef4444';
    const err = document.createElement('p');
    err.className = 'form-error';
    err.textContent = msg;
    err.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin-top: 4px;';
    field.parentElement.appendChild(err);
}
