// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuHhFxXmDVzlBXR0f21SXfmUubaHHg_iE",
  authDomain: "crud-colaboradores-61ee6.firebaseapp.com",
  projectId: "crud-colaboradores-61ee6",
  storageBucket: "crud-colaboradores-61ee6.appspot.com",
  messagingSenderId: "510934628566",
  appId: "1:510934628566:web:4e72f7d5f0d9e317337177"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app