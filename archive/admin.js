import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV3oHW4Y2c_fIrkiG41p0s4x5sISn8lIg",
  authDomain: "archive-site-2026.firebaseapp.com",
  projectId: "archive-site-2026",
  storageBucket: "archive-site-2026.firebasestorage.app",
  messagingSenderId: "185594379425",
  appId: "1:185594379425:web:c5a1cbb20ab3f3ee8c84e0",
  measurementId: "G-RVS1D9H6F2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SECRET = "mypassword123";
window.login = function() {
  const pass = document.getElementById('secretPassword').value;
  if(pass === SECRET){
    document.getElementById('login').style.display = "none";
    document.getElementById('adminPanel').style.display = "block";
    loadProjects();
  } else alert("Wrong password!");
}

// Add new project
window.uploadProject = async function(){
  const title = document.getElementById('projectTitle').value;
  const description = document.getElementById('projectDesc').value;
  const link = document.getElementById('projectLink').value;

  if(!title) return alert("Title is required!");

  await addDoc(collection(db, "projects"), {
    title, description, link
  });

  alert("Project added!");
  loadProjects();
}

// Load projects for admin panel
async function loadProjects(){
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = "";
  const snapshot = await getDocs(collection(db, "projects"));
  snapshot.forEach(docSnap => {
    const project = docSnap.data();
    const id = docSnap.id;
    const div = document.createElement('div');
    div.classList.add('admin-card');
    div.innerHTML = `
      <strong>${project.title}</strong> - ${project.description}
      <br><a href="${project.link}" target="_blank">${project.link}</a>
      <br>
      <button onclick="editProject('${id}')">Edit</button>
      <button onclick="deleteProject('${id}')">Delete</button>
      <hr>
    `;
    projectList.appendChild(div);
  });
}

// Delete project
window.deleteProject = async function(id){
  if(confirm("Are you sure you want to delete this project?")){
    await deleteDoc(doc(db, "projects", id));
    alert("Project deleted!");
    loadProjects();
  }
}

// Edit project (simple prompt version)
window.editProject = async function(id){
  const docRef = doc(db, "projects", id);
  const snapshot = await docRef.get();
  const project = snapshot.data();

  const newTitle = prompt("Title:", project.title) || project.title;
  const newDesc = prompt("Description:", project.description) || project.description;
  const newLink = prompt("Link:", project.link) || project.link;

  await updateDoc(docRef, {
    title: newTitle,
    description: newDesc,
    link: newLink
  });

  alert("Project updated!");
  loadProjects();
}
