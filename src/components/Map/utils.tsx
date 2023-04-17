import { Map} from 'maplibre-gl';
import * as turf from '@turf/turf';
import maplibre from 'maplibre-gl';
import { Place } from '../../features/trips/tripsSlice';
import marker from '../../assets/marker.svg';

export const addRoute = async(map: Map, routeResult: any) => {
    
    const waypoints = routeResult.features[0].properties.waypoints;
    map.addSource('route', {
        type: 'geojson',
        data: routeResult
      });

    map.addLayer({
        'id': 'route-layer',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-cap': "round",
          'line-join': "round"
        },
        'paint': {
          'line-color': "#6084eb",
          'line-width': 6,
          'line-opacity': 0.7
        },
        'filter': ['==', '$type', 'LineString']
      });
    
  
    waypoints.map((point:any, index: number) => {
      
      let el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `<p>${String.fromCharCode(65 + index)}</p>`;
      new maplibre.Marker(el, {
        anchor: 'bottom'
      })
      .setLngLat(point.location)
      .addTo(map);  
    })
    
    const center:any = turf.center(routeResult).geometry.coordinates
    map.flyTo({
        center: center,
        zoom: 4
        });
}