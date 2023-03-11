import './PlacePage.scss';
import React from 'react';
import { Place } from '../../../features/trips/tripsSlice';
import bucket from '../../../assets/delete.svg';

type Props = {
    place: Place;
    showSelectTime: any;
    showDelete: any;
    index: number;
    setRemovePlace: any;
    setEditTimePlace: any;
  };

class PlacePage extends React.Component<Props> {

    constructor(props:any) {
        super(props)
    }

    
   
    render() {
        const place = this.props.place;
        const showSelectTime = this.props.showSelectTime;
        let content;

        const removeHandler = () => {
            console.log('started')
            this.props.setRemovePlace(this.props.index);
            this.props.showDelete(true)

        }

        const editHandler = () => {
            this.props.setEditTimePlace(this.props.index)
            showSelectTime(true)
        }

        if (place.isStart) {
            if (place.departureDate) {
                content =  
                    <>
                        <p>LEAVE:</p>
                        <button onClick={editHandler}>{place.departureDate}</button>
                    </>
            }
            else{
                content = 
                    <>
                        <p>LEAVE:</p>
                        <button onClick={editHandler}>Edit time</button>
                    </>
            }
        }
        else {
            if (place.arrivalDate) {
                if (place.departureDate) {
                    content = 
                        <>
                            <p>ARRIVE:</p>
                            <p className='time'>{place.arrivalDate}</p>
                            <p>LEAVE:</p>
                            <button onClick={editHandler}>{place.departureDate}</button>
                        </>
                }
                else {
                    content = 
                        <>
                            <p>ARRIVE:</p>
                            <p className='time'>{place.arrivalDate}</p>
                        </>
                }
            }
            else {
                content = <p>ARRIVE:</p>
            }

        }
        return (
            <div id='place-container'>
                <header>
                    <div className='order'>{String.fromCharCode(65 + this.props.index)}</div>
                    <p> Starting from </p>
                    <button onClick={removeHandler}><img src={bucket}/></button>
                </header>
                <div className='place-content'>
                    <div className='desc'>
                        {place.name}
                    </div>
                    <div className='schedule'>
                       {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default PlacePage