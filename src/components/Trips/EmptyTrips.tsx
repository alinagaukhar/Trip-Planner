import car from '../../assets/car.png';
import './EmptyTrips.scss';
import plus from '../../assets/plus.svg';
import Button from '../Button/Button';

const EmptyTrips = (props: any) => {
    const showCreate = () => {
        props.handler(true);
    }

    return (
        <div className='empty-trips-container' id='empty-trips-container'>
            <header>
                <h2> Your trips </h2>
                <Button text="New trip" id="newTrip" src={plus} onClick={showCreate}/>
            </header>
            <div className='content'>
                <img src = {car} width="300px" alt="" id='carImg'/>
                <p>You do not have any trips in yout list.</p>
                <Button src={plus} text='Create trip' id='createTrip' onClick={showCreate}/>
                <h2>Explore Trips</h2>
                <p className='attribute'>Need inspiration? Explore trips created by others.</p>
            </div>
            
        </div>
    )
}

export default EmptyTrips