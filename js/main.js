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
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    // Scroll-reveal observer
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(function(el) { observer.observe(el); });
    } else {
        // Fallback: show all immediately
        reveals.forEach(function(el) { el.classList.add('revealed'); });
    }

    // Animated counters
    var counters = document.querySelectorAll('.counter-value[data-target]');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-target'), 10);
                    var duration = 1500;
                    var start = 0;
                    var startTime = null;
                    function animate(ts) {
                        if (!startTime) startTime = ts;
                        var progress = Math.min((ts - startTime) / duration, 1);
                        var current = Math.floor(progress * target);
                        el.textContent = current.toLocaleString() + (target >= 100 && target <= 100 ? '%' : target === 98 ? '%' : '');
                        if (target === 98) el.textContent = current + '%';
                        else el.textContent = current.toLocaleString();
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            el.textContent = target.toLocaleString();
                            if (target === 98) el.textContent = target + '%';
                        }
                    }
                    requestAnimationFrame(animate);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });
        counters.forEach(function(el) { counterObserver.observe(el); });
    }

    // Navbar shrink on scroll
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                navbar.classList.add('shadow');
                navbar.style.transition = 'padding 0.3s';
                navbar.style.paddingTop = '0.25rem';
                navbar.style.paddingBottom = '0.25rem';
            } else {
                navbar.classList.remove('shadow');
                navbar.style.paddingTop = '';
                navbar.style.paddingBottom = '';
            }
        });
    }
});
