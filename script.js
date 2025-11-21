

// Theme Toggle Functionality
function initThemeToggle() {
    console.log('Starting theme toggle initialization...');
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    console.log('Theme toggle element:', themeToggle);
    console.log('Body element:', body);
    
    if (!themeToggle) {
        console.error('Theme toggle button not found! Looking for element with id="themeToggle"');
        // Try to find it by class as backup
        const toggleByClass = document.querySelector('.theme-toggle');
        console.log('Found by class:', toggleByClass);
        return;
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme from localStorage:', savedTheme);
    
    // Apply saved theme immediately
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        console.log('Applied dark mode from saved preference');
    } else {
        body.classList.remove('dark-mode');
        console.log('Applied light mode from saved preference');
    }
    
    // Add click event listener
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Theme toggle clicked!');
        
        // Toggle dark mode class
        body.classList.toggle('dark-mode');
        
        // Check current state
        const isDark = body.classList.contains('dark-mode');
        console.log('Dark mode is now:', isDark);
        console.log('Body classes after toggle:', body.className);
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        console.log('Saved theme preference:', isDark ? 'dark' : 'light');
        
        // Add visual feedback
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Force a style recalculation
        body.style.display = 'none';
        body.offsetHeight; // Trigger reflow
        body.style.display = '';
    });
    
    console.log('Theme toggle initialization complete');
}

// Backup theme toggle function
function forceThemeToggle() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    console.log('Force toggled theme to:', isDark ? 'dark' : 'light');
}

// Smooth Page Transitions
function initPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only apply transitions to HTML files (not current page)
            if (href && href.endsWith('.html') && href !== window.location.pathname.split('/').pop()) {
                e.preventDefault();
                
                // Add fade out effect
                document.body.classList.add('page-transition-out');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content Loaded - Initializing...');
    console.log('Document ready state:', document.readyState);
    
    // Wait a bit for all elements to be ready
    setTimeout(() => {
        console.log('Starting delayed initialization...');
        
        // Initialize theme toggle first
        initThemeToggle();
        
        // Test if theme toggle is working
        setTimeout(() => {
            const themeButton = document.getElementById('themeToggle');
            if (themeButton) {
                console.log('Theme button found, adding test click handler');
                // Add a test click to verify it's working
                window.testDarkMode = function() {
                    console.log('Testing dark mode...');
                    document.body.classList.toggle('dark-mode');
                    const isDark = document.body.classList.contains('dark-mode');
                    console.log('Dark mode test result:', isDark);
                    return isDark;
                };
                console.log('You can test dark mode by typing: testDarkMode() in the console');
            }
        }, 100);
        
        // Initialize other functionality
        initSidebarNavigation();
        initScrollAnimations();
        initCounters();
        initContactForm();
        initSmoothScrolling();
        initProfessionalAnimations();
        initSkillBars();
        initActiveNavigation();
        initPageTransitions();
        
    }, 100);
    
    // Remove page transition class on load
    document.body.classList.remove('page-transition-out');
    document.body.classList.add('page-transition-in');
    
    // Add keyboard shortcut for testing
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            console.log('Ctrl+D pressed - toggling dark mode');
            forceThemeToggle();
        }
    });
    
    // Debug: Test dark mode after a short delay
    setTimeout(() => {
        const themeToggle = document.getElementById('themeToggle');
        console.log('Theme toggle check:', themeToggle);
        console.log('Current body classes:', document.body.className);
        
        // Add keyboard shortcut for testing (Ctrl+D)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                console.log('Manual theme toggle via Ctrl+D:', isDark ? 'dark' : 'light');
            }
        });
    }, 500);
});

