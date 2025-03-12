// Import the necessary Firebase functions
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb4Yee3RwlmJESqhVpZHHOLJhLU",
  authDomain: "ecommerce-website-b3b5d.firebaseapp.com",
  projectId: "ecommerce-website-b3b5d",
  storageBucket: "ecommerce-website-b3b5d.appspot.com",
  messagingSenderId: "175607191638",
  appId: "1:175607191638:web:2646d07b0253b27f8903f7",
  measurementId: "G-HJBG92QVJT"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("User Info:", user);
    return user;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export { db, auth, signInWithGoogle };
