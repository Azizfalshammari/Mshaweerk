import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const BestRouteModal = ({ isOpen, onRequestClose, latLngs }) => {
  const [bestRoutes, setBestRoutes] = useState([]);

  useEffect(() => {
    if (isOpen) {
      calculateBestRoutes();
    }
  }, [isOpen]);

  const calculateBestRoutes = async () => {
    const routes = [];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const dateTime = new Date();
        dateTime.setDate(dateTime.getDate() + day);
        dateTime.setHours(hour, 0, 0, 0);

        try {
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/directions/json",
            {
              params: {
                origin: `${latLngs[0].lat},${latLngs[0].lng}`,
                destination: `${latLngs[latLngs.length - 1].lat},${
                  latLngs[latLngs.length - 1].lng
                }`,
                waypoints: latLngs
                  .slice(1, -1)
                  .map((coord) => `${coord.lat},${coord.lng}`)
                  .join("|"),
                departure_time: Math.floor(dateTime.getTime() / 1000),
                key: "YOUR_GOOGLE_MAPS_API_KEY",
              },
            }
          );
          routes.push({
            day,
            hour,
            route: response.data.routes[0],
          });
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      }
    }

    // Process the routes to find the best one for each day/hour
    const bestRoutes = processRoutes(routes);
    setBestRoutes(bestRoutes);
  };

  const processRoutes = (routes) => {
    // Implement your logic to determine the best route for each day/hour
    // Example: sort by duration and pick the shortest
    return routes.sort(
      (a, b) => a.route.legs[0].duration.value - b.route.legs[0].duration.value
    );
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Best Routes for the Next Week</h2>
      <ul>
        {bestRoutes.map((route, index) => (
          <li key={index}>
            Day {route.day}, Hour {route.hour}:{" "}
            {route.route.legs[0].duration.text}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default BestRouteModal;