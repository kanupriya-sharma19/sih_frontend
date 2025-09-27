"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EmployeeForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Employee Details
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">Employee ID:</span> 200CST_101
        </p>
        <p>
          <span className="font-semibold">Station Code:</span> STN001
        </p>
        <p>
          <span className="font-semibold">Name:</span> Ajay Ganesh Khandagle
        </p>
        <p>
          <span className="font-semibold">Designation:</span> Station Master
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span> 29/12/2009
        </p>
        <p>
          <span className="font-semibold">Date of Appointment:</span> 30/07/2020
        </p>
        <p>
          <span className="font-semibold">Blood Group:</span> A+
        </p>
      </div>

      <div className="flex justify-center">
  <Button
    type="button"
    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 px-8 rounded-xl shadow-md"
  >
    Send Email
  </Button>
</div>
    </div>
  );
}
