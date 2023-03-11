import edit from '../../assets/edit.svg';
import './SingleTrip.scss';
import  del from '../../assets/delete.svg';
import { Trip } from '../../features/trips/tripsSlice';
import { useSelector } from 'react-redux';
import { selectTripById } from '../../features/trips/tripsSlice';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

const SingleTrip = (props: any) => {

    const trip = useSelector((state: RootState) => selectTripById(state, props.tripId))

    const editTripHandler = () => {
        props.selectTrip(props.tripId);
        props.editHandler(true);
    }

    const deleteTripHandler = () => {
        props.selectTrip(props.tripId);
        props.deleteHandler(true);
    }

    if (trip) {
        return (
            <div id="trip-container" style={props.style}>
                <div id="places">
                    <p>{trip.numOfPlaces}</p>
                    places
                </div>
                <div className="trip-content">
                    <header>
                        <p>{trip.title}</p>
                        <span>
                            <button onClick={editTripHandler}><img src={edit}/></button>
                            <button onClick={deleteTripHandler}><img src={del}/></button>
                        </span>
                    </header>
                    <p className='open'><Link to={`/main/${props.tripId}`} className='link'>
                        Open
                    </Link>
                    </p>
                    <p className="editted"><span>Edited: {trip.lastEdited}</span></p>
                </div>
            </div>
        )
    }
    else {
        return (<div>Unknown trip</div>)
    }
}

export default SingleTrip