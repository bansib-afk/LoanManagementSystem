import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Schemes from "./pages/Schemes";
import ForgotPassword from "./pages/ForgotPassword";

import useAuthCheck from "./hooks/useAuthCheck";
import useLastPage from "./hooks/useLastPage";
import SmartRedirect from "./routes/smartRedirect";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectRoute";
import About from "./pages/About";
import Budgeting from "./pages/Budgeting";
import Consultancy from "./pages/Consultancy";
import LoanHub from "./pages/LoanHub";
import Home from "./pages/Home";

const App: React.FC = () => {

  useLastPage();
  useAuthCheck();

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #444",
            zIndex: 9999,
          },
        }}
      />

      <Routes>
        {/* Public page */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Auth pages */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        <Route
          path="/forgot"
          element={
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          }
        />

        {/* Protected pages */}
        <Route
          path="/schemes"
          element={
            <ProtectedRoute>
              <Schemes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/consultancy"
          element={
            <ProtectedRoute>
              <Consultancy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loan-hub"
          element={
            <ProtectedRoute>
              <LoanHub />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budgeting"
          element={
            <ProtectedRoute>
              <Budgeting />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<SmartRedirect />} />
      </Routes>
    </>
  );
};

export default App;