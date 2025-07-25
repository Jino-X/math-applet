'use client';

import Link from "next/link";
import { motion } from "framer-motion";

import { logout } from "@/utils";

export default function Home() {

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="h-[100vh] overflow-y-auto bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 custom-scrollbar">
      {/* Logout button */}
      <div className="absolute top-4 right-4">
        <motion.button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md shadow-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </motion.button>
      </div>
      <main className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Math Visualizer</h1>
          <p className="text-xl text-gray-600">Interactive mathematics learning applets</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Polygon Interior Angles Applet Card */}
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="h-48 bg-blue-100 flex items-center justify-center">
              {/* Simple polygon image */}
              <svg
                className="w-32 h-32"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="100,20 160,60 160,140 100,180 40,140 40,60"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="rgba(59, 130, 246, 0.1)"
                />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="40" y1="60" x2="160" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="40" y1="140" x2="160" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Polygon Interior Angles</h2>
              <p className="text-gray-600 mb-4">
                Visualize how the formula (n-2) × 180° for the sum of interior angles is derived by breaking down a polygon into triangles.
              </p>
              <Link
                href="/polygon-angles"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Explore Applet
              </Link>
            </div>
          </motion.div>

          {/* Placeholder for future applets */}
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-dashed border-gray-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="h-48 bg-gray-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-400 mb-2">More Coming Soon</h2>
              <p className="text-gray-400 mb-4">
                Additional math visualization applets are under development. Check back later!
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 p-8 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-primary mb-4">About This Project</h2>
          <p className="text-gray-600 mb-4">
            This collection of interactive math applets is designed to help students visualize and understand
            key mathematical concepts through dynamic demonstrations. Each applet provides a hands-on
            approach to learning mathematical principles.
          </p>
          <p className="text-gray-600">
            Built with modern web technologies including Next.js, React, and Framer Motion, these tools
            are designed to be engaging, educational, and accessible on all devices.
          </p>
        </motion.div>
      </main>

      <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Math Visualizer. Educational tools for mathematics.
        </p>
      </footer>
    </div>
  );
}