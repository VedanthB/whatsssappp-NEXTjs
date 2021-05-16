import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyALcfjesuE4rFbOsz42_gZtyE2TH51yqD8",
  authDomain: "whatsapp-next-react-clone.firebaseapp.com",
  projectId: "whatsapp-next-react-clone",
  storageBucket: "whatsapp-next-react-clone.appspot.com",
  messagingSenderId: "732301134383",
  appId: "1:732301134383:web:3246365e907d9c90fe94da",
  measurementId: "G-XX01BHNB7J"
  };

const app = !firebase.apps.length  
 ? firebase.initializeApp(firebaseConfig) 
 : firebase.app()  // ssr . if already initialed or user the config and initilize


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth , provider , db};