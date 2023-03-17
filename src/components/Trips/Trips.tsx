import "./Trips.scss";
import plus from "../../assets/plus.svg";
import Button from "../Button/Button";
import SingleTrip from "./SingleTrip";
import { useSelector } from "react-redux";
import { selectAllTrips, resetStatus } from "../../features/trips/tripsSlice";
import { useState } from "react";
import EditTrip from "./EditTrip/EditTrip";
import DeleteTrip from "./DeleteTrip/DeleteTrip";

type TripsProps = {
  handler: Function;
};

const Trips = (props: TripsProps) => {
  const trips = useSelector(selectAllTrips);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<string>("");

  const showCreate = () => {
    props.handler(true);
  };

  const orderedTrips = trips
    .slice()
    .sort((a, b) => b.lastEdited.localeCompare(a.lastEdited));

  const content = orderedTrips.map((trip) => (
    <SingleTrip
      style={showEdit || showDelete ? { opacity: "0.2" } : {}}
      key={trip.id}
      tripId={trip.id}
      selectTrip={setSelectedTrip}
      editHandler={setShowEdit}
      deleteHandler={setShowDelete}
    />
  ));

  return (
    <div className="trips-container">
      <header style={showEdit || showDelete ? { opacity: "0.2" } : {}}>
        <h2> Your trips ({trips.length})</h2>
        <Button text="New trip" id="newTrip" src={plus} onClick={showCreate} />
      </header>
      {content}
      {showEdit ? (
        <EditTrip handler={setShowEdit} selectedTrip={selectedTrip} />
      ) : (
        <></>
      )}
      {showDelete ? (
        <DeleteTrip handler={setShowDelete} selectedTrip={selectedTrip} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Trips;
