/**
 * Chat Service
 * Manages WebSocket connections and chat functionality
 */

const socketIo = require('socket.io');
const logger = require('../utils/logger');

// Store for active connections
const activeConnections = new Map();

// Store for chat operators (simulated for demonstration)
const operators = [
  { id: 'op1', name: 'Support Team', isAvailable: true }
];

// Simple auto-response patterns for demo
const autoResponses = [
  { 
    patterns: ['price', 'quote', 'cost', 'valuation', 'worth'], 
    response: "We offer competitive prices for all car models. Would you like a free quote? Please provide your car details or call us at +61 412 345 678."
  },
  { 
    patterns: ['location', 'address', 'where', 'area', 'service'], 
    response: "We service major areas in Australia. You can check our coverage map on the homepage or tell us your location and we'll let you know if we operate there."
  },
  { 
    patterns: ['hours', 'open', 'time', 'when', 'operating'], 
    response: "We operate Monday to Friday, 8am to 6pm, and Saturday from 9am to 4pm. We're closed on Sundays and public holidays."
  },
  { 
    patterns: ['hello', 'hi', 'hey', 'greetings'], 
    response: "Hello! Welcome to iCar Wreckers chat. How can we assist you today?"
  },
  { 
    patterns: ['contact', 'call', 'phone', 'reach', 'email'], 
    response: "You can reach us at +61 412 345 678 or fill out our contact form, and one of our team members will get back to you shortly."
  },
  { 
    patterns: ['thank', 'thanks', 'appreciate', 'grateful'], 
    response: "You're welcome! Is there anything else we can help you with?"
  }
];

// Get auto-response based on message content
const getAutoResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  for (const pattern of autoResponses) {
    if (pattern.patterns.some(p => lowerMessage.includes(p))) {
      return pattern.response;
    }
  }
  
  return "Thanks for your message. To better assist you, could you provide more details about your inquiry? Alternatively, you can call us directly at +61 412 345 678 for immediate assistance.";
};

/**
 * Initialize Socket.IO with the HTTP server
 * @param {Object} server - HTTP server instance
 * @returns {Object} - Socket.IO instance
 */
const initialize = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:8001',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    const clientId = socket.id;
    logger.info(`New client connected: ${clientId}`);
    
    // Store the connection
    activeConnections.set(clientId, {
      socket,
      connected: Date.now(),
      messages: []
    });
    
    // Send welcome message
    socket.emit('chat-message', {
      id: Date.now(),
      text: "Welcome to iCar Wreckers chat support! How can we help you today?",
      sender: 'system',
      timestamp: new Date().toISOString()
    });
    
    // Handle incoming messages
    socket.on('send-message', (data) => {
      const { text } = data;
      logger.info(`Message from ${clientId}: ${text}`);
      
      // Store the message
      const clientData = activeConnections.get(clientId);
      if (clientData) {
        clientData.messages.push({
          id: Date.now(),
          text,
          isUser: true,
          timestamp: new Date().toISOString()
        });
      }
      
      // Simulate agent response
      setTimeout(() => {
        const response = getAutoResponse(text);
        
        socket.emit('chat-message', {
          id: Date.now(),
          text: response,
          sender: 'agent',
          timestamp: new Date().toISOString()
        });
        
        // Store the response
        if (clientData) {
          clientData.messages.push({
            id: Date.now(),
            text: response,
            isUser: false,
            timestamp: new Date().toISOString()
          });
        }
      }, 1000);
    });
    
    // Handle client disconnection
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${clientId}`);
      activeConnections.delete(clientId);
    });
  });

  return io;
};

module.exports = {
  initialize,
  getActiveConnections: () => activeConnections.size
};