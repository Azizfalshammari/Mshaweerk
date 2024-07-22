import React, { useState, useEffect } from "react";

const MapComponent = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const mapCenter = { lat: latitude, lng: longitude };
                const mapInstance = new window.google.maps.Map(
                    document.getElementById("map"),
                    { center: mapCenter, zoom: 12 }
                );
                setMap(mapInstance);
            });
        };

        if (!window.google) {
            loadGoogleMapsScript();
        } else {
            initializeMap();
        }
    }, []);

    return (
        <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    );
};

export default MapComponent;
