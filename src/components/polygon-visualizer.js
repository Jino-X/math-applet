'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PolygonVisualizer = ({ sides, showTriangles, onAnimationComplete }) => {
    const svgRef = useRef(null);

    const [polygonPoints, setPolygonPoints] = useState([]);
    const [triangles, setTriangles] = useState([]);
    const [polygonCenter, setPolygonCenter] = useState({ x: 0, y: 0 });
    const [angles, setAngles] = useState([]);
    const [triangleAngles, setTriangleAngles] = useState([]);
    const [currentTriangle, setCurrentTriangle] = useState(0);
    const [showAngleLabels, setShowAngleLabels] = useState(false);

    // Calculate polygon points in a circle
    useEffect(() => {
        const radius = 120;
        const center = { x: 200, y: 200 };
        setPolygonCenter(center);

        // Calculate vertices in a circle
        const points = [];
        for (let i = 0; i < sides; i++) {
            // Start from the top and go clockwise
            const angle = (i * 2 * Math.PI / sides) - (Math.PI / 2);
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            points.push({ x, y });
        }
        setPolygonPoints(points);

        // Calculate triangles (fan triangulation from first vertex)
        const newTriangles = [];
        for (let i = 1; i < sides - 1; i++) {
            newTriangles.push([0, i, i + 1]);
        }
        setTriangles(newTriangles);

        // Calculate interior angles of the polygon
        const newAngles = [];
        for (let i = 0; i < sides; i++) {
            const prev = (i - 1 + sides) % sides;
            const curr = i;
            const next = (i + 1) % sides;

            const vector1 = {
                x: points[prev].x - points[curr].x,
                y: points[prev].y - points[curr].y
            };

            const vector2 = {
                x: points[next].x - points[curr].x,
                y: points[next].y - points[curr].y
            };

            // Calculate angle in degrees
            const dot = vector1.x * vector2.x + vector1.y * vector2.y;
            const det = vector1.x * vector2.y - vector1.y * vector2.x;
            const angle = Math.atan2(det, dot) * (180 / Math.PI);

            // Interior angle is 180° - exterior angle
            newAngles.push(Math.abs(angle));
        }
        setAngles(newAngles);

        // Reset animation state
        setCurrentTriangle(0);
        setShowAngleLabels(false);
        setTriangleAngles([]);
    }, [sides]);

    // Handle triangle animation
    useEffect(() => {
        if (!showTriangles) {
            setCurrentTriangle(0);
            setTriangleAngles([]);
            setShowAngleLabels(false);
            return;
        }

        // Show angle labels at the start
        setShowAngleLabels(true);

        // Calculate and display triangles one by one with delays
        let timer;
        if (currentTriangle < triangles.length) {
            timer = setTimeout(() => {
                // Add current triangle's angles to the state
                setTriangleAngles(prev => {
                    const newTriangleAngles = [...prev];
                    newTriangleAngles[currentTriangle] = 180; // Each triangle has 180°
                    return newTriangleAngles;
                });

                setCurrentTriangle(prev => prev + 1);
            }, 800);
        } else if (currentTriangle === triangles.length) {
            // Animation complete after all triangles are shown
            onAnimationComplete();
        }

        return () => clearTimeout(timer);
    }, [showTriangles, currentTriangle, triangles.length, onAnimationComplete]);

    // Helper to format angle display
    const formatAngle = (angle) => {
        return `${Math.round(angle)}°`;
    };

    // Calculate position for angle label
    const getAngleLabelPosition = (vertexIndex) => {
        const point = polygonPoints[vertexIndex];
        const center = polygonCenter;

        // Position the label slightly inside the polygon
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const ratio = 0.7; // Move 30% toward center

        return {
            x: point.x - (dx * ratio / distance) * 25,
            y: point.y - (dy * ratio / distance) * 25
        };
    };

    return (
        <div className="w-full h-full relative">
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                className="mx-auto"
            >
                {/* Draw the polygon */}
                <motion.polygon
                    points={polygonPoints.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Draw vertex points */}
                {polygonPoints.map((point, i) => (
                    <motion.circle
                        key={`vertex-${i}`}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#3b82f6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                    />
                ))}

                {/* Draw vertex labels */}
                {polygonPoints.map((point, i) => (
                    <text
                        key={`label-${i}`}
                        x={point.x}
                        y={point.y - 12}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#4b5563"
                    >
                        {String.fromCharCode(65 + i)} {/* A, B, C, ... */}
                    </text>
                ))}

                {/* Draw interior angle labels */}
                {showAngleLabels && polygonPoints.map((_, i) => {
                    const labelPos = getAngleLabelPosition(i);
                    return (
                        <motion.text
                            key={`angle-${i}`}
                            x={labelPos.x}
                            y={labelPos.y}
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="bold"
                            fill="#4338ca"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            {formatAngle(angles[i])}
                        </motion.text>
                    );
                })}

                {/* Draw triangulation lines */}
                {showTriangles && triangles.map((triangle, idx) => {
                    // Only draw triangles up to the current one in the animation
                    if (idx >= currentTriangle) return null;

                    // Draw line from first vertex to each other vertex to create triangles
                    const [a, b, c] = triangle;

                    return (
                        <g key={`triangle-${idx}`}>
                            {/* Line from first vertex to non-adjacent vertices */}
                            <motion.line
                                x1={polygonPoints[a].x}
                                y1={polygonPoints[a].y}
                                x2={polygonPoints[c].x}
                                y2={polygonPoints[c].y}
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8 }}
                            />

                            {/* Triangle number label in the middle of the triangle */}
                            <motion.text
                                x={(polygonPoints[a].x + polygonPoints[b].x + polygonPoints[c].x) / 3}
                                y={(polygonPoints[a].y + polygonPoints[b].y + polygonPoints[c].y) / 3}
                                textAnchor="middle"
                                fontSize="14"
                                fontWeight="bold"
                                fill="#ef4444"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                {idx + 1}
                            </motion.text>

                            {/* Display 180° for each triangle */}
                            {triangleAngles[idx] && (
                                <motion.text
                                    x={(polygonPoints[a].x + polygonPoints[b].x + polygonPoints[c].x) / 3}
                                    y={(polygonPoints[a].y + polygonPoints[b].y + polygonPoints[c].y) / 3 + 16}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fill="#059669"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    180°
                                </motion.text>
                            )}
                        </g>
                    );
                })}

                {/* Center point for reference */}
                <circle
                    cx={polygonCenter.x}
                    cy={polygonCenter.y}
                    r="2"
                    fill="#9ca3af"
                    opacity="0.5"
                />

                {/* Summary text showing the triangles */}
                {showTriangles && currentTriangle > 0 && (
                    <motion.text
                        x="200"
                        y="370"
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#1f2937"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {currentTriangle} triangle{currentTriangle !== 1 ? 's' : ''} × 180° = {currentTriangle * 180}°
                    </motion.text>
                )}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 text-xs bg-white bg-opacity-70 p-2 rounded">
                <div className="flex items-center">
                    <div className="w-4 h-1 bg-red-500 mr-1"></div>
                    <span>Triangulation</span>
                </div>
                <div className="flex items-center mt-1">
                    <div className="w-4 h-1 bg-blue-500 mr-1"></div>
                    <span>Polygon</span>
                </div>
            </div>
        </div>
    );
};

export default PolygonVisualizer;