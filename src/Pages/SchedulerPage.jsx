const confirmSchedule = () => {
  // Dummy data with addresses (further out from the center)
  const dummyTaskList = [
    {
      address:
        "محطة قطار S1، مطار الملك خالد الدولي، الرياض 13414،، King Khalid International Airport, Riyadh 13415, Saudi Arabia",
    }, // Origin
    { address: "8330, 4182 نجران، ظهرة لبن، الرياض 13784, Saudi Arabia" }, // Destination 1
  ];

  if (dummyTaskList.length < 2) {
    toast("Add more tasks before scheduling!");
    return;
  }

  const directionsService = new window.google.maps.DirectionsService();

  const origin = dummyTaskList[0].address;
  const destinations = dummyTaskList.slice(1).map((task) => task.address);

  console.log(
    "Testing route duration for each hour of the day using pessimistic traffic model"
  );

  const requests = [];
  const now = new Date();

  destinations.forEach((destination, destIndex) => {
    for (let i = 0; i < 24; i++) {
      const departureTime = new Date(now.getTime() + i * 3600000); // every hour

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
        }, departure time: ${departureTime.toLocaleTimeString()}`
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
              reject({ status, destinationIndex: destIndex, departureTime });
            }
          });
        })
      );
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

      // Log and compare durations
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
            }, Departure time: ${departureTime.toLocaleTimeString()}, Total duration in traffic: ${
              totalDurationInTraffic / 60
            } minutes, Arrival time: ${arrivalTime.toLocaleTimeString()}`
          );
        }
      );

      // Find the shortest and longest durations for each destination
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
export default confirmSchedule;
