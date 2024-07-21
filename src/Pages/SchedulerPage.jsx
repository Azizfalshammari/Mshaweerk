import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import BestRouteModal from "../Components/BestRouteModal"; // Import the BestRouteModal component
import LocationChooserModal from "../Components/LocationChooserModal"; // Import the LocationChooserModal component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faHome,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const SchedulerPage = () => {
  const [formData, setFormData] = useState({
    locations: [
      { address: "", deadline: "", position: { lat: null, lng: null } },
    ],
  });
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Make sure sidebar is initially visible
  const [taskList, setTaskList] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [locationType, setLocationType] = useState(null); // State to control the location type for the modal

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

        mapInstance.addListener("click", (event) => {
          const clickedPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          if (currentMarker) {
            currentMarker.setPosition(clickedPosition);
            updateAddress(clickedPosition, 0); // Update the first location's address
          } else {
            const marker = new window.google.maps.Marker({
              position: clickedPosition,
              map: mapInstance,
            });
            setCurrentMarker(marker);
            setFormData((prevFormData) => ({
              locations: [
                { address: "", deadline: "", position: clickedPosition },
              ],
            }));
            setMarkers([marker]);
            setIsSidebarVisible(true);
          }
        });
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }
  }, [currentMarker]);

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
    setFormData({ ...formData, locations: updatedLocations });
  };

  const handleDeadlineChange = (event, index) => {
    const { value } = event.target;
    const updatedLocations = [...formData.locations];
    updatedLocations[index].deadline = value;
    setFormData({ ...formData, locations: updatedLocations });

    if (
      currentMarker &&
      updatedLocations[index].position.lat &&
      updatedLocations[index].position.lng
    ) {
      currentMarker.setPosition(updatedLocations[index].position);
      map.setCenter(updatedLocations[index].position);
    }
  };

  const addTaskToTable = () => {
    const newLocations = [...formData.locations];
    if (newLocations.length > 0) {
      const updatedTaskList = [...taskList, ...newLocations];
      setTaskList(updatedTaskList);
      setFormData({
        locations: [
          { address: "", deadline: "", position: { lat: null, lng: null } },
        ],
      });
      if (currentMarker) {
        currentMarker.setMap(null);
        setCurrentMarker(null);
      }
    }
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

  const confirmSchedule = () => {
    const notify = () => toast("This is an alert!");

    if (taskList.length < 2) {
      notify();
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const waypoints = taskList.slice(1, taskList.length - 1).map((task) => ({
      location: new window.google.maps.LatLng(
        task.position.lat,
        task.position.lng
      ),
      stopover: true,
    }));

    const origin = new window.google.maps.LatLng(
      taskList[0].position.lat,
      taskList[0].position.lng
    );
    const destination = new window.google.maps.LatLng(
      taskList[taskList.length - 1].position.lat,
      taskList[taskList.length - 1].position.lng
    );

    const request = {
      origin,
      destination,
      waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setRouteInfo(result);
      }
    });
  };

  const openLocationChooser = (type) => {
    setLocationType(type);
    setIsModalOpen(true);
  };

  const handleSaveLocation = ({ address, position }) => {
    localStorage.setItem(
      locationType,
      JSON.stringify({ address, position })
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex h-screen ">
        {/* Sidebar */}
        <Sidebar onMenuClick={toggleSidebar} />

        {/* Main Content */}
        <div className="flex flex-col flex-grow bg-transparent">
          <div className="bg-transparent shadow-md flex items-center justify-between p-4">
            <input
              type="text"
              placeholder="ابحث ..."
              className="px-4 py-2 rounded-lg bg-transparent"
            />
            <div className="flex items-center gap-4 space-x-4">
              <FontAwesomeIcon
                icon={faHome}
                className="text-2xl cursor-pointer text-purple-200"
                onClick={() => openLocationChooser("home")}
              />
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-2xl cursor-pointer text-purple-200"
                onClick={() => openLocationChooser("work")}
              />
            </div>
          </div>
          <div className="flex flex-grow">
            <div className="flex flex-col w-full h-full">
              <div className="flex-grow relative">
                <div id="map" className="h-full w-full"></div>
                {isSidebarVisible && (
                  <div className="absolute inset-0 flex justify-end p-4">
                    <div className="w-1/3 bg-gray-100 rounded-lg p-3 overflow-y-auto max-sm:w-[67vw]">
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
                                onChange={(e) =>
                                  handleLocationChange(e, index)
                                }
                                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
                                required
                              />
                              <input
                                type="datetime-local"
                                id={`deadline-${index}`}
                                name={`deadline-${index}`}
                                value={location.deadline}
                                onChange={(e) =>
                                  handleDeadlineChange(e, index)
                                }
                                className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
                                required
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="bg-[#9685CF] text-black text-lg px-4 py-2 rounded-md hover:bg-[#FFA842] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
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
                                  <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
                                    العنوان
                                  </th>
                                  <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
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
                                        onClick={() =>
                                          removeTaskFromTable(index)
                                        }
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
                  </div>
                )}
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      {isModalOpen && (
        <LocationChooserModal
          type={locationType}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveLocation}
        />
      )}
    </>
  );
};

export default SchedulerPage;
