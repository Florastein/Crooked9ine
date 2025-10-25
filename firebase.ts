// Import the functions you need from the SDKs you need
// FIX: The import from 'firebase/app' with Firebase v9+ doesn't have a default export for the namespaced API. Using 'firebase/compat/app' provides compatibility for the v8 syntax used below.
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// FIX: Used the firebase object from the default import to call initializeApp, which is the correct syntax for Firebase v8.
const app = firebase.initializeApp(firebaseConfig);