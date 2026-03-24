var r = document.querySelector(':root');

function myFunction_get(propertyName) {
    var rs = getComputedStyle(r);
    return rs.getPropertyValue(propertyName);
}

function toggleTheme() {
    var toggleSwitch = document.querySelector('.togglesw');
    const root = document.documentElement;

    if (toggleSwitch.checked) {
        root.style.setProperty('--mainTextColor', 'var(--mainTextColor-light)');
        root.style.setProperty('--secondaryTextColor', 'var(--secondaryTextColor-light)');
        root.style.setProperty('--mainLinkColor', 'var(--mainLinkColor-light)');
        root.style.setProperty('--mainBorderColor', 'var(--mainBorderColor-light)');
        root.style.setProperty('--mainBgColor', 'var(--mainBgColor-light)');
        root.style.setProperty('--cardBgColor', 'var(--cardBgColor-light)');
        root.style.setProperty('--accentColor', 'var(--accentColor-light)');
        root.style.setProperty('--glass-border', 'var(--glass-border-light)');
        root.style.setProperty('--glow-color', 'var(--glow-color-light)');
    } else {
        root.style.setProperty('--mainTextColor', 'var(--mainTextColor-dark)');
        root.style.setProperty('--secondaryTextColor', 'var(--secondaryTextColor-dark)');
        root.style.setProperty('--mainLinkColor', 'var(--mainLinkColor-dark)');
        root.style.setProperty('--mainBorderColor', 'var(--mainBorderColor-dark)');
        root.style.setProperty('--mainBgColor', 'var(--mainBgColor-dark)');
        root.style.setProperty('--cardBgColor', 'var(--cardBgColor-dark)');
        root.style.setProperty('--accentColor', 'var(--accentColor-dark)');
        root.style.setProperty('--glass-border', 'var(--glass-border-dark)');
        root.style.setProperty('--glow-color', 'var(--glow-color-dark)');
    }
    // Update canvas if it exists
    if (typeof updateParticlesTheme === 'function') {
        // slight delay to allow CSS transition to update the computed value
        setTimeout(updateParticlesTheme, 100);
    }
}

// Initial theme setting
toggleTheme();

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                if (entry.target.classList.contains('card--techstack') ||
                    entry.target.classList.contains('mini-project-card') ||
                    entry.target.classList.contains('interest-item') ||
                    entry.target.classList.contains('skill-category')) {
                    const delay = index * 50;
                    entry.target.style.transitionDelay = `${delay}ms`;

                    // Clean up delay after animation so hover effects are snappy
                    setTimeout(() => {
                        entry.target.style.transitionDelay = '0s';
                    }, 1000 + delay);
                }

                entry.target.classList.add('show-section');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-section');
    hiddenElements.forEach((el) => observer.observe(el));
}

// Typing Effect
function initTypingEffect() {
    const typedTextSpan = document.querySelector("#typing-text");
    const cursorSpan = document.querySelector(".typing-cursor");

    if (!typedTextSpan) return;

    const textArray = ["Software Engineer", "Front End Engineer", "Angular Specialist"];
    const typingDelay = 100;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// Antigravity Canvas Animation
let particles = [];
let ctx;
let canvas;
let animationId;
let particleColor = 'rgba(79, 70, 229, 0.5)'; // Default
let mouse = { x: null, y: null };

function initCanvasAnimation() {
    canvas = document.getElementById('antigravity-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Clear mouse position on mouse leave to stop interaction effect
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    updateParticlesTheme();
    initParticles();
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Re-init on resize to maintain density
}

function updateParticlesTheme() {
    // Get the computed color of the accent color from CSS
    const computedStyle = getComputedStyle(document.documentElement);
    // Use the raw variable if possible, or query a representative element
    // Here we try to get the resolved value of --accentColor
    // We can't get raw var value easily from JS if it's set on :root in a rule, 
    // but getComputedStyle(document.documentElement).getPropertyValue('--accentColor') works
    const accent = computedStyle.getPropertyValue('--accentColor').trim();
    if (accent) {
        // Convert hex/rgb to rgba for transparency if needed, or just use it
        particleColor = accent;
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Size between 0.5 and 2.5
        this.speedX = (Math.random() * 1 - 0.5) * 0.5; // Slow horizontal drift
        this.speedY = Math.random() * 1 + 0.2; // Upward speed between 0.2 and 1.2

        // Random opacity for twinkling effect
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.y -= this.speedY; // Move Up (Antigravity)
        this.x += this.speedX;

        // Reset if out of bounds (top)
        if (this.y < 0) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }

        // Mouse Interaction - Repulsion
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * 2; // Repulsion strength
                const directionY = forceDirectionY * force * 2;

                this.x -= directionX;
                this.y -= directionY;
            }
        }
    }

    draw() {
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset
    }
}

function initParticles() {
    particles = [];
    const numberOfParticles = (canvas.width * canvas.height) / 9000; // Density
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    // Connect particles with lines if close and in range of mouse (optional, creating constellations)
    connectParticles();

    animationId = requestAnimationFrame(animate);
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

            // Only connect if they are close AND close to mouse (to avoid clutter)
            if (distance < (canvas.width / 7) * (canvas.height / 7) && distance < 6000) {
                // Further filter by mouse proximity for a cool effect
                // let mouseDist = Math.hypot(particles[a].x - mouse.x, particles[a].y - mouse.y);
                // if(mouse.x && mouseDist < 150) ...

                opacityValue = 1 - (distance / 6000);
                ctx.strokeStyle = particleColor;
                ctx.globalAlpha = opacityValue * 0.2; // Very subtle lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initTypingEffect();
    initCanvasAnimation();
});
