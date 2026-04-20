import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

// 🔹 Types
interface Consultant {
  id: number;
  name: string;
  designation: string;
  skills: string[];
  description: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Consultancy: React.FC = () => {
  const navigate = useNavigate();
  const hasRun = useRef<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Consultant | null>(null);

  const users: Consultant[] = [
    {
      id: 1,
      name: "John Doe",
      designation: "Investment Specialist",
      skills: ["Finance", "Investment", "Tax"],
      description:
        "Expert in financial planning and investment strategies.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      designation: "Tax Planning Expert",
      skills: ["Startup", "Marketing"],
      description:
        "Helping startups grow with smart marketing strategies.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 3,
      name: "Amit Patel",
      designation: "Investment Specialist",
      skills: ["Agriculture", "Sustainability"],
      description:
        "Guiding farmers toward sustainable farming practices.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 4,
      name: "Neha Singh",
      designation: "Tax Planning Expert",
      skills: ["Education", "Career"],
      description:
        "Career mentor for students and professionals.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 5,
      name: "Rahul Mehta",
      designation: "Investment Specialist",
      skills: ["Finance"],
      description:
        "Helping clients manage wealth.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 6,
      name: "Sneha Patel",
      designation: "Loan Specialist",
      skills: ["HR", "Career"],
      description:
        "Career consultant.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 7,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 8,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 9,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 10,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
  

  ];

  // 🔹 Utility
  const getInitials = (name: string): string => {
    const words = name.split(" ");
    const first = words[0]?.[0] || "";
    const last = words[1]?.[0] || "";
    return (first + last).toUpperCase();
  };

  const visibleUsers: Consultant[] = showAll ? users : users.slice(0, 9);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const user: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      toast.error("Please login to access Consultancy!");
      setTimeout(() => navigate("/"), 1000);
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

      {/* HEADER */}
      <div className="flex flex-col gap-3 items-center text-center px-10 py-10">
        <h1 className="text-black text-2xl md:text-4xl font-extrabold">
          Financial Consultancy
        </h1>
        <p className="text-md md:text-xl">
          Book a session with our expert financial consultants.
        </p>
      </div>

      {/* USERS */}
      <div className="w-full xl:px-14 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center h-20 gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-semibold text-xl">
                    {getInitials(user.name)}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-xs text-gray-600">
                      {user.designation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600">
                  {user.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
                className="mt-4 bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800 transition"
              >
                Book Consultation
              </button>
            </div>
          ))}
        </div>

        {/* View More */}
        {users.length > 9 && (
          <div className="text-center mt-6 mb-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-semibold hover:underline"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 overflow-y-auto h-[60vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="ml-auto block text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold">
              Book Appointment With: {selectedUser.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {selectedUser.designation}
            </p>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-2 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border p-2 rounded-lg"
              />
              <input type="date" className="border p-2 rounded-lg" />
              <input type="time" className="border p-2 rounded-lg" />
              <textarea
                placeholder="Notes"
                rows={3}
                className="border p-2 rounded-lg"
              />

              <button
                type="button"
                className="bg-black text-white py-2 rounded-lg"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Consultancy;