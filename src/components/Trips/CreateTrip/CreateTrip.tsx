import { useState } from "react";
import "./CreateTrip.scss";
import plus from "../../../assets/plus-white.svg";
import x from "../../../assets/x.svg";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTrip } from "../../../features/trips/tripsSlice";
import { Trip } from "../../../features/trips/tripsSlice";
import { useLoggedInContext } from "../../../contexts/loggedin-context";
import { AppDispatch } from "../../../store/store";

type CreateTripProps = {
  handler: Function;
};

const CreateTrip = (props: CreateTripProps) => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useLoggedInContext();

  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const cancel = () => {
    props.handler(false);
  };

  const addTripHandler = async () => {
    const newTrip: Trip = {
      id: nanoid(),
      title: title,
      numOfPlaces: 0,
      lastEdited: new Date().toISOString(),
      places: [],
      userId: isLoggedIn,
      route: null,
    };

    dispatch(addTrip(newTrip));

    props.handler(false);
  };

  return (
    <div className="outer-container" id="outer-container">
      <div className="create-trip-container">
        <header>
          <img src={plus} id="plus-img" alt="plus-img" />
          <h1>Create Trip</h1>
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
            id="createTripLarge"
            text="Create Trip"
            src={plus}
            onClick={addTripHandler}
          />
        </footer>
      </div>
    </div>
  );
};
export default CreateTrip;
