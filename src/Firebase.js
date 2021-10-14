// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNeVXE68MHUOgiGmJMHI7UNHVBENaHfs4",
  authDomain: "october12-4f6a7.firebaseapp.com",
  projectId: "october12-4f6a7",
  storageBucket: "october12-4f6a7.appspot.com",
  messagingSenderId: "126905408430",
  appId: "1:126905408430:web:f4e343543414f9af93063f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const firestore = getFirestore(app)