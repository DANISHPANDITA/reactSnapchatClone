import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBbIvlfZ4Cadz-hABF5wUghxRvpyXRXgsY",
  authDomain: "snapchatclone-9bb2c.firebaseapp.com",
  projectId: "snapchatclone-9bb2c",
  storageBucket: "snapchatclone-9bb2c.appspot.com",
  messagingSenderId: "468741415165",
  appId: "1:468741415165:web:e3a9090c4973e75e4c9e94",
  measurementId: "G-44NWLBCD4F",
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const auth = firebaseApp.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, googleAuth };
