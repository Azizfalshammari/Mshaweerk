import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-gBh24IReYlUw0lQ0Og76IbJmZpt5nHk",
  authDomain: "jdwallha.firebaseapp.com",
  projectId: "jdwallha",
  storageBucket: "jdwallha.appspot.com",
  messagingSenderId: "691169769976",
  appId: "1:691169769976:web:4a251540f379ff01a6be0d",
  measurementId: "G-MT4ME2RNTK"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const datastore = getFirestore(app);

export {app}