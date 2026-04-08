import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.jpg";

function Home() {
  return (
    <div className='overflow-y-auto no-scrollbar h-screen'>
      <Navbar />

        {/* 🔹 HERO SECTION */}
      <section className="text-center px-6 py-16 sm:py-20 lg:py-24 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Smart Loan Management & Financial Solutions
        </h1>
        <p className="mt-4 text-gray-400 text-sm sm:text-base">
          Manage loans, explore government schemes, and get expert financial consultancy — all in one place.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link to="/register" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200">
            Get Started
          </Link>
          <Link to="/about" className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-900">
            Learn More
          </Link>
        </div>
      </section>

       {/* 🔹 FEATURES */}
      <section className="px-6 py-12 max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Explore Government Schemes",
          "Loan Application & Tracking",
          "Financial Consultancy",
          "Loan Hub for Offers",
          "Budget Planning Tools",
          "Secure & Fast Platform",
        ].map((item, index) => (
          <div key={index} className="border border-gray-700 p-6 rounded-xl hover:bg-gray-900 transition">
            <h3 className="font-semibold text-lg">{item}</h3>
            <p className="text-gray-400 text-sm mt-2">
              Simplified and efficient solutions tailored for your financial needs.
            </p>
          </div>
        ))}
      </section>

   

      {/* 🔹 ABOUT PREVIEW */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">Why Choose Us?</h2>
        <p className="mt-4 text-gray-400 text-sm sm:text-base">
          We provide a unified platform for all your financial needs — from loans to budgeting — designed with simplicity and security.
        </p>
      </section>

      {/* 🔹 FAQ */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">FAQs</h2>

        <div className="space-y-4">
          {[
            {
              q: "How do I apply for a loan?",
              a: "You can apply through the Loan Hub after registering your account.",
            },
            {
              q: "Is this platform secure?",
              a: "Yes, we use secure authentication and encrypted data handling.",
            },
            {
              q: "Can I track my loan status?",
              a: "Yes, you can track all your applications from your dashboard.",
            },
          ].map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-4">
              <h4 className="font-medium">{faq.q}</h4>
              <p className="text-gray-400 text-sm mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="border-t border-gray-800 px-6 py-10 text-center">
        <div className="flex flex-col items-center space-y-3">
          <img src={logo} alt="logo" className="h-10 rounded-md" />
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} FinTech. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm">
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            <Link to="/privacy" className="hover:text-gray-300">Privacy</Link>
          </div>
        </div>
      </footer>


    </div>
  )
}

export default Home
