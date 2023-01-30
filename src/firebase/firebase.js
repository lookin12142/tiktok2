import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBh2DMw6t3gzIf9z2MpYWO9LfXb0cLYEn4",
  authDomain: "tiktak-app-a905d.firebaseapp.com",
  projectId: "tiktak-app-a905d",
  storageBucket: "tiktak-app-a905d.appspot.com",
  messagingSenderId: "113543138705",
  appId: "1:113543138705:web:d9d1902b5c2c515d349e30",
  measurementId: "G-GQ2H79E9WV"
};

  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};