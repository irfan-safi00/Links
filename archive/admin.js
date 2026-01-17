import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV3oHW4Y2c_fIrkiG41p0s4x5sISn8lIg",
  authDomain: "archive-site-2026.firebaseapp.com",
  projectId: "archive-site-2026"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ PASSWORD
const SECRET = "mypassword123";

// ✅ LOGIN (TRIM FIX INCLUDED)
window.login = function () {
  const pass = document.getElementById("secretPassword").value.trim();

  if (pass === SECRET) {
    document.getElementById("login").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadProjects();
  } else {
    alert("Wrong password");
  }
};

// ✅ ADD
window.uploadProject = async function () {
  if (!projectTitle.value.trim()) {
    alert("Title required");
    return;
  }

  await addDoc(collection(db, "projects"), {
    title: projectTitle.value,
    description: projectDesc.value,
    link: projectLink.value
  });

  projectTitle.value = "";
  projectDesc.value = "";
  projectLink.value = "";

  loadProjects();
};

// ✅ LOAD
async function loadProjects() {
  projectList.innerHTML = "";
  const snap = await getDocs(collection(db, "projects"));

  snap.forEach(d => {
    const p = d.data();
    projectList.innerHTML += `
      <div class="admin-card">
        <strong>${p.title}</strong><br>
        <button onclick="editProject('${d.id}')">Edit</button>
        <button onclick="deleteProject('${d.id}')">Delete</button>
      </div>
    `;
  });
}

// ✅ DELETE
window.deleteProject = async function (id) {
  if (confirm("Delete this project?")) {
    await deleteDoc(doc(db, "projects", id));
    loadProjects();
  }
};

// ✅ EDIT (FIXED)
window.editProject = async function (id) {
  const ref = doc(db, "projects", id);
  const snap = await getDoc(ref);
  const p = snap.data();

  const title = prompt("Title", p.title);
  if (!title) return;

  const description = prompt("Description", p.description);
  const link = prompt("Link", p.link);

  await updateDoc(ref, { title, description, link });
  loadProjects();
};
