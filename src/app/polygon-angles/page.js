'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import PolygonVisualizer from '@/components/polygon-visualizer';

export default function PolygonAnglesPage() {
    const [sides, setSides] = useState(5); // Default to pentagon
    const [showTriangles, setShowTriangles] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    // Reset animation state when sides change
    useEffect(() => {
        setShowTriangles(false);
        setAnimationComplete(false);
    }, [sides]);

    // Calculate the sum of interior angles
    const interiorAngleSum = (sides - 2) * 180;

    const handleVisualize = () => {
        setShowTriangles(true);
    };

    const handleReset = () => {
        setShowTriangles(false);
        setAnimationComplete(false);
    };

    const handleAnimationComplete = () => {
        setAnimationComplete(true);
    };

    return (
        <div className="h-[100vh] overflow-y-auto bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="text-primary hover:text-primary-dark inline-flex items-center mb-6 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Home
                    </Link>
                    <motion.h1
                        className="text-3xl font-bold text-primary mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Polygon Interior Angles
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Visual demonstration of why the sum of interior angles equals (n-2) × 180°
                    </motion.p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-2/3 mb-6 md:mb-0">
                            <div className="bg-gray-50 rounded-lg p-4 h-[400px] flex items-center justify-center">
                                <PolygonVisualizer
                                    sides={sides}
                                    showTriangles={showTriangles}
                                    onAnimationComplete={handleAnimationComplete}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 md:pl-6">
                            <h2 className="text-xl font-bold mb-4 text-accent">Controls</h2>

                            <div className="mb-4">
                                <label htmlFor="sides" className="block text-sm font-medium text-gray-700 mb-1">
                                    Number of sides: {sides}
                                </label>
                                <input
                                    type="range"
                                    id="sides"
                                    min="3"
                                    max="10"
                                    value={sides}
                                    onChange={(e) => setSides(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>3</span>
                                    <span>10</span>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-3 mt-6">
                                <motion.button
                                    onClick={handleVisualize}
                                    disabled={showTriangles}
                                    className={`py-2 px-4 rounded-md text-white font-medium 
                    ${showTriangles ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`}
                                    whileHover={!showTriangles ? { scale: 1.02 } : {}}
                                    whileTap={!showTriangles ? { scale: 0.98 } : {}}
                                >
                                    Show Triangulation
                                </motion.button>

                                <motion.button
                                    onClick={handleReset}
                                    disabled={!showTriangles}
                                    className={`py-2 px-4 rounded-md font-medium 
                    ${!showTriangles ? 'text-gray-400 border border-gray-300' : 'text-accent border border-accent hover:bg-accent hover:text-white'}`}
                                    whileHover={showTriangles ? { scale: 1.02 } : {}}
                                    whileTap={showTriangles ? { scale: 0.98 } : {}}
                                >
                                    Reset
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="bg-white rounded-lg shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <h2 className="text-xl font-bold mb-4 text-primary">The Math Explained</h2>

                    <div className="prose max-w-none">
                        <p>For any polygon with <strong>n</strong> sides:</p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>We can draw lines from one vertex to all non-adjacent vertices</li>
                            <li>This divides the polygon into <strong>(n-2)</strong> triangles</li>
                            <li>Each triangle has an angle sum of 180°</li>
                            <li>Therefore, the sum of all interior angles = <strong>(n-2) × 180°</strong></li>
                        </ul>

                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-lg font-bold text-center">
                                For this {sides}-sided polygon:
                            </p>
                            <p className="text-xl font-bold text-center text-primary">
                                Sum of interior angles = ({sides} - 2) × 180° = {interiorAngleSum}°
                            </p>
                            {animationComplete && (
                                <p className="text-center mt-2 text-green-600">
                                    ✓ Visualization confirms the formula!
                                </p>
                            )}
                        </div>

                        <p className="mt-4">
                            This formula works for any simple polygon, regardless of whether it's regular (all sides equal) or irregular.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}