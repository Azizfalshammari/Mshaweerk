// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-gBh24IReYlUw0lQ0Og76IbJmZpt5nHk",
  authDomain: "jdwallha.firebaseapp.com",
  projectId: "jdwallha",
  storageBucket: "jdwallha.appspot.com",
  messagingSenderId: "691169769976",
  appId: "1:691169769976:web:4a251540f379ff01a6be0d",
  measurementId: "G-MT4ME2RNTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);