import "./RemovePlace.scss";
import plus from "../../../../assets/plus-white.svg";
import x from "../../../../assets/x.svg";
import Button from "../../../Button/Button";
import {
  selectTripById,
  updateTrip,
} from "../../../../features/trips/tripsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { calculateRoutes } from "../../../../utils/geoapify";
import { Place } from "../../../../features/trips/tripsSlice";

type RemovePlaceProps = {
  tripId: string;
  showDelete: Function;
  index: number;
};

const RemovePlace = (props: RemovePlaceProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const trip = useSelector((state: RootState) =>
    selectTripById(state, props.tripId)
  );
  let places: Place[];

  const cancel = () => {
    props.showDelete(false);
  };

  const removePlace = async () => {
    if (trip) {
      places = [...trip.places];
      places.splice(props.index, 1);

      if (props.index === 0 && places.length > 0) {
        places[0] = { ...places[0], isStart: true };
      }
      if (places.length > 1) {
        const coordinates = places.map((place) => place.coordinates);
        const res = await calculateRoutes(coordinates);
        const route = JSON.stringify(res);
        dispatch(
          updateTrip({
            ...trip,
            places,
            numOfPlaces: places.length,
            route,
            lastEdited: new Date().toLocaleString(),
          })
        );
      } else {
        dispatch(
          updateTrip({
            ...trip,
            places,
            numOfPlaces: places.length,
            route: null,
            lastEdited: new Date().toLocaleString(),
          })
        );
      }
    }
    props.showDelete(false);
  };

  return (
    <div id="remove-place-container">
      <header>
        <h1>Remove place</h1>
        <button onClick={cancel}>
          <img src={x} id="x-img" alt="x-img" />
        </button>
      </header>
      <div className="content">
        <p>Are you sure to remove this place from your trip?</p>
        <h1>{trip?.places[props.index].name}</h1>
      </div>
      <footer>
        <button id="cancel" onClick={cancel}>
          Cancel
        </button>
        <Button
          id="removeTripLarge"
          text="Remove Place"
          src={plus}
          onClick={removePlace}
        />
      </footer>
    </div>
  );
};
export default RemovePlace;
