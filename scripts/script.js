// Main JavaScript file for all pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeForms();
    initializeGallery();
    initializePricing();
    initializeTestimonials();
    initializeBlog();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle (if needed in future)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animation handlers
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Skill bars animation (if needed)
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Form handling
function initializeForms() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'contact');
        });
    }

    // Sign up form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'signup');
        });

        // Password strength indicator
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }

        // Password confirmation validation
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', validatePasswordMatch);
        }
    }

    // Newsletter subscription
    const newsletterForms = document.querySelectorAll('.sidebar-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubscription(this);
        });
    });
}

// Form submission handler
function handleFormSubmission(form, type) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Success simulation
        showNotification(`${type === 'contact' ? 'Message' : 'Account'} created successfully!`, 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Redirect for signup
        if (type === 'signup') {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }, 2000);
}

// Newsletter subscription
function handleNewsletterSubscription(form) {
    const email = form.querySelector('input[type="email"]').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Password strength indicator
function updatePasswordStrength() {
    const password = this.value;
    const strengthBar = document.querySelector('.strength-bar');
    if (!strengthBar) return;

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;

    strengthBar.style.width = `${strength}%`;
    strengthBar.style.background = 
        strength < 50 ? '#e74c3c' : 
        strength < 75 ? '#f39c12' : '#27ae60';
}

// Password match validation
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const formGroup = this.closest('.form-group');

    if (formGroup) {
        if (password !== confirmPassword && confirmPassword !== '') {
            formGroup.classList.add('error');
            this.setCustomValidity('Passwords do not match');
        } else {
            formGroup.classList.remove('error');
            this.setCustomValidity('');
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            .notification-success { background: #27ae60; }
            .notification-error { background: #e74c3c; }
            .notification-info { background: #3498db; }
            .notification-warning { background: #f39c12; }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Gallery functionality
function initializeGallery() {
    // Filter functionality for portfolio gallery
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn, .category-filters .category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item, .recipe-card, .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter') || this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox functionality for images
    const galleryImages = document.querySelectorAll('.gallery-image-simple, .project-image img, .recipe-image img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

// Lightbox functionality
function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">‹</button>
            <button class="lightbox-next">›</button>
        </div>
    `;

    // Add styles if not already added
    if (!document.querySelector('#lightbox-styles')) {
        const styles = document.createElement('style');
        styles.id = 'lightbox-styles';
        styles.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                border-radius: 8px;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
            }
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255, 255, 255, 0.4);
            }
            .lightbox-prev { left: 20px; }
            .lightbox-next { right: 20px; }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    function closeLightbox() {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    }

    // Keyboard navigation
    document.addEventListener('keydown', function handleKeyPress(e) {
        if (e.key === 'Escape') closeLightbox();
    });
}

// Pricing functionality
function initializePricing() {
    const billingToggle = document.getElementById('billingToggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.price.monthly');
            const annualPrices = document.querySelectorAll('.price.annual');
            
            if (this.checked) {
                // Show annual prices
                monthlyPrices.forEach(price => price.style.display = 'none');
                annualPrices.forEach(price => price.style.display = 'inline');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => price.style.display = 'inline');
                annualPrices.forEach(price => price.style.display = 'none');
            }
        });
    }

    // Plan selection
    const planButtons = document.querySelectorAll('.plan-card .btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('.plan-name').textContent;
            showNotification(`Selected ${planName} plan! Redirecting to contact...`, 'success');
            
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 2000);
        });
    });
}

// Testimonials functionality
function initializeTestimonials() {
    // Testimonial carousel (if multiple testimonials per section)
    const testimonialSections = document.querySelectorAll('.testimonials-row');
    
    testimonialSections.forEach(section => {
        const testimonials = section.querySelectorAll('.testimonial-card');
        if (testimonials.length > 2) {
            // Add navigation arrows for sections with many testimonials
            const prevButton = document.createElement('button');
            const nextButton = document.createElement('button');
            
            prevButton.className = 'testimonial-nav testimonial-prev';
            nextButton.className = 'testimonial-nav testimonial-next';
            prevButton.innerHTML = '‹';
            nextButton.innerHTML = '›';
            
            section.style.position = 'relative';
            section.appendChild(prevButton);
            section.appendChild(nextButton);
            
            let currentIndex = 0;
            
            function updateTestimonials() {
                testimonials.forEach((testimonial, index) => {
                    testimonial.style.display = index >= currentIndex && index < currentIndex + 2 ? 'block' : 'none';
                });
            }
            
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateTestimonials();
                }
            });
            
            nextButton.addEventListener('click', () => {
                if (currentIndex < testimonials.length - 2) {
                    currentIndex++;
                    updateTestimonials();
                }
            });
            
            updateTestimonials();
        }
    });
}

// Blog functionality
function initializeBlog() {
    // Category filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.split(' ')[0].toLowerCase();
            filterBlogPosts(category);
        });
    });

    // Pagination
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // In a real app, this would load new content
                showNotification('Loading more posts...', 'info');
            }
        });
    });
}

// Blog post filtering
function filterBlogPosts(category) {
    const posts = document.querySelectorAll('.blog-post-card, .featured-post');
    let visibleCount = 0;

    posts.forEach(post => {
        const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
        if (category === 'all' || postCategory.includes(category)) {
            post.style.display = 'block';
            visibleCount++;
        } else {
            post.style.display = 'none';
        }
    });

    if (visibleCount === 0) {
        showNotification('No posts found in this category.', 'info');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access (if needed)
window.utils = {
    showNotification,
    debounce
};