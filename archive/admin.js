import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs,
  doc, deleteDoc, updateDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV3oHW4Y2c_fIrkiG41p0s4x5sISn8lIg",
  authDomain: "archive-site-2026.firebaseapp.com",
  projectId: "archive-site-2026"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SECRET = "mypassword123";

window.login = () => {
  if (secretPassword.value === SECRET) {
    login.style.display = "none";
    adminPanel.style.display = "block";
    loadProjects();
  } else alert("Wrong password");
};

window.uploadProject = async () => {
  if (!projectTitle.value) return alert("Title required");

  await addDoc(collection(db, "projects"), {
    title: projectTitle.value,
    description: projectDesc.value,
    link: projectLink.value
  });

  projectTitle.value = projectDesc.value = projectLink.value = "";
  loadProjects();
};

async function loadProjects() {
  projectList.innerHTML = "";
  const snap = await getDocs(collection(db, "projects"));

  snap.forEach(d => {
    const p = d.data();
    projectList.innerHTML += `
      <div class="admin-card">
        <strong>${p.title}</strong>
        <button onclick="editProject('${d.id}')">Edit</button>
        <button onclick="deleteProject('${d.id}')">Delete</button>
      </div>
    `;
  });
}

window.deleteProject = async id => {
  if (confirm("Delete?")) {
    await deleteDoc(doc(db, "projects", id));
    loadProjects();
  }
};

window.editProject = async id => {
  const ref = doc(db, "projects", id);
  const snap = await getDoc(ref);
  const p = snap.data();

  const title = prompt("Title", p.title);
  if (!title) return;

  await updateDoc(ref, {
    title,
    description: prompt("Description", p.description),
    link: prompt("Link", p.link)
  });

  loadProjects();
};
