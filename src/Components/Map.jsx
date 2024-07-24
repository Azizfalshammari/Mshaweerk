import * as React from "react";
import { useState, useEffect, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const MAX_ZOOM = 17;

function Map() {
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
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow:true,
},
    });
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    updateMap();
  }, [mapLongitude, mapLatitude, mapZoom]);

  return (
    // <div>
    //   <div>
    //     <button className="primary" onClick={decreaseZoom}>
    //       -
    //     </button>
    //     <button className="primary" onClick={increaseZoom}>
    //       +
    //     </button>
    //     <button className="primary" onClick={updateMap}>
    //       {/* Update Map */}
    //     </button>
    <div ref={mapElement} className="h-[600px] w-[100%] relative">
    <div className="absolute top-0 right-0 bg-red-300 p-2 flex flex-col space-y-2">
    <button className="primary" onClick={decreaseZoom}>
      -
    </button>
    <button className="primary" onClick={increaseZoom}>
      +
    </button>
    <button className="primary" onClick={updateMap}>
      تحديث الخريطة
    </button>
  </div>
</div>

  
      
    // </div>
  );
}
export default Map