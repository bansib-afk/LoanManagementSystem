import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef } from "react";

const Budgeting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // loader state

  const hasRun = useRef(false)

  useEffect(() => {
    if(hasRun.current) return
    hasRun.current = true
    
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login to access Budgeting!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setLoading(false); // allow page render
    }
  }, []);

  // SHOW LOADER FIRST
  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto no-scrollbar h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-black text-2xl">Budgeting</h1>
      </div>
    </div>
  );
};

export default Budgeting;