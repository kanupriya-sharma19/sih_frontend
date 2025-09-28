"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EmployeeForm } from "@/components/user_info";

export function UserForm() {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Reset form state when dialog closes
  useEffect(() => {
    if (!open) {
      setShowForm(false);
    }
  }, [open]);

  return (
 <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button 
    suppressHydrationWarning
    className="bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold px-4 py-2 rounded shadow-md flex items-center justify-center">
  + Add New Employee
</Button>

  </DialogTrigger>

  <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gray-50 p-12 rounded-2xl shadow-xl">
    <DialogHeader className="sticky top-0 bg-purple-50 z-10 border-b mt-2 border-purple-600 p-2 mb-4 w-full">
      <DialogTitle className="text-2xl font-bold text-gray-900">
        {showForm ? "Employee Details" : "Add New Employee"}
      </DialogTitle>
    </DialogHeader>

    {!showForm ? (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <label className="block text-center text-gray-700 font-medium mb-2">
            Employee ID
          </label>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Employee Id (2xxxxxxx)"
              maxLength={10}
              className="w-full max-w-xs border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            suppressHydrationWarning
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-2 px-6 rounded shadow-md"
          >
            Add Employee
          </Button>
        </div>
      </div>
    ) : (
      <EmployeeForm />
    )}
  </DialogContent>
</Dialog>

  );
}
