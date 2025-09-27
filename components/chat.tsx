"use client"

import { useState } from "react"
import { X } from "lucide-react"

type Message = { from: "user" | "bot"; text: string }

const defaultPrompts = [
  "What if 90951 EMU is halted with respect to 12904 Express train?",
  "Show me the Western Express train status.",
  "How to check live train delays?",
  "Next stop of 22953 Gujarat Express?",
]

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleSend = (msg?: string) => {
    const text = msg || input
    if (!text.trim()) return

    const newMessage: Message = { from: "user", text }
    setMessages((prev) => [...prev, newMessage])

    // simple bot echo response
    setTimeout(() => {
      const botReply: Message = { from: "bot", text: `You asked: ${text}` }
      setMessages((prev) => [...prev, botReply])
    }, 600)

    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`w-80 h-[28rem] bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden transform transition-all duration-300 mb-3 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-purple-600 text-white flex justify-between items-center p-3">
          <div className="flex items-center gap-2">
            <img
              src="/images/chatbot.png"
              alt="ChatBot Logo"
              className="w-14 h-14 rounded-full object-cover"
            />
            <h2 className="font-bold text-lg">Drishti ChatBot</h2>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.from === "user"
                  ? "ml-auto bg-blue-100 text-blue-900"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Default Prompts */}
        {messages.length === 0 && (
          <div className="p-3 border-t bg-gray-100">
            <div className="flex flex-col gap-2">
              {defaultPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-sm font-bold bg-purple-200 text-black px-3 py-2 rounded-lg hover:bg-purple-300 transition text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-2 border-t flex bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={() => handleSend()}
            className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-purple-600 text-white p-1 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        <img
          src="/images/chatbot.png"
          alt="ChatBot Logo"
          className="w-18 h-18 rounded-full object-cover"
        />
      </button>
    </div>
  )
}