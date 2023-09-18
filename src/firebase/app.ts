// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfjEjjrjveLMA7RJ5ZFCNbPb-uRj7yowc",
  authDomain: "tech-test-d20d3.firebaseapp.com",
  projectId: "tech-test-d20d3",
  storageBucket: "tech-test-d20d3.appspot.com",
  messagingSenderId: "736950068759",
  appId: "1:736950068759:web:5d1f7fc813e83d4738de52",
  measurementId: "G-E617J6E1T4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
