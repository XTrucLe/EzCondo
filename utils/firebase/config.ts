// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_HRZ2jQ7xLKmSE4z-cKsfxkzjdDKxZwI",
  authDomain: "ezcondo-73fc4.firebaseapp.com",
  databaseURL:
    "https://ezcondo-73fc4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ezcondo-73fc4",
  storageBucket: "ezcondo-73fc4.firebasestorage.app",
  messagingSenderId: "899090682451",
  appId: "1:899090682451:web:84c9e645445cac1e666ca6",
  measurementId: "G-Y723H51DYN",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
