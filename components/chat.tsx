"use client"

import { useState, useRef, useEffect } from "react"
import { X, MessageCircle, Send } from "lucide-react"

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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSend = (msg?: string) => {
    const text = msg || input
    if (!text.trim()) return

    const newMessage: Message = { from: "user", text }
    setMessages((prev) => [...prev, newMessage])

    // Simple bot echo response
    setTimeout(() => {
      const botReply: Message = { 
        from: "bot", 
        text: `I received your message about "${text}". This is a demo response.` 
      }
      setMessages((prev) => [...prev, botReply])
    }, 600)

    if (!mounted) return
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div
        className={`w-80 h-[32rem] bg-purple-50 shadow-2xl rounded-2xl flex flex-col overflow-hidden transform transition-all duration-300 mb-3 border border-purple-100 ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-purple-700 text-white flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Drishti Assistant</h2>
              <p className="text-xs text-purple-200">Online • Ready to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-white">
          {messages.length === 0 && (
            <div className="text-center text-purple-600 my-8">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium">Hello! How can I help you today?</p>
              <p className="text-xs text-purple-400 mt-1">
                I'm here to assist with train information
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "bot" && (
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] break-words shadow-sm ${
                  msg.from === "user"
                    ? "bg-purple-600 text-white rounded-br-none shadow-lg"
                    : "bg-white text-purple-900 rounded-bl-none border border-purple-200 shadow-md"
                }`}
              >
                {msg.text}
              </div>
              {msg.from === "user" && (
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white text-sm font-bold">U</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Default Prompts */}
        {messages.length === 0 && (
          <div className="p-3 border-t border-purple-100 bg-white">
            <p className="text-xs text-purple-600 mb-2 font-medium">Quick questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {defaultPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg transition text-left border border-purple-200 hover:border-purple-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 border-t border-purple-100 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-purple-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white"
              placeholder="Type your message..."
            />
            <button
              onClick={() => handleSend()}
              className="bg-purple-600 hover:bg-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg hover:shadow-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-purple-400 text-center mt-2">
            Drishti Assistant • Always here to help
          </p>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border-4 border-white pointer-events-auto ${
          isOpen
            ? "bg-purple-400 scale-90"
            : "bg-purple-600 hover:bg-purple-700 scale-100 hover:scale-110"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  )
}
