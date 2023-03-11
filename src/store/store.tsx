import { configureStore } from '@reduxjs/toolkit'
import tripsreducer from '../features/trips/tripsSlice';
// import devToolsEnhancer from 'remote-redux-devtools';
import { loadState, saveState } from './localstorage';

const persistedState = loadState();

const store = configureStore({
  preloadedState : persistedState,
  reducer: {
    trips: tripsreducer
  },
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store