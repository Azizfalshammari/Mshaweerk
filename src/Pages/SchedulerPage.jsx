import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import ModalComponent from "../Components/ModalComponent";

const SchedulerPage = () => {
  const [formData, setFormData] = useState({
    locations: [],
  });
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  <ModalComponent />;
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places`;
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
          document.getElementById("map"),
          {
            center: mapCenter,
            zoom: 12,
          }
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

  useEffect(() => {
    if (window.google && map) {
      formData.locations.forEach((location, index) => {
        const input = document.getElementById(`location-${index}`);
        if (input) {
          const autocomplete = new window.google.maps.places.Autocomplete(
            input
          );
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            handleLocationChange(
              {
                target: { value: place.formatted_address },
                position: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
              },
              index
            );
          });
        }
      });
    }
  }, [formData.locations, map]);

  const handleLocationChange = (event, index) => {
    const { value } = event.target;
    const updatedLocations = [...formData.locations];
    updatedLocations[index].address = value;
    if (event.position) {
      updatedLocations[index].position = event.position;
    }
    setFormData({ ...formData, locations: updatedLocations });
  };

  const handleDeadlineChange = (event, index) => {
    const { value } = event.target;
    const updatedLocations = [...formData.locations];
    updatedLocations[index].deadline = value;

    // Add marker to map if position is available
    if (
      updatedLocations[index].position.lat &&
      updatedLocations[index].position.lng
    ) {
      const marker = new window.google.maps.Marker({
        position: updatedLocations[index].position,
        map,
      });
      map.setCenter(updatedLocations[index].position);
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }

    setFormData({ ...formData, locations: updatedLocations });

    // Add a new location input window if deadline is chosen
    if (value) {
      addLocation();
    }
  };

  const addLocation = () => {
    setFormData((prevState) => ({
      ...prevState,
      locations: [
        ...prevState.locations,
        { address: "", deadline: "", position: { lat: null, lng: null } },
      ],
    }));
  };

  const removeLocation = (index) => {
    const updatedLocations = formData.locations.filter((_, i) => i !== index);
    setFormData({ ...formData, locations: updatedLocations });

    if (markers[index]) {
      markers[index].setMap(null);
      setMarkers(markers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Process form data
  };

  const updateAddressFromPosition = (position, index) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          handleLocationChange(
            {
              target: { value: results[0].formatted_address },
              position,
            },
            index
          );
        }
      }
    });
  };

  return (
    <>
      <div className="flex bg-transparent relative">
        <div className="flex flex-col w-full">
          <div className="flex h-screen">
            <div className="w-full">
              <div id="map" className="h-full "></div>
            </div>
            <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#FFA842]">
                  أدخل مواقع المهام والمواعيد النهائية
                </h2>
                {formData.locations.length === 0 && (
                  <button
                    type="button"
                    className="bg-[#5f93c0] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={addLocation}
                  >
                    أضف مهمة
                  </button>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formData.locations.map((location, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg shadow-md space-y-2"
                    >
                      <input
                        type="text"
                        id={`location-${index}`}
                        name={`location-${index}`}
                        placeholder="أدخل العنوان"
                        value={location.address}
                        onChange={(e) => handleLocationChange(e, index)}
                        className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="datetime-local"
                        id={`deadline-${index}`}
                        name={`deadline-${index}`}
                        value={location.deadline}
                        onChange={(e) => handleDeadlineChange(e, index)}
                        className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  {formData.locations.length > 0 && (
                    <button
                      type="submit"
                      className="bg-[#FFA842] text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      إرسال
                    </button>
                  )}
                </form>
                {formData.locations.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-700">
                      قائمة المهام
                    </h3>
                    <div className="space-y-4">
                      {formData.locations.map((location, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4"
                        >
                          <div className="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.75 3a6 6 0 000 12h1.5m4.5 0a6 6 0 100-12h-6v6m0 0H7.5v3m3-3l1.5 1.5"
                              />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-gray-900 font-semibold">
                              {location.address || "عنوان غير محدد"}
                            </h4>
                            <p className="text-gray-500">
                              الموعد النهائي: {location.deadline || "غير محدد"}
                            </p>
                            <button
                              type="button"
                              className="bg-red-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              onClick={() => removeLocation(index)}
                            >
                              إزالة
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default SchedulerPage;
