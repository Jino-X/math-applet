/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    dark: '#D35F00', // Darker orange
                    light: '#FF8C38', // Lighter orange
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    dark: '#E2DBCF', // Darker light orange/gray
                    light: '#F5F1EB', // Lighter light orange/gray
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    dark: '#2A2E35', // Darker gray
                    light: '#454B57', // Lighter gray
                    foreground: 'hsl(var(--accent-foreground))'
                },
                neutral: {
                    DEFAULT: '#4A4A4A',
                    dark: '#333333',
                    light: '#666666',
                    lighter: '#999999',
                    lightest: '#F5F5F5'
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};