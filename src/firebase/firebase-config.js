import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcKGKGkrlMkr6dOA5mQk3s9EBG-S4A3Qk",
  authDomain: "moviz-app.firebaseapp.com",
  databaseURL: "https://moviz-app-default-rtdb.firebaseio.com",
  projectId: "moviz-app",
  storageBucket: "moviz-app.appspot.com",
  messagingSenderId: "533064248025",
  appId: "1:533064248025:web:b829b7af7dfa1622a9acc8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
