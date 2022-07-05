import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2SgXDmRpkM6yng6Q0Ee71IgR8ERgnXOY",
  authDomain: "nextfire-60639.firebaseapp.com",
  projectId: "nextfire-60639",
  storageBucket: "nextfire-60639.appspot.com",
  messagingSenderId: "982697455968",
  appId: "1:982697455968:web:a82d18f0edda1611552e05",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage;

///helper functions

/**
 * gets a users/{uid} document with username
 * @param {string} username
 */

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    //firestore timestamps are NOT serializable to JSON
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
