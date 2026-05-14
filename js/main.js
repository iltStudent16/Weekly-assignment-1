// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active nav highlighting
document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname.split("/").pop();
    if (path === "") path = "index.html";
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Scroll Reveal Observer
document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const revealEls = document.querySelectorAll('.scroll-reveal-up, .scroll-reveal-fade');
    const revealOptions = {
        threshold: 0.15
    };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                if (entry.target.style.getPropertyValue('--sr-delay')) {
                    entry.target.style.transitionDelay = entry.target.style.getPropertyValue('--sr-delay');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    revealEls.forEach(el => {
        revealObserver.observe(el);
    });
});

// Counter Animation
document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const counters = document.querySelectorAll('.counter');
    const speed = 1200;
    function animateCounter(counter) {
        const update = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText.replace(/,/g, '');
            const increment = Math.ceil(target / speed * 16);
            if (count < target) {
                counter.innerText = (count + increment).toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        update();
    }
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// CTA Pulse Animation (disable for reduced motion)
document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.cta-pulse').forEach(btn => btn.classList.remove('cta-pulse'));
    }
});
