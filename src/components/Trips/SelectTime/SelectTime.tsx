import './SelectTime.scss';
import plus from '../../../assets/plus-white.svg';
import x from '../../../assets/x.svg';
import Button from '../../Button/Button';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { selectTripById, updateTrip } from '../../../features/trips/tripsSlice';
import { addSeconds } from 'date-fns';
import alert from '../../../assets/alert.svg';


const SelectTime  = (props: any) => {
    
    const [showError, setShowError] = useState<boolean>(false);
    const trip = useSelector((state: RootState) => selectTripById(state, props.tripId));
    const route = trip?.route ? JSON.parse(trip.route).features[0].properties.legs : null;
    const dispatch = useDispatch<AppDispatch>();

    const cancel = () => {
        props.hide(false);
    }

    const [date, setDate] = useState(new Date());

    const changeHandler = (date: any) => {
        setDate(date);
        if (trip && trip.places) {
            if (trip.places[props.index].arrivalDate && new Date(trip.places[props.index].arrivalDate) > date) setShowError(true);
            else setShowError(false)
        }
    } 

    const saveTime = () => {


        const departureDate = date.toLocaleString();
        
        if (trip && props.index != null) {
            let places = [...trip.places];
            
            if (places[props.index].arrivalDate && new Date(places[props.index].arrivalDate) > date){
                setShowError(true);
                return;
            }

            places[props.index] = {...places[props.index], departureDate}

            let departure = date;
            for (let i = props.index; i < places.length - 1; i++){
                const time = route[i].time;
                departure = addSeconds( departure, time);

                if ( new Date(places[i + 1].departureDate) > departure ) {
                    break
                }
                const arrivalDate = departure.toLocaleString();
                places[i+1] = {...places[i+1], arrivalDate, departureDate: arrivalDate};
            }

            dispatch(updateTrip({...trip, places, lastEdited: new Date().toLocaleString()}))
        }

        props.hide(false);
        

    }
    
    return (
        
            <div className="select-time-container">
                <header>
                    <h1>Set Leaving Time</h1>
                    <button onClick={cancel}><img src={x} id='x-img'/></button>
                </header>
                <div className='content'>
                    {showError ? <div className='error'><img src={alert} alt="alert" /><span>Leaving earlier than estimated arrival time is not allowed</span></div> : <></>}
                    <p>PLANNED LEAVING</p>
                    <DatePicker
                        selected={date}
                        onChange={changeHandler}
                        showTimeSelect
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        inline
                    />
                </div>
                <footer>
                    <button id='cancel' onClick={cancel}>Cancel</button>
                    <Button id='saveTime' text='Set Departure' src={plus} onClick={saveTime}/>
                </footer>
            </div>
        
    )
}
export default SelectTime