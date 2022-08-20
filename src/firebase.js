import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDD_halkmTU4mw1YHwaHk3Sch7ub9VM80",
  authDomain: "netflixclone-ad599.firebaseapp.com",
  projectId: "netflixclone-ad599",
  storageBucket: "netflixclone-ad599.appspot.com",
  messagingSenderId: "363571661329",
  appId: "1:363571661329:web:f8bc37f8c3377a91ad3fb0",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const logInWithEmailAndPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      console.log(authUser);
    })
    .catch((error) => {
      alert(error.message);
    });
};

const registerWithEmailAndPassword = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      console.log(authUser);
    })
    .catch((error) => {
      alert(error.message);
    });
};

const logOut = async () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

export { auth };
export { logInWithEmailAndPassword };
export { registerWithEmailAndPassword };
export { logOut };
export default db;
