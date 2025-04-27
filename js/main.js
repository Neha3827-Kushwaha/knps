/**
 * Kanpur Softwares - Main JavaScript
 * Author: Claude
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * Back to top button
     */
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Navbar scroll behavior
     */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
                navbar.classList.remove('py-3');
            } else {
                navbar.classList.remove('shadow-sm');
                navbar.classList.add('py-3');
            }
        });
    }

    /**
     * Mobile nav toggle
     */
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            document.body.classList.toggle('mobile-nav-active');
            this.classList.toggle('active');
        });
    }

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        const animatedElements = document.querySelectorAll('.animate__animated');
        if (animatedElements.length) {
            const animateElementsOnScroll = () => {
                animatedElements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
                        const animationClass = el.getAttribute('data-animation') || 'animate__fadeIn';
                        el.classList.add(animationClass);
                    }
                });
            };
            
            window.addEventListener('scroll', animateElementsOnScroll);
            animateElementsOnScroll(); // Initial check
        }
    });

    /**
     * Testimonial carousel
     */
    const testimonialCarousel = document.querySelector('#testimonial-carousel');
    if (testimonialCarousel && typeof bootstrap !== 'undefined') {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    /**
     * Portfolio filters
     */
    const portfolioFilters = document.querySelector('.portfolio-filters');
    if (portfolioFilters) {
        const filterButtons = portfolioFilters.querySelectorAll('li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach((btn) => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach((item) => {
                    if (filter === '*' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    /**
     * Form validation
     */
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }
            
            if (isValid) {
                // Show success message (in a real application, you would submit the form)
                const successMessage = document.querySelector('#form-success');
                if (successMessage) {
                    successMessage.classList.remove('d-none');
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.add('d-none');
                    }, 5000);
                }
            }
        });
        
        // Remove validation styling on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach((input) => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }
}); 