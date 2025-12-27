document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME & CUSTOM COLOR ENGINE ---
    window.setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Reset custom properties if switching to a preset
        if (theme !== 'custom') {
            document.documentElement.style.removeProperty('--accent');
            document.documentElement.style.removeProperty('--accent-glow');
        }
        
        // Manage active button UI
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.classList.contains(theme));
        });
        
        localStorage.setItem('user-theme', theme);
    };

    window.applyCustom = (hex) => {
        document.documentElement.setAttribute('data-theme', 'custom');
        document.documentElement.style.setProperty('--accent', hex);
        
        // Convert Hex to RGBA for the glow effect
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.2)`);
        
        localStorage.setItem('user-theme', 'custom');
        localStorage.setItem('custom-hex', hex);
    };

    // --- 2. LIVE CLOCK ---
    const updateClock = () => {
        const clockEl = document.getElementById('clock');
        if (clockEl) {
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
        }
    };
    setInterval(updateClock, 1000);
    updateClock();

    // --- 3. INTERACTIVE CARDS (Spotlight Effect) ---
    // This tracks the mouse to create a glowing highlight on the cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 4. AVATAR INTERACTION ---
    const avatar = document.querySelector('.avatar-img');
    const bubble = document.querySelector('.speech-bubble');
    
    if (avatar) {
        // Simple "Pop" effect when the user hovers the avatar
        avatar.addEventListener('mouseenter', () => {
            bubble.style.transform = 'scale(1.2) rotate(5deg)';
            bubble.textContent = 'Yo!';
        });
        
        avatar.addEventListener('mouseleave', () => {
            bubble.style.transform = 'scale(1) rotate(0deg)';
            bubble.textContent = 'Hey!';
        });
    }

    // --- 5. INITIALIZE SAVED PREFERENCES ---
    const savedTheme = localStorage.getItem('user-theme');
    const savedHex = localStorage.getItem('custom-hex');

    if (savedTheme === 'custom' && savedHex) {
        applyCustom(savedHex);
    } else if (savedTheme) {
        setTheme(savedTheme);
    }

});
