import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "Your apiKey",
    authDomain: "Your authDomain",
    projectId: "Your projectId",
    storageBucket: "Your storageBucket",
    messagingSenderId: "Your messagingSenderId",
    appId: "Your appId",
    measurementId: "Your measurementId"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
