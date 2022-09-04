// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2oK9hi2_nqoltRQe38k3Bl3Ji2TSkNcc",
  authDomain: "studentsprofiler-c8413.firebaseapp.com",
  projectId: "studentsprofiler-c8413",
  storageBucket: "studentsprofiler-c8413.appspot.com",
  messagingSenderId: "620029170729",
  appId: "1:620029170729:web:314bd8b60ac4b11e78f838",
  measurementId: "G-W3WJ8RBMNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(); 