import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBMJYqKTf6fxqK-fRnHFlra5DwjBmUVjAg",
  authDomain: "tiktak-app-4b8d0.firebaseapp.com",
  projectId: "tiktak-app-4b8d0",
  storageBucket: "tiktak-app-4b8d0.appspot.com",
  messagingSenderId: "977812572015",
  appId: "1:977812572015:web:d0868b9c37c846583eca9a",
  measurementId: "G-822X3KMSGR"
};

  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