// Enhanced Sidebar Navigation functionality
function initSidebarNavigation() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Create backdrop element
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);
    }

    console.log('Initializing sidebar navigation...'); // Debug log
    console.log('Mobile toggle found:', !!mobileNavToggle); // Debug log
    console.log('Sidebar found:', !!sidebar); // Debug log
    
    // Ensure mobile navigation is properly styled
    if (mobileNavToggle) {
        mobileNavToggle.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    }

    function toggleSidebar() {
        const isActive = sidebar.classList.contains('active');
        
        if (isActive) {
            // Close sidebar
            sidebar.classList.remove('active');
            mobileNavToggle.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open sidebar
            sidebar.classList.add('active');
            mobileNavToggle.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        mobileNavToggle.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Mobile sidebar toggle
    if (mobileNavToggle && sidebar) {
        mobileNavToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle clicked!'); // Debug log
            toggleSidebar();
        });

        // Close sidebar when clicking backdrop
        backdrop.addEventListener('click', () => {
            closeSidebar();
        });

        // Close sidebar when clicking on a link on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('Navigation link clicked:', link.getAttribute('href'));
                
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
                
                // Don't prevent default for regular page navigation
                // Only prevent for hash links (handled by smooth scrolling)
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                }
            });
        });

        // Close sidebar when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    } else {
        console.error('Mobile navigation elements not found!'); // Debug log
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeSidebar();
            if (mobileNavToggle) {
                mobileNavToggle.style.display = 'none';
            }
        } else {
            if (mobileNavToggle) {
                mobileNavToggle.style.display = 'flex';
            }
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.section-title, .about-text, .about-image, .skill-category, .project-card, .contact-info, .contact-form');

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Professional animations and interactions
function initProfessionalAnimations() {
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const heroStats = document.querySelectorAll('.hero-stats .stat-number');

    const animateStats = (elements) => {
        elements.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', ''));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 30);
        });
    };

    // Animate hero stats immediately
    setTimeout(() => animateStats(heroStats), 1000);

    // Animate about stats on scroll
    const aboutStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(stats);
                aboutStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutStatsObserver.observe(aboutSection);
    }

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
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
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Enhanced Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.btn-primary');
    const messageDiv = document.getElementById('form-message');

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', validateField);
    });

    function validateField(e) {
        const field = e.target;
        const fieldGroup = field.closest('.form-group');
        
        // Remove previous validation classes
        fieldGroup.classList.remove('valid', 'error');
        
        if (field.value.trim() === '') {
            if (field.hasAttribute('required')) {
                fieldGroup.classList.add('error');
            }
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && !isValidEmail(field.value)) {
            fieldGroup.classList.add('error');
            return false;
        }
        
        fieldGroup.classList.add('valid');
        return true;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all required fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });

        if (!isValid) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showFormMessage('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            form.reset();
            
            // Reset validation classes
            inputs.forEach(input => {
                input.closest('.form-group').classList.remove('valid', 'error', 'focused');
            });
            
        } catch (error) {
            showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    function showFormMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'flex';
        
        // Add icon
        const icon = type === 'success' ? '✓' : '⚠';
        messageDiv.innerHTML = `
            <span>${icon}</span>
            <span>${message}</span>
        `;
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    // Only apply smooth scrolling to hash links (internal page links)
    const hashLinks = document.querySelectorAll('a[href^="#"]');

    hashLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced form interactions
function initEnhancedFormInteractions() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Typing effect for hero title
// Initialize enhanced form interactions
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initEnhancedFormInteractions, 500);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');

                if (targetWidth) {
                    skillBar.style.setProperty('--target-width', targetWidth);
                    skillBar.style.width = targetWidth;
                }

                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Enhanced form interactions for new pages
function initEnhancedFormInteractions() {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Add validation feedback
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.parentElement.classList.remove('error');
                    input.parentElement.classList.add('valid');
                } else {
                    input.parentElement.classList.remove('valid');
                    input.parentElement.classList.add('error');
                }
            });
        });
    });
}

// Page-specific animations
function initPageAnimations() {
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.page-header, .about-content, .timeline-item, .project-card, .contact-info, .contact-form, .skills-section');

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNav, 100));
    updateActiveNav(); // Initial call
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    initEnhancedFormInteractions();
    initPageAnimations();

    // Add smooth scrolling to all internal links
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
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    const sidebar = document.getElementById('sidebar');

    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Add loading states
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger skill bar animations after page load
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress[data-width]');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }, 500);
});

