export const logout = async () => {
    try {
        // Call logout API endpoint
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Important for cookies
        });

        if (response.ok) {
            // Clear any client-side cookies as well
            document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
            // Redirect to login page
            window.location.href = '/login';
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};
