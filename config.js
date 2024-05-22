import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBuKTX1fJu6H7rd-x65U0QOKZIqaXfVTZA",
  authDomain: "doctorrobo-6116d.firebaseapp.com",
  databaseURL: "https://doctorrobo-6116d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "doctorrobo-6116d",
  storageBucket: "doctorrobo-6116d.appspot.com",
  messagingSenderId: "910521990046",
  appId: "1:910521990046:web:7f654192416a5acbbbf48f"
};


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initialized');
}

const db = getDatabase();
export { db };
