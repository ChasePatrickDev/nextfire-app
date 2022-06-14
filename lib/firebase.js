import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2SgXDmRpkM6yng6Q0Ee71IgR8ERgnXOY",
  authDomain: "nextfire-60639.firebaseapp.com",
  projectId: "nextfire-60639",
  storageBucket: "nextfire-60639.appspot.com",
  messagingSenderId: "982697455968",
  appId: "1:982697455968:web:a82d18f0edda1611552e05",
};

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
