document.addEventListener('DOMContentLoaded', () => {
    
    // 1. THEME SWITCHER LOGIC
    window.setTheme = (themeName) => {
        // Apply theme to the root element
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Update button UI (active state)
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.classList.contains(themeName));
        });

        // Save to local storage for persistence
        localStorage.setItem('selectedTheme', themeName);
    };

    // Load saved theme on startup
    const savedTheme = localStorage.getItem('selectedTheme') || 'white';
    setTheme(savedTheme);


    // 2. MOUSE SPOTLIGHT EFFECT
    // Updates CSS variables for the radial gradient glow in the cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    // 3. REAL-TIME CLOCK
    const updateTime = () => {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            });
            timeDisplay.textContent = timeString;
        }
    };

    setInterval(updateTime, 1000);
    updateTime(); // Initial call


    // 4. MAGNETIC SOCIAL BUTTONS
    const socialLinks = document.querySelectorAll('.social');
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = `translate(0px, 0px)`;
        });
    });

    console.log("🚀 Portfolio Engine Initialized. Theme: " + savedTheme);
});