// Initialize page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Always initialize these regardless of loading screen
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress[data-width]');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }, 300);
    
    // Initialize scroll progress indicator
    initScrollProgress();
});

// Scroll Progress Indicator
function initScrollProgress() {
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(scrollIndicator);
    
    const scrollProgress = scrollIndicator.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Initialize loading state and mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is a page refresh
    const navigationEntries = performance.getEntriesByType('navigation');
    const isPageRefresh = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';
    const currentPage = window.location.pathname;
    const isHomePage = currentPage.endsWith('index.html') || currentPage === '/' || currentPage.endsWith('/');
    
    console.log('DOM loaded - Page:', currentPage);
    console.log('DOM loaded - Is refresh:', isPageRefresh);
    
    // Force mobile navigation initialization
    forceMobileNavInit();
    
    // Ensure navigation is initialized after DOM is ready
    setTimeout(() => {
        initSidebarNavigation();
        
        // Debug: Test mobile navigation after a short delay
        const mobileToggle = document.getElementById('mobileNavToggle');
        const sidebar = document.getElementById('sidebar');
        
        console.log('Debug check:');
        console.log('Mobile toggle element:', mobileToggle);
        console.log('Sidebar element:', sidebar);
        console.log('Window width:', window.innerWidth);
        
        if (mobileToggle) {
            console.log('Mobile toggle display style:', window.getComputedStyle(mobileToggle).display);
            console.log('Mobile toggle visibility:', window.getComputedStyle(mobileToggle).visibility);
        }
        
        // Force show mobile toggle on mobile screens
        if (window.innerWidth <= 768 && mobileToggle) {
            mobileToggle.style.display = 'flex';
            mobileToggle.style.visibility = 'visible';
            mobileToggle.style.opacity = '1';
        }
    }, 100);
});

// Force mobile navigation initialization
function forceMobileNavInit() {
    const mobileToggle = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
        console.log('Force initializing mobile navigation...');
        
        // Ensure mobile toggle is visible on mobile
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'flex';
            mobileToggle.style.visibility = 'visible';
            mobileToggle.style.opacity = '1';
        }
        
        // Create backdrop if it doesn't exist
        let backdrop = document.querySelector('.sidebar-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'sidebar-backdrop';
            backdrop.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1003;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(backdrop);
        }
        
        // Add click handler to mobile toggle
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile toggle clicked!');
            
            const isActive = sidebar.classList.contains('active');
            
            if (isActive) {
                // Close sidebar
                sidebar.classList.remove('active');
                mobileToggle.classList.remove('active');
                backdrop.classList.remove('active');
                backdrop.style.display = 'none';
                document.body.style.overflow = '';
                console.log('Sidebar closed');
            } else {
                // Open sidebar
                sidebar.classList.add('active');
                mobileToggle.classList.add('active');
                backdrop.classList.add('active');
                backdrop.style.display = 'block';
                setTimeout(() => backdrop.style.opacity = '1', 10);
                document.body.style.overflow = 'hidden';
                console.log('Sidebar opened');
            }
        });
        
        // Add click handler to backdrop
        backdrop.addEventListener('click', function() {
            sidebar.classList.remove('active');
            mobileToggle.classList.remove('active');
            backdrop.classList.remove('active');
            backdrop.style.display = 'none';
            document.body.style.overflow = '';
            console.log('Sidebar closed via backdrop');
        });
        
        // Close sidebar on navigation link click
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    backdrop.classList.remove('active');
                    backdrop.style.display = 'none';
                    document.body.style.overflow = '';
                    console.log('Sidebar closed via nav link');
                }
            });
        });
        
        console.log('Mobile navigation force initialized successfully');
    } else {
        console.error('Mobile navigation elements not found during force init');
    }
}

