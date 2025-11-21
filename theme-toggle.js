// Simple Dark Mode Toggle - Clean Implementation
console.log('Theme toggle script loaded');

function initDarkMode() {
    console.log('Initializing dark mode...');
    
    // Get the theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    console.log('Theme toggle button found:', themeToggle);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        console.log('Applied dark mode');
    }
    
    // Add click handler
    themeToggle.addEventListener('click', function() {
        console.log('Theme button clicked!');
        
        // Add theme transition animation class
        body.classList.add('theme-transitioning');
        
        // Toggle dark mode
        body.classList.toggle('dark-mode');
        
        // Save preference
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        console.log('Theme switched to:', isDark ? 'dark' : 'light');
        console.log('Body classes:', body.className);
        
        // Add enhanced visual feedback
        themeToggle.style.transform = 'scale(0.85) rotate(180deg)';
        
        // Create multiple ripple effects for smoother transition
        const createRipple = (delay, scale, opacity) => {
            const ripple = document.createElement('div');
            ripple.className = 'theme-ripple';
            ripple.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                background: ${isDark ? 
                    'radial-gradient(circle, #4d9fff 0%, rgba(77, 159, 255, 0.3) 70%, transparent 100%)' : 
                    'radial-gradient(circle, #0066cc 0%, rgba(0, 102, 204, 0.3) 70%, transparent 100%)'};
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                opacity: ${opacity};
                pointer-events: none;
                z-index: 10000;
                animation: smoothThemeRipple ${1.2 + delay}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                animation-delay: ${delay}s;
            `;
            return ripple;
        };
        
        // Create multiple ripples for layered effect
        const ripple1 = createRipple(0, 1, 0.4);
        const ripple2 = createRipple(0.1, 1.2, 0.3);
        const ripple3 = createRipple(0.2, 1.4, 0.2);
        
        // Add enhanced ripple animation keyframes if not exists
        if (!document.querySelector('#theme-ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'theme-ripple-styles';
            style.textContent = `
                @keyframes smoothThemeRipple {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0.4;
                    }
                    30% {
                        opacity: 0.3;
                    }
                    60% {
                        opacity: 0.15;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(120);
                        opacity: 0;
                    }
                }
                
                .theme-transitioning {
                    overflow: hidden;
                }
                
                .theme-transitioning * {
                    transition-duration: 1.2s !important;
                    transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add all ripples to body
        document.body.appendChild(ripple1);
        document.body.appendChild(ripple2);
        document.body.appendChild(ripple3);
        
        // Reset button and clean up with longer duration
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
        
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
            // Clean up all ripples
            [ripple1, ripple2, ripple3].forEach(ripple => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            });
        }, 1400);
    });
    
    console.log('Dark mode initialization complete');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing dark mode');
    initDarkMode();
    
    // Add test functions to window
    window.testDark = function() {
        document.body.classList.add('dark-mode');
        console.log('Dark mode forced ON');
    };
    
    window.testLight = function() {
        document.body.classList.remove('dark-mode');
        console.log('Light mode forced ON');
    };
    
    window.testToggle = function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        console.log('Toggled to:', isDark ? 'dark' : 'light');
    };
    
    console.log('Test functions available: testDark(), testLight(), testToggle()');
});