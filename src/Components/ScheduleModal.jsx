import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Table } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { auth, datastore } from "../config/firbase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const ScheduleModal = ({ isOpen, onClose, taskList, onSave }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Task Schedule", 14, 16);

    if (Array.isArray(taskList) && taskList.length > 0) {
      const columns = [
        { title: "destination", dataKey: "address" },
        { title: "Deadline", dataKey: "deadline" },
        { title: "Best Time", dataKey: "bestTime" },
        { title: " origin", dataKey: "origin" },
        { title: "Best Route", dataKey: "bestRoute" },
        { title: "Distance", dataKey: "distance" },
        { title: "Duration", dataKey: "duration" },
        { title: "Day", dataKey: "day" },
      ];

      const data = taskList.map((task) => ({
        address: task.address || "N/A",
        deadline: task.deadline || "N/A",
        bestTime: task.routeDetails?.bestTime
          ? new Date(task.routeDetails.bestTime).toLocaleString()
          : "N/A",
        bestRoute: task.routeDetails?.bestRoute || "N/A", // Ensure this is the route name or description
        distance: task.routeDetails?.distance || "N/A",
        duration: task.routeDetails?.duration || "N/A",
        day: task.routeDetails?.day || "N/A",
      }));

      doc.autoTable({
        columns: columns,
        body: data,
        startY: 30,
      });
    }

    doc.save("task_schedule.pdf");
  };

  const handleSaveClick = async () => {
    if (isLoggedIn) {
      try {
        const user = auth.currentUser;
        if (user) {
          const cleanedTaskList = taskList.map((task) => ({
            address: task.address || "",
            deadline: task.deadline || "",
            bestTime: task.routeDetails?.bestTime
              ? new Date(task.routeDetails.bestTime).toLocaleString()
              : "",
            bestRoute: task.routeDetails?.bestRoute || "", // Ensure this is the route name or description
            distance: task.routeDetails?.distance || "",
            duration: task.routeDetails?.duration || "",
            day: task.routeDetails?.day || "",
          }));

          await setDoc(
            doc(datastore, "users", user.uid, "schedules", "currentSchedule"),
            {
              tasks: cleanedTaskList,
            }
          );
          onSave();
        }
      } catch (error) {
        console.error("Error saving schedule: ", error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleDownloadClick = () => {
    if (isLoggedIn) {
      generatePDF();
    } else {
      navigate("/login");
    }
  };

  return (
    <Modal show={isOpen} size="lg">
      <Modal.Header>
        <Modal.Title>تفاصيل الجدول</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(taskList) && taskList.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Address</th>
                <th>Deadline</th>
                <th>Best Time</th>
                <th>Best Route</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Day</th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((task, index) => (
                <tr key={index}>
                  <td>{task.address || "N/A"}</td>
                  <td>{task.deadline || "N/A"}</td>
                  <td>
                    {task.routeDetails?.bestTime
                      ? new Date(task.routeDetails.bestTime).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>{task.routeDetails?.bestRoute || "N/A"}</td>
                  <td>{task.routeDetails?.distance || "N/A"}</td>
                  <td>{task.routeDetails?.duration || "N/A"}</td>
                  <td>{task.routeDetails?.day || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>لا توجد مهام</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isLoggedIn && (
          <Button
            className="bg-[#9685CF] border-none hover:bg-[#D3CCE3]"
            onClick={handleSaveClick}
          >
            Save Schedule
          </Button>
        )}
        <Button
          className="bg-[#9685CF] border-none hover:bg-[#D3CCE3]"
          onClick={handleDownloadClick}
        >
          Download PDF
        </Button>
        <Button
          className="bg-[#9685CF] border-none hover:bg-[#D3CCE3]"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  taskList: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ScheduleModal;