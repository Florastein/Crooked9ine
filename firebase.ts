// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoe0wIOJPych6xsfY2gvBcG41hBVeTMt8",
  authDomain: "crooked9ine.firebaseapp.com",
  projectId: "crooked9ine",
  storageBucket: "crooked9ine.firebasestorage.app",
  messagingSenderId: "794348465601",
  appId: "1:794348465601:web:7688f1ad5669f0bf039340",
  measurementId: "G-H0JTKS5DVC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
