"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function RollingStockForm() {
  const [open, setOpen] = useState(false)
  const chartTypes = ["Linear", "Bar", "Pie", "Scatter"];
const [chartType, setChartType] = useState("Linear");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
   <button
   suppressHydrationWarning
      className="bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold px-4 py-2 rounded shadow-md cursor-pointer transition flex items-center justify-center"
    >
      + Add Rolling Stock
    </button>

      </DialogTrigger>

      <DialogContent className="max-w-8xl w-full max-h-[90vh] overflow-y-auto bg-gray-50 p-12 rounded-2xl shadow-xl">
        {/* Sticky Header */}
        <DialogHeader className="sticky top-0 bg-purple-50 z-10 border-b mt-2  border-purple-600 p-2 mb-4 w-full">
          <DialogTitle className="text-2xl font-bold text-gray-900 w-55">Add Rolling Stock</DialogTitle>
        </DialogHeader>

        <form className="space-y-8">
          {/* Basic Properties */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

             <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-600 inline-block rounded-sm" />
              Basic Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Rolling Stock Name" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Load (t)" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Resistance Factor" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Axle Load (t)" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Mst. Mass Fact" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Length (m)" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Speed max (km/h)" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Tractive Effort max (kN)" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>

          {/* Telegram Configuration */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-600 inline-block rounded-sm" />
              Telegram Configuration
            </h2>
            <div className="flex flex-col gap-6">
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Balise Telegram</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Loop Telegram</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Radio Telegram</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Rack Traction</label>
            </div>
          </div>

           {/* Electrical Systems */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600 inline-block rounded-sm" />
                Electrical Systems
              </h2>
              <div className="flex gap-2">
                <Button  suppressHydrationWarning type="button" className="bg-purple-400 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm">Add</Button>
                <Button  suppressHydrationWarning type="button" className="bg-purple-400 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm">Dupl</Button>
                <Button  suppressHydrationWarning type="button" className="bg-purple-400 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm">Del</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ZN Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2">ZN</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-purple-600" /> AC</label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-purple-600" /> DC</label>
                </div>
              </div>

              {/* System Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2">System</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-purple-600" /> 15kV/25kV AC</label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-purple-600" /> 3kV DC</label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="accent-purple-600" /> 1.5kV DC</label>
                </div>
              </div>
           {/* Speed & Traction Section */}
<div className="md:col-span-2">   {/* span full width in the parent grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    <input type="text" placeholder="Speed max [km/h]" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
    <input type="text" placeholder="Tractive Effort max [kN]" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
    <input type="text" placeholder="Tractive effort min [kN]" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
    <input type="text" placeholder="Adh. good [%]" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
    <input type="text" placeholder="Adh. bad [%]" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
    <input type="text" placeholder="Adh. normal [%]" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
  </div>
</div>
            </div>
          </div>

          {/* Chart Configuration */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-600 inline-block rounded-sm" />
              Chart Configuration
            </h2>
            <div className="flex flex-wrap gap-6">
               <input type="text" placeholder="v" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
                <input type="text" placeholder="z" className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500" />
                {/* Chart Type Dropdown */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Chart Type
      </label>
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-purple-500"
      >
        {chartTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
            </div>
          </div>
          <div className="flex flex-row gap-20">
          {/* Submit Button */}
          <Button type="submit" className=" bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 rounded-xl shadow-md">
            Del Rolling Stock
          </Button>
          <Button type="submit" className=" bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 rounded-xl shadow-md">
            Add Rolling Stock
          </Button>
          </div>
           <div className="flex flex-row gap-2">
          {/* Submit Button */}
          <Button type="submit" className=" bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-3 rounded-xl shadow-md">
            Set Data
          </Button>
          <Button type="submit" className=" bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-3 rounded-xl shadow-md">
            Save Depot
          </Button>
          <Button type="submit" className=" bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-3 rounded-xl shadow-md">
            New Depot
          </Button>
          <Button type="submit" className=" bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-3 rounded-xl shadow-md">
            Open Depot
          </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
