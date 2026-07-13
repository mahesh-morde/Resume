// Theme Toggle Logic
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Set initial theme based on user preference or localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const toggleSwitch = document.querySelector('.togglesw');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (toggleSwitch) toggleSwitch.checked = true;
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (toggleSwitch) toggleSwitch.checked = false;
    }

    // Initialize typing effect
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const textToType = typingTextElement.innerText;
        typingTextElement.innerText = '';
        let charIndex = 0;
        
        function type() {
            if (charIndex < textToType.length) {
                typingTextElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50); // Typing speed
            }
        }
        setTimeout(type, 500); // Initial delay
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenSections = document.querySelectorAll('.hidden-section');
    hiddenSections.forEach(section => {
        observer.observe(section);
    });

    // Scroll to Top Button Logic
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
