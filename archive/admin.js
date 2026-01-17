import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// Simple password login
const SECRET = "mypassword123"; // Change this
window.login = function(){
  const pass = document.getElementById('secretPassword').value;
  if(pass === SECRET){
    document.getElementById('login').style.display = "none";
    document.getElementById('adminPanel').style.display = "block";
  } else {
    alert("Wrong password!");
  }
}

// Upload project
window.uploadProject = async function(){
  const file = document.getElementById('projectImage').files[0];
  const title = document.getElementById('projectTitle').value;
  const desc = document.getElementById('projectDesc').value;
  const link = document.getElementById('projectLink').value;

  if(!file || !title) return alert("Image and title are required!");

  const storageRef = ref(storage, 'projects/' + file.name);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "projects"), {
    title: title,
    description: desc,
    image: url,
    link: link
  });

  alert("Project uploaded!");
  location.reload();
}
