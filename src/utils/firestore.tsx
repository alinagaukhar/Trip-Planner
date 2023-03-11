import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc,  getDocs, query, where, deleteDoc} from "firebase/firestore";
import { Trip, Place } from "../features/trips/tripsSlice";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAIOK0qt0oFKznEBUNTq8AZXdLK7LxNFrg",
    authDomain: "authentification-app-f7718.firebaseapp.com",
    projectId: "authentification-app-f7718",
    storageBucket: "authentification-app-f7718.appspot.com",
    messagingSenderId: "17813858582",
    appId: "1:17813858582:web:fe6898ed444eef74644837",
    measurementId: "G-BG87YQ977F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Add a new document with a generated id.

export const addToDB = async (trip: Trip) => {
    const docRef = await setDoc(doc(db, "trips", trip.id), {
        title: trip.title,
        lastEdited: trip.lastEdited,
        numOfPlaces: trip.numOfPlaces,
        places: trip.places,
        userId: trip.userId,
        route: trip.route,
    });
};

export const getAllTrips = async(userId: string) => {
    // console.log(userId);
    const q = query(collection(db, "trips"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    let trips : Array<Trip> = [];

    querySnapshot.forEach((trip) => {
        trips.push({
            id: trip.id,
            title: trip.data().title,
            numOfPlaces: trip.data().numOfPlaces,
            lastEdited: trip.data().lastEdited,
            places: trip.data().places,
            userId: trip.data().userId,
            route: trip.data().route
        })
    })    
    return trips;
}

export const updateSingleTrip = async(trip: Trip) => {
    await setDoc(doc(db, "trips", trip.id), {
        ...trip
    }, { merge: true })
}


export const deleteSingleTrip = async(tripId: string) => {
    await deleteDoc(doc(db, 'trips', tripId));
}