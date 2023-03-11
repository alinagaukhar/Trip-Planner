import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  AnyAction,
  
  // omit other imports
} from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { getAllTrips, updateSingleTrip, deleteSingleTrip, addToDB} from '../../utils/firestore';
import { GeoJSONFeature } from 'maplibre-gl';
import { LngLatLike } from 'maplibre-gl';

export interface Place {
  name: string,
  isStart: boolean,
  departureDate: string,
  arrivalDate: string,
  coordinates: LngLatLike,
  marker: any,
}

export interface Trip {
  id: string,
  userId: string,
  title: string,
  numOfPlaces: number,
  lastEdited: string,
  places: Array<Place>,
  route: null | string,
}


export const fetchTrips = createAsyncThunk('trips/fetchTrips', async (userId : string) => {
  try {
    const response = await getAllTrips(userId);
    return response;
  }
  catch (e) {
    console.log(e);
  }

})

export const updateTrip = createAsyncThunk('trips/updateTrip', async (trip: Trip) => {

  try {
    await updateSingleTrip(trip);
    return trip;
  }
  catch (e) {
    console.log(e);
  }

})

export const addTrip = createAsyncThunk('trips/addTrip', async (trip: Trip) => {
  
  try {
    await addToDB(trip);
    return trip;
  }
  catch (e) {
    console.log(e);
  }

})

export const deleteTrip = createAsyncThunk('trips/deleteTrip', async (tripId : string) => {
  await deleteSingleTrip(tripId);
  return tripId;
})



/// ??
const tripsAdapter = createEntityAdapter<Trip>({
  sortComparer: (a: Trip, b: Trip) =>  b.lastEdited.localeCompare(a.lastEdited)
})

const initialState = tripsAdapter.getInitialState({
  status: 'idle',
  error: null,
})


const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    reset: () => initialState,
    },
    extraReducers(builder) {
      builder
        .addCase(fetchTrips.pending, (state, action: AnyAction) => {
          state.status = 'loading'
        })
        .addCase(fetchTrips.fulfilled, (state, action: AnyAction) => {
          state.status = 'succeeded'
          tripsAdapter.removeAll(state)
          tripsAdapter.upsertMany(state, action.payload)
        })
        .addCase(fetchTrips.rejected, (state, action: AnyAction) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(addTrip.fulfilled, (state, action: AnyAction) => {
          tripsAdapter.addOne(state, action.payload)
        })
        .addCase(addTrip.rejected, () => {
          console.log('error');
        })
        .addCase(updateTrip.fulfilled, (state, action: AnyAction) => {
          const trip  = action.payload
          const existingTrip = state.entities[trip.id]
          if (existingTrip) {
            state.entities[trip.id] = trip
          }
        })
        .addCase(updateTrip.rejected, () => {
          console.log('error');
        })
        .addCase(deleteTrip.fulfilled, (state, action: AnyAction) => {
          const tripId = action.payload;
          const existingPost = state.entities[tripId]
          if (existingPost) {
            tripsAdapter.removeOne(state, tripId)
          }
        })
    }
  }
)

export const { reset } = tripsSlice.actions

export default tripsSlice.reducer

export const {
  selectAll: selectAllTrips,
  selectById: selectTripById,
  selectIds: selectTripsIds
} = tripsAdapter.getSelectors((state : RootState) => state.trips)