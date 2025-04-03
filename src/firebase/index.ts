// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLwGPkuL-Z7QqbbmX3o-Z3fKbKY1BTV_4",
  authDomain: "geo-bim-app.firebaseapp.com",
  projectId: "geo-bim-app",
  storageBucket: "geo-bim-app.firebasestorage.app",
  messagingSenderId: "1095727267816",
  appId: "1:1095727267816:web:1fefa0c5c282b2866f6e5d",
  measurementId: "G-E4X84NXLVM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
