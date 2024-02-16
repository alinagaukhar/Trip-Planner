import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Trip } from "../features/trips/tripsSlice";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIOK0qt0oFKznEBUNTq8AZXdLK7LxNFrg",
  authDomain: "authentification-app-f7718.firebaseapp.com",
  projectId: "authentification-app-f7718",
  storageBucket: "authentification-app-f7718.appspot.com",
  messagingSenderId: "17813858582",
  appId: "1:17813858582:web:fe6898ed444eef74644837",
  measurementId: "G-BG87YQ977F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Add a new document with a generated id.
export const addToDB = async (trip: Trip) => {
  try {
    await setDoc(doc(db, "trips", trip.id), {
      title: trip.title,
      lastEdited: trip.lastEdited,
      numOfPlaces: trip.numOfPlaces,
      places: trip.places,
      userId: trip.userId,
      route: trip.route,
    });
  } catch (e: any) {
    console.log(e);
  }
};

export const getAllTrips = async (userId: string) => {
  const q = query(collection(db, "trips"), where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    let trips: Array<Trip> = [];

    querySnapshot.forEach((trip) => {
      trips.push({
        id: trip.id,
        title: trip.data().title,
        numOfPlaces: trip.data().numOfPlaces,
        lastEdited: trip.data().lastEdited,
        places: trip.data().places,
        userId: trip.data().userId,
        route: trip.data().route,
      });
    });
    return trips;
  } catch (e: any) {
    console.log(e);
  }
};

export const updateSingleTrip = async (trip: Trip) => {
  try {
    await setDoc(
      doc(db, "trips", trip.id),
      {
        ...trip,
      },
      { merge: true }
    );
  } catch (e: any) {
    console.log(e);
  }
};

export const deleteSingleTrip = async (tripId: string) => {
  try {
    await deleteDoc(doc(db, "trips", tripId));
  } catch (e: any) {
    console.log(e);
  }
};
