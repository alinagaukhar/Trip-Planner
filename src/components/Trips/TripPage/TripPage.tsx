import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyMap from "../../Map/Map";
import './TripPage.scss';
import TripDescription from "./TripDescription";

const TripPage = () => {
    const { tripId } = useParams();
    return (
        <div className="trip-page-container">
            <TripDescription tripId={tripId}/>
            <MyMap tripId={tripId}/>
       </div>
    )
}

export default TripPage