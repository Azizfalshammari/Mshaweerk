import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const SchedulerPage = () => {
  const [formData, setFormData] = useState({
    locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
  });
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(null); // Track the current marker
  const [routeInfo, setRouteInfo] = useState(null); // State to hold route information

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
            setFormData(prevFormData => ({
              locations: [{ address: "", deadline: "", position: clickedPosition }],
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
          const autocomplete = new window.google.maps.places.Autocomplete(input);
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

    if (currentMarker && updatedLocations[index].position.lat && updatedLocations[index].position.lng) {
      currentMarker.setPosition(updatedLocations[index].position);
      map.setCenter(updatedLocations[index].position);
    }
  };

  const addTaskToTable = () => {
    const newLocations = [...formData.locations];
    if (newLocations.length > 0) {
      const updatedTaskList = [...taskList, ...newLocations];
      setTaskList(updatedTaskList);
      setFormData({ locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }] });
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
    if (taskList.length < 2) {
      alert("Please add at least two tasks to calculate a route.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const waypoints = taskList.slice(1, taskList.length - 1).map(task => ({
      location: new window.google.maps.LatLng(task.position.lat, task.position.lng),
      stopover: true,
    }));

    const origin = new window.google.maps.LatLng(taskList[0].position.lat, taskList[0].position.lng);
    const destination = new window.google.maps.LatLng(taskList[taskList.length - 1].position.lat, taskList[taskList.length - 1].position.lng);

    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        setRouteInfo(result);
      } else {
        alert("Could not calculate route: " + status);
      }
    });
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
                                  onClick={() => removeTaskFromTable(index)}
                                >
                                  حذف
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        type="button"
                        className="bg-[#FFA842] text-black text-lg px-4 py-2 rounded-md mt-4 hover:bg-[#9685CF] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
                        onClick={confirmSchedule}
                      >
                        تأكيد الجدول
                      </button>
                    </div>
                  )}
                  {routeInfo && (
                    <div className="mt-8">
                      <h3 className="text-2xl font-semibold text-black p-3">
                        أفضل مسار
                      </h3>
                      <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
                              النقطة
                            </th>
                            <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
                              العنوان
                            </th>
                            <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
                              الوقت
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {routeInfo.routes[0].legs.map((leg, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b border-gray-200">
                                {index + 1}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200">
                                {leg.start_address}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200">
                                {leg.duration.text}
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