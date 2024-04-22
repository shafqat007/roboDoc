//always same
import firebase from 'firebase/compat/app';
import {getDatabase}from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBuM1rstTbrMyoAFpm6C_MWVbRbib76UsQ",
    authDomain: "robodoc-f8b8c.firebaseapp.com",
    databaseURL: "https://robodoc-f8b8c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "robodoc-f8b8c",
    storageBucket: "robodoc-f8b8c.appspot.com",
    messagingSenderId: "579335688578",
    appId: "1:579335688578:web:c946251aa51bb3606bff9b",
    measurementId: "G-E2WBB8TH1M"
  };




if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export { db }




