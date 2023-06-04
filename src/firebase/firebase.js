import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDWu5OWBlyFRftaUnE1T2d28pRMMJdRuOA",
  authDomain: "tiktak-tiktok-clone.firebaseapp.com",
  projectId: "tiktak-tiktok-clone",
  storageBucket: "tiktak-tiktok-clone.appspot.com",
  messagingSenderId: "688914660119",
  appId: "1:688914660119:web:c1dfd4e240e91764915552",
  measurementId: "G-BP54K37PM7"
};

  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
