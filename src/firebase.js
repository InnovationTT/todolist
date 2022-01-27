// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT_xRrprOaZ7o_pIWzme7sHeF0N46pChI",
  authDomain: "to-do-list-63889.firebaseapp.com",
  projectId: "to-do-list-63889",
  storageBucket: "to-do-list-63889.appspot.com",
  messagingSenderId: "176575494191",
  appId: "1:176575494191:web:f722a5fc5cae4b0c1beeda"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = app.auth();