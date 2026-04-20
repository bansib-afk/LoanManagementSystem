import Navbar from "../components/Navbar";
import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

interface Scheme {
  id: number;
  name: string;
  description: string;
  deadline: string;
  category: string;
  state?: string; // optional because your data doesn't include it
}

const Schemes: React.FC = () => {
  const scholarships: Scheme[] = [

    {
      id: 1,
      name: "Rural Education Scholarship",
      description:
        "Financial assistance for rural students pursuing higher education",
      deadline: "31 August 2024",
      category: "Rural Students",
    },
    {
      id: 2,
      name: "Women Entrepreneur Fund",
      description: "Support for women starting their own businesses.",
      deadline: "15 July 2026",
      category: "Business Women",
    },
    {
      id: 3,
      name: "Sustainable Farming Initiative",
      description: "Support for adopting sustainable farming practices.",
      deadline: "10 August 2026",
      category: "Farmers",
    },
    {
      id: 4,
      name: "Sustainable Farming Initiative",
      description: "Support for adopting sustainable farming practices.",
      deadline: "25 July 2026",
      category: "Farmers",
    },
    {
      id: 5,
      name: "Women in STEM",
      description: "Encouraging women participation in STEM fields.",
      deadline: "5 August 2026",
      category: "Business Women",
    },
    {
      id: 6,
      name: "State Merit Scholarship",
      description: "Merit-based scholarship for top-performing students.",
      deadline: "20 June 2026",
      category: "Education",
    },
    {
      id: 7,
      name: "State Merit Scholarship",
      description: "Merit-based scholarship for top-performing students.",
      deadline: "20 June 2026",
      category: "Education",
    },
    {
      id: 8,
      name: "State Merit Scholarship",
      description: "Merit-based scholarship for top-performing students.",
      deadline: "20 June 2026",
      category: "Education",
    },
    {
      id: 9,
      name: "State Merit Scholarship",
      description: "Merit-based scholarship for top-performing students.",
      deadline: "20 June 2026",
      category: "Education",
    },
    {
      id: 10,
      name: "State Merit Scholarship",
      description: "Merit-based scholarship for top-performing students.",
      deadline: "20 June 2026",
      category: "Education",
    },
  
  ];

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [state, setState] = useState<string>("");

  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const user = localStorage.getItem("user");

    if (!user) {
      toast.error("Please login to access Schemes!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const handleState = (e: ChangeEvent<HTMLSelectElement>) =>
    setState(e.target.value);

  const filteredSchemes = scholarships.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category ? item.category === category : true;

    // NOTE: state is not in data, so this will always be true
    const matchesState = state ? item.state === state : true;

    return matchesSearch && matchesCategory && matchesState;
  });

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

      <div className="flex flex-col gap-3 items-center text-center px-10 py-10">
        <h1 className="text-black text-2xl md:text-4xl font-extrabold">
          Government Schemes
        </h1>
        <p className="text-md md:text-xl">
          Discover financial support programs designed for rural students,
          businesswomen, and farmers.
        </p>
      </div>

      {/* Filters */}
      <div className="w-full xl:px-14 p-4">
        <div className="flex flex-col md:flex-row gap-4 p-4 shadow-lg items-center justify-evenly bg-white rounded-2xl">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search..."
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
          />

          <select
            value={category}
            onChange={handleCategory}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">All Category</option>
            <option value="Rural Students">Rural Students</option>
            <option value="Business Women">Business Women</option>
            <option value="Education">Education</option>
            <option value="Farmers">Farmers</option>
          </select>

          <select
            value={state}
            onChange={handleState}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">All States</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full xl:px-14 p-4 py-10">
        {filteredSchemes.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No results found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {item.description}
                </p>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium">Deadline:</span>{" "}
                    {item.deadline}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {item.category}
                  </p>
                </div>

                <button className="mt-4 text-sm font-bold hover:text-gray-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Schemes;