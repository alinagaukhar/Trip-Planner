import './Trips.scss';
import plus from '../../assets/plus.svg';
import Button from '../Button/Button';
import SingleTrip from './SingleTrip';
import { useSelector } from 'react-redux';
import { selectAllTrips, fetchTrips } from '../../features/trips/tripsSlice';
import { useEffect, useState } from 'react';
import  EditTrip from './EditTrip/EditTrip';
import DeleteTrip from './DeleteTrip/DeleteTrip';


const Trips = (props: any) => {
    const trips = useSelector(selectAllTrips);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState('');

    const showCreate = () => {
        props.handler(true);
    }    

    
    const orderedTrips = trips
        .slice()
        .sort((a, b) => b.lastEdited.localeCompare(a.lastEdited))

    const content = orderedTrips.map(trip => (
        <SingleTrip style={(showEdit || showDelete) ? {'opacity': '0.2'} : {}} key={trip.id} tripId={trip.id} selectTrip={setSelectedTrip} editHandler={setShowEdit} deleteHandler={setShowDelete}/>
        ))


    return (
        <div className='trips-container'>
            <header style={(showEdit || showDelete) ? {'opacity': '0.2'} : {}}>
                <h2> Your trips ({trips.length})</h2>
                <Button text="New trip" id="newTrip" src={plus} onClick={showCreate}/>
            </header>
            { content }
            {showEdit ? <EditTrip handler={setShowEdit} selectedTrip={selectedTrip}/> : <></>}
            {showDelete ? <DeleteTrip handler={setShowDelete} selectedTrip={selectedTrip}/> : <></>}
        </div>
    )
}

export default Trips