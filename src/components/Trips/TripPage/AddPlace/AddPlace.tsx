import { useState} from 'react';
import './AddPlace.scss';
import plus from '../../../../assets/plus-white.svg';
import x from '../../../../assets/x.svg';
import Button from '../../../Button/Button';
import SearchAutocomplete from '../Autocomplete/Autocomplete';
import { Place, selectTripById, updateTrip } from '../../../../features/trips/tripsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { calculateRoutes } from '../../../../utils/geoapify';
import { addSeconds } from 'date-fns';



const AddPlace  = (props: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [place, setPlace] = useState<any>();
    const trip = useSelector((state : RootState) => selectTripById(state, props.tripId));
    let places;

    const cancel = () => {
        props.hide(false);
    }


    const addPlace = async () => {
        
        const newPlace: Place = { 
            name: place.properties['address_line2'],
            isStart: trip?.numOfPlaces === 0,
            departureDate: '',
            arrivalDate: '',
            coordinates: [place.properties.lat, place.properties.lon],
            marker: null,
        }

        
        if (trip ) {
            places = [...trip.places]
            places.push(newPlace)

            if (places.length > 1) {
                const coordinates = places.map(place => place.coordinates) 
                const res = await calculateRoutes(coordinates);
                const route = JSON.stringify(res);
                if (places[places.length - 2].departureDate) {
                    const legs = res.features[0].properties.legs
                    const travelTime = legs[legs.length-1].time
                    const arrivalDate = addSeconds(new Date(places[places.length - 2].departureDate), travelTime).toLocaleString();
                    places[places.length - 1] = {...newPlace, arrivalDate, departureDate: arrivalDate}
                    dispatch(updateTrip({...trip, route, places, numOfPlaces: places.length}))
                }
                else {
                    dispatch(updateTrip({...trip, route, places, numOfPlaces: places.length}))
                };
            }
            else {
                dispatch(updateTrip( { ...trip,  places, numOfPlaces: places.length}))
            }

        }
        props.hide(false);
    }
    
    return (
            <div id="add-place-container">
                <header>
                    <img src={plus} id='plus-img'/>
                    <h1>Add Place</h1>
                    <button onClick={cancel}><img src={x} id='x-img'/></button>
                </header>
                <div className='content'>
                    <p>Find a place</p>
                    <div id='searchAutocomplete'><SearchAutocomplete setPlace={setPlace}/></div>
                    <div id='selectedPlace'>
                        { place ? place.properties['address_line2'] : "Search for a place" }
                    </div>
                </div>
                <footer>
                    <button id='cancel' onClick={cancel}>Cancel</button>
                    <Button id='createTripLarge' text='Add Place' src={plus} onClick={addPlace}/>
                </footer>
            </div>
    )
}
export default AddPlace