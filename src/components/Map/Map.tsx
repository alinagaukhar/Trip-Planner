import { useEffect } from "react";
import "./Map.scss";
import maplibre from "maplibre-gl";
import { Map } from "maplibre-gl";
import { apiKey } from "../../utils/geoapify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectTripById } from "../../features/trips/tripsSlice";
import { addRoute } from "./utils";

type MapProps = {
  tripId?: string | undefined;
};

function MyMap(props: MapProps) {
  const trip = useSelector((state: RootState) =>
    selectTripById(state, props.tripId!)
  );

  let mapContainer: any;
  let map: Map;

  useEffect(() => {
    const myAPIKey = apiKey;
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

    const initialState = {
      lng: 0,
      lat: 0,
      zoom: 4,
    };

    map = new maplibre.Map({
      container: mapContainer,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    map.addControl(new maplibre.NavigationControl({ showZoom: true }));
    map.on("load", () => {
      if (trip && trip.route) addRoute(map, JSON.parse(trip.route));
    });
  });

  return (
    <div className="container">
      <div className="map-container" ref={(el) => (mapContainer = el)}></div>
    </div>
  );
}

export default MyMap;
