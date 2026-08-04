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

    // Dynamic Resume Download Filename logic
    const downloadBtn = document.getElementById('download-resume-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' });
            const dynamicFileName = `Mahesh Morde_Software Engineer_9766228503_${day}_${month}.pdf`;
            
            const fileUrl = downloadBtn.getAttribute('href');
            
            try {
                // Fetch the file as a Blob to force download
                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                const blob = await response.blob();
                
                // Create object URL and temporary anchor
                const blobUrl = window.URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.href = blobUrl;
                tempLink.download = dynamicFileName;
                document.body.appendChild(tempLink);
                tempLink.click();
                
                // Cleanup
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error('Download failed, falling back to standard link:', error);
                // Fallback for local file:// testing where fetch might fail due to CORS
                const tempLink = document.createElement('a');
                tempLink.href = fileUrl;
                tempLink.download = dynamicFileName;
                tempLink.target = '_blank';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            }
        });
    }
});
