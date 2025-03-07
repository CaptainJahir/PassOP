import React from "react";
import PasswordGen from "@/components/PasswordGen";

const page = () => {
// write password length authentication

  return (
    <div className="bg-[url('/assets/PassGenBg.jpg')] dark:bg-[url('/assets/PassGenDarkBg2.webp')] bg-cover text-white h-[100vh]">
      {/* Logo */}
      <div className="flex justify-center pt-[3rem] items-center flex-col gap-1">
        <div className="text-5xl mt-12 font-bold text-gray-400">
          <span className="text-red-600">&lt;</span>
          <span>Gen</span>
          <span className="text-green-600">Pass</span>
          <span className="text-red-600">/&gt;</span>
        </div>

        <span className="text-lg font-semibold text-white">
          Stronger Passwords, Smoother Security
        </span>
      </div>
      <PasswordGen />
    </div>
  );
};

export default page;
export const metadata = {
  title: "GenPass - Secure password in seconds",
  description: "Secure and user-friendly password generator to create strong, random passwords for enhanced online security. Protect your accounts with complex, reliable passwords instantly."
}
