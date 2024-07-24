import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LocationChooserModal from "../components/LocationChooserModal";
import ScheduleModal from "../components/ScheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faHome,
  faBriefcase,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import BusyTimeModal from "../components/BusyTimeModal";

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
  const [currentMarker, setCurrentMarker] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationType, setLocationType] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [homeLocation, setHomeLocation] = useState(
    JSON.parse(localStorage.getItem("home")) || null
  );
  const [workLocation, setWorkLocation] = useState(
    JSON.parse(localStorage.getItem("work")) || null
  );
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [busyTimes, setBusyTimes] = useState([]);
  const [isBusyTimeModalOpen, setIsBusyTimeModalOpen] = useState(false);

  const handleLocationChange = (event, index) => {
    const { value, position } = event.target;
    const updatedLocations = [...formData.locations];
    updatedLocations[index] = {
      ...updatedLocations[index],
      address: value,
      position: position
        ? { lat: position.lat(), lng: position.lng() }
        : updatedLocations[index].position,
    };
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
      const updatedTaskList = [
        ...taskList,
        ...newLocations.filter((loc) => loc.position.lat && loc.position.lng),
      ];
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
      if (status === "OK" && results[0]) {
        handleLocationChange(
          {
            target: { value: results[0].formatted_address, position },
          },
          index
        );
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSaveBusyTime = (newBusyTime) => {
    setBusyTimes([...busyTimes, newBusyTime]);
  };

  // const isTaskInBusyTime = (taskTime) => {
  //   return busyTimes.some((taskTime) => {
  //     const taskDate = new Date(taskTime);
  //     const startTime = new Date(taskTime.start);
  //     const endTime = new Date(taskTime.end);
  //     return taskDate >= startTime && taskDate <= endTime;
  //   });
  // };

  const confirmSchedule = () => {
    const notify = () => toast("من فضلك ادخل موقع منزلك او عملك");

    const home = localStorage.getItem("home");
    const work = localStorage.getItem("work");

    if (!home) {
      notify();
      return;
    }

    if (taskList.length < 2) {
      toast("Add more tasks before scheduling!");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const origin = JSON.parse(home).address;
    const destinations = taskList.map((task) => task.address);

    const isTimeBusy = (time) => {
      return busyTimes.some(
        (busyTime) =>
          time >= new Date(`1970-01-01T${busyTime.start}:00Z`) &&
          time <= new Date(`1970-01-01T${busyTime.end}:00Z`)
      );
    };

    const isOverlap = (newTask, existingTasks = []) => {
      if (!Array.isArray(existingTasks)) {
        console.error("existingTasks is not an array:", existingTasks);
        return false;
      }

      return existingTasks.some(
        (task) =>
          newTask.arrivalTime > task.departureTime &&
          newTask.departureTime < task.arrivalTime
      );
    };

    const requests = [];
    const now = new Date();

    const scheduledTasks = [];
    destinations.forEach((destination, destIndex) => {
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          const departureTime = new Date(
            now.getTime() + (day * 24 + hour) * 3600000
          );

          const deadline = new Date(taskList[destIndex].deadline);
          if (departureTime > deadline) continue;
          if (isTimeBusy(departureTime)) continue;

          const request = {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime,
              trafficModel: "bestguess",
            },
            provideRouteAlternatives: true,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          };

          requests.push(
            new Promise((resolve, reject) => {
              directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  const route = result.routes[0];
                  const totalDurationInTraffic = route.legs.reduce(
                    (total, leg) => total + leg.duration_in_traffic.value,
                    0
                  );
                  const arrivalTime = new Date(
                    departureTime.getTime() + totalDurationInTraffic * 1000
                  );
                  resolve({
                    destinationIndex: destIndex,
                    departureTime,
                    totalDurationInTraffic,
                    arrivalTime,
                    distance: route.legs[0].distance.text,
                    duration: route.legs[0].duration.text,
                  });
                } else {
                  console.error(`Directions API Error: ${status}`);
                  reject({
                    status,
                    destinationIndex: destIndex,
                    departureTime,
                  });
                }
              });
            })
          );
        }
      }
    });

    Promise.allSettled(requests)
      .then((results) => {
        const validResults = results
          .filter(({ status }) => status === "fulfilled")
          .map(({ value }) => value);

        if (validResults.length === 0) {
          toast.error("Failed to fetch routes.");
          return;
        }

        const updatedTaskList = taskList.map((task, index) => {
          const destinationResults = validResults.filter(
            (result) => result.destinationIndex === index
          );

          const bestDeparture = destinationResults.reduce((best, current) =>
            current.totalDurationInTraffic < best.totalDurationInTraffic
              ? current
              : best
          );

          const scheduledTasksForCurrent = scheduledTasks.filter((task) =>
            isOverlap(bestDeparture, {
              departureTime: task.departureTime,
              arrivalTime: task.arrivalTime,
            })
          );

          if (!isOverlap(bestDeparture, scheduledTasksForCurrent)) {
            scheduledTasks.push({
              departureTime: bestDeparture.departureTime,
              arrivalTime: bestDeparture.arrivalTime,
              address: task.address,
              distance: bestDeparture.distance,
              duration: bestDeparture.duration,
            });

            return {
              ...task,
              routeDetails: {
                bestTime: bestDeparture.departureTime,
                bestRoute: `${bestDeparture.departureTime.toLocaleString()} - ${bestDeparture.arrivalTime.toLocaleString()}`,
                distance: bestDeparture.distance,
                duration: bestDeparture.duration,
                day: bestDeparture.departureTime.toLocaleString("en-GB", {
                  weekday: "long",
                }),
              },
              departureTime: bestDeparture.departureTime,
              arrivalTime: bestDeparture.arrivalTime,
            };
          }

          return task;
        });

        setTaskList(updatedTaskList);
        setRouteInfo({
          validResults,
          origin,
          destinations,
          scheduledTasks,
        });
        setIsScheduleModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
        toast.error(`Error fetching routes: ${error.message || error}`);
      });
  };

  const calculateBestTime = (durationInSeconds) => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + durationInSeconds);
    return now.toLocaleTimeString();
  };

  const openLocationChooser = (type) => {
    setLocationType(type);
    setIsModalOpen(true);
  };

  const handleSaveLocation = ({ address, position }) => {
    const locationData = { address, position };
    localStorage.setItem(locationType, JSON.stringify(locationData));
    if (locationType === "home") setHomeLocation(locationData);
    if (locationType === "work") setWorkLocation(locationData);
    setIsModalOpen(false);
  };

  useEffect(() => {
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
          document.getElementById("map"),
          {
            center: mapCenter,
            zoom: 12,
          }
        );

        const directionsRendererInstance =
          new window.google.maps.DirectionsRenderer();
        directionsRendererInstance.setMap(mapInstance);
        setDirectionsRenderer(directionsRendererInstance);

        setMap(mapInstance);

        const fetchPlaceDetails = (placeId, callback) => {
          const service = new window.google.maps.places.PlacesService(
            mapInstance
          );
          const request = {
            placeId: placeId,
            fields: ["formatted_address", "photos"],
          };

          service.getDetails(request, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              const address = place.formatted_address;
              const photo = place.photos?.[0];
              let photoUrl = null;

              if (photo) {
                photoUrl = photo.getUrl({ maxWidth: 400 });
              }

              console.log("Address:", address);
              console.log("Photo URL:", photoUrl);

              callback({
                address: address,
                photoUrl: photoUrl,
              });
            } else {
              console.error("Failed to get place details:", status);
              callback({ address: null, photoUrl: null });
            }
          });
        };

        const geocodeLatLng = (latlng, callback) => {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                const placeId = results[0]?.place_id;
                console.log("Place ID:", placeId);

                if (placeId) {
                  fetchPlaceDetails(placeId, (details) => {
                    callback(details);
                  });
                } else {
                  callback({
                    address: results[0].formatted_address,
                    photoUrl: null,
                  });
                }
              } else {
                console.log("");
              }
            } else {
              console.log("");
            }
          });
        };

        mapInstance.addListener("click", (event) => {
          const clickedPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          if (currentMarker) {
            currentMarker.setPosition(clickedPosition);
            updateAddress(clickedPosition, 0);
          } else {
            const marker = new window.google.maps.Marker({
              position: clickedPosition,
              map: mapInstance,
            });
            setMarkers([marker]);
          }

          geocodeLatLng(clickedPosition, (result) => {
            setFormData((prevFormData) => ({
              locations: [
                {
                  address: result.address,
                  deadline: "",
                  position: clickedPosition,
                  photoUrl: result.photoUrl,
                },
              ],
            }));
            setIsSidebarVisible(true);
          });
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
                target: {
                  value: place.formatted_address,
                  position: place.geometry.location,
                },
              },
              index
            );
          });
        }
      });
    }
  }, [formData.locations, map]);

  const openBusyTimeChooser = () => {
    setIsBusyTimeModalOpen(true);
  };

  return (
    <>
      <div className="flex rounded-md h-screen">
        {/* Sidebar */}
        <Sidebar onMenuClick={toggleSidebar} />
        {/* Main Content */}
        <div className="flex flex-col flex-grow">
          <div className=" flex items-center justify-between self-end p-4">
            <div className="flex items-center gap-4 space-x-4">
              <FontAwesomeIcon
                icon={faHome}
                className="text-2xl cursor-pointer text-[#9685cf]"
                onClick={() => openLocationChooser("home")}
              />
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-2xl cursor-pointer text-[#9685cf]"
                onClick={() => openLocationChooser("work")}
              />
              <FontAwesomeIcon
                icon={faClock}
                className="text-2xl cursor-pointer text-[#9685cf]"
                onClick={openBusyTimeChooser}
              />
            </div>
          </div>
          <div className="flex-grow">
            <div className="h-full w-full relative">
              <div id="map" className="absolute inset-0"></div>
              {isSidebarVisible && (
                <div className="absolute inset-y-0 right-0 w-full max-w-md flex flex-col rounded-lg bg-gray-100 p-4 overflow-y-auto">
                  <h2 className="text-2xl text-center font-bold p-3 text-[#9685CF]">
                    أدخل العنوان والموعد النهائي لمشوارك
                  </h2>
                  <div className="w-full max-w-sm max-sm:w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {formData.locations.map((location, index) => (
                          <div key={index} className="flex flex-col space-y-2">
                            {/* كارد الصوره */}
                            {/* <img src={location.photoUrl} /> */}
                            <input
                              id={`location-${index}`}
                              type="text"
                              value={location.address}
                              onChange={(e) => handleLocationChange(e, index)}
                              placeholder=" العنوان"
                              className="w-full p-2 border rounded-lg"
                            />
                            <input
                              type="datetime-local"
                              value={location.deadline}
                              onChange={(e) => handleDeadlineChange(e, index)}
                              placeholder="حدد الموعد النهائي"
                              className="w-full p-2 border rounded-lg"
                            />
                          </div>
                        ))}
                      </form>
                      <button
                        type="button"
                        onClick={addTaskToTable}
                        className="w-full mt-3 bg-[#9685CF] hover:bg-[#FFA842] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        إضافة المهمة
                      </button>
                    </div>
                  </div>
                  {/* قائمة المهام */}
                  {taskList.length > 0 && (
                    <div className="mt-4">
                      <h2 className="text-2xl font-semibold p-3 text-black">
                        قائمة المهام
                      </h2>
                      <table className="w-full bg-white rounded-lg shadow-md">
                        <thead>
                          <tr>
                            <th className="p-2 border">العنوان</th>
                            <th className="p-2 border">الموعد النهائي</th>
                            <th className="p-2 border">إجراء</th>
                          </tr>
                        </thead>
                        <tbody>
                          {taskList.map((task, index) => (
                            <tr key={index}>
                              <td className="p-2 border">{task.address}</td>
                              <td className="p-2 border">{task.deadline}</td>
                              <td className="p-2 border text-center">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => removeTaskFromTable(index)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {taskList.length > 0 && (
                    <button
                      onClick={confirmSchedule}
                      className="w-full bg-[#FFA842] hover:bg-[#9685CF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                      تأكيد الجدول
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

      {isModalOpen && (
        <LocationChooserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveLocation}
        />
      )}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        taskList={taskList}
        routeInfo={routeInfo}
      />
      <BusyTimeModal
        isOpen={isBusyTimeModalOpen}
        onClose={() => setIsBusyTimeModalOpen(false)}
        onSave={handleSaveBusyTime}
      />
    </>
  );
};

export default SchedulerPage;
