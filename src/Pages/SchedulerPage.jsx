import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Components/Sidebar";

const SchedulerPage = () => {
  const [formData, setFormData] = useState({
    locations: [
      { address: "", deadline: "", position: { lat: null, lng: null } },
    ],
  });
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);

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

        // Add click listener to the map
        mapInstance.addListener("click", (event) => {
          const clickedPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          const marker = new window.google.maps.Marker({
            position: clickedPosition,
            map: mapInstance,
          });

          setMarkers((prevMarkers) => [...prevMarkers, marker]);
          console.log(markers);
          updateAddress(clickedPosition, formData.locations.length - 1);

          // Show the sidebar when the map is clicked
          setIsSidebarVisible(true);
        });
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
  };

  const addTaskToTable = () => {
    const updatedTaskList = [...taskList, ...formData.locations];
    setTaskList(updatedTaskList);
    setFormData({
      locations: [
        { address: "", deadline: "", position: { lat: null, lng: null } },
      ],
    });
  };

  const removeTaskFromTable = (index) => {
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
    if (markers[index]) {
      markers[index].setMap(null);
      setMarkers(markers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const updateAddress = (position, index) => {
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

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="flex bg-transparent relative">
        <div className="flex flex-col w-full">
          <div className="flex h-screen">
            <div className="w-full">
              <div id="map" className="h-full"></div>
            </div>
            {isSidebarVisible && (
              <div className="sidebar w-1/3 bg-gray-100 rounded-lg p-3 overflow-y-auto max-sm:w-[67vw] max-sm:gray-100">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold p-3 text-black">
                    أدخل مواقع المهام والمواعيد النهائية
                  </h2>
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
                          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
                          required
                        />
                        <input
                          type="datetime-local"
                          id={`deadline-${index}`}
                          name={`deadline-${index}`}
                          value={location.deadline}
                          onChange={(e) => handleDeadlineChange(e, index)}
                          className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
                          required
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="bg-[#9685CF] text-black  text-lg px-4 py-2 rounded-md hover:bg-[#FFA842] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
                      onClick={addTaskToTable}
                    >
                      أضف مهمة
                    </button>
                  </form>
                  {taskList.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-2xl font-semibold text-black p-3">
                        قائمة المهام
                      </h3>
                      <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg  font-bold text-[#9685CF] ">
                              العنوان
                            </th>
                            <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg  font-bold text-[#9685CF]">
                              الموعد النهائي
                            </th>
                            <th className="py-2 px-4 border-b-2 border-[#9685CF]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {taskList.map((location, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b border-gray-200">
                                {location.address || "عنوان غير محدد"}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200">
                                {location.deadline || "غير محدد"}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200">
                                <button
                                  type="button"
                                  className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                                  onClick={() => removeTaskFromTable(index)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Sidebar onMenuClick={toggleSidebar} />
    </>
  );
};

export default SchedulerPage;
