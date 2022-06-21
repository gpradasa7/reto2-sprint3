import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwqjvMOEa8IY89gaxnbWdzAp2GmlkJehk",
  authDomain: "reto-2-2d5dc.firebaseapp.com",
  projectId: "reto-2-2d5dc",
  storageBucket: "reto-2-2d5dc.appspot.com",
  messagingSenderId: "701745018064",
  appId: "1:701745018064:web:a6990163b9194ae0ed9ad5",
};

const app = initializeApp(firebaseConfig);
const store = getFirestore(app);

export default store;
