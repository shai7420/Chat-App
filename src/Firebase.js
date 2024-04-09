import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-sGvOfQtVt631wYinWAUT3C9e9ZliwnQ",
    authDomain: "silver-chatz.firebaseapp.com",
    projectId: "silver-chatz",
    storageBucket: "silver-chatz.appspot.com",
    messagingSenderId: "172501285538",
    appId: "1:172501285538:web:77142605d183d6ccceb5fb",
    measurementId: "G-6ZT88F2EEV"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();