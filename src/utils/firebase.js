import firebase from "firebase/app";
import database from "firebase/database";

const config = {
  apiKey: "AIzaSyBNNPpHnF_hz6zTyBjPt1uQtHOJgRsoHgc",
  authDomain: "trifle-app.firebaseapp.com",
  databaseURL: "https://trifle-app.firebaseio.com",
  projectId: "trifle-app",
  storageBucket: "trifle-app.appspot.com",
  messagingSenderId: "95156408400",
  appId: "1:95156408400:web:9ffcdef439d66dc6a7c155",
  measurementId: "G-DCN2QJ83BC"
};

let firebaseCache;

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  firebaseCache = firebase;
  return firebase;
};
