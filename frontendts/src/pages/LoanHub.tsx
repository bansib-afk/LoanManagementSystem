import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const LoanHub: React.FC = () => {
  const navigate = useNavigate();
  const hasRun = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const user = getUser();

    if (!user) {
      toast.error("Please login to access LoanHub!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto no-scrollbar h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-black text-2xl">LoanHub</h1>
      </div>

      <Footer />
    </div>
  );
};

export default LoanHub;