// import React, { useState, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
//   });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [taskList, setTaskList] = useState([]);

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         setMap(mapInstance);
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, []);

//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(
//             input
//           );
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: { value: place.formatted_address },
//                 position: {
//                   lat: place.geometry.location.lat(),
//                   lng: place.geometry.location.lng(),
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const handleLocationChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].address = value;
//     if (event.position) {
//       updatedLocations[index].position = event.position;
//     }
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;

//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const addTaskToTable = () => {
//     const location = formData.locations[0];
//     if (location.address && location.deadline) {
//       setTaskList([...taskList, location]);

//       if (location.position.lat && location.position.lng) {
//         const marker = new window.google.maps.Marker({
//           position: location.position,
//           map,
//         });
//         map.setCenter(location.position);
//         setMarkers((prevMarkers) => [...prevMarkers, marker]);
//       }

//       setFormData({
//         locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
//       });
//     }
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);

//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <>
//       <div className="flex bg-transparent relative">
//         <div className="flex flex-col w-full">
//           <div className="flex h-screen">
//             <div className="w-full">
//               <div id="map" className="h-full"></div>
//             </div>
//             <div className="w-1/3 bg-gray-100 p-3 overflow-y-auto">
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-semibold p-3 text-black">
//                   أدخل مواقع المهام والمواعيد النهائية
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {formData.locations.map((location, index) => (
//                     <div
//                       key={index}
//                       className="p-4 bg-white rounded-lg shadow-md space-y-2"
//                     >
//                       <input
//                         type="text"
//                         id={`location-${index}`}
//                         name={`location-${index}`}
//                         placeholder="أدخل العنوان"
//                         value={location.address}
//                         onChange={(e) => handleLocationChange(e, index)}
//                         className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                       />
//                       <input
//                         type="datetime-local"
//                         id={`deadline-${index}`}
//                         name={`deadline-${index}`}
//                         value={location.deadline}
//                         onChange={(e) => handleDeadlineChange(e, index)}
//                         className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                       />
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     className="bg-[#9685CF] text-black text-lg px-4 py-2 rounded-md hover:bg-[#FFA842] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                     onClick={addTaskToTable}
//                   >
//                     أضف مهمة
//                   </button>
//                 </form>
//                 {taskList.length > 0 && (
//                   <div className="mt-8">
//                     <h3 className="text-2xl font-semibold text-black p-3">
//                       قائمة المهام
//                     </h3>
//                     <table className="min-w-full bg-white rounded-lg shadow-md">
//                       <thead>
//                         <tr>
//                           <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg  font-bold text-[#9685CF] ">
//                             العنوان
//                           </th>
//                           <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg  font-bold text-[#9685CF]">
//                              الموعد النهائي
//                           </th>
//                           <th className="py-2 px-4 border-b-2 border-[#9685CF]"></th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {taskList.map((location, index) => (
//                           <tr key={index}>
//                             <td className="py-2 px-4 border-b border-gray-200">
//                               {location.address || "عنوان غير محدد"}
//                             </td>
//                             <td className="py-2 px-4 border-b border-gray-200">
//                               {location.deadline || "غير محدد"}
//                             </td>
//                             <td className="py-2 px-4 border-b border-gray-200">
//                               <button
//                                 type="button"
//                                 className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 onClick={() => removeTaskFromTable(index)}
//                               >
//                                 <FontAwesomeIcon icon={faTrash} />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Sidebar />
//     </>
//   );
// };

// export default SchedulerPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
//   });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [taskList, setTaskList] = useState([]);

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         setMap(mapInstance);
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, []);

//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(
//             input
//           );
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: { value: place.formatted_address },
//                 position: {
//                   lat: place.geometry.location.lat(),
//                   lng: place.geometry.location.lng(),
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const handleLocationChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].address = value;
//     if (event.position) {
//       updatedLocations[index].position = event.position;
//     }
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const addTaskToTable = () => {
//     const updatedTaskList = [...taskList, ...formData.locations];
//     setTaskList(updatedTaskList);

//     formData.locations.forEach((location) => {
//       if (location.position.lat && location.position.lng) {
//         const marker = new window.google.maps.Marker({
//           position: location.position,
//           map,
//         });
//         setMarkers((prevMarkers) => [...prevMarkers, marker]);
//       }
//     });

//     setFormData({ locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }] });
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);
//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   const updateAddress = (position, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: position }, (results, status) => {
//       if (status === "OK") {
//         if (results[0]) {
//           handleLocationChange(
//             {
//               target: { value: results[0].formatted_address },
//               position,
//             },
//             index
//           );
//         }
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <>
//       <div className="flex bg-transparent relative">
//         <div className="flex flex-col w-full">
//           <div className="flex h-screen">
//             <div className="w-full">
//               <div id="map" className="h-full"></div>
//             </div>
//             {isSidebarVisible && (
//               <div className="sidebar w-1/3 bg-gray-100 rounded-lg p-3 overflow-y-auto max-sm:w-[67vw] max-sm:gray-100">
//                 <div className="space-y-4">
//                   <h2 className="text-2xl font-semibold p-3 text-black">
//                     أدخل مواقع المهام والمواعيد النهائية
//                   </h2>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     {formData.locations.map((location, index) => (
//                       <div
//                         key={index}
//                         className="p-4 bg-white rounded-lg shadow-md space-y-2"
//                       >
//                         <input
//                           type="text"
//                           id={`location-${index}`}
//                           name={`location-${index}`}
//                           placeholder="أدخل العنوان"
//                           value={location.address}
//                           onChange={(e) => handleLocationChange(e, index)}
//                           className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                           required
//                         />
//                         <input
//                           type="datetime-local"
//                           id={`deadline-${index}`}
//                           name={`deadline-${index}`}
//                           value={location.deadline}
//                           onChange={(e) => handleDeadlineChange(e, index)}
//                           className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                           required
//                         />
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       className="bg-[#9685CF] text-black text-lg px-4 py-2 rounded-md hover:bg-[#FFA842] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                       onClick={addTaskToTable}
//                     >
//                       أضف مهمة
//                     </button>
//                   </form>
//                   {taskList.length > 0 && (
//                     <div className="mt-8">
//                       <h3 className="text-2xl font-semibold text-black p-3">
//                         قائمة المهام
//                       </h3>
//                       <table className="min-w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                           <tr>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
//                               العنوان
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
//                               الموعد النهائي
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF]"></th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {taskList.map((location, index) => (
//                             <tr key={index}>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.address || "عنوان غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.deadline || "غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 <button
//                                   type="button"
//                                   className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                   onClick={() => removeTaskFromTable(index)}
//                                 >
//                                   <FontAwesomeIcon icon={faTrash} />
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Sidebar onMenuClick={toggleSidebar} />
//     </>
//   );
// };

// export default SchedulerPage;

// import React, { useState, useEffect } from "react";

// import Sidebar from "../Components/Sidebar";

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
//   });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [taskList, setTaskList] = useState([]);

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         setMap(mapInstance);

//         // Add click listener to the map
//         mapInstance.addListener("click", (event) => {
//           const clickedPosition = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };

//           const marker = new window.google.maps.Marker({
//             position: clickedPosition,
//             map: mapInstance,
//           });

//           setMarkers((prevMarkers) => [...prevMarkers, marker]);
//           updateAddress(clickedPosition, formData.locations.length - 1);

//           // Show the sidebar when the map is clicked
//           setIsSidebarVisible(true);
//         });
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, []);
//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(input);
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: { value: place.formatted_address },
//                 position: {
//                   lat: place.geometry.location.lat(),
//                   lng: place.geometry.location.lng(),
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const handleLocationChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].address = value;
//     if (event.position) {
//       updatedLocations[index].position = event.position;
//     }
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;

//     if (
//       updatedLocations[index].position.lat &&
//       updatedLocations[index].position.lng
//     ) {
//       const marker = new window.google.maps.Marker({
//         position: updatedLocations[index].position,
//         map,
//       });
//       map.setCenter(updatedLocations[index].position);
//       setMarkers((prevMarkers) => [...prevMarkers, marker]);
//     }

