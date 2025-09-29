"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function EmployeeForm() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = () => {
    // Here you can also call your backend API to actually send the email
    setEmailSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Employee Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
        <p>
          <span className="font-semibold">Employee ID:</span> 305647
        </p>
        <p>
          <span className="font-semibold">Name:</span> Moksh Jhaveri
        </p>
        <p className="break-words">
          <span className="font-semibold">Email:</span>{" "}
          <span className="break-all">moksh.drishti25022@gmail.com</span>
        </p>
        <p>
          <span className="font-semibold">Designation:</span> Station Master
        </p>
        <p>
          <span className="font-semibold">Station Code:</span> ADH
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span> 25/02/2002
        </p>
        <p>
          <span className="font-semibold">Date of Appointment:</span> 01/08/2025
        </p>
        <p>
          <span className="font-semibold">Blood Group:</span> B+
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          type="button"
          onClick={handleSendEmail}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 px-10 rounded-xl shadow-md transition"
        >
          Send Email
        </Button>
      </div>

      {emailSent && (
        <div className="mt-6 text-center bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl shadow-sm animate-fadeIn">
          Email sent with login credentials!
        </div>
      )}
    </div>
  );
}
