// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARMzEW-9RaJ0XCa3pJqDvMLAQtbth-A2Y",
  authDomain: "fir-auth-483d7.firebaseapp.com",
  projectId: "fir-auth-483d7",
  storageBucket: "fir-auth-483d7.appspot.com",
  messagingSenderId: "919135328174",
  appId: "1:919135328174:web:0477feb6ba2dace2f45a3f"
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