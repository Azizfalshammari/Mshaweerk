import "../App.css";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const MAX_ZOOM = 17;

function Map1() {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(46.685199701153614);
  const [mapLatitude, setMapLatitude] = useState(24.71521230058126);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    if (map.setCenter && map.setZoom) {
      map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
      map.setZoom(mapZoom);
    }
  };

  useEffect(() => {
    const mapInstance = tt.map({
      key: "cANK9YQcCom58YW67FIAZS1mQvGbabRC",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    updateMap();
  }, [mapLongitude, mapLatitude, mapZoom]);

  return (
    <div className="container">
      <div></div>
      <div>
        <button className="primary" onClick={decreaseZoom}>
          {/* Decrease Zoom */}
        </button>
        <button className="primary" onClick={increaseZoom}>
          {/* Increase Zoom */}
        </button>
        <button className="primary" onClick={updateMap}>
          {/* Update Map */}
        </button>
      </div>
      <div ref={mapElement} className="h-[900px] w-[100vw]" />
    </div>
  );
}

export default Map1;
