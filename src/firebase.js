import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

import { getDatabase } from 'firebase/database'
// import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA6FuGqCYqOaU9ER33pHYSkZnqVlyjVNjM",
    authDomain: "first-project-a5bbf.firebaseapp.com",
    projectId: "first-project-a5bbf",
    storageBucket: "first-project-a5bbf.appspot.com",
    messagingSenderId: "667603075250",
    appId: "1:667603075250:web:b5b8edbe44ae2a5b2709ab",
    measurementId: "G-NJ26MXE6KZ"
};



const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const dbs = getDatabase(app)
// const Messaging = getMessaging(app);

export { app, database, storage, auth, dbs };
export default app;