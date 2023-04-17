import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MyMap from "../../Map/Map";
import './TripPage.scss';
import TripDescription from "./TripDescription";
import lock from '../../../assets/lock.svg';
import { logout } from "../../../utils/auth";


const TripPage = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();

    const clickHandler = async() => {
        await logout();
        navigate("/");
    };
    return (
        <div className="trip-page-container">
            <header className='main-header'>
                <h1>RoutePlanGoha</h1>
                <button onClick={clickHandler}><img src={lock} alt='lock'/><span>Sign Out</span></button>
            </header>
            <div className="trip-page-content">
                <TripDescription tripId={tripId}/>
                <MyMap tripId={tripId}/>
            </div>
       </div>
    )
}

export default TripPage