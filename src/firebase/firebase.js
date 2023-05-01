import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKLQu9dPwt7Lrn6YwI6aBoIjkVMkzNywA",
  authDomain: "tiktak-tiktok-clone-simple.firebaseapp.com",
  projectId: "tiktak-tiktok-clone-simple",
  storageBucket: "tiktak-tiktok-clone-simple.appspot.com",
  messagingSenderId: "851887958668",
  appId: "1:851887958668:web:2e2417f924f6c64f24a9a9",
  measurementId: "G-JCCW0HLKRR"
};

  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
