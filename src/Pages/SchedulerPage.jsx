import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import BestRouteModal from "../Components/BestRouteModal";
import LocationChooserModal from "../Components/LocationChooserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faHome,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../Components/Popup";

const SchedulerPage = () => {
  const [formData, setFormData] = useState({
    locations: [
      { address: "", deadline: "", position: { lat: null, lng: null } },
    ],
  });
  const [imageURL, setImageURL] = useState("");

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [bestRoute, setBestRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationType, setLocationType] = useState(null);

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
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
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
            const placeId = place.place_id;

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

            if (placeId) {
              fetchPlaceDetails(placeId, (details) => {
                setFormData((prevFormData) => ({
                  locations: prevFormData.locations.map((loc, i) =>
                    i === index
                      ? {
                          ...loc,
                          address: details.address,
                          photoUrl: details.photoUrl,
                        }
                      : loc
                  ),
                }));
              });
            }
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
  console.log(formData);

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
    const dummyTaskList = [
      {
        address:
          "شركة عبدالعزيز الدليقان للمقاولات، شارع الجائزة، Riyadh Saudi Arabia",
      },
      { address: "8330, 4182 نجران، ظهرة لبن، الرياض 13784, Saudi Arabia" },
    ];

    if (dummyTaskList.length < 2) {
      toast("Add more tasks before scheduling!");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const origin = dummyTaskList[0].address;
    const destinations = dummyTaskList.slice(1).map((task) => task.address);

    console.log(
      "Testing route duration for each hour of the week using pessimistic traffic model"
    );

    const requests = [];
    const now = new Date();

    destinations.forEach((destination, destIndex) => {
      // Loop through each hour of the week
      for (let day = 0; day < 7; day++) {
        // 7 days
        for (let hour = 0; hour < 24; hour++) {
          // 24 hours
          const departureTime = new Date(
            now.getTime() + (day * 24 + hour) * 3600000
          ); // every hour for a week

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

          console.log(
            `Request being sent for destination ${
              destIndex + 1
            }, departure time: ${departureTime.toLocaleString()}`
          );
          console.log("Request details:", request);

          requests.push(
            new Promise((resolve, reject) => {
              directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  const route = result.routes[0];
                  // Sum up the duration_in_traffic for all legs
                  const totalDurationInTraffic = route.legs.reduce(
                    (total, leg) => total + leg.duration_in_traffic.value,
                    0
                  );
                  // Calculate arrival time
                  const arrivalTime = new Date(
                    departureTime.getTime() + totalDurationInTraffic * 1000
                  );
                  resolve({
                    destinationIndex: destIndex,
                    departureTime,
                    totalDurationInTraffic,
                    arrivalTime,
                  });
                } else {
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

        validResults.forEach(
          ({
            destinationIndex,
            departureTime,
            totalDurationInTraffic,
            arrivalTime,
          }) => {
            console.log(
              `Destination: ${
                destinations[destinationIndex]
              }, Departure time: ${departureTime.toLocaleString()}, Total duration in traffic: ${
                totalDurationInTraffic / 60
              } minutes, Arrival time: ${arrivalTime.toLocaleString()}`
            );
          }
        );

        destinations.forEach((destination, destIndex) => {
          const destinationResults = validResults.filter(
            (result) => result.destinationIndex === destIndex
          );

          const bestDeparture = destinationResults.reduce((best, current) =>
            current.totalDurationInTraffic < best.totalDurationInTraffic
              ? current
              : best
          );
          const worstDeparture = destinationResults.reduce((worst, current) =>
            current.totalDurationInTraffic > worst.totalDurationInTraffic
              ? current
              : worst
          );

          console.log(
            `Best departure time for destination ${destination}:`,
            bestDeparture.departureTime
          );
          console.log(
            `Shortest estimated total duration in traffic for destination ${destination}:`,
            bestDeparture.totalDurationInTraffic,
            "seconds"
          );
          console.log(
            `Best arrival time for destination ${destination}:`,
            bestDeparture.arrivalTime
          );

          console.log(
            `Worst departure time for destination ${destination}:`,
            worstDeparture.departureTime
          );
          console.log(
            `Longest estimated total duration in traffic for destination ${destination}:`,
            worstDeparture.totalDurationInTraffic,
            "seconds"
          );
          console.log(
            `Worst arrival time for destination ${destination}:`,
            worstDeparture.arrivalTime
          );

          toast.success(
            `For destination ${destination}, the best departure time is ${bestDeparture.departureTime.toLocaleString()} with an estimated total duration of ${Math.round(
              bestDeparture.totalDurationInTraffic / 60
            )} minutes, arriving at ${bestDeparture.arrivalTime.toLocaleString()}.`
          );
          toast.info(
            `For destination ${destination}, the worst departure time is ${worstDeparture.departureTime.toLocaleString()} with an estimated total duration of ${Math.round(
              worstDeparture.totalDurationInTraffic / 60
            )} minutes, arriving at ${worstDeparture.arrivalTime.toLocaleString()}.`
          );
        });
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
        toast.error(`Error fetching routes: ${error.status}`);
      });
  };

  const openLocationChooser = (type) => {
    setLocationType(type);
    setIsModalOpen(true);
  };

  const handleSaveLocation = ({ address, position }) => {
    localStorage.setItem(locationType, JSON.stringify({ address, position }));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar onMenuClick={toggleSidebar} />

        <div className="flex flex-col flex-grow bg-transparent">
          <div className="absolute top-0 z-50 bg-transparent flex items-center justify-between p-4">
            <input
              type="text"
              placeholder="ابحث ..."
              className="px-4 py-2 rounded-lg bg-white max-sm:hidden input-disabled select-disabled"
            />
            <div className="flex items-center gap-4 space-x-4">
              <FontAwesomeIcon
                icon={faHome}
                className="text-2xl cursor-pointer text-[#9685cf]"
                onClick={() => openLocationChooser("home")}
              />
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-2xl cursor-pointer text-[#9685cf]"
                onClick={() => confirmSchedule()}
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
                        <h2 className="text-2xl font-semibold p-3">
                          إضافة مهام
                        </h2>
                        <form onSubmit={handleSubmit}>
                          {formData.locations.map((location, index) => (
                            <div
                              key={index}
                              className="p-4 bg-white rounded-lg shadow-md space-y-2"
                            >
                              <img src={location.photoUrl} />
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
      {bestRoute && (
        <BestRouteModal route={bestRoute} onClose={() => setBestRoute(null)} />
      )}
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