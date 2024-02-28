// Import the RTK Query methods from the React-specific entry point
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firestore";
import { Trip } from "../trips/tripsSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchTrips: builder.query({
      // since we are using fakeBaseQuery we use queryFn
      async queryFn(userId: string) {
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
          return { data: trips };
        } catch (err: any) {
          return {
            error: { status: err.response?.status, data: err.response?.data },
          };
        }
      },
    }),
  }),
});

export const { useFetchTripsQuery } = apiSlice;
