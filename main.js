import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbdJpxGUjqMIRlUGshKJW9bOG1KzEIELk",
  authDomain: "test-ad597.firebaseapp.com",
  projectId: "test-ad597",
  storageBucket: "test-ad597.appspot.com",
  messagingSenderId: "606337331667",
  appId: "1:606337331667:web:ff531a29c9b075624aff26",
};

// Initialize Firebase
//꼭! (app)을 해야 한다
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbRef = ref(getDatabase(app));

document.getElementById("signOut").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Sign out successful! Redirecting to login/signup page.");
      location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});

//Manage user 아래 있는 코드. 요기서는 user가 sign in되 있는지 확인하고 uid를 저장한다
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...

    console.log(uid);

    //get() function을 사용해서 realtime database에 저장된 유저네임을 읽는다.
    get(child(dbRef, `users/` + uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const username = snapshot.val().username;
          document.getElementById("name").innerHTML = "Hello, " + username;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // User is signed out
    // ...
  }
});
