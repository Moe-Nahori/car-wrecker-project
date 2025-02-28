const express = require('express');
const chatService = require('../services/chatService');

const router = express.Router();

/**
 * @route GET /api/chat/stats
 * @desc Get chat service statistics
 * @access Public
 */
router.get('/stats', (req, res) => {
  const activeConnections = chatService.getActiveConnections();
  
  res.json({
    activeConnections,
    status: 'operational'
  });
});

module.exports = router;