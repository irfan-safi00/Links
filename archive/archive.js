import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV3oHW4Y2c_fIrkiG41p0s4x5sISn8lIg",
  authDomain: "archive-site-2026.firebaseapp.com",
  projectId: "archive-site-2026",
  storageBucket: "archive-site-2026.firebasestorage.app",
  messagingSenderId: "185594379425",
  appId: "1:185594379425:web:c5a1cbb20ab3f3ee8c84e0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("archive-container");

async function loadProjects() {
  const snap = await getDocs(collection(db, "projects"));

  snap.forEach(doc => {
    const p = doc.data();

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 16 16" fill="#4a90e2">
        <path d="M8 0a5 5 0 0 1 5 5v2h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V5a5 5 0 0 1 5-5z"/>
      </svg>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">Open</a>
    `;
    container.appendChild(card);
  });
}

loadProjects();