//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const addTaskToTable = () => {
//     const updatedTaskList = [...taskList, ...formData.locations];
//     setTaskList(updatedTaskList);
//     setFormData({ locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }] });
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);
//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   const updateAddress = (position, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: position }, (results, status) => {
//       if (status === "OK") {
//         if (results[0]) {
//           handleLocationChange(
//             {
//               target: { value: results[0].formatted_address },
//               position,
//             },
//             index
//           );
//         }
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <>
//       <div className="flex bg-transparent relative">
//         <div className="flex flex-col w-full">
//           <div className="flex h-screen">
//             <div className="w-full">
//               <div id="map" className="h-full"></div>
//               </div>
//             {isSidebarVisible && (
//               <div className="sidebar w-1/3 bg-gray-100 rounded-lg p-3 overflow-y-auto max-sm:w-[67vw] max-sm:gray-100">
//                 <div className="space-y-4">
//                   <h2 className="text-2xl font-semibold p-3 text-black">
//                     أدخل مواقع المهام والمواعيد النهائية
//                   </h2>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     {formData.locations.map((location, index) => (
//                       <div
//                         key={index}
//                         className="p-4 bg-white rounded-lg shadow-md space-y-2"
//                       >
//                         <input
//                           type="text"
//                           id={`location-${index}`}
//                           name={`location-${index}`}
//                           placeholder="أدخل العنوان"
//                           value={location.address}
//                           onChange={(e) => handleLocationChange(e, index)}
//                           className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                         required/>
//                         <input
//                           type="datetime-local"
//                           id={`deadline-${index}`}
//                           name={`deadline-${index}`}
//                           value={location.deadline}
//                           onChange={(e) => handleDeadlineChange(e, index)}
//                           className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                         required/>
//    </div>
//                     ))}
//                     <button
//                       type="button"
//                       className="bg-[#9685CF] text-black  text-lg px-4 py-2 rounded-md hover:bg-[#FFA842] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                       onClick={addTaskToTable}
//                     >
//                       أضف مهمة
//                     </button>
//                   </form>
//                   {taskList.length > 0 && (
//                     <div className="mt-8">
//                       <h3 className="text-2xl font-semibold text-black p-3">
//                         قائمة المهام
//                       </h3>
//                       <table className="min-w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                           <tr>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg  font-bold text-[#9685CF] ">
//                               العنوان
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg  font-bold text-[#9685CF]">
//                                الموعد النهائي
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF]"></th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                         {taskList.map((location, index) => (
//                             <tr key={index}>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.address || "عنوان غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.deadline || "غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 <button
//                                   type="button"
//                                   className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                   onClick={() => removeTaskFromTable(index)}
//                                 >
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Sidebar onMenuClick={toggleSidebar} />
//     </>
//   );
// };

// export default SchedulerPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
//   });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [taskList, setTaskList] = useState([]);

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         setMap(mapInstance);

//         // Add click listener to the map
//         mapInstance.addListener("click", (event) => {
//           const clickedPosition = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };

//           // Create a new marker and update the last location
//           const marker = new window.google.maps.Marker({
//             position: clickedPosition,
//             map: mapInstance,
//           });

//           setMarkers((prevMarkers) => {
//             // Remove the last marker if it exists
//             if (prevMarkers.length > 0) {
//               prevMarkers[prevMarkers.length - 1].setMap(null);
//             }
//             return [...prevMarkers, marker];
//           });

//           updateAddress(clickedPosition, formData.locations.length - 1);

//           // Show the sidebar when the map is clicked
//           setIsSidebarVisible(true);
//         });
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, []);

//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(input);
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: { value: place.formatted_address },
//                 position: {
//                   lat: place.geometry.location.lat(),
//                   lng: place.geometry.location.lng(),
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const handleLocationChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].address = value;
//     if (event.position) {
//       updatedLocations[index].position = event.position;
//     }
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const addTaskToTable = () => {
//     const updatedTaskList = [...taskList, ...formData.locations];
//     setTaskList(updatedTaskList);

//     // Remove the marker from the map if it exists
//     if (markers.length > 0) {
//       markers[markers.length - 1].setMap(null);
//     }

//     setFormData({ locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }] });
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);
//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   const updateAddress = (position, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: position }, (results, status) => {
//       if (status === "OK") {
//         if (results[0]) {
//           handleLocationChange(
//             {
//               target: { value: results[0].formatted_address },
//               position,
//             },
//             index
//           );
//         }
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <>
//       <div className="flex bg-transparent relative">
//         <div className="flex flex-col w-full">
//           <div className="flex h-screen">
//             <div className="w-full">
//               <div id="map" className="h-full"></div>
//             </div>
//             {isSidebarVisible && (
//               <div className="sidebar w-1/3 bg-gray-100 rounded-lg p-3 overflow-y-auto max-sm:w-[67vw] max-sm:gray-100">
//                 <div className="space-y-4">
//                   <h2 className="text-2xl font-semibold p-3 text-black">
//                     أدخل مواقع المهام والمواعيد النهائية
//                   </h2>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     {formData.locations.map((location, index) => (
//                       <div
//                         key={index}
//                         className="p-4 bg-white rounded-lg shadow-md space-y-2"
//                       >
//                         <input
//                           type="text"
//                           id={`location-${index}`}
//                           name={`location-${index}`}
//                           placeholder="أدخل العنوان"
//                           value={location.address}
//                           onChange={(e) => handleLocationChange(e, index)}
//                           className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                         required/>
//                         <input
//                           type="datetime-local"
//                           id={`deadline-${index}`}
//                           name={`deadline-${index}`}
//                           value={location.deadline}
//                           onChange={(e) => handleDeadlineChange(e, index)}
//                           className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                         required/>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       className="bg-[#9685CF] text-black text-lg px-4 py-2 rounded-md hover:bg-[#FFA842] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                       onClick={addTaskToTable}
//                     >
//                       أضف مهمة
//                     </button>
//                   </form>
//                   {taskList.length > 0 && (
//                     <div className="mt-8">
//                       <h3 className="text-2xl font-semibold text-black p-3">
//                         قائمة المهام
//                       </h3>
//                       <table className="min-w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                           <tr>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
//                               العنوان
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
//                               الموعد النهائي
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF]"></th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {taskList.map((location, index) => (
//                             <tr key={index}>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.address || "عنوان غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.deadline || "غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 <button
//                                   type="button"
//                                   className="text-red-500 focus:outline-none focus:ring-2
//                                   focus:ring-red-500"
//                                   onClick={() => removeTaskFromTable(index)}
//                                 >
//                                   حذف
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Sidebar onMenuClick={toggleSidebar} />
//     </>
//   );
// };

// export default SchedulerPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }],
//   });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [taskList, setTaskList] = useState([]);
//   const [currentMarker, setCurrentMarker] = useState(null); // Track the current marker

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         setMap(mapInstance);

//         mapInstance.addListener("click", (event) => {
//           const clickedPosition = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };

//           if (currentMarker) {
//             currentMarker.setPosition(clickedPosition);
//             updateAddress(clickedPosition, 0); // Update the first location's address
//           } else {
//             const marker = new window.google.maps.Marker({
//               position: clickedPosition,
//               map: mapInstance,
//             });
//             setCurrentMarker(marker);
//             setFormData(prevFormData => ({
//               locations: [{ address: "", deadline: "", position: clickedPosition }],
//             }));
//             setMarkers([marker]);
//             setIsSidebarVisible(true);
//           }
//         });
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, [currentMarker]);

//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(input);
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: { value: place.formatted_address },
//                 position: {
//                   lat: place.geometry.location.lat(),
//                   lng: place.geometry.location.lng(),
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const handleLocationChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].address = value;
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;
//     setFormData({ ...formData, locations: updatedLocations });

//     if (currentMarker && updatedLocations[index].position.lat && updatedLocations[index].position.lng) {
//       currentMarker.setPosition(updatedLocations[index].position);
//       map.setCenter(updatedLocations[index].position);
//     }
//   };

//   const addTaskToTable = () => {
//     const newLocations = [...formData.locations];
//     if (newLocations.length > 0) {
//       const updatedTaskList = [...taskList, ...newLocations];
//       setTaskList(updatedTaskList);
//       setFormData({ locations: [{ address: "", deadline: "", position: { lat: null, lng: null } }] });
//       if (currentMarker) {
//         currentMarker.setMap(null); // Remove the marker from the map
//         setCurrentMarker(null);
//       }
//     }
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);

