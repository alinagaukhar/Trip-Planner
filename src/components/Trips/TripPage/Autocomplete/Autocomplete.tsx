import { useEffect } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import { apiKey } from "../../../../utils/geoapify";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "./Autocomplete.css";
import { GeoJSONFeature } from "maplibre-gl";

type SearchAutocompleteProps = {
  setPlace: Function;
};

const SearchAutocomplete = (props: SearchAutocompleteProps) => {
  useEffect(() => {
    const el = document.getElementById("autocomplete");
    if (el) {
      const autocomplete = new GeocoderAutocomplete(el, apiKey, { limit: 10 });

      autocomplete.on("select", (location: GeoJSONFeature) => {
        props.setPlace(location);
      });
    }
  }, []);

  return <div id="autocomplete" className="autocomplete-container"></div>;
};

export default SearchAutocomplete;
