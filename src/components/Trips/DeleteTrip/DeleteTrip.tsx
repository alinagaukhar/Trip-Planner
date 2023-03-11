import { useEffect, useState, useContext} from 'react';
import './DeleteTrip.scss';
import plus from '../../../assets/plus-white.svg';
import x from '../../../assets/x.svg';
import Button from '../../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrip, updateTrip } from '../../../features/trips/tripsSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { selectTripById } from '../../../features/trips/tripsSlice';

const DeleteTrip  = (props: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedTrip : string = props.selectedTrip;
    const trip = useSelector((state: RootState) => selectTripById(state, selectedTrip))

    const cancel = () => {
        props.handler(false);
    }

    const deleteTripHandler = () => {
       
        dispatch(deleteTrip(selectedTrip))
        props.handler(false);
    }

    
    return (
        
            <div className="delete-trip-container">
                <header>
                    <img src={plus} id='plus-img'/>
                    <h1>Delete Trip</h1>
                    <button onClick={cancel}><img src={x} id='x-img'/></button>
                </header>
                <div className='content'>
                    <p className='text'>Do you want to remove this trip? This cannot be undone.</p>
                    <p className='title'>{trip?.title}</p>
                </div>
                <footer>
                    <button id='cancel' onClick={cancel}>Cancel</button>
                    <Button id='deleteTripLarge' text='Remove Trip' src={plus} onClick={deleteTripHandler}/>
                </footer>
            </div>
        
    )
}
export default DeleteTrip