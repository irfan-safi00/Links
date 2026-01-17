import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// 🔹 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCV3oHW4Y2c_fIrkiG41p0s4x5sISn8lIg",
  authDomain: "archive-site-2026.firebaseapp.com",
  projectId: "archive-site-2026",
  storageBucket: "archive-site-2026.firebasestorage.app",
  messagingSenderId: "185594379425",
  appId: "1:185594379425:web:c5a1cbb20ab3f3ee8c84e0",
  measurementId: "G-RVS1D9H6F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get container
const container = document.getElementById('archive-container');

// Load projects from Firestore
async function loadProjects() {
  const snapshot = await getDocs(collection(db, "projects"));
  snapshot.forEach(docSnap => {
    const project = docSnap.data();

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <!-- SVG Icon at the top -->
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4a90e2" viewBox="0 0 16 16">
        <path d="M8 0a5 5 0 0 1 5 5v2h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V5a5 5 0 0 1 5-5zM6 5v2h4V5a2 2 0 0 0-4 0z"/>
      </svg>

      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">Visit Link</a>
    `;
    container.appendChild(card);
  });
}

// Run
loadProjects();
