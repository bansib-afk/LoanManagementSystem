import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Schemes from "./pages/Schemes";
import Consultancy from "./pages/Consultancy";
import LoanHub from "./pages/LoanHub";
import Budgeting from "./pages/Budgeting";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";


import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import useLastPage from "./hooks/useLastPage";
import SmartRedirect from "./routes/smartRedirect";


function App() {

  console.log("Auth Check Running",)
  useLastPage()  
  useAuthCheck()
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

        {/* Auth pages (blocked after login) */}
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

        {/* Protected pages (only after login) */}
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
       
       <Route path="*" element={<SmartRedirect />} />

        <Route
          path="/budgeting"
          element={
            <ProtectedRoute>
              <Budgeting />
            </ProtectedRoute>
          }
        />
      </Routes>
      </>
  );
}

export default App;
