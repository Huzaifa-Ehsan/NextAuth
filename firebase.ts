import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcv378Z0nBCvk7kE1AaXqHp3Z-yqlPTGA",
  authDomain: "fir-demo-12b0b.firebaseapp.com",
  projectId: "fir-demo-12b0b",
  storageBucket: "fir-demo-12b0b.appspot.com",
  messagingSenderId: "475634951280",
  appId: "1:475634951280:web:b190ac613d79f932d200b5"
};

// Initialize Firebase

/*It is ok simple react app because there will no several occurences would be occur
 const app = initializeApp(firebaseConfig); */

/*Next.js Approach >  getApps() it will tell us all the initialized apps */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/* This is modular v9 approach */
const db = getFirestore(app);

export { db };