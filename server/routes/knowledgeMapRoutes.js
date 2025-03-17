const express = require('express');
const router = express.Router();
const knowledgeMapController = require('../controllers/knowledgeMapController');

// Route for KnowledgeMap.jsx
router.get('/knowledge-map', knowledgeMapController.getKnowledgeMap);
// Existing routes
router.get('/topics', knowledgeMapController.getKnowledgeMap);
router.get('/subtopic-content/:id', knowledgeMapController.getSubtopicContent);

module.exports = router;