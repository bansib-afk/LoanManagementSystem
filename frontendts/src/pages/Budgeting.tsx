import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Legend,
  Cell,
} from "recharts";

// 🔹 Types
interface ChartData {
  name: string;
  value: number;
}

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Budgeting: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const income: number = 114000;
  const expense: number = 13567;
  const balance: number = income - expense;

  const data: ChartData[] = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
    { name: "Balance", value: balance },
  ];

  const monthlyData: MonthlyData[] = [
    { month: "Jan", income: 40000, expense: 15000, balance: 25000 },
    { month: "Feb", income: 30000, expense: 12000, balance: 18000 },
    { month: "Mar", income: 45000, expense: 20000, balance: 25000 },
    { month: "Apr", income: 38000, expense: 14000, balance: 24000 },
    { month: "May", income: 50000, expense: 25000, balance: 25000 },
    { month: "Jun", income: 42000, expense: 18000, balance: 24000 },
    { month: "Jul", income: 47000, expense: 21000, balance: 26000 },
    { month: "Aug", income: 52000, expense: 26000, balance: 26000 },
    { month: "Sep", income: 48000, expense: 20000, balance: 28000 },
    { month: "Oct", income: 55000, expense: 30000, balance: 25000 },
    { month: "Nov", income: 60000, expense: 35000, balance: 25000 },
    { month: "Dec", income: 65000, expense: 40000, balance: 25000 },
  ];

  const COLORS: string[] = ["#4b5563", "#9ca3af", "#271f27"];

  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const user: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      toast.error("Please login to access Budgeting!");

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
    <div className="overflow-y-auto no-scrollbar min-h-screen bg-gray-50">
      <Navbar />

      {/* HEADER */}
      <div className="flex flex-col gap-2 items-center text-center px-4 md:px-10 py-6 md:py-10">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold">
          Budget Planner
        </h1>
        <p className="text-sm sm:text-md md:text-xl">
          Track your expenses and plan your finances effectively.
        </p>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-10 py-6 md:py-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* FORM */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md w-full">
            <h2 className="text-lg font-bold mb-4">Add Transaction</h2>

            <form className="flex flex-col gap-4 sm:gap-5">
              <div>
                <label className="font-semibold text-sm">Type</label>
                <select className="border p-2 bg-white rounded-lg w-full">
                  <option>Income</option>
                  <option>Expense</option>
                  <option>Loan</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm">Category</label>
                <select className="border p-2 bg-white rounded-lg w-full">
                  <option>Select Category</option>
                  <option>Expense</option>
                  <option>Loan</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm">Amount</label>
                <input
                  type="number"
                  placeholder="₹ 0.00"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Date</label>
                <input type="date" className="border p-2 rounded-lg w-full" />
              </div>

              <div>
                <label className="font-semibold text-sm">Description</label>
                <input
                  type="text"
                  placeholder="Optional Description"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <button
                type="button"
                className="bg-black text-white py-2 rounded-lg w-full"
              >
                Add Transaction
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                <p className="text-sm">Total Income</p>
                <h3 className="text-xl font-extrabold text-gray-600">
                  ₹ {income.toLocaleString()}
                </h3>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                <p className="text-sm">Total Expenses</p>
                <h3 className="text-xl font-extrabold text-gray-400">
                  ₹ {expense.toLocaleString()}
                </h3>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                <p className="text-sm">Balance</p>
                <h3 className="text-xl font-extrabold text-gray-900">
                  ₹ {balance.toLocaleString()}
                </h3>
              </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PIE */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg h-[350px]">
                <h3 className="text-lg font-semibold mb-2">
                  Expense Distribution
                </h3>

                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie data={data} dataKey="value" innerRadius={50} outerRadius={90}>
                      {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* BAR */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg h-[350px]">
                <h3 className="text-lg font-semibold mb-2">
                  Monthly Overview
                </h3>

                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#4b5563" />
                    <Bar dataKey="expense" fill="#9ca3af" />
                    <Bar dataKey="balance" fill="#271f27" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Budgeting;