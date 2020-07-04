import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyAPRI32LVVdSgQClPy9HCg8De67SN3bfPM",
    authDomain: "chat-example-db.firebaseapp.com",
    databaseURL: "https://chat-example-db.firebaseio.com",
    projectId: "chat-example-db",
    storageBucket: "chat-example-db.appspot.com",
    messagingSenderId: "394567016401",
    appId: "1:394567016401:web:f24c036d179498087a4af0",
    measurementId: "G-8FQJR9EDPK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;