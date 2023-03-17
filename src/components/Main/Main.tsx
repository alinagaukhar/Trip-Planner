import { useEffect, useState } from "react";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useLoggedInContext } from "../../contexts/loggedin-context";
import MyMap from "../Map/Map";
import EmptyTrips from "../Trips/EmptyTrips";
import Trips from "../Trips/Trips";
import "./Main.scss";
import CreateTrip from "../Trips/CreateTrip/CreateTrip";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTrips, fetchTrips } from "../../features/trips/tripsSlice";
import { RootState, AppDispatch } from "../../store/store";
import lock from "../../assets/lock.svg";
import FallbackUI from "../FallbackUI/FallbackUI";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useLoggedInContext();
  const [showTab, setShowTab] = useState<boolean>(false);
  const trips = useSelector(selectAllTrips);
  const tripStatus = useSelector((state: RootState) => state.trips.status);
  const error = useSelector((state: RootState) => state.trips.error);

  useEffect(() => {
    if (tripStatus === "idle" && isLoggedIn) {
      dispatch(fetchTrips(isLoggedIn));
    }
  }, [tripStatus, dispatch, isLoggedIn]);

  const clickHandler = async () => {
    await logout();
    navigate("/");
  };

  let content;

  if (tripStatus === "loading") {
    content = <div className="loading">Loading</div>;
  } else if (tripStatus === "succeeded") {
    if (trips.length === 0) {
      content = <EmptyTrips handler={setShowTab} />;
    } else {
      content = <Trips handler={setShowTab} />;
    }
  } else if (tripStatus === "failed") {
    content = <FallbackUI error={error} />;
  }

  return (
    <div className="main-container">
      <header className="main-header">
        <h1>RoutePlanGoha</h1>
        <button onClick={clickHandler}>
          <img src={lock} alt="lock" />
          <span>Sign Out</span>
        </button>
      </header>
      <div className="main-content">
        {showTab ? <CreateTrip handler={setShowTab} /> : content}
        <MyMap />
      </div>
    </div>
  );
};

export default Main;
