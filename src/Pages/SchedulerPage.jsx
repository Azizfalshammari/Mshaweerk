// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
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
// import Sidebar from "../components/Sidebar";
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

// import Sidebar from "../components/Sidebar";

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
// import Sidebar from "../components/Sidebar";

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
// import Sidebar from "../components/Sidebar";

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

import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import LocationChooserModal from "../Components/LocationChooserModal";
import ScheduleModal from "../Components/ScheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const handleAddBusyTime = (newBusyTime) => {
    setBusyTimes([...busyTimes, newBusyTime]);
  };

  const isTaskInBusyTime = (taskTime) => {
    return busyTimes.some((taskTime) => {
      const taskDate = new Date(taskTime);
      const startTime = new Date(taskTime.start);
      const endTime = new Date(taskTime.end);
      return taskDate >= startTime && taskDate <= endTime;
    });
  };

  const confirmSchedule = () => {
    const notify = () => toast("من فضلك ادخل موقع منزلك او عملك");

    if (taskList.length === 0 || !homeLocation || !workLocation) {
      notify();
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const routePromises = taskList.map((task) => {
      if (isTaskInBusyTime(task.deadline)) {
        toast.error(`تداخل موعد المهمة مع أوقات الانشغال: ${task.address}`);
        return Promise.reject("Task time is within busy time");
      } else if(isTaskInBusyTime)
      return new Promise((resolve, reject) => {
        const origin =
          homeLocation && locationType === "home"
            ? new window.google.maps.LatLng(
                homeLocation.position.lat,
                homeLocation.position.lng
              )
            : workLocation && locationType === "work"
            ? new window.google.maps.LatLng(
                workLocation.position.lat,
                workLocation.position.lng
              )
            : null;

        const destination = new window.google.maps.LatLng(
          task.position.lat,
          task.position.lng
        );

        if (origin && destination) {
          const request = {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          };

          directionsService.route(request, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              const routeDetails = result.routes[0].legs[0];
              resolve({
                ...result,
                request: {
                  ...result.request,
                  origin: {
                    ...result.request.origin,
                    formatted_address:
                      result.request.origin?.formatted_address || "N/A",
                  },
                  destination: {
                    ...result.request.destination,
                    formatted_address:
                      result.request.destination?.formatted_address || "N/A",
                  },
                },
                bestTime: calculateBestTime(routeDetails.duration.value),
                bestRoute: result.routes[0].summary,
                distance: routeDetails.distance.text,
                duration: routeDetails.duration.text,
                day: new Date().toLocaleDateString(),
              });
            } else {
              reject(status);
            }
          });
        } else {
          reject("No origin or destination");
        }
      });
    });

    Promise.all(routePromises)
      .then((results) => {
        const updatedTaskList = taskList.map((task, index) => ({
          ...task,
          routeDetails: results[index],
        }));
        setTaskList(updatedTaskList);
        setRouteInfo(results[0]);
        setIsScheduleModalOpen(true);
      })
      .catch((error) => {
        console.error("Error confirming schedule:", error);
        toast.error("حدث خطأ أثناء تأكيد الجدول");
      });
  };

  const calculateBestTime = (durationInSeconds) => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + durationInSeconds);
    return now.toLocaleTimeString(); // Returns time in HH:MM:SS format
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
            setCurrentMarker(marker);
            setFormData((prevFormData) => ({
              locations: [
                ...prevFormData.locations,
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
        onSave={handleAddBusyTime}
      />
    </>
  );
};

export default SchedulerPage;
