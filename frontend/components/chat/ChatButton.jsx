import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatButton = ({ isOpen, onClick }) => {
  const [glowing, setGlowing] = useState(true);
  
  // Create a pulsing glow effect
  useEffect(() => {
    if (!isOpen) {
      const glowInterval = setInterval(() => {
        setGlowing(prev => !prev);
      }, 1500); // Toggle every 1.5 seconds
      
      return () => clearInterval(glowInterval);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-center">
      {/* Label */}
      {!isOpen && (
        <div className="bg-green-600 text-white px-3 py-1 rounded-t-lg shadow-md mb-1 font-medium text-sm">
          Live Chat
        </div>
      )}
      
      {/* Button */}
      <button
        onClick={onClick}
        className={`flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-500 ${
          glowing && !isOpen ? 'glow-effect' : ''
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{
          boxShadow: glowing && !isOpen ? '0 0 20px 5px rgba(34, 197, 94, 0.6)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default ChatButton;