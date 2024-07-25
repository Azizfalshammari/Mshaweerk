import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../Components/Sidebar";
import LocationChooserModal from "../Components/LocationChooserModal";
import ScheduleModal from "../Components/ScheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BusyTimeModal from "../Components/BusyTimeModal";
import HomeIcon from "./HomeIcon";
import WorkIcon from "./WorkIcon";
import TimeIcon from "./TimeIcon";
import '../App.css'
const SchedulerPage = () => {

  const [formData, setFormData] = useState({
    locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
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

  // const removeTaskFromTable = (index) => {
  //   const updatedTaskList = taskList.filter((_, i) => i !== index);
  //   setTaskList(updatedTaskList);

  //   if (markers[index]) {
  //     markers[index].setMap(null);
  //     setMarkers(markers.filter((_, i) => i !== index));
  //   }
  // };

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

  const confirmSchedule = () => {
    const notify = () => toast("من فضلك ادخل موقع منزلك او عملك");

    const home = localStorage.getItem("home");
    const work = localStorage.getItem("work");

    if (!home && !work) {
      notify();
      return;
    }

    const origin = home
      ? JSON.parse(home)?.address
      : work
      ? JSON.parse(work)?.address
      : null;

    if (!origin) {
      notify();
      return;
    }

    if (taskList.length <= 0) {
      toast("Add more tasks before scheduling!");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const destinations = taskList.map((task) => task.address);

    const isTimeBusy = (time) => {
      return busyTimes.some((busyTime) => {
        const [busyStartHours, busyStartMinutes] = busyTime.start
          .split(":")
          .map(Number);
        const [busyEndHours, busyEndMinutes] = busyTime.end
          .split(":")
          .map(Number);

        const busyStartTime = new Date(time);
        busyStartTime.setHours(busyStartHours, busyStartMinutes, 0, 0);

        const busyEndTime = new Date(time);
        busyEndTime.setHours(busyEndHours, busyEndMinutes, 0, 0);

        return time >= busyStartTime && time <= busyEndTime;
      });
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
    console.log(`the point is ${origin}`);
    const scheduledTasks = [];
    destinations.forEach((destination, destIndex) => {
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          const departureTime = new Date(now.getTime());
          departureTime.setDate(now.getDate() + day);
          departureTime.setHours(hour, 0, 0, 0);

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
                    bestRouteName: route.summary,
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

          console.log(`Task Address: ${task.address}`);
          console.log(
            `Best Departure Time: ${bestDeparture.departureTime.toLocaleString()}`
          );
          console.log(
            `Arrival Time: ${bestDeparture.arrivalTime.toLocaleString()}`
          );
          console.log(`Distance: ${bestDeparture.distance}`);
          console.log(`Duration: ${bestDeparture.duration}`);
          console.log(`Best Route Name: ${bestDeparture.bestRouteName}`);
          console.log("---");
          console.log(`origin point is ${origin}`);

          const scheduledTasksForCurrent = scheduledTasks.filter(
            (scheduledTask) =>
              isOverlap(bestDeparture, {
                departureTime: scheduledTask.departureTime,
                arrivalTime: scheduledTask.arrivalTime,
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
                origin: origin,
                bestTime: bestDeparture.departureTime,

                bestRoute: bestDeparture.bestRouteName,
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

  // const handleLocationChange = (event, index) => {
  //   const { value } = event.target;
  //   const updatedLocations = [...formData.locations];
  //   updatedLocations[index].address = value;
  //   if (event.position) {
  //     updatedLocations[index].position = event.position;
  //   }
  //   setFormData({ ...formData, locations: updatedLocations });
  // };

  // const handleDeadlineChange = (event, index) => {
  //   const { value } = event.target;
  //   const updatedLocations = [...formData.locations];
  //   updatedLocations[index].deadline = value;

  //   if (
  //     updatedLocations[index].position.lat &&
  //     updatedLocations[index].position.lng
  //   ) {
  //     const marker = new window.google.maps.Marker({
  //       position: updatedLocations[index].position,
  //       map,
  //     });
  //     map.setCenter(updatedLocations[index].position);
  //     setMarkers((prevMarkers) => [...prevMarkers, marker]);
  //   }

  //   setFormData({ ...formData, locations: updatedLocations });
  // };

  // const addTaskToTable = () => {
  //   const updatedTaskList = [...taskList, ...formData.locations];
  //   setTaskList(updatedTaskList);
  //   setFormData({ locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }] });
  // };

  const removeTaskFromTable = (index) => {
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
    if (markers[index]) {
      markers[index].setMap(null);
      setMarkers(markers.filter((_, i) => i !== index));
    }
  };



  // const updateAddress = (position, index) => {
  //   const geocoder = new window.google.maps.Geocoder();
  //   geocoder.geocode({ location: position }, (results, status) => {
  //     if (status === "OK") {
  //       if (results[0]) {
  //         handleLocationChange(
  //           {
  //             target: { value: results[0].formatted_address },
  //             position,
  //           },
  //           index
  //         );
  //       }
  //     }
  //   });
  // };



  return (
    <>
      <div className="flex rounded-md h-screen">
        <Sidebar
          onMenuClick={toggleSidebar}
          onOpenLocationChooser={openLocationChooser}
          onOpenBusyTimeChooser={openBusyTimeChooser}
        />
        <div className="flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="h-full w-full relative">
              <div id="map" className="absolute inset-0"></div>
              {isSidebarVisible && (
                <div className="absolute inset-y-0 right-0 max-w-xl flex flex-col rounded-lg bg-gray-100 p-4 overflow-y-auto">
                  <h2 className="text-2xl text-center font-bold p-3 text-[#9685CF]">
                    أدخل العنوان والموعد النهائي لمشوارك
                  </h2>
                  <div className="w-full max-w-sm max-sm:w-[70vw] bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {formData.locations.map((location, index) => (
                          <div key={index} className="flex flex-col space-y-2">
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
                  {taskList.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold p-3 text-black">قائمة المهام</h2>
          <div className="overflow-y-auto max-h-64 custom-scrollbar">
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
                    <td className="p-2 border text-[#9685CF] max-w-xs truncate">
                      {task.address}
                    </td>
                    <td className="p-2 border text-[#9685CF]">
                      {task.deadline}
                    </td>
                    <td className="p-2 border text-[#9685CF]">
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
          {/* Original Overlay (Wider on Desktop) */}
          {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-white border-2 border-black rounded-lg shadow-md p-2 flex justify-around w-1/3 max-w-md max-sm:flex-row max-sm:top-14 max-sm:left-2 max-sm:bottom-auto max-sm:right-auto max-sm:translate-x-0 max-sm:w-auto">
            <div
              className="text-2xl cursor-pointer text-[#9685cf] p-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
              onClick={() => openLocationChooser("home")}
            >
              <HomeIcon className="fill-current text-[#9685cf]" />
            </div>
            <div
              className="text-2xl cursor-pointer text-[#9685cf] p-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
              onClick={() => openLocationChooser("work")}
            >
              <WorkIcon className="fill-current text-[#9685cf]" />
            </div>
            <div
              className="text-2xl cursor-pointer text-[#9685cf] p-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
              onClick={openBusyTimeChooser}
            >
              <TimeIcon className="fill-current text-[#9685cf]" />
            </div>
          </div> */}

          {/* Secondary Overlay (Closer to Sidebar) */}
          <div className="fixed bottom-0 right-52 transform -translate-x-0 mb-4 bg-white border-2 border-[#9685cf] rounded-lg shadow-md p-2 flex justify-around w-1/3 max-w-xs max-sm:flex-row max-sm:top-14 max-sm:left-2 max-sm:bottom-auto max-sm:right-auto max-sm:translate-x-0 max-sm:w-auto max-sm:p-1 max-sm:w-[90vw]">
            <div
              className="text-2xl cursor-pointer text-[#9685cf] p-2 max-sm:p-1 max-sm:mx-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
              onClick={() => openLocationChooser("home")}
            >
              <HomeIcon className="fill-current text-[#9685cf] max-sm:w-6 max-sm:h-6" />
            </div>
            <div
              className="text-2xl cursor-pointer text-[#9685cf] p-2 max-sm:p-1 max-sm:mx-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
              onClick={() => openLocationChooser("work")}
            >
              <WorkIcon className="fill-current text-[#9685cf] max-sm:w-6 max-sm:h-6" />
            </div>
            <div
              className="text-2xl cursor-pointer text-[#9685cf] p-2 max-sm:p-1 max-sm:mx-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
              onClick={openBusyTimeChooser}
            >
              <TimeIcon className="fill-current text-[#9685cf] max-sm:w-6 max-sm:h-6" />
            </div>
          </div>
        </div>
      </div>
      <Sidebar onMenuClick={toggleSidebar} />
    </>
  );
};

export default SchedulerPage;
