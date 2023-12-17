// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "culinary-review.firebaseapp.com",
  projectId: "culinary-review",
  storageBucket: "culinary-review.appspot.com",
  messagingSenderId: "944340692675",
  appId: "1:944340692675:web:8fcccb3152263be9713c76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);