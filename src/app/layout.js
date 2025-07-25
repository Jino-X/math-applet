import { Toaster } from "react-hot-toast";
import { Inter, Montserrat, Roboto_Mono } from 'next/font/google'

import { TOAST_STYLES } from "@/constants/variable-constants";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-primary',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-tertiary',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-quinary',
})

export const metadata = {
  title: 'Math Visualizer',
  description: 'Interactive mathematics learning applets for educational purposes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-background text-foreground ${montserrat.variable} ${inter.variable} ${robotoMono.variable}`}>
        {children}
        <Toaster position="top-right" toastOptions={TOAST_STYLES} />
      </body>
    </html>
  );
}