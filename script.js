// ===========================
// Mobile Menu Toggle
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
});

// ===========================
// Smooth Scrolling
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Header Scroll Effect
// ===========================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Add fade-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Gallery Load More Functionality
// ===========================

const loadMoreBtn = document.querySelector('.gallery-cta .btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulate loading more cards
        const galleryGrid = document.querySelector('.gallery-grid');
        const cardTypes = [
            { emoji: '🌟', name: 'Star Power' },
            { emoji: '💎', name: 'Diamond Rare' },
            { emoji: '🎭', name: 'Drama King' },
            { emoji: '🚀', name: 'Rocket Launch' },
            { emoji: '🌈', name: 'Rainbow Burst' },
            { emoji: '⭐', name: 'Stellar Move' }
        ];
        
        cardTypes.forEach((card, index) => {
            const newCard = document.createElement('div');
            newCard.className = 'gallery-item';
            newCard.style.opacity = '0';
            newCard.style.transform = 'translateY(20px)';
            newCard.innerHTML = `
                <div class="card-placeholder">
                    <span class="card-emoji">${card.emoji}</span>
                    <p class="card-name">${card.name}</p>
                </div>
            `;
            galleryGrid.appendChild(newCard);
            
            // Animate in
            setTimeout(() => {
                newCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                newCard.style.opacity = '1';
                newCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Change button text
        this.textContent = 'More Cards Coming Soon!';
        this.disabled = true;
        this.style.opacity = '0.6';
        this.style.cursor = 'not-allowed';
    });
}

// ===========================
// Card Hover Effects
// ===========================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Performance: Lazy Loading
// ===========================

// Lazy load images when they come into viewport
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===========================
// Analytics & SEO
// ===========================

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log(`Button clicked: ${buttonText}`);
        
        // Here you would send to analytics service
        // Example: gtag('event', 'button_click', { 'button_name': buttonText });
    });
});

// Track page visibility for engagement metrics
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// ===========================
// Accessibility Enhancements
// ===========================

// Skip to main content functionality
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for gallery
document.querySelectorAll('.gallery-item').forEach((item, index, items) => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log('Gallery item selected:', this.querySelector('.card-name').textContent);
        }
        if (e.key === 'ArrowRight' && index < items.length - 1) {
            items[index + 1].focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            items[index - 1].focus();
        }
    });
});

// ===========================
// Console Easter Egg
// ===========================

console.log('%c🎴 AI Pokemon Cards Parody', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cWelcome, curious developer! 👋', 'color: #4ecdc4; font-size: 16px;');
console.log('%cIf you\'re interested in contributing, check out our GitHub repo!', 'color: #718096; font-size: 14px;');
console.log('%chttps://github.com/MIHAchoppa/Ai-Pokemon-Cards-PArody', 'color: #667eea; font-size: 14px;');

// ===========================
// Page Load Performance Tracking
// ===========================

window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});
