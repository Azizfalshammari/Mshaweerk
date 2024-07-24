import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const LocationChooserModal = ({ isOpen, onClose, onSave }) => {
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const loadGoogleMapsScript = () => {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places";
        script.async = true;
        script.defer = true;
        script.onload = () => initializeMap();
        document.head.appendChild(script);
      };

      const initializeMap = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const mapCenter = { lat: latitude, lng: longitude };

          const mapInstance = new window.google.maps.Map(
            document.getElementById("modal-map"),
            {
              center: mapCenter,
              zoom: 12,
            }
          );

          setMap(mapInstance);

          const markerInstance = new window.google.maps.Marker({
            position: mapCenter,
            map: mapInstance,
            draggable: true,
          });

          setMarker(markerInstance);

          mapInstance.addListener("click", (event) => {
            const clickedPosition = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            markerInstance.setPosition(clickedPosition);
            updateAddress(clickedPosition);
          });

          markerInstance.addListener("dragend", (event) => {
            const draggedPosition = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            updateAddress(draggedPosition);
          });

          updateAddress(mapCenter);
        });
      };

      if (!window.google) {
        loadGoogleMapsScript();
      } else {
        initializeMap();
      }
    }
  }, [isOpen]);

  const updateAddress = (position) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
        setPosition(position);
      }
    });
  };

  const handleSave = () => {
    if (address && position) {
      onSave({ address, position });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Choose Location"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-opacity-10"
    >
      <div className="w-[50vw] max-sm:mr-24 h-[50vh] bg-white p-4 rounded-lg shadow-lg">
        <div id="modal-map" className="h-64 w-full border rounded-lg"></div>
        <input
          type="text"
          value={address}
          readOnly
          className="w-full p-2 border rounded-lg mt-4"
        />
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-[#9685CF] ml-2 hover:bg-[#6b4b9a] text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            حفظ الموقع
          </button>
          <button
            onClick={onClose}
            className="bg-[#FFA842] hover:bg-[#e68a33] text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            الغاء
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LocationChooserModal;
