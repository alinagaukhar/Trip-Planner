import routes from '../../../assets/routes.png';
import Button from '../../Button/Button';
import plus from '../../../assets/plus.svg';
import './Empty.scss';


const Empty = (props: any) => {
    return (
        <div id='empty-container'>
            <img src={routes}/>
            <p>No places yet</p>
            <Button src={plus} text='Add Place' id='addPlaceBtn' onClick={() => props.show(true)}/>
        </div>
    )
}

export default Empty