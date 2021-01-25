import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './Map.scss';

import { MAP_CONSTANTS } from '../../constants';

import getCoordinatesFromAddress from './Map.utils';

mapboxgl.accessToken = MAP_CONSTANTS.MAP_BOX_TOKEN;

const Map = ({ address }) => {
  const mapContainerRef = useRef(null);
  const [lat, setLatitude] = useState(MAP_CONSTANTS.GLOBAL_COORDS);
  const [long, setLongitude] = useState(MAP_CONSTANTS.GLOBAL_COORDS);

  getCoordinatesFromAddress(address).then((data) => {
    if (data) {
      const [longitude, latitude] = data.split(' ');
      setLatitude(latitude);
      setLongitude(longitude);
    }
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [long, lat],
      zoom: MAP_CONSTANTS.MAP_ZOOM,
    });

    new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);

    return () => map.remove();
  }, [lat, long]);

  return (
    <div className="Map" ref={mapContainerRef} />
  )
}

export default Map;
