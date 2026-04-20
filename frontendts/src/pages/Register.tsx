import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { registerUser } from "../api/authApi";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/schemes");
    }
  }, [navigate]);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    role: "User", // default value (better UX)
    confirmPassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Basic validation (important improvement)
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser(formData);

      toast.success(res.data?.message || "Registered Successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen lg:py-2 xl:py-5 bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-black border-2 border-gray-500 rounded-2xl p-6 sm:p-8 lg:px-10 xl:py-4 lg:py-2 shadow-lg">
        
        {/* Logo */}
        <div className="flex items-center justify-center py-3">
          <img
            src={logo}
            alt="FinTech"
            className="h-12 w-auto object-contain rounded-md"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* Name */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-200 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 sm:my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-2 sm:px-3 text-gray-400 text-xs sm:text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-xs sm:text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;