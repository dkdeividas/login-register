// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, update, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //write your data
    apiKey: "AIzaSyD8iY8wXLzbLjCoUVjbSjmdiAJ5C4K2clA",
  authDomain: "login-register-575c5.firebaseapp.com",
  databaseURL: "https://login-register-575c5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "login-register-575c5",
  storageBucket: "login-register-575c5.appspot.com",
  messagingSenderId: "560462468124",
  appId: "1:560462468124:web:87035c08f1d69900cf3bd9"
};

// Initialize Firebase, database, authentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//new user registration
const registerNewUser = () => {
    const register_username = document.getElementById('register_username').value;
    const register_email = document.getElementById('register_email').value;
    const register_password = document.getElementById('register_password').value;

    createUserWithEmailAndPassword(auth, register_email, register_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                user_email: register_email,
                user_username: register_username,
                role: "user_simple"
            });
            console.log('New User created!')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
document.getElementById('signUp').addEventListener('click', registerNewUser);

//Login existing User
const loginUser = () => {
    const login_email = document.getElementById('login_email').value;
    const login_password = document.getElementById('login_password').value;

    signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const loginTime = new Date()
            update(ref(database, 'users/' + user.uid), {
                last_login: loginTime

            });
            // console.log(user, "Login successful!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
document.getElementById('signIn').addEventListener('click', loginUser);

//geting signed-in user
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        for (let element of document.getElementsByClassName("left")){
            element.style.display="none";
         }
         document.getElementById("signIn").style.display = "none"
         
        console.log("user logged in: ", user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //write your code what user can do 
        //or what kind of functionalities can see when he is login

        // dar vienas if tikrinant roles
        // sujungti su CRUD projektu
        const uid = user.uid;
        // ...
    } else {
        console.log("user logged out");
        // User is signed out
        // rodyti register ir login mygtukus, formas
    }
});

//sign-out
document.getElementById('signOut').addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert('Sign-out successful!')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
})