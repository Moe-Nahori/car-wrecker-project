const http = require('http');
const app = require('./app');
const chatService = require('./services/chatService');
const logger = require('./utils/logger');

// Get port from environment variables or use default
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server with chat service
const io = chatService.initialize(server);

// Start the server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Chat service initialized`);
});