import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import logo from "../assets/logo.png"; // your logo path

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Placeholder bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: "Hello! This is a placeholder response 🤖", sender: "bot" }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full bg-[#20538c] hover:bg-[#2f6bb2] text-white shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110"
      >
        <MessageCircle size={30} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#20538c] text-white flex items-center justify-between p-3 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-14 h-7 rounded-full object-cover" />

            {/* <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />*/}
              <span className="font-semibold text-lg">AlertBot</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white hover:text-[#20538c] p-1 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm italic">
                👋 Hi! I’m your AlertBot. How can I help you today?
              </p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-xl max-w-[70%] break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto rounded-br-none"
                    : "bg-gray-200 text-gray-800 mr-auto rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex space-x-2 border-t bg-gray-100">
            <input
              type="text"
              className="flex-1 border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#20538c] transition"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-[#20538c] text-white px-4 py-2 rounded-full hover:bg-[#2f6bb2] transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
