"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function RollingStockForm() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-6 py-3 shadow-md">
          + Add New Train
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gray-50 p-12 rounded-2xl shadow-xl">
        {/* Sticky Header */}
        <DialogHeader className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200 pb-3 mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Add Rolling Stock</DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          {/* Basic Properties */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Properties</h2>
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
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Telegram Configuration</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Balise Telegram</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Loop Telegram</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Radio Telegram</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Rack Traction</label>
            </div>
          </div>

          {/* Electrical Systems */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Electrical Systems</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> AC 15kV/25kV</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> DC 3kV</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> DC 1.5kV</label>
            </div>
          </div>

          {/* Chart Configuration */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Chart Configuration</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Passenger Chart</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Delay Chart</label>
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="accent-purple-600" /> Platform Occupancy</label>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 rounded-xl shadow-md">
            Save Rolling Stock
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