// Professional Page Analytics (Optional)
function trackPageView(pageName) {
    // Add your analytics code here
    console.log(`Page viewed: ${pageName}`);
}

// Call on each page
document.addEventListener('DOMContentLoaded', () => {
    const pageName = document.title.split(' - ')[0] || 'Home';
    trackPageView(pageName);
});

// Mobile Project Overlay Functionality
function initMobileProjectOverlays() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        let touchStartTime = 0;
        let isOverlayVisible = false;
        
        // Touch start handler
        card.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
        });
        
        // Touch end handler for mobile tap
        card.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            
            // If it's a quick tap (not a scroll), toggle overlay
            if (touchDuration < 300) {
                e.preventDefault();
                
                // Toggle overlay visibility
                if (isOverlayVisible) {
                    card.classList.remove('show-overlay');
                    isOverlayVisible = false;
                } else {
                    // Hide other overlays first
                    projectCards.forEach(otherCard => {
                        otherCard.classList.remove('show-overlay');
                    });
                    
                    // Show this overlay
                    card.classList.add('show-overlay');
                    isOverlayVisible = true;
                }
            }
        });
        
        // Mouse enter for desktop
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.classList.add('show-overlay');
            }
        });
        
        // Mouse leave for desktop
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.classList.remove('show-overlay');
                isOverlayVisible = false;
            }
        });
        
        // Click outside to hide overlay on mobile
        document.addEventListener('touchstart', (e) => {
            if (!card.contains(e.target) && isOverlayVisible) {
                card.classList.remove('show-overlay');
                isOverlayVisible = false;
            }
        });
    });
}

// Enhanced Project Link Functionality
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        // Add loading state for external links
        link.addEventListener('click', (e) => {
            if (link.href && link.href !== '#') {
                // Add loading animation
                link.style.opacity = '0.7';
                link.style.pointerEvents = 'none';
                
                // Reset after a short delay
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.pointerEvents = 'auto';
                }, 1000);
            }
        });
        
        // Add ripple effect on click
        link.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            link.style.position = 'relative';
            link.style.overflow = 'hidden';
            link.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .project-card.show-overlay .project-overlay {
            opacity: 1 !important;
        }
        
        @media (max-width: 768px) {
            .project-overlay {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Simple test functions for debugging
window.testDarkModeToggle = function() {
    console.log('=== DARK MODE TEST ===');
    const body = document.body;
    const themeButton = document.getElementById('themeToggle');
    
    console.log('Body element:', body);
    console.log('Theme button:', themeButton);
    console.log('Current body classes:', body.className);
    
    // Force toggle dark mode
    body.classList.toggle('dark-mode');
    
    console.log('After toggle - body classes:', body.className);
    console.log('Dark mode active:', body.classList.contains('dark-mode'));
    
    // Check computed styles
    const computedStyle = window.getComputedStyle(body);
    console.log('Body background color:', computedStyle.backgroundColor);
    console.log('Body color:', computedStyle.color);
    
    return body.classList.contains('dark-mode');
};

window.forceDarkMode = function() {
    console.log('Forcing dark mode ON');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    console.log('Dark mode forced ON');
};

window.forceLightMode = function() {
    console.log('Forcing light mode ON');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    console.log('Light mode forced ON');
};

// Auto-test on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('=== AUTO DARK MODE TEST ===');
        console.log('Available test functions:');
        console.log('- testDarkModeToggle() - Toggle and test dark mode');
        console.log('- forceDarkMode() - Force dark mode ON');
        console.log('- forceLightMode() - Force light mode ON');
        
        // Test if theme toggle button exists
        const themeButton = document.getElementById('themeToggle');
        if (themeButton) {
            console.log('✓ Theme toggle button found');
            console.log('Button element:', themeButton);
        } else {
            console.error('✗ Theme toggle button NOT found');
        }
        
        // Test current theme
        const isDark = document.body.classList.contains('dark-mode');
        console.log('Current theme:', isDark ? 'DARK' : 'LIGHT');
        
    }, 1000);
});