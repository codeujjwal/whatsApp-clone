import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCPG3NMLEL4eJGK7asyohZrKwVG7i7ONL0",
  authDomain: "whatsapp-by-ujju.firebaseapp.com",
  databaseURL: "https://whatsapp-by-ujju.firebaseio.com",
  projectId: "whatsapp-by-ujju",
  storageBucket: "whatsapp-by-ujju.appspot.com",
  messagingSenderId: "62903636635",
  appId: "1:62903636635:web:acc5287ee56abc4ba62c3e",
  measurementId: "G-TT2S9MRG17",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
