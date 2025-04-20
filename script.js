document.addEventListener('DOMContentLoaded', () => {
    // Existing menu code
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Prevent menu from staying open when resizing window
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Image lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => {
                        img.parentElement.classList.add('loaded');
                    };
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Performance optimizations
    const debouncedResize = debounce(() => {
        // Handle resize events
    }, 250);

    window.addEventListener('resize', debouncedResize);

    // Get the current page URL
    const currentUrl = window.location.href;
    const pageTitle = document.title;
    
    // Update all sharing links with current URL
    const shareButtons = document.querySelectorAll('.share-btn[href]');
    shareButtons.forEach(button => {
        let href = button.href;
        href = href.replace('ARTICLE_URL', encodeURIComponent(currentUrl));
        href = href.replace('ARTICLE_TITLE', encodeURIComponent(pageTitle));
        button.href = href;
    });
});

// Utility function for debouncing
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
