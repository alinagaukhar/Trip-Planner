import './Plan.scss';
import Button from '../../Button/Button';
import filledX from '../../../assets/filled-x.svg';
import plus from '../../../assets/plus.svg';
import Empty from './Empty';
import AddPlace from './AddPlace/AddPlace';
import { useState } from 'react';
import PlacePage from './PlacePage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { selectTripById } from '../../../features/trips/tripsSlice';
import SelectTime from '../SelectTime/SelectTime';
import RemovePlace from './RemovePlace/RemovePlace';


const Plan = (props : any) => {
    const [showAddPlace, setShowAddPlace] = useState<boolean>(false);
    const [showSelectTime, setShowSelectTime] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [removePlace, setRemovePlace] = useState(null);
    const [editTimePlace, setEditTimePlace] = useState(null);

    const trip = useSelector((state: RootState) => selectTripById(state, props.tripId));
    
    return (
        <div id='plan-container' >
            <header id='plan-header'>
                <h1>Plan</h1>
                <div className='buttons'>
                    <Button text='Reset' id='reset' src={filledX}/>
                    <Button text='Add place' id='addPlace' src={plus} onClick={() => {setShowAddPlace(true)}}/>
                </div>
            </header>
            {trip?.numOfPlaces === 0 ? 
                <Empty show={setShowAddPlace} /> : 
                trip?.places.map( (place, index) => 
                    <PlacePage 
                        key={index} 
                        index={index} 
                        place={place} 
                        showSelectTime={setShowSelectTime}
                        showDelete={setShowDelete}
                        setRemovePlace={setRemovePlace}
                        setEditTimePlace={setEditTimePlace}/>
                        )}
            {showAddPlace ? <AddPlace tripId = {props.tripId} hide={setShowAddPlace}/> : <></>}
            {showSelectTime ? <SelectTime tripId = {props.tripId} index={editTimePlace} hide={setShowSelectTime}/> : <></>}            
            {showDelete ? <RemovePlace index={removePlace} tripId={props.tripId} showDelete={setShowDelete}/> : <></>}
       </div>
    )
}

export default Plan