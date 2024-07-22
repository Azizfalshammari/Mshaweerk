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
              toast.success(
                `${type === "home" ? "Home" : "Work"} location saved!`
              );
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
      <div className="bg-[#c9c0e5] rounded-lg p-4 w-3/4 h-[90%] max-sm:h-2/4 max-sm:w-full max-md:h-[70%]">
        <div className="flex flex-row justify-between w-full items-center">
          <p className="self-start">اختر الموقع </p>
          <button
            type="button"
            className="text-gray-800 hover:bg-gray-100 p-1 rounded-full"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          </button>
        </div>
        <div ref={mapRef} className="w-full max-sm:h-[90%] h-[90%]"></div>
      </div>
    </div>
  );
};

export default LocationChooserModal;
