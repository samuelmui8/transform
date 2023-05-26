// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTVoQft1EBoNl86i5LQRo7xs8yEcqZbqw",
    authDomain: "transform-c9def.firebaseapp.com",
    projectId: "transform-c9def",
    storageBucket: "transform-c9def.appspot.com",
    messagingSenderId: "1003111085865",
    appId: "1:1003111085865:web:8ff3f21a2f2aafde43a938",
    measurementId: "G-8CRRQKR6ZN"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);