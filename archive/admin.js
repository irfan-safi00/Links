import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCV3oHW4Y2c_fIrkiG41p0s4x5sISn8lIg",
  authDomain: "archive-site-2026.firebaseapp.com",
  projectId: "archive-site-2026",
  storageBucket: "archive-site-2026.firebasestorage.app",
  appId: "1:185594379425:web:c5a1cbb20ab3f3ee8c84e0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Password login
const SECRET = "mypassword123";
window.login = function() {
  const pass = document.getElementById('secretPassword').value;
  if (pass === SECRET) {
    document.getElementById('login').style.display = "none";
    document.getElementById('adminPanel').style.display = "block";
  } else {
    alert("Wrong password!");
  }
}

// Upload project (Firestore only, with external image URL)
window.uploadProject = async function() {
  const title = document.getElementById('projectTitle').value;
  const desc = document.getElementById('projectDesc').value;
  const image = document.getElementById('projectImage').value; // URL
  const link = document.getElementById('projectLink').value;

  if (!title || !image) return alert("Title and Image URL are required!");

  await addDoc(collection(db, "projects"), {
    title: title,
    description: desc,
    image: image,
    link: link
  });

  alert("Project uploaded!");
  location.reload(); // refresh page to show new project
}
