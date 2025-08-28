// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
});

// Add smooth scrolling to document
document.documentElement.style.scrollBehavior = 'smooth';

// Card hover effects
document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline item hover effects
document.querySelectorAll('.timeline-item').forEach((item) => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Button click animations with ripple effect
document.querySelectorAll('.cta-button, .contest-cta').forEach((button) => {
    button.addEventListener('click', function (e) {
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

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add interactive effects to email links
document.querySelectorAll('.email-link').forEach((link) => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Add subtle animation to section titles
document.querySelectorAll('.section-title').forEach((title) => {
    title.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });

    title.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Add click animation to contact items
document.querySelectorAll('.contact-item').forEach((item) => {
    item.addEventListener('click', function () {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';

        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Add floating animation to contest section emoji
document.addEventListener('DOMContentLoaded', function () {
    const contestSection = document.querySelector('.contest-section');
    if (contestSection) {
        contestSection.addEventListener('mouseenter', function () {
            const emoji = this.querySelector('::before');
            this.style.setProperty('--emoji-animation', 'float 2s ease-in-out infinite');
        });
    }
});

// Add CSS animation for floating effect
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
    }
`;
document.head.appendChild(floatingStyle);

// --- Idea form: char counter + submit to Supabase ---
// --- Idea form: char counter + submit to Supabase ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('idea-form');
    const textarea = document.getElementById('idea-text');
    const feedback = document.getElementById('idea-feedback');
    const counter = document.getElementById('char-count');
    const submitBtn = form?.querySelector('button[type="submit"]');
    const MAX = parseInt(textarea?.getAttribute('maxlength') || '500', 10);

    // --- UI helpers ---
    const updateCount = () => {
        if (textarea && counter) counter.textContent = `${textarea.value.length}/${MAX}`;
    };

    const setState = (state, msg = '') => {
        if (!feedback) return;
        feedback.textContent = msg;

        // visibile sulla hero rossa
        feedback.style.color = '#fff';
        feedback.style.background = state === 'error' ? 'rgba(255,255,255,0.10)' : 'transparent';
        feedback.style.border = state === 'error' ? '1px solid rgba(255,255,255,0.35)' : 'none';
        feedback.style.padding = msg ? '8px 12px' : '0';
        feedback.style.borderRadius = '10px';
        feedback.style.fontWeight = state === 'error' ? '700' : '500';
    };

    const lockUI = (lock = true) => {
        if (!submitBtn) return;
        submitBtn.disabled = lock;
        submitBtn.style.opacity = lock ? '0.7' : '1';
        submitBtn.style.cursor = lock ? 'not-allowed' : 'pointer';
    };

    // --- init counter ---
    textarea?.addEventListener('input', updateCount);
    updateCount();
    if (!form) return;

    // --- submit handler ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idea = (textarea?.value || '').trim();
        if (!idea) {
            setState('error', 'Scrivi la tua idea prima di inviare.');
            textarea?.focus();
            return;
        }
        if (idea.length > MAX) {
            setState('error', `Hai superato il limite di ${MAX} caratteri.`);
            return;
        }

        if (!window.supabaseClient) {
            setState(
                'error',
                'Invio non configurato: inserisci URL e ANON KEY di Supabase in index.html.'
            );
            return;
        }

        lockUI(true);
        setState('info', 'Invio in corso…');

        try {
            const payload = { idea_text: idea, source: 'website' };

            const { data, error } = await window.supabaseClient
                .from(window.SUPABASE_TABLE || 'ideas')
                .insert(payload)
                .select()
                .single();

            if (error) throw error;

            setState('success', 'Grazie! La tua proposta è stata inviata 🙌');
            form.reset();
            updateCount();

            // micro-animazione di conferma
            form.animate(
                [
                    { transform: 'scale(1.0)' },
                    { transform: 'scale(1.01)' },
                    { transform: 'scale(1.0)' },
                ],
                { duration: 300, easing: 'ease-out' }
            );
        } catch (err) {
            console.error(err);
            setState('error', 'Ops! Qualcosa è andato storto. Riprova tra poco.');
        } finally {
            lockUI(false);
        }
    });
});
