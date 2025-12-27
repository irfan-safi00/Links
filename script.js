document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME ENGINE ---
    // Handles switching between White (Lime), Red, and Purple themes
    window.setTheme = (themeName) => {
        // Apply theme attribute to HTML tag
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Update Theme Button UI
        document.querySelectorAll('.theme-btn').forEach(btn => {
            if (btn.classList.contains(themeName)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Save preference so it persists on refresh
        localStorage.setItem('selectedTheme', themeName);
    };

    // Initialize theme from local storage or default to 'white'
    const savedTheme = localStorage.getItem('selectedTheme') || 'white';
    setTheme(savedTheme);


    // --- 2. DYNAMIC MOUSE GLOW ---
    // Tracks mouse position inside cards for the interactive spotlight effect
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set CSS variables that the CSS file uses for the radial gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    // --- 3. LIVE CLOCK ---
    // Updates the clock every second to show your local time
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
    updateTime(); // Initial run


    // --- 4. MAGNETIC INTERACTION ---
    // Adds a physical "pull" effect to clickable links
    const interactiveElements = document.querySelectorAll('.social, .discord-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            // Calculate distance from center of the button
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Apply transform (move 20% toward the mouse)
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        // Reset position when mouse leaves
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });

    console.log("🚀 Irfan Safi's Portfolio Engine Loaded Successfully.");
});
