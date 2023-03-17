import "./TripDescription.scss";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Plan from "./Plan";
import calendar from "../../../assets/calendar.svg";
import todos from "../../../assets/todos.svg";
import wallet from "../../../assets/wallet.svg";
import { useSelector } from "react-redux";
import { selectTripById } from "../../../features/trips/tripsSlice";
import { RootState } from "../../../store/store";
import arrow from "../../../assets/arrow.svg";
import { Link } from "react-router-dom";
import FallbackUI from "../../FallbackUI/FallbackUI";

type TripDescriptionProps = {
  tripId: string;
};

const TripDescription = (props: TripDescriptionProps) => {
  const trip = useSelector((state: RootState) =>
    selectTripById(state, props.tripId)
  );
  const tripStatus = useSelector((state: RootState) => state.trips.status);
  const error = useSelector((state: RootState) => state.trips.error);

  if (tripStatus === "failed") {
    return <FallbackUI error={error} />;
  }

  return (
    <div className="trip-description-container">
      <header>
        <h1>
          <Link to="/main">
            <img src={arrow} alt="arrow" />
          </Link>
          {trip?.title}
        </h1>
      </header>
      <div id="trip-description-content">
        <Tabs className="tabs" variant="unstyled">
          <TabList className="tablist">
            <Tab className="singletab">
              <img src={calendar} alt="calendar" />
              Plan
            </Tab>
            <Tab className="singletab">
              <img src={todos} alt="todos" />
              ToDos
            </Tab>
            <Tab className="singletab">
              <img src={wallet} alt="wallet" />
              Expenses
            </Tab>
          </TabList>

          <TabPanels className="tabpanels">
            <TabPanel className="panel">
              <Plan tripId={props.tripId} />
            </TabPanel>
            <TabPanel className="panel">
              <p>two!</p>
            </TabPanel>
            <TabPanel className="panel">
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default TripDescription;
