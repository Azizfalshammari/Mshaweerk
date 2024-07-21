import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const LocationChooserModal = ({ type, onClose, onSave }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapCenter = { lat: latitude, lng: longitude };

        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: 12,
        });

        mapInstanceRef.current.addListener("click", (event) => {
          const clickedPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: clickedPosition }, (results, status) => {
            if (status === "OK" && results[0]) {
              const address = results[0].formatted_address;
              onSave({ address, position: clickedPosition });
              toast.success(`${type === "home" ? "Home" : "Work"} location saved!`);
              onClose();
            }
          });
        });
      },
      (error) => {
        toast.error("Failed to get your location.");
      }
    );
  }, [type, onClose, onSave]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 relative w-3/4 h-3/4">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>
        <div ref={mapRef} className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default LocationChooserModal;
