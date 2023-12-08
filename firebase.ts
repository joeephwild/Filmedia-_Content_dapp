// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzyjmvOidwYlnJeDHTRdV2vgL0LCAGP5Y",
  authDomain: "filmedia-4f70f.firebaseapp.com",
  projectId: "filmedia-4f70f",
  storageBucket: "filmedia-4f70f.appspot.com",
  messagingSenderId: "133122974585",
  appId: "1:133122974585:web:eee84225cbc5c5b4b2c5a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
