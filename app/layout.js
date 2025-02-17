import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Navbar from "@/components/Navbar";
import Feedback from "@/components/feedback";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PassOP - Your Trusted Password Vault",
  description: "Protect your online privacy with our secure password manager. Store, manage, and generate strong passwords with ease. Enjoy features like auto-fill, cross-device sync, and two-factor authentication for enhanced security. Keep your passwords safe and organized today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.png'/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-green-100 dark:bg-[rgb(21,21,21)]`}>
        <Navbar />
        <Feedback />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
