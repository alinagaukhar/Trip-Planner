import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIOK0qt0oFKznEBUNTq8AZXdLK7LxNFrg",
  authDomain: "authentification-app-f7718.firebaseapp.com",
  projectId: "authentification-app-f7718",
  storageBucket: "authentification-app-f7718.appspot.com",
  messagingSenderId: "17813858582",
  appId: "1:17813858582:web:fe6898ed444eef74644837",
  measurementId: "G-BG87YQ977F",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err: unknown) {
    let message;
    if (err instanceof Error) message = err.message;
    console.error(err);
    alert(message);
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
    localStorage.setItem("authenticated", "true");
  } catch (err: unknown) {
    let message;
    if (err instanceof Error) message = err.message;
    console.error(err);
    alert(message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("You have logged in successfully ");
    localStorage.setItem("authenticated", "true");
  } catch (err: unknown) {
    let message;
    if (err instanceof Error) message = err.message;
    console.error(err);
    alert(message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
