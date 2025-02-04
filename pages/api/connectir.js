// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb4kLy0U4Yee3RwlmJESqhVpZHHOLJhLU",
  authDomain: "ecommerce-website-b3b5d.firebaseapp.com",
  projectId: "ecommerce-website-b3b5d",
  storageBucket: "ecommerce-website-b3b5d.firebasestorage.app",
  messagingSenderId: "175607191638",
  appId: "1:175607191638:web:2646d07b0253b27f8903f7",
  measurementId: "G-HJBG92QVJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);