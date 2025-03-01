import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { io } from 'socket.io-client';

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can we help you today?", isUser: false, time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Initialize Socket.IO connection when chat is opened
  useEffect(() => {
    // Only connect when chat is open to save resources
    if (isOpen && !socket) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const newSocket = io(backendUrl);
      
      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to chat server');
      });
      
      newSocket.on('chat-message', (message) => {
        setMessages(prev => [...prev, {
          id: message.id || Date.now(),
          text: message.text,
          isUser: message.sender === 'user',
          time: new Date(message.timestamp) || new Date()
        }]);
      });
      
      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from chat server');
      });
      
      setSocket(newSocket);
      
      // Cleanup on unmount or when chat closes
      return () => {
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
      };
    }
  }, [isOpen, socket]);

  // Fallback to local handling when socket isn't connected
  const handleLocalResponse = (userMessage) => {
    setTimeout(() => {
      let response;
      
      // Simple pattern matching for demo purposes
      if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('quote')) {
        response = "We offer competitive prices for all car models. Would you like a free quote? Please provide your car details or call us at +61 412 345 678.";
      } else if (userMessage.toLowerCase().includes('location') || userMessage.toLowerCase().includes('address')) {
        response = "We service major areas in Australia. You can check our coverage map on the homepage or tell us your location and we'll let you know if we operate there.";
      } else if (userMessage.toLowerCase().includes('hours') || userMessage.toLowerCase().includes('open')) {
        response = "We operate Monday to Friday, 8am to 6pm, and Saturday from 9am to 4pm. We're closed on Sundays and public holidays.";
      } else if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        response = "Hello! Welcome to iCar Wreckers chat. How can we assist you today?";
      } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('call')) {
        response = "You can reach us at +61 412 345 678 or fill out our contact form, and one of our team members will get back to you shortly.";
      } else if (userMessage.toLowerCase().includes('thank')) {
        response = "You're welcome! Is there anything else we can help you with?";
      } else {
        response = "Thanks for your message. To better assist you, could you provide more details about your inquiry? Alternatively, you can call us directly at +61 412 345 678 for immediate assistance.";
      }
      
      setMessages(prev => [...prev, { id: prev.length + 2, text: response, isUser: false, time: new Date() }]);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage = { id: messages.length + 1, text: inputValue, isUser: true, time: new Date() };
      setMessages(prev => [...prev, newMessage]);
      
      // If connected to server, send via socket
      if (socket && isConnected) {
        socket.emit('send-message', {
          text: inputValue,
          timestamp: new Date().toISOString()
        });
      } else {
        // Fallback to local response if server not connected
        handleLocalResponse(inputValue);
      }
      
      setInputValue('');
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-40 right-6 z-40 w-11/12 md:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 md:bottom-44 md:right-8">
      {/* Chat header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">iCar Wreckers Chat</h3>
          <p className="text-xs text-blue-100">
            {isConnected ? 'Connected to support' : 'Connecting...'}
          </p>
        </div>
        <button onClick={onClose} className="text-white hover:text-blue-200">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 max-w-3/4 ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
          >
            <div 
              className={`p-3 rounded-lg inline-block ${
                message.isUser 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
            <div className={`text-xs mt-1 text-gray-500 ${message.isUser ? 'text-right' : 'text-left'}`}>
              {formatTime(message.time)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="ml-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;