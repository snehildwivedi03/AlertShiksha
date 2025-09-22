import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#20538c] hover:bg-[#2f6bb2] text-white shadow-lg flex items-center justify-center transition"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chatbox (placeholder for now) */}
      {open && (
        <div className="absolute bottom-16 right-0 w-72 bg-white shadow-lg rounded-lg p-4">
          <p className="text-sm text-gray-600">
            👋 Hi! I’m your AI Assistant. How can I help you today?
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
