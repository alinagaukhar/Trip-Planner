import "./Plan.scss";
import Button from "../../Button/Button";
import filledX from "../../../assets/filled-x.svg";
import plus from "../../../assets/plus.svg";
import Empty from "./Empty";
import AddPlace from "./AddPlace/AddPlace";
import { useState } from "react";
import PlacePage from "./PlacePage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { selectTripById, updateTrip } from "../../../features/trips/tripsSlice";
import SelectTime from "../SelectTime/SelectTime";
import RemovePlace from "./RemovePlace/RemovePlace";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { calculateRoutes } from "../../../utils/geoapify";

type PlanProps = {
  tripId: string;
};

const Plan = (props: PlanProps) => {
  const [showAddPlace, setShowAddPlace] = useState<boolean>(false);
  const [showSelectTime, setShowSelectTime] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [removePlace, setRemovePlace] = useState<number | null>(null);
  const [editTimePlace, setEditTimePlace] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const trip = useSelector((state: RootState) =>
    selectTripById(state, props.tripId)
  );

  const resetHandler = () => {
    if (trip) {
      let places = [...trip.places];
      for (let i = 0; i < places.length; i++) {
        places[i] = { ...places[i], arrivalDate: "", departureDate: "" };
      }
      dispatch(
        updateTrip({ ...trip, places, lastEdited: new Date().toLocaleString() })
      );
    }
  };

  const reorder = async (startIndex: number, endIndex: number) => {
    if (trip) {
      let places = [...trip.places];
      if (startIndex === 0) {
        places[0] = { ...places[0], isStart: false };
      }
      const [removed] = places.splice(startIndex, 1);
      places.splice(endIndex, 0, removed);
      places[0] = { ...places[0], isStart: true };

      if (places.length > 1) {
        const coordinates = places.map((place) => place.coordinates);
        const res = await calculateRoutes(coordinates);
        const route = JSON.stringify(res);
        dispatch(
          updateTrip({
            ...trip,
            places,
            route,
            lastEdited: new Date().toLocaleString(),
          })
        );
      } else {
        dispatch(
          updateTrip({
            ...trip,
            places,
            lastEdited: new Date().toLocaleString(),
          })
        );
      }
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    await reorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div id="plan-container">
              <header id="plan-header">
                <h1>Plan</h1>
                <div className="buttons">
                  <Button
                    text="Reset"
                    id="reset"
                    src={filledX}
                    onClick={resetHandler}
                  />
                  <Button
                    text="Add place"
                    id="addPlace"
                    src={plus}
                    onClick={() => {
                      setShowAddPlace(true);
                    }}
                  />
                </div>
              </header>
              {trip?.numOfPlaces === 0 ? (
                <Empty show={setShowAddPlace} />
              ) : (
                trip?.places.map((place, index) => (
                  <Draggable key={index} draggableId={place.name} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PlacePage
                          index={index}
                          place={place}
                          showSelectTime={setShowSelectTime}
                          showDelete={setShowDelete}
                          setRemovePlace={setRemovePlace}
                          setEditTimePlace={setEditTimePlace}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {showAddPlace ? (
                <AddPlace tripId={props.tripId} hide={setShowAddPlace} />
              ) : (
                <></>
              )}
              {showSelectTime ? (
                <SelectTime
                  tripId={props.tripId}
                  index={editTimePlace}
                  hide={setShowSelectTime}
                />
              ) : (
                <></>
              )}
              {showDelete ? (
                <RemovePlace
                  index={removePlace!}
                  tripId={props.tripId}
                  showDelete={setShowDelete}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Plan;
