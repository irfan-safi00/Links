import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  appId: "YOUR_APP_ID"
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
