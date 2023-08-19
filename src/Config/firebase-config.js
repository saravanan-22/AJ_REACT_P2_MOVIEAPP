import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdMGsfyaoK6wXH-uMq7RvrDP43nLzyirI",
  authDomain: "movie-app-d7c30.firebaseapp.com",
  projectId: "movie-app-d7c30",
  storageBucket: "movie-app-d7c30.appspot.com",
  messagingSenderId: "941528797827",
  appId: "1:941528797827:web:44677c70d17c9d5dc281b6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage();
