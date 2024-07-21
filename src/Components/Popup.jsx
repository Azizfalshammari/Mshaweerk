import React, { useState } from "react";
import MapComponent from "./Map";

export default function Popup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [houseLocation, setHouseLocation] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSaveHouseLocation = (location) => {
    setHouseLocation(location);
    handleNextStep(); // Move to the next step after saving house location
  };

  const handleSaveWorkLocation = (location) => {
    setWorkLocation(location);
    handleNextStep(); // Move to the next step after saving work location
  };

  const handleCloseModal = () => {
    setCurrentStep(1); // Reset to the first step when closing the modal
  };

  return (
    <div>
      {/* Step 1: Capture House Location */}
      {currentStep === 1 && (
        <div className="fixed top-0 left-0  bg-gray-900/50 flex items-center justify-center z-50">
        </div>
      )}

      {/* Step 2: Capture Work Location */}
      {currentStep === 2 && (
        <div className="fixed top-0 left-0  bg-gray-900/50 flex items-center justify-center z-50">
        </div>
      )}

      {/* Step 3: Save Locations */}
      {currentStep === 3 && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900/50 flex items-center justify-center z-50">
          {/* Your Modal 3 JSX */}
          <div className="bg-[#c9c0e5] border shadow-sm rounded-xl w-full max-w-lg mx-3 sm:mx-auto slide-down-enter">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-600">Save Locations</h3>
              <button
                type="button"
                className="text-gray-800 hover:bg-gray-100 p-1 rounded-full"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {/* Display saved locations or confirmation message */}
              <p>House Location: {houseLocation}</p>
              <p>Work Location: {workLocation}</p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-[#9685CF] to-[#fac282] text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
