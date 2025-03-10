import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Frontend Firebase Config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDSzDQS9CYu9bkVT3F3zqsb31SSI7-GE1k",
  authDomain: "job-application-pipeline-e0da9.firebaseapp.com",
  projectId: "job-application-pipeline-e0da9",
  storageBucket: "job-application-pipeline-e0da9.appspot.com",
  messagingSenderId: "312729171061",
  appId: "1:312729171061:web:4e26cca632bb6460a7f43c",
  measurementId: "G-9JC2XKP3S3"
};

// Initialize Firebase Client SDK
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db};


