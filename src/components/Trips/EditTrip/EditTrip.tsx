import { useState } from "react";
import "./EditTrip.scss";
import plus from "../../../assets/plus-white.svg";
import x from "../../../assets/x.svg";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectTripById, updateTrip } from "../../../features/trips/tripsSlice";
import { AppDispatch, RootState } from "../../../store/store";

type EditTripProps = {
  selectedTrip: string;
  handler: Function;
};

const EditTrip = (props: EditTripProps) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const selectedTrip = props.selectedTrip;
  const trip = useSelector((state: RootState) =>
    selectTripById(state, selectedTrip)
  );
  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const tripStatus = useSelector((state: RootState) => state.trips.status);
  const tripError = useSelector((state: RootState) => state.trips.error);

  const cancel = () => {
    props.handler(false);
  };

  const editTrip = () => {
    if (trip) {
      dispatch(
        updateTrip({
          ...trip,
          lastEdited: new Date().toLocaleString(),
          title,
        })
      );
    }

    props.handler(false);
  };

  return (
    <div className="edit-trip-container">
      <header>
        <img src={plus} id="plus-img" alt="plus-img" />
        <h1>Edit Trip</h1>
        <button onClick={cancel}>
          <img src={x} id="x-img" alt="x-img" />
        </button>
      </header>
      <div className="content">
        <p>Trip Name</p>
        <input
          type="text"
          placeholder="E.g Weekend road trip"
          id="tripTitle"
          name="tripTitle"
          value={title}
          onChange={onTitleChanged}
        />
      </div>
      <footer>
        <button id="cancel" onClick={cancel}>
          Cancel
        </button>
        <Button
          id="editTripLarge"
          text="Save Trip"
          src={plus}
          onClick={editTrip}
        />
      </footer>
    </div>
  );
};
export default EditTrip;
