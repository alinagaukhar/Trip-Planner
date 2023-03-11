import { useEffect, useState } from "react";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { LoggedIn } from "../../contexts/loggedin-context";
import { useContext } from "react";
import MyMap from '../Map/Map';
import EmptyTrips from "../Trips/EmptyTrips";
import Trips from '../Trips/Trips';
import './Main.scss';
import CreateTrip from "../Trips/CreateTrip/CreateTrip";
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTrips, fetchTrips, reset } from '../../features/trips/tripsSlice';
import { RootState, AppDispatch } from '../../store/store';


const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn= useContext(LoggedIn);
    const [showTab, setShowTab] = useState(false);
    const trips = useSelector(selectAllTrips);
    const tripStatus = useSelector((state : RootState ) => state.trips.status)
    const error = useSelector((state: RootState) => state.trips.error)


    useEffect(() => {
        if ( tripStatus === 'idle' && isLoggedIn) {
          dispatch(fetchTrips(isLoggedIn))
        }
      },[tripStatus, dispatch, isLoggedIn])

    
    const clickHandler = async() => {
        await logout();
        navigate("/");
    };

    let content

    if (tripStatus === 'loading') {
        content = <div>Loading</div>
    } else if (tripStatus === 'succeeded') {
        if (trips.length === 0){
            content = <EmptyTrips handler={setShowTab}/>
        }
        else {
            content = <Trips handler={setShowTab}/>
        }
    } else if (tripStatus === 'failed') {
        content = <div>{error}</div>
    }
    

    return (
        <div className="main-container">
            {
                showTab ?  <CreateTrip handler={setShowTab} /> : content 
            }
            <MyMap />
            <button onClick={clickHandler}> Sign Out </button>
            {/* {isLoggedIn ? <div>User logged in </div> : <></>} */}
        </div>
    );
};

export default Main;