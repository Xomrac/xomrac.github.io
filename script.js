// Form submission handler
document.getElementById('ideaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const idea = document.getElementById('idea').value;

    if (nome && cognome && idea) {
        // Simulate form submission
        alert(`Grazie ${nome} ${cognome}! La tua idea è stata inviata con successo.`);

        // Reset form with smooth animation
        this.reset();

        // Optional: Add a success message animation
        showSuccessMessage();
    }
});

// Success message function
function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const originalBorder = formContainer.style.border;

    // Add success styling
    formContainer.style.border = '3px solid #4CAF50';
    formContainer.style.transition = 'border 0.3s ease';

    // Remove success styling after 3 seconds
    setTimeout(() => {
        formContainer.style.border = originalBorder;
    }, 3000);
}

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');

    reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('revealed');
        }
    });
}

// Add event listener for scroll
window.addEventListener('scroll', revealOnScroll);

// Initial check on page load
document.addEventListener('DOMContentLoaded', function () {
    revealOnScroll();
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach((input) => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Portfolio cards hover effects
document.querySelectorAll('.portfolio-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to form placeholders
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.placeholder = '';

    function type() {
        if (i < text.length) {
            element.placeholder += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', function () {
    const textArea = document.getElementById('idea');
    setTimeout(() => {
        typeEffect(textArea, 'Condividi la tua proposta per migliorare la nostra comunità...', 50);
    }, 1000);
});

// Add click animation to submit button
document.querySelector('.submit-btn').addEventListener('click', function (e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';

    this.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
