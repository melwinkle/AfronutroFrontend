import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

const Loader = ({ nextStep,prevStep }) => {
  const dispatch = useDispatch();
  const {isAuthenticated}=useSelector((state) => state.auth);
  const { status, error } = useSelector((state) => state.assessment);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      if (!isAuthenticated || status === 'succeeded') {
        nextStep();
      } else if (status === 'failed') {
        prevStep();
      }
    }
  }, [progress, status, nextStep, prevStep, isAuthenticated]);

 

  // Calculate stroke dash array for circular progress
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference; // Stroke dash offset

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <h2 className="text-2xl font-bold mb-2">Submitting your information...</h2>
      
      {/* Circular Progress Indicator */}
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="lightgray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#bc4f07" // Change this to your desired color
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.05s" }} // Smooth transition
        />
      </svg>
      
      {/* Progress Percentage */}
      <div className="absolute text-xl font-medium text-afro-brown">{progress}%</div>
      
      <p className="mt-4">Please wait while we process your information...</p>
      {error && status === 'failed' && progress === 100 && (
        <p className="text-red-500">
          An error occurred. Returning to previous page...
        </p>
      )}
    </div>
  );
};

export default Loader;