//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   const updateAddress = (position, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: position }, (results, status) => {
//       if (status === "OK") {
//         if (results[0]) {
//           handleLocationChange(
//             {
//               target: { value: results[0].formatted_address },
//               position,
//             },
//             index
//           );
//         }
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <>
//       <div className="flex bg-transparent relative">
//         <div className="flex flex-col w-full">
//           <div className="flex h-screen">
//             <div className="w-full">
//               <div id="map" className="h-full"></div>
//             </div>
//             {isSidebarVisible && (
//               <div className="sidebar w-1/3 bg-gray-100 rounded-lg p-3 overflow-y-auto max-sm:w-[67vw] max-sm:gray-100">
//                 <div className="space-y-4">
//                   <h2 className="text-2xl font-semibold p-3 text-black">
//                     أدخل مواقع المهام والمواعيد النهائية
//                   </h2>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     {formData.locations.map((location, index) => (
//                       <div
//                         key={index}
//                         className="p-4 bg-white rounded-lg shadow-md space-y-2"
//                       >
//                         <input
//                           type="text"
//                           id={`location-${index}`}
//                           name={`location-${index}`}
//                           placeholder="أدخل العنوان"
//                           value={location.address}
//                           onChange={(e) => handleLocationChange(e, index)}
//                           className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                           required
//                         />
//                         <input
//                           type="datetime-local"
//                           id={`deadline-${index}`}
//                           name={`deadline-${index}`}
//                           value={location.deadline}
//                           onChange={(e) => handleDeadlineChange(e, index)}
//                           className="block w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                           required
//                         />
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       className="bg-[#9685CF] text-black text-lg px-4 py-2 rounded-md hover:bg-[#FFA842] focus:outline-none focus:ring-2 focus:ring-[#9685CF]"
//                       onClick={addTaskToTable}
//                     >
//                       أضف مهمة
//                     </button>
//                   </form>
//                   {taskList.length > 0 && (
//                     <div className="mt-8">
//                       <h3 className="text-2xl font-semibold text-black p-3">
//                         قائمة المهام
//                       </h3>
//                       <table className="min-w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                           <tr>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
//                               العنوان
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF] text-right text-lg font-bold text-[#9685CF]">
//                               الموعد النهائي
//                             </th>
//                             <th className="py-2 px-4 border-b-2 border-[#9685CF]"></th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {taskList.map((location, index) => (
//                             <tr key={index}>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.address || "عنوان غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 {location.deadline || "غير محدد"}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-200">
//                                 <button
//                                   type="button"
//                                   className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                   onClick={() => removeTaskFromTable(index)}
//                                 >
//                                   حذف
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Sidebar onMenuClick={toggleSidebar} />
//     </>
//   );
// };

// export default SchedulerPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";
// import LocationChooserModal from "../Components/LocationChooserModal";
// import ScheduleModal from "../Components/ScheduleModal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTrash,
//   faHome,
//   faBriefcase,
//   faClock,
// } from "@fortawesome/free-solid-svg-icons";
// import BusyTimeModal from "../Components/BusyTimeModal";
// import { auth, datastore } from "../config/firbase";
// import { doc, getDoc } from "firebase/firestore";

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [
//       { address: "", deadline: "", position: { lat: null, lng: null } },
//     ],
//   });
//   const [map, setMap] = useState(null);
//   const [busyTime, setBusyTime] = useState({});
//   const [markers, setMarkers] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [taskList, setTaskList] = useState([]);
//   const [currentMarker, setCurrentMarker] = useState(null);
//   const [routeInfo, setRouteInfo] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [locationType, setLocationType] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [homeLocation, setHomeLocation] = useState(
//     JSON.parse(localStorage.getItem("home")) || null
//   );
//   const [workLocation, setWorkLocation] = useState(
//     JSON.parse(localStorage.getItem("work")) || null
//   );
//   const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
//   const [busyTimes, setBusyTimes] = useState([]);
//   const [isBusyTimeModalOpen, setIsBusyTimeModalOpen] = useState(false);

//   const handleLocationChange = (event, index) => {
//     const { value, position } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index] = {
//       ...updatedLocations[index],
//       address: value,
//       position: position
//         ? { lat: position.lat(), lng: position.lng() }
//         : updatedLocations[index].position,
//     };
//     setFormData({ ...formData, locations: updatedLocations });
//   };
//   useEffect(() => {
//     const users = async () => {
//       const user = auth.currentUser;
//       const x = await getDoc(doc(datastore, "users", user.uid));
//       if (x.exists()) {
//         const busyTime = x.data().busyTime;
//         setBusyTime(busyTime);
//       }
//     };
//     users();
//   }, []);

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;
//     setFormData({ ...formData, locations: updatedLocations });

//     if (
//       currentMarker &&
//       updatedLocations[index].position.lat &&
//       updatedLocations[index].position.lng
//     ) {
//       currentMarker.setPosition(updatedLocations[index].position);
//       map.setCenter(updatedLocations[index].position);
//     }
//   };

//   const addTaskToTable = () => {
//     const newLocations = [...formData.locations];
//     if (newLocations.length > 0) {
//       const updatedTaskList = [
//         ...taskList,
//         ...newLocations.filter((loc) => loc.position.lat && loc.position.lng),
//       ];
//       setTaskList(updatedTaskList);
//       setFormData({
//         locations: [
//           { address: "", deadline: "", position: { lat: null, lng: null } },
//         ],
//       });
//       if (currentMarker) {
//         currentMarker.setMap(null);
//         setCurrentMarker(null);
//       }
//     }
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);

//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   const updateAddress = (position, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: position }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         handleLocationChange(
//           {
//             target: { value: results[0].formatted_address, position },
//           },
//           index
//         );
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   const handleAddBusyTime = (newBusyTime) => {
//     setBusyTimes([...busyTimes, newBusyTime]);
//   };

//   const isTaskInBusyTime = (taskTime) => {
//     return busyTimes.some((taskTime) => {
//       const taskDate = new Date(taskTime);
//       const startTime = new Date(taskTime.start);
//       const endTime = new Date(taskTime.end);
//       return taskDate >= startTime && taskDate <= endTime;
//     });
//   };

//   const confirmSchedule = () => {
//     const notify = () => toast("من فضلك ادخل موقع منزلك او عملك");

//     const home = localStorage.getItem("home");
//     const work = localStorage.getItem("work");

//     if (!home || !work) {
//       notify();
//       return;
//     }

//     if (taskList.length < 2) {
//       toast("Add more tasks before scheduling!");
//       return;
//     }

//     const directionsService = new window.google.maps.DirectionsService();
//     const origin = JSON.parse(home).address;
//     const destinations = taskList.map((task) => task.address);

//     console.log("Testing route duration for each hour of the week using the pessimistic traffic model");

//     const requests = [];
//     const now = new Date();

//     destinations.forEach((destination, destIndex) => {
//       for (let day = 0; day < 7; day++) {
//         for (let hour = 0; hour < 24; hour++) {
//           const departureTime = new Date(now.getTime() + (day * 24 + hour) * 3600000);
//           const request = {
//             origin,
//             destination,
//             travelMode: window.google.maps.TravelMode.DRIVING,
//             drivingOptions: {
//               departureTime,
//               trafficModel: "bestguess",
//             },
//             provideRouteAlternatives: true,
//             unitSystem: window.google.maps.UnitSystem.METRIC,
//           };

//           console.log(`Request being sent for destination ${destIndex + 1}, departure time: ${departureTime.toLocaleString()}`);
//           console.log("Request details:", request);

//           requests.push(
//             new Promise((resolve, reject) => {
//               directionsService.route(request, (result, status) => {
//                 if (status === window.google.maps.DirectionsStatus.OK) {
//                   const route = result.routes[0];
//                   const totalDurationInTraffic = route.legs.reduce(
//                     (total, leg) => total + leg.duration_in_traffic.value,
//                     0
//                   );
//                   const arrivalTime = new Date(departureTime.getTime() + totalDurationInTraffic * 1000);
//                   resolve({
//                     destinationIndex: destIndex,
//                     departureTime,
//                     totalDurationInTraffic,
//                     arrivalTime,
//                   });
//                 } else {
//                   reject({
//                     status,
//                     destinationIndex: destIndex,
//                     departureTime,
//                   });
//                 }
//               });
//             })
//           );
//         }
//       }
//     });

//     Promise.allSettled(requests)
//       .then((results) => {
//         const validResults = results
//           .filter(({ status }) => status === "fulfilled")
//           .map(({ value }) => value);

//         if (validResults.length === 0) {
//           toast.error("Failed to fetch routes.");
//           return;
//         }

//         validResults.forEach(({ destinationIndex, departureTime, totalDurationInTraffic, arrivalTime }) => {
//           console.log(`Destination: ${destinations[destinationIndex]}, Departure time: ${departureTime.toLocaleString()}, Total duration in traffic: ${totalDurationInTraffic / 60} minutes, Arrival time: ${arrivalTime.toLocaleString()}`);
//         });

//         destinations.forEach((destination, destIndex) => {
//           const destinationResults = validResults.filter((result) => result.destinationIndex === destIndex);

//           const bestDeparture = destinationResults.reduce((best, current) => current.totalDurationInTraffic < best.totalDurationInTraffic ? current : best);
//           const worstDeparture = destinationResults.reduce((worst, current) => current.totalDurationInTraffic > worst.totalDurationInTraffic ? current : worst);

//           // console.log(`Best departure time for destination ${destination}:`, bestDeparture.departureTime);
//           // console.log(`Shortest estimated total duration in traffic for destination ${destination}:`, bestDeparture.totalDurationInTraffic, "seconds");
//           // console.log(`Best arrival time for destination ${destination}:`, bestDeparture.arrivalTime);

//           // console.log(`Worst departure time for destination ${destination}:`, worstDeparture.departureTime);
//           // console.log(`Longest estimated total duration in traffic for destination ${destination}:`, worstDeparture.totalDurationInTraffic, "seconds");
//           // console.log(`Worst arrival time for destination ${destination}:`, worstDeparture.arrivalTime);

//           toast.success(`For destination ${destination}, افضل وقت للمهمة هو ${bestDeparture.departureTime.toLocaleString()} بإجمالي مدة تبلغ${Math.round(bestDeparture.totalDurationInTraffic / 60)} دقيقة, الوصول إلى ${bestDeparture.arrivalTime.toLocaleString()}.`);
//           toast.info(`For destination ${destination}, اسوأ وقت للمهمة هو ${worstDeparture.departureTime.toLocaleString()} بإجمالي مدة تبلغ ${Math.round(worstDeparture.totalDurationInTraffic / 60)} دقيقة, الوصول في ${worstDeparture.arrivalTime.toLocaleString()}.`);
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching routes:", error);
//         toast.error(`Error fetching routes: ${error.status}`);
//       });
//   };

//   const calculateBestTime = (durationInSeconds) => {
//     const now = new Date();
//     now.setSeconds(now.getSeconds() + durationInSeconds);
//     return now.toLocaleTimeString(); // Returns time in HH:MM:SS format
//   };

//   const openLocationChooser = (type) => {
//     setLocationType(type);
//     setIsModalOpen(true);
//   };

//   const handleSaveLocation = ({ address, position }) => {
//     const locationData = { address, position };
//     localStorage.setItem(locationType, JSON.stringify(locationData));
//     if (locationType === "home") setHomeLocation(locationData);
//     if (locationType === "work") setWorkLocation(locationData);
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src ="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places";
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         const directionsRendererInstance =
//           new window.google.maps.DirectionsRenderer();
//         directionsRendererInstance.setMap(mapInstance);
//         setDirectionsRenderer(directionsRendererInstance);

//         setMap(mapInstance);

//         mapInstance.addListener("click", (event) => {
//           const clickedPosition = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };
//           if (currentMarker) {
//             currentMarker.setPosition(clickedPosition);
//             updateAddress(clickedPosition, 0);
//           } else {
//             const marker = new window.google.maps.Marker({
//               position: clickedPosition,
//               map: mapInstance,
//             });
//             setCurrentMarker(marker);
//             setFormData((prevFormData) => ({
//               locations: [
//                 ...prevFormData.locations,
//                 { address: "", deadline: "", position: clickedPosition },
//               ],
//             }));
//             setMarkers([marker]);
//             setIsSidebarVisible(true);
//           }
//         });
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, [currentMarker]);

//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(
//             input
//           );
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: {
//                   value: place.formatted_address,
//                   position: place.geometry.location,
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const openBusyTimeChooser = () => {
//     setIsBusyTimeModalOpen(true);
//   };

//   return (
//     <>
//       <div className="flex rounded-md h-screen">
//         {/* Sidebar */}
//         <Sidebar onMenuClick={toggleSidebar} />
//         {/* Main Content */}
//         <div className="flex flex-col flex-grow">
//           <div className=" flex items-center justify-between self-end p-4">
//             <div className="flex items-center gap-4 space-x-4">
//               <FontAwesomeIcon
//                 icon={faHome}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={() => openLocationChooser("home")}
//               />
//               <FontAwesomeIcon
//                 icon={faBriefcase}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={() => openLocationChooser("work")}
//               />
//               <FontAwesomeIcon
//                 icon={faClock}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={openBusyTimeChooser}
//               />
//             </div>
//           </div>
//           <div className="flex-grow">
//             <div className="h-full w-full relative">
//               <div id="map" className="absolute inset-0"></div>
//               {isSidebarVisible && (
//                 <div className="absolute inset-y-0 right-0 w-full max-w-md flex flex-col rounded-lg bg-gray-100 p-4 overflow-y-auto">
//                   <h2 className="text-2xl text-center font-bold p-3 text-[#9685CF]">
//                     أدخل العنوان والموعد النهائي لمشوارك
//                   </h2>
//                   <div className="w-full max-w-sm max-sm:w-full bg-white rounded-lg shadow-lg overflow-hidden">
//                     <div className="p-4">
//                       <form onSubmit={handleSubmit} className="space-y-4">
//                         {formData.locations.map((location, index) => (
//                           <div key={index} className="flex flex-col space-y-2">
//                             <input
//                               id={`location-${index}`}
//                               type="text"
//                               value={location.address}
//                               onChange={(e) => handleLocationChange(e, index)}
//                               placeholder=" العنوان"
//                               className="w-full p-2 border rounded-lg"
//                             />
//                             <input
//                               type="datetime-local"
//                               value={location.deadline}
//                               onChange={(e) => handleDeadlineChange(e, index)}
//                               placeholder="حدد الموعد النهائي"
//                               className="w-full p-2 border rounded-lg"
//                             />
//                           </div>
//                         ))}
//                       </form>
//                       <button
//                         type="button"
//                         onClick={addTaskToTable}
//                         className="w-full mt-3 bg-[#9685CF] hover:bg-[#FFA842] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       >
//                         إضافة المهمة
//                       </button>
//                     </div>
//                   </div>
//                   {/* قائمة المهام */}
//                   {taskList.length > 0 && (
//                     <div className="mt-4">
//                       <h2 className="text-2xl font-semibold p-3 text-black">
//                         قائمة المهام
//                       </h2>
//                       <table className="w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                           <tr>
//                             <th className="p-2 border">العنوان</th>
//                             <th className="p-2 border">الموعد النهائي</th>
//                             <th className="p-2 border">إجراء</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {taskList.map((task, index) => (
//                             <tr key={index}>
//                               <td className="p-2 border">{task.address}</td>
//                               <td className="p-2 border">{task.deadline}</td>
//                               <td className="p-2 border text-center">
//                                 <FontAwesomeIcon
//                                   icon={faTrash}
//                                   className="text-red-500 cursor-pointer"
//                                   onClick={() => removeTaskFromTable(index)}
//                                 />
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                   {taskList.length > 0 && (
//                     <button
//                       onClick={confirmSchedule}
//                       className="w-full bg-[#FFA842] hover:bg-[#9685CF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
//                     >
//                       تأكيد الجدول
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />

//       {isModalOpen && (
//         <LocationChooserModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveLocation}
//         />
//       )}
//       <ScheduleModal
//         isOpen={isScheduleModalOpen}
//         onClose={() => setIsScheduleModalOpen(false)}
//         taskList={taskList}
//         routeInfo={routeInfo}
//       />
//       <BusyTimeModal
//         isOpen={isBusyTimeModalOpen}
//         onClose={() => setIsBusyTimeModalOpen(false)}
//         onSave={handleAddBusyTime}
//       />
//     </>
//   );
// };

// export default SchedulerPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";
// import LocationChooserModal from "../Components/LocationChooserModal";
// import ScheduleModal from "../Components/ScheduleModal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTrash,
//   faHome,
//   faBriefcase,
//   faClock,
// } from "@fortawesome/free-solid-svg-icons";
// import BusyTimeModal from "../Components/BusyTimeModal";

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [
//       { address: "", deadline: "", position: { lat: null, lng: null } },
//     ],
//   });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [taskList, setTaskList] = useState([]);
//   const [currentMarker, setCurrentMarker] = useState(null);
//   const [routeInfo, setRouteInfo] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [locationType, setLocationType] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [homeLocation, setHomeLocation] = useState(
//     JSON.parse(localStorage.getItem("home")) || null
//   );
//   const [workLocation, setWorkLocation] = useState(
//     JSON.parse(localStorage.getItem("work")) || null
//   );
//   const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
//   const [busyTimes, setBusyTimes] = useState([]);
//   const [isBusyTimeModalOpen, setIsBusyTimeModalOpen] = useState(false);

//   const handleLocationChange = (event, index) => {
//     const { value, position } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index] = {
//       ...updatedLocations[index],
//       address: value,
//       position: position
//         ? { lat: position.lat(), lng: position.lng() }
//         : updatedLocations[index].position,
//     };
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;
//     setFormData({ ...formData, locations: updatedLocations });

//     if (
//       currentMarker &&
//       updatedLocations[index].position.lat &&
//       updatedLocations[index].position.lng
//     ) {
//       currentMarker.setPosition(updatedLocations[index].position);
//       map.setCenter(updatedLocations[index].position);
//     }
//   };

//   const addTaskToTable = () => {
//     const newLocations = [...formData.locations];
//     if (newLocations.length > 0) {
//       const updatedTaskList = [
//         ...taskList,
//         ...newLocations.filter((loc) => loc.position.lat && loc.position.lng),
//       ];
//       setTaskList(updatedTaskList);
//       setFormData({
//         locations: [
//           { address: "", deadline: "", position: { lat: null, lng: null } },
//         ],
//       });
//       if (currentMarker) {
//         currentMarker.setMap(null);
//         setCurrentMarker(null);
//       }
//     }
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);

//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   const updateAddress = (position, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: position }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         handleLocationChange(
//           {
//             target: { value: results[0].formatted_address, position },
//           },
//           index
//         );
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   const handleSaveBusyTime = (newBusyTime) => {
//     setBusyTimes([...busyTimes, newBusyTime]);
//   };

//   // const isTaskInBusyTime = (taskTime) => {
//   //   return busyTimes.some((taskTime) => {
//   //     const taskDate = new Date(taskTime);
//   //     const startTime = new Date(taskTime.start);
//   //     const endTime = new Date(taskTime.end);
//   //     return taskDate >= startTime && taskDate <= endTime;
//   //   });
//   // };

//   const confirmSchedule = () => {
//     const notify = () => toast("من فضلك ادخل موقع منزلك او عملك");

//     const home = localStorage.getItem("home");
//     const work = localStorage.getItem("work");

//     if (!home || !work) {
//       notify();
//       return;
//     }

//     if (taskList.length < 2) {
//       toast("Add more tasks before scheduling!");
//       return;
//     }

//     const directionsService = new window.google.maps.DirectionsService();
//     const origin = JSON.parse(home).address;
//     const destinations = taskList.map((task) => task.address);
//     const isTimeBusy = (time) => {
//       return busyTimes.some(
//         (busyTime) =>
//           time >= new Date(`1970-01-01T${busyTime.start}:00Z`) &&
//           time <= new Date(`1970-01-01T${busyTime.end}:00Z`)
//       );
//     };

//     const isOverlap = (newTask, existingTasks) => {
//       return existingTasks.some(
//         (task) =>
//           newTask.arrivalTime > task.departureTime &&
//           newTask.departureTime < task.arrivalTime
//       );
//     };

//     const requests = [];
//     const now = new Date();

//     destinations.forEach((destination, destIndex) => {
//       for (let day = 0; day < 7; day++) {
//         for (let hour = 0; hour < 24; hour++) {
//           const departureTime = new Date(
//             now.getTime() + (day * 24 + hour) * 3600000
//           );
//           if (isTimeBusy(departureTime)) continue;

//           const request = {
//             origin,
//             destination,
//             travelMode: window.google.maps.TravelMode.DRIVING,
//             drivingOptions: {
//               departureTime,
//               trafficModel: "bestguess",
//             },
//             provideRouteAlternatives: true,
//             unitSystem: window.google.maps.UnitSystem.METRIC,
//           };

//           requests.push(
//             new Promise((resolve, reject) => {
//               directionsService.route(request, (result, status) => {
//                 if (status === window.google.maps.DirectionsStatus.OK) {
//                   const route = result.routes[0];
//                   const totalDurationInTraffic = route.legs.reduce(
//                     (total, leg) => total + leg.duration_in_traffic.value,
//                     0
//                   );
//                   const arrivalTime = new Date(
//                     departureTime.getTime() + totalDurationInTraffic * 1000
//                   );
//                   resolve({
//                     destinationIndex: destIndex,
//                     departureTime,
//                     totalDurationInTraffic,
//                     arrivalTime,
//                     distance: route.legs[0].distance.text,
//                     duration: route.legs[0].duration.text,
//                   });
//                 } else {
//                   reject({
//                     status,
//                     destinationIndex: destIndex,
//                     departureTime,
//                   });
//                 }
//               });
//             })
//           );
//         }
//       }
//     });

//     Promise.allSettled(requests)
//       .then((results) => {
//         const validResults = results
//           .filter(({ status }) => status === "fulfilled")
//           .map(({ value }) => value);

//         if (validResults.length === 0) {
//           toast.error("Failed to fetch routes.");
//           return;
//         }

//         const updatedTaskList = taskList.map((task, index) => {
//           const destinationResults = validResults.filter(
//             (result) => result.destinationIndex === index
//           );

//           const bestDeparture = destinationResults.reduce((best, current) =>
//             current.totalDurationInTraffic < best.totalDurationInTraffic
//               ? current
//               : best
//           );

//           return {
//             ...task,
//             routeDetails: {
//               bestTime: bestDeparture.departureTime,
//               bestRoute: `${bestDeparture.departureTime.toLocaleString()} - ${bestDeparture.arrivalTime.toLocaleString()}`,
//               distance: bestDeparture.distance,
//               duration: bestDeparture.duration,
//               day: bestDeparture.departureTime.toLocaleString("en-GB", {
//                 weekday: "long",
//               }),
//             },
//           };
//         });

//         setTaskList(updatedTaskList);
//         setRouteInfo({ validResults, origin, destinations });
//         setIsScheduleModalOpen(true);
//       })
//       .catch((error) => {
//         console.error("Error fetching routes:", error);
//       });
//   };

//   const calculateBestTime = (durationInSeconds) => {
//     const now = new Date();
//     now.setSeconds(now.getSeconds() + durationInSeconds);
//     return now.toLocaleTimeString(); // Returns time in HH:MM:SS format
//   };

//   const openLocationChooser = (type) => {
//     setLocationType(type);
//     setIsModalOpen(true);
//   };

//   const handleSaveLocation = ({ address, position }) => {
//     const locationData = { address, position };
//     localStorage.setItem(locationType, JSON.stringify(locationData));
//     if (locationType === "home") setHomeLocation(locationData);
//     if (locationType === "work") setWorkLocation(locationData);
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src =
//         "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places";
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         const directionsRendererInstance =
//           new window.google.maps.DirectionsRenderer();
//         directionsRendererInstance.setMap(mapInstance);
//         setDirectionsRenderer(directionsRendererInstance);

//         setMap(mapInstance);

//         const fetchPlaceDetails = (placeId, callback) => {
//           const service = new window.google.maps.places.PlacesService(
//             mapInstance
//           );
//           const request = {
//             placeId: placeId,
//             fields: ["formatted_address", "photos"],
//           };

//           service.getDetails(request, (place, status) => {
//             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//               const address = place.formatted_address;
//               const photo = place.photos?.[0];
//               let photoUrl = null;

//               if (photo) {
//                 photoUrl = photo.getUrl({ maxWidth: 400 });
//               }

//               console.log("Address:", address);
//               console.log("Photo URL:", photoUrl);

//               callback({
//                 address: address,
//                 photoUrl: photoUrl,
//               });
//             } else {
//               console.error("Failed to get place details:", status);
//               callback({ address: null, photoUrl: null });
//             }
//           });
//         };

//         const geocodeLatLng = (latlng, callback) => {
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode({ location: latlng }, (results, status) => {
//             if (status === "OK") {
//               if (results[0]) {
//                 const placeId = results[0]?.place_id;
//                 console.log("Place ID:", placeId);

//                 if (placeId) {
//                   fetchPlaceDetails(placeId, (details) => {
//                     callback(details);
//                   });
//                 } else {
//                   callback({
//                     address: results[0].formatted_address,
//                     photoUrl: null,
//                   });
//                 }
//               } else {
//                 console.log("");
//               }
//             } else {
//               console.log("");
//             }
//           });
//         };

//         mapInstance.addListener("click", (event) => {
//           const clickedPosition = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };

//           if (currentMarker) {
//             currentMarker.setPosition(clickedPosition);
//             updateAddress(clickedPosition, 0);
//           } else {
//             const marker = new window.google.maps.Marker({
//               position: clickedPosition,
//               map: mapInstance,
//             });
//             setMarkers([marker]);
//           }

//           geocodeLatLng(clickedPosition, (result) => {
//             setFormData((prevFormData) => ({
//               locations: [
//                 {
//                   address: result.address,
//                   deadline: "",
//                   position: clickedPosition,
//                   photoUrl: result.photoUrl,
//                 },
//               ],
//             }));
//             setIsSidebarVisible(true);
//           });
//         });
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, [currentMarker]);

//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(
//             input
//           );
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: {
//                   value: place.formatted_address,
//                   position: place.geometry.location,
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const openBusyTimeChooser = () => {
//     setIsBusyTimeModalOpen(true);
//   };

//   return (
//     <>
//       <div className="flex rounded-md h-screen">
//         {/* Sidebar */}
//         <Sidebar onMenuClick={toggleSidebar} />
//         {/* Main Content */}
//         <div className="flex flex-col flex-grow">
//           <div className=" flex items-center justify-between self-end p-4">
//             <div className="flex items-center gap-4 space-x-4">
//               <FontAwesomeIcon
//                 icon={faHome}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={() => openLocationChooser("home")}
//               />
//               <FontAwesomeIcon
//                 icon={faBriefcase}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={() => openLocationChooser("work")}
//               />
//               <FontAwesomeIcon
//                 icon={faClock}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={openBusyTimeChooser}
//               />
//             </div>
//           </div>
//           <div className="flex-grow">
//             <div className="h-full w-full relative">
//               <div id="map" className="absolute inset-0"></div>
//               {isSidebarVisible && (
//                 <div className="absolute inset-y-0 right-0 w-full max-w-md flex flex-col rounded-lg bg-gray-100 p-4 overflow-y-auto">
//                   <h2 className="text-2xl text-center font-bold p-3 text-[#9685CF]">
//                     أدخل العنوان والموعد النهائي لمشوارك
//                   </h2>
//                   <div className="w-full max-w-sm max-sm:w-full bg-white rounded-lg shadow-lg overflow-hidden">
//                     <div className="p-4">
//                       <form onSubmit={handleSubmit} className="space-y-4">
//                         {formData.locations.map((location, index) => (
//                           <div key={index} className="flex flex-col space-y-2">
//                             {/* كارد الصوره */}
//                             {/* <img src={location.photoUrl} /> */}
//                             <input
//                               id={`location-${index}`}
//                               type="text"
//                               value={location.address}
//                               onChange={(e) => handleLocationChange(e, index)}
//                               placeholder=" العنوان"
//                               className="w-full p-2 border rounded-lg"
//                             />
//                             <input
//                               type="datetime-local"
//                               value={location.deadline}
//                               onChange={(e) => handleDeadlineChange(e, index)}
//                               placeholder="حدد الموعد النهائي"
//                               className="w-full p-2 border rounded-lg"
//                             />
//                           </div>
//                         ))}
//                       </form>
//                       <button
//                         type="button"
//                         onClick={addTaskToTable}
//                         className="w-full mt-3 bg-[#9685CF] hover:bg-[#FFA842] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       >
//                         إضافة المهمة
//                       </button>
//                     </div>
//                   </div>
//                   {/* قائمة المهام */}
//                   {taskList.length > 0 && (
//                     <div className="mt-4">
//                       <h2 className="text-2xl font-semibold p-3 text-black">
//                         قائمة المهام
//                       </h2>
//                       <table className="w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                           <tr>
//                             <th className="p-2 border">العنوان</th>
//                             <th className="p-2 border">الموعد النهائي</th>
//                             <th className="p-2 border">إجراء</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {taskList.map((task, index) => (
//                             <tr key={index}>
//                               <td className="p-2 border">{task.address}</td>
//                               <td className="p-2 border">{task.deadline}</td>
//                               <td className="p-2 border text-center">
//                                 <FontAwesomeIcon
//                                   icon={faTrash}
//                                   className="text-red-500 cursor-pointer"
//                                   onClick={() => removeTaskFromTable(index)}
//                                 />
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                   {taskList.length > 0 && (
//                     <button
//                       onClick={confirmSchedule}
//                       className="w-full bg-[#FFA842] hover:bg-[#9685CF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
//                     >
//                       تأكيد الجدول
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />

//       {isModalOpen && (
//         <LocationChooserModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveLocation}
//         />
//       )}
//       <ScheduleModal
//         isOpen={isScheduleModalOpen}
//         onClose={() => setIsScheduleModalOpen(false)}
//         taskList={taskList}
//         routeInfo={routeInfo}
//       />
//       <BusyTimeModal
//         isOpen={isBusyTimeModalOpen}
//         onClose={() => setIsBusyTimeModalOpen(false)}
//         onSave={handleSaveBusyTime}
//       />
//     </>
//   );
// };

// export default SchedulerPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";
// import LocationChooserModal from "../Components/LocationChooserModal";
// import ScheduleModal from "../Components/ScheduleModal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTrash,
//   faHome,
//   faBriefcase,
//   faClock,
// } from "@fortawesome/free-solid-svg-icons";
// import BusyTimeModal from "../Components/BusyTimeModal";

// const SchedulerPage = () => {
//   const [formData, setFormData] = useState({
//     locations: [
//       { address: "", deadline: "", position: { lat: null, lng: null } },
//     ],
//   });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [taskList, setTaskList] = useState([]);
//   const [currentMarker, setCurrentMarker] = useState(null);
//   const [routeInfo, setRouteInfo] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [locationType, setLocationType] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [homeLocation, setHomeLocation] = useState(
//     JSON.parse(localStorage.getItem("home")) || null
//   );
//   const [workLocation, setWorkLocation] = useState(
//     JSON.parse(localStorage.getItem("work")) || null
//   );
//   const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
//   const [busyTimes, setBusyTimes] = useState([]);
//   const [isBusyTimeModalOpen, setIsBusyTimeModalOpen] = useState(false);

//   const handleLocationChange = (event, index) => {
//     const { value, position } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index] = {
//       ...updatedLocations[index],
//       address: value,
//       position: position
//         ? { lat: position.lat(), lng: position.lng() }
//         : updatedLocations[index].position,
//     };
//     setFormData({ ...formData, locations: updatedLocations });
//   };

//   const handleDeadlineChange = (event, index) => {
//     const { value } = event.target;
//     const updatedLocations = [...formData.locations];
//     updatedLocations[index].deadline = value;
//     setFormData({ ...formData, locations: updatedLocations });

//     if (
//       currentMarker &&
//       updatedLocations[index].position.lat &&
//       updatedLocations[index].position.lng
//     ) {
//       currentMarker.setPosition(updatedLocations[index].position);
//       map.setCenter(updatedLocations[index].position);
//     }
//   };

//   const addTaskToTable = () => {
//     const newLocations = [...formData.locations];
//     if (newLocations.length > 0) {
//       const updatedTaskList = [
//         ...taskList,
//         ...newLocations.filter((loc) => loc.position.lat && loc.position.lng),
//       ];
//       setTaskList(updatedTaskList);
//       setFormData({
//         locations: [
//           { address: "", deadline: "", position: { lat: null, lng: null } },
//         ],
//       });
//       if (currentMarker) {
//         currentMarker.setMap(null);
//         setCurrentMarker(null);
//       }
//     }
//   };

//   const removeTaskFromTable = (index) => {
//     const updatedTaskList = taskList.filter((_, i) => i !== index);
//     setTaskList(updatedTaskList);

//     if (markers[index]) {
//       markers[index].setMap(null);
//       setMarkers(markers.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };

//   const updateAddress = (position, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: position }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         handleLocationChange(
//           {
//             target: { value: results[0].formatted_address, position },
//           },
//           index
//         );
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   const handleSaveBusyTime = (newBusyTime) => {
//     setBusyTimes([...busyTimes, newBusyTime]);
//   };

//   // const isTaskInBusyTime = (taskTime) => {
//   //   return busyTimes.some((taskTime) => {
//   //     const taskDate = new Date(taskTime);
//   //     const startTime = new Date(taskTime.start);
//   //     const endTime = new Date(taskTime.end);
//   //     return taskDate >= startTime && taskDate <= endTime;
//   //   });
//   // };

//   const confirmSchedule = () => {
//     const notify = () => toast("من فضلك ادخل موقع منزلك او عملك");

//     const home = localStorage.getItem("home");
//     const work = localStorage.getItem("work");

//     if (!home || !work) {
//       notify();
//       return;
//     }

//     if (taskList.length < 2) {
//       toast("Add more tasks before scheduling!");
//       return;
//     }

//     const directionsService = new window.google.maps.DirectionsService();
//     const origin = JSON.parse(home).address;
//     const destinations = taskList.map((task) => task.address);

//     const isTimeBusy = (time) => {
//       return busyTimes.some(
//         (busyTime) =>
//           time >= new Date(`1970-01-01T${busyTime.start}:00Z`) &&
//           time <= new Date(`1970-01-01T${busyTime.end}:00Z`)
//       );
//     };

//     const isOverlap = (newTask, existingTasks = []) => {
//       if (!Array.isArray(existingTasks)) {
//         console.error("existingTasks is not an array:", existingTasks);
//         return false;
//       }

//       return existingTasks.some(
//         (task) =>
//           newTask.arrivalTime > task.departureTime &&
//           newTask.departureTime < task.arrivalTime
//       );
//     };

//     const requests = [];
//     const now = new Date();

//     const scheduledTasks = [];
//     destinations.forEach((destination, destIndex) => {
//       for (let day = 0; day < 7; day++) {
//         for (let hour = 0; hour < 24; hour++) {
//           const departureTime = new Date(
//             now.getTime() + (day * 24 + hour) * 3600000
//           );

//           if (isTimeBusy(departureTime)) continue;

//           const request = {
//             origin,
//             destination,
//             travelMode: window.google.maps.TravelMode.DRIVING,
//             drivingOptions: {
//               departureTime,
//               trafficModel: "bestguess",
//             },
//             provideRouteAlternatives: true,
//             unitSystem: window.google.maps.UnitSystem.METRIC,
//           };

//           requests.push(
//             new Promise((resolve, reject) => {
//               directionsService.route(request, (result, status) => {
//                 if (status === window.google.maps.DirectionsStatus.OK) {
//                   const route = result.routes[0];
//                   const totalDurationInTraffic = route.legs.reduce(
//                     (total, leg) => total + leg.duration_in_traffic.value,
//                     0
//                   );
//                   const arrivalTime = new Date(
//                     departureTime.getTime() + totalDurationInTraffic * 1000
//                   );
//                   resolve({
//                     destinationIndex: destIndex,
//                     departureTime,
//                     totalDurationInTraffic,
//                     arrivalTime,
//                     distance: route.legs[0].distance.text,
//                     duration: route.legs[0].duration.text,
//                   });
//                 } else {
//                   reject({
//                     status,
//                     destinationIndex: destIndex,
//                     departureTime,
//                   });
//                 }
//               });
//             })
//           );
//         }
//       }
//     });

//     Promise.allSettled(requests)
//       .then((results) => {
//         const validResults = results
//           .filter(({ status }) => status === "fulfilled")
//           .map(({ value }) => value);

//         if (validResults.length === 0) {
//           toast.error("Failed to fetch routes.");
//           return;
//         }

//         const updatedTaskList = taskList.map((task, index) => {
//           const destinationResults = validResults.filter(
//             (result) => result.destinationIndex === index
//           );

//           const bestDeparture = destinationResults.reduce((best, current) =>
//             current.totalDurationInTraffic < best.totalDurationInTraffic
//               ? current
//               : best
//           );

//           const scheduledTasksForCurrent = scheduledTasks.filter((task) =>
//             isOverlap(bestDeparture, {
//               departureTime: task.departureTime,
//               arrivalTime: task.arrivalTime,
//             })
//           );

//           if (!isOverlap(bestDeparture, scheduledTasksForCurrent)) {
//             scheduledTasks.push({
//               departureTime: bestDeparture.departureTime,
//               arrivalTime: bestDeparture.arrivalTime,
//               address: task.address,
//               distance: bestDeparture.distance,
//               duration: bestDeparture.duration,
//             });
//           }

//           return {
//             ...task,
//             routeDetails: {
//               bestTime: bestDeparture.departureTime,
//               bestRoute: `${bestDeparture.departureTime.toLocaleString()} - ${bestDeparture.arrivalTime.toLocaleString()}`,
//               distance: bestDeparture.distance,
//               duration: bestDeparture.duration,
//               day: bestDeparture.departureTime.toLocaleString("en-GB", {
//                 weekday: "long",
//               }),
//             },
//             departureTime: bestDeparture.departureTime,
//             arrivalTime: bestDeparture.arrivalTime,
//           };
//         });

//         setTaskList(updatedTaskList);
//         setRouteInfo({
//           validResults,
//           origin,
//           destinations,
//           scheduledTasks,
//         });
//         setIsScheduleModalOpen(true);
//       })
//       .catch((error) => {
//         console.error("Error fetching routes:", error);
//         toast.error(`Error fetching routes: ${error.status}`);
//       });
//   };

//   const calculateBestTime = (durationInSeconds) => {
//     const now = new Date();
//     now.setSeconds(now.getSeconds() + durationInSeconds);
//     return now.toLocaleTimeString();
//   };

//   const openLocationChooser = (type) => {
//     setLocationType(type);
//     setIsModalOpen(true);
//   };

//   const handleSaveLocation = ({ address, position }) => {
//     const locationData = { address, position };
//     localStorage.setItem(locationType, JSON.stringify(locationData));
//     if (locationType === "home") setHomeLocation(locationData);
//     if (locationType === "work") setWorkLocation(locationData);
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src =
//         "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzdv8DEMVlz1HdW6YiqZGqKeWGJxS0T0&libraries=places";
//       script.async = true;
//       script.defer = true;
//       script.onload = () => initializeMap();
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const mapCenter = { lat: latitude, lng: longitude };

//         const mapInstance = new window.google.maps.Map(
//           document.getElementById("map"),
//           {
//             center: mapCenter,
//             zoom: 12,
//           }
//         );

//         const directionsRendererInstance =
//           new window.google.maps.DirectionsRenderer();
//         directionsRendererInstance.setMap(mapInstance);
//         setDirectionsRenderer(directionsRendererInstance);

//         setMap(mapInstance);

//         const fetchPlaceDetails = (placeId, callback) => {
//           const service = new window.google.maps.places.PlacesService(
//             mapInstance
//           );
//           const request = {
//             placeId: placeId,
//             fields: ["formatted_address", "photos"],
//           };

//           service.getDetails(request, (place, status) => {
//             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//               const address = place.formatted_address;
//               const photo = place.photos?.[0];
//               let photoUrl = null;

//               if (photo) {
//                 photoUrl = photo.getUrl({ maxWidth: 400 });
//               }

//               console.log("Address:", address);
//               console.log("Photo URL:", photoUrl);

//               callback({
//                 address: address,
//                 photoUrl: photoUrl,
//               });
//             } else {
//               console.error("Failed to get place details:", status);
//               callback({ address: null, photoUrl: null });
//             }
//           });
//         };

//         const geocodeLatLng = (latlng, callback) => {
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode({ location: latlng }, (results, status) => {
//             if (status === "OK") {
//               if (results[0]) {
//                 const placeId = results[0]?.place_id;
//                 console.log("Place ID:", placeId);

//                 if (placeId) {
//                   fetchPlaceDetails(placeId, (details) => {
//                     callback(details);
//                   });
//                 } else {
//                   callback({
//                     address: results[0].formatted_address,
//                     photoUrl: null,
//                   });
//                 }
//               } else {
//                 console.log("");
//               }
//             } else {
//               console.log("");
//             }
//           });
//         };

//         mapInstance.addListener("click", (event) => {
//           const clickedPosition = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };

//           if (currentMarker) {
//             currentMarker.setPosition(clickedPosition);
//             updateAddress(clickedPosition, 0);
//           } else {
//             const marker = new window.google.maps.Marker({
//               position: clickedPosition,
//               map: mapInstance,
//             });
//             setMarkers([marker]);
//           }

//           geocodeLatLng(clickedPosition, (result) => {
//             setFormData((prevFormData) => ({
//               locations: [
//                 {
//                   address: result.address,
//                   deadline: "",
//                   position: clickedPosition,
//                   photoUrl: result.photoUrl,
//                 },
//               ],
//             }));
//             setIsSidebarVisible(true);
//           });
//         });
//       });
//     };

//     if (!window.google) {
//       loadGoogleMapsScript();
//     } else {
//       initializeMap();
//     }
//   }, [currentMarker]);

//   useEffect(() => {
//     if (window.google && map) {
//       formData.locations.forEach((location, index) => {
//         const input = document.getElementById(`location-${index}`);
//         if (input) {
//           const autocomplete = new window.google.maps.places.Autocomplete(
//             input
//           );
//           autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             handleLocationChange(
//               {
//                 target: {
//                   value: place.formatted_address,
//                   position: place.geometry.location,
//                 },
//               },
//               index
//             );
//           });
//         }
//       });
//     }
//   }, [formData.locations, map]);

//   const openBusyTimeChooser = () => {
//     setIsBusyTimeModalOpen(true);
//   };

//   return (
//     <>
//       <div className="flex rounded-md h-screen">
//         {/* Sidebar */}
//         <Sidebar onMenuClick={toggleSidebar} />
//         {/* Main Content */}
//         <div className="flex flex-col flex-grow">
//           <div className=" flex items-center justify-between self-end p-4">
//             <div className="flex items-center gap-4 space-x-4">
//               <FontAwesomeIcon
//                 icon={faHome}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={() => openLocationChooser("home")}
//               />
//               <FontAwesomeIcon
//                 icon={faBriefcase}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={() => openLocationChooser("work")}
//               />
//               <FontAwesomeIcon
//                 icon={faClock}
//                 className="text-2xl cursor-pointer text-[#9685cf]"
//                 onClick={openBusyTimeChooser}
//               />
//             </div>
//           </div>
//           <div className="flex-grow">
//             <div className="h-full w-full relative">
//               <div id="map" className="absolute inset-0"></div>
//               {isSidebarVisible && (
//                 <div className="absolute inset-y-0 right-0 w-full max-w-md flex flex-col rounded-lg bg-gray-100 p-4 overflow-y-auto">
//                   <h2 className="text-2xl text-center font-bold p-3 text-[#9685CF]">
//                     أدخل العنوان والموعد النهائي لمشوارك
//                   </h2>
//                   <div className="w-full max-w-sm max-sm:w-full bg-white rounded-lg shadow-lg overflow-hidden">
//                     <div className="p-4">
//                       <form onSubmit={handleSubmit} className="space-y-4">
//                         {formData.locations.map((location, index) => (
//                           <div key={index} className="flex flex-col space-y-2">
//                             {/* كارد الصوره */}
//                             {/* <img src={location.photoUrl} /> */}
//                             <input
//                               id={`location-${index}`}
//                               type="text"
//                               value={location.address}
//                               onChange={(e) => handleLocationChange(e, index)}
//                               placeholder=" العنوان"
//                               className="w-full p-2 border rounded-lg"
//                             />
//                             <input
//                               type="datetime-local"
//                               value={location.deadline}
//                               onChange={(e) => handleDeadlineChange(e, index)}
//                               placeholder="حدد الموعد النهائي"
//                               className="w-full p-2 border rounded-lg"
//                             />
//                           </div>
//                         ))}
//                       </form>
//                       <button
//                         type="button"
//                         onClick={addTaskToTable}
//                         className="w-full mt-3 bg-[#9685CF] hover:bg-[#FFA842] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       >
//                         إضافة المهمة
//                       </button>
//                     </div>
//                   </div>
//                   {/* قائمة المهام */}
//                   {taskList.length > 0 && (
//                     <div className="mt-4">
//                       <h2 className="text-2xl font-semibold p-3 text-black">
//                         قائمة المهام
//                       </h2>
//                       <table className="w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                           <tr>
//                             <th className="p-2 border">العنوان</th>
//                             <th className="p-2 border">الموعد النهائي</th>
//                             <th className="p-2 border">إجراء</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {taskList.map((task, index) => (
//                             <tr key={index}>
//                               <td className="p-2 border">{task.address}</td>
//                               <td className="p-2 border">{task.deadline}</td>
//                               <td className="p-2 border text-center">
//                                 <FontAwesomeIcon
//                                   icon={faTrash}
//                                   className="text-red-500 cursor-pointer"
//                                   onClick={() => removeTaskFromTable(index)}
//                                 />
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                   {taskList.length > 0 && (
//                     <button
//                       onClick={confirmSchedule}
//                       className="w-full bg-[#FFA842] hover:bg-[#9685CF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
//                     >
//                       تأكيد الجدول
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />

//       {isModalOpen && (
//         <LocationChooserModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveLocation}
//         />
//       )}
//       <ScheduleModal
//         isOpen={isScheduleModalOpen}
//         onClose={() => setIsScheduleModalOpen(false)}
//         taskList={taskList}
//         routeInfo={routeInfo}
//       />
//       <BusyTimeModal
//         isOpen={isBusyTimeModalOpen}
//         onClose={() => setIsBusyTimeModalOpen(false)}
//         onSave={handleSaveBusyTime}
//       />
//     </>
//   );
// };

// export default SchedulerPage;

import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import LocationChooserModal from "../Components/LocationChooserModal";
import ScheduleModal from "../Components/ScheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeIcon from "./HomeIcon";
import WorkIcon from "./WorkIcon";
import TimeIcon from "./TimeIcon";

import {
  faTrash,
  faHome,
  faBriefcase,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import BusyTimeModal from "../Components/BusyTimeModal";
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
    if (taskList.length <= 0) {
      toast("Add more tasks before scheduling!");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const origin = JSON.parse(home).address;
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
          newTask.arrivalTime >= task.departureTime &&
          newTask.departureTime <= task.arrivalTime
      );
    };

    const requests = [];
    const now = new Date();
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
          const scheduledTasksForCurrent = scheduledTasks.filter(
            (scheduledTask) =>
              isOverlap(bestDeparture, [
                {
                  departureTime: scheduledTask.departureTime,
                  arrivalTime: scheduledTask.arrivalTime,
                },
              ])
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
        toast.error(Error`fetching routes: ${error.message || error}`);
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
                <div className="absolute  inset-y-0 right-0 max-w-xl flex flex-col rounded-lg bg-gray-100 p-4 overflow-y-auto">
                  <h2 className="text-2xl font-bold p-3 text-[#9685CF]">
                    أدخل العنوان والموعد النهائي لمشوارك
                  </h2>
                  <div className="w-full max-w-lg max-sm:w-[70vw] bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4 ">
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
                      <h2 className="text-2xl font-semibold p-3 text-black">
                        قائمة المهام
                      </h2>
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
          <div className="fixed bottom-0 right-1/2 transform -translate-x-0 mb-4 bg-white border-2 border-[#9685cf] rounded-lg shadow-md p-2 flex justify-around w-1/3 max-w-xs max-sm:flex-row max-sm:bottom-2-14 max-sm:left-1/2 max-sm:bottom-auto max-sm:right-auto max-sm:translate-x-0 max-sm:h-16 max-sm:w-auto max-sm:p-1 max-sm:w-[90vw]">
            <div
              className="text-2xl cursor-pointer text-[#9685cf] p-2 max-sm:p-1 max-sm:mx-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
              onClick={() => openLocationChooser("home")}
            >
              <HomeIcon className="fill-current text-[#9685cf] max-sm:w-6 max-sm:h-6 " />
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
