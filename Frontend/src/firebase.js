import firebase from "firebase/app";
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyB3U_zocyBVFcc663fEn0PDDOx4ywhQ4TU",
    authDomain: "grocerybud-bips.firebaseapp.com",
    projectId: "grocerybud-bips",
    storageBucket: "grocerybud-bips.appspot.com",
    messagingSenderId: "166968739235",
    appId: "1:166968739235:web:a16655ccbdd1642c2d8616",
    measurementId: "G-KH6TWQSZPG"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  

  
  export const auth = app.auth()
  export default app