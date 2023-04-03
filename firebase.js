// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx5-3JtIgmedp4qRBwydjHwhQ43JDYfAA",
  authDomain: "trackpal-dfe9d.firebaseapp.com",
  projectId: "trackpal-dfe9d",
  storageBucket: "trackpal-dfe9d.appspot.com",
  messagingSenderId: "1002347108110",
  appId: "1:1002347108110:web:98ba2769f7c4b90ee0e95f",
  measurementId: "G-QE3C2YN4WK"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else { 
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };