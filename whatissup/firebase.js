import firebase from "firebase";

const firebaseConfig = {
   
  };

const app = !firebase.apps.length  
 ? firebase.initializeApp(firebaseConfig) 
 : firebase.app()  // ssr . if already initialed or user the config and initilize


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth , provider , db};