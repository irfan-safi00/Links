import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV3oHW4Y2c_fIrkiG41p0s4x5sISn8lIg",
  authDomain: "archive-site-2026.firebaseapp.com",
  projectId: "archive-site-2026",
  storageBucket: "archive-site-2026.firebasestorage.app",
  appId: "1:185594379425:web:c5a1cbb20ab3f3ee8c84e0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const container = document.getElementById('archive-container');

async function loadProjects() {
  const snapshot = await getDocs(collection(db, "projects"));
  snapshot.forEach(doc => {
    const project = doc.data();
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">View Project</a>
    `;
    container.appendChild(card);
  });
}

loadProjects();
