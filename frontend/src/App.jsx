import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Schemes from "./pages/Schemes";
import Consultancy from "./pages/Consultancy";
import LoanHub from "./pages/LoanHub";
import Budgeting from "./pages/Budgeting";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route path="/loan-hub" element={<LoanHub />} />
        <Route path="/budgeting" element={<Budgeting />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
