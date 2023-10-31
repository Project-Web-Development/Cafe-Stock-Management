// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFO8tGara8j9QlVkTfCM0_9v1LkbrCTP0",
  authDomain: "cafestockmanagement-18230.firebaseapp.com",
  projectId: "cafestockmanagement-18230",
  storageBucket: "cafestockmanagement-18230.appspot.com",
  messagingSenderId: "381806502961",
  appId: "1:381806502961:web:ff28fe55b3f0f21d036110",
  measurementId: "G-HR9EC9KQ41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
export {auth,provider,db};