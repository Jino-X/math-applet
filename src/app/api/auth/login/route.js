import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Verify credentials against environment variables
        const isValidEmail = email === process.env.NEXT_PUBLIC_EMAIL;
        const isValidPassword = password === process.env.AUTH_PASSWORD;

        if (!isValidEmail) {
            return NextResponse.json(
                { message: 'Invalid email' },
                { status: 401 }
            );
        }

        if (!isValidPassword) {
            return NextResponse.json(
                { message: 'Invalid password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { email, timestamp: Date.now() },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Create the response
        const response = NextResponse.json(
            { message: 'Login successful' },
            { status: 200 }
        );

        // Set cookie in the response
        response.cookies.set({
            name: 'auth',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
            path: '/',
            maxAge: 86400 // 1 day
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
