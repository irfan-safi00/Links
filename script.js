/**
 * Irfan Safi Portfolio - Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LIVE SYSTEM CLOCK ---
    const startClock = () => {
        const clockEl = document.getElementById('clock');
        if (!clockEl) return;
        
        setInterval(() => {
            const now = new Date();
            // Format: HH:MM:SS (24-hour)
            clockEl.innerText = now.toLocaleTimeString('en-GB');
        }, 1000);
    };

    // --- 2. BIRTHDAY COUNTDOWN (JULY 28) ---
    const updateBirthday = () => {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('mins');
        
        if (!daysEl) return;

        const now = new Date();
        const currentYear = now.getFullYear();
        
        // Target: July 28 (Month is 0-indexed, so 6 = July)
        let bday = new Date(currentYear, 6, 28);

        // If today is past July 28, target next year
        if (now > bday) {
            bday.setFullYear(currentYear + 1);
        }

        const diff = bday - now;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);

        // Update DOM with smooth leading zeros
        daysEl.innerText = d.toString().padStart(2, '0');
        hoursEl.innerText = h.toString().padStart(2, '0');
        minsEl.innerText = m.toString().padStart(2, '0');
    };

    // --- 3. THEME CONTROLLER ---
    window.setTheme = (theme) => {
        // Set attribute for CSS targeting
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update UI Button active states
        document.querySelectorAll('.t-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 'white' maps to the lime button in our UI
        const targetBtnClass = (theme === 'white') ? '.lime' : `.${theme}`;
        const activeBtn = document.querySelector(targetBtnClass);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Save to local storage for persistence
        localStorage.setItem('hub-theme-pref', theme);
    };

    // --- 4. EMAIL COPY TOOL ---
    window.copyEmail = () => {
        const email = "safi22744@gmail.com";
        const status = document.getElementById('copy-status');
        const text = document.getElementById('email-text');

        navigator.clipboard.writeText(email).then(() => {
            // UI Feedback
            text.innerText = email;
            status.style.opacity = "1";
            
            // Revert back after 2 seconds
            setTimeout(() => {
                status.style.opacity = "0";
                text.innerText = "Click to Copy";
            }, 2000);
        }).catch(err => {
            console.error('Could not copy email: ', err);
        });
    };

    // --- 5. MOUSE SPOTLIGHT INTERACTION ---
    const initSpotlight = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                // Calculate cursor position relative to each card
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    // --- 6. INITIALIZATION ---
    startClock();
    updateBirthday();
    initSpotlight();

    // Check for saved theme or default to white (Lime)
    const savedTheme = localStorage.getItem('hub-theme-pref') || 'white';
    setTheme(savedTheme);

    // Refresh countdown every minute to stay accurate
    setInterval(updateBirthday, 60000);

});
