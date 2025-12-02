// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Page navigation
function navigateTo(pageId) {
    // Remove active class from all pages and nav links
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to target page and corresponding nav link
    const targetPage = document.getElementById(pageId);
    const targetLink = document.querySelector(`[href="#${pageId}"]`);
    
    if (targetPage && targetLink) {
        targetPage.classList.add('active');
        targetLink.classList.add('active');
    }
    
    // Close mobile menu if open
    navMenu.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Trigger animations for specific pages
    if (pageId === 'performance') {
        animateCounters();
    }
    if (pageId === 'about') {
        animateSkillBars();
    }
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        navigateTo(pageId);
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Typing animation for hero title
function typeWriter() {
    const text = "Hello, I'm";
    const typingElement = document.querySelector('.typing-text');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    typingElement.textContent = '';
    type();
}

// Counter animation for performance metrics
function animateCounters() {
    const counters = document.querySelectorAll('.metric-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        }
    });
}

// Smooth scrolling for better UX
function smoothScroll() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .metric-card, .timeline-item, .skill-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Start typing animation
    setTimeout(typeWriter, 500);
});

// Add floating animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const currentPage = document.querySelector('.page.active');
    const currentIndex = Array.from(pages).indexOf(currentPage);
    
    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        const nextPageId = pages[currentIndex + 1].id;
        navigateTo(nextPageId);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const prevPageId = pages[currentIndex - 1].id;
        navigateTo(prevPageId);
    }
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #10b981;
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});