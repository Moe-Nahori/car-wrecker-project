import React, { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  
  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnreadMessages(false);
    }
  };
  
  // Auto-show chat prompt after 30 seconds if not already engaged
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !sessionStorage.getItem('chatPrompted')) {
        setHasUnreadMessages(true);
        sessionStorage.setItem('chatPrompted', 'true');
      }
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [isOpen]);
  
  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
      {hasUnreadMessages && !isOpen && (
        <div className="fixed bottom-44 right-6 z-40 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64 md:bottom-48 md:right-8">
          <p className="text-gray-800 mb-2">Need help with your car valuation?</p>
          <div className="flex justify-between">
            <button 
              onClick={toggleChat}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Chat now
            </button>
            <button 
              onClick={() => setHasUnreadMessages(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
      <ChatWindow 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default LiveChat;