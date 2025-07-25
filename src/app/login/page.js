'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [viewportHeight, setViewportHeight] = useState('100vh');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Set viewport height on mount and resize
    useEffect(() => {
        const updateViewportHeight = () => {
            setViewportHeight(`${window.innerHeight}px`);
        };

        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);

        return () => window.removeEventListener('resize', updateViewportHeight);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Invalid credentials');
                return;
            }

            // Only proceed if response was successful
            toast.success('Login successful!');
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100"
            style={{ height: viewportHeight }}
        >
            <motion.div
                className="w-full max-w-md px-8 py-10 mx-4 bg-white rounded-lg shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-accent/10"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary/10"></div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3
                        }}
                        className="bg-white p-1 rounded-full inline-block shadow-md"
                    >
                        <div className="bg-primary rounded-full p-3 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h2
                        className="mt-4 text-2xl font-bold text-primary uppercase tracking-wider"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Welcome Back
                    </motion.h2>

                    <motion.p
                        className="mt-2 text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Log in to your Math Visualizer account
                    </motion.p>
                </motion.div>

                <motion.form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                        >
                            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-medium">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                        >
                            <label htmlFor="password" className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-medium">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.4 }}
                    >
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm uppercase tracking-wider font-medium text-white rounded-md shadow-sm ${isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300`}
                            whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <span>Sign in</span>
                                    <motion.span
                                        className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={{ x: -5 }}
                                        whileHover={{ x: 0 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </motion.span>
                                </>
                            )}
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="text-center mt-4 flex justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.4 }}
                    >
                        <motion.a
                            href="#"
                            className="text-sm text-gray-500 hover:text-primary transition-colors"
                            whileHover={{ x: 3 }}
                        >
                            Create account
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-sm text-gray-500 hover:text-primary transition-colors"
                            whileHover={{ x: 3 }}
                        >
                            Forgot password?
                        </motion.a>
                    </motion.div>
                </motion.form>

                <motion.div
                    className="mt-8 pt-6 border-t border-gray-200 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                >
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to Math Visualizer's
                        <a href="#" className="text-primary hover:underline ml-1">Terms of Service</a> and
                        <a href="#" className="text-primary hover:underline ml-1">Privacy Policy</a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;