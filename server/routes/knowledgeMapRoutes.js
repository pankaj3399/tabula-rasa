const express = require('express');
const router = express.Router();
const knowledgeMapController = require('../controllers/knowledgeMapController');

// Route for KnowledgeMap.jsx and SystemView
router.get('/knowledge-map', knowledgeMapController.getSystems);
router.get('/topics', knowledgeMapController.getKnowledgeMap);

// Topic routes
router.get('/topic-content/:slug', knowledgeMapController.getTopicContent);

// Subtopic routes - support both ID and slug
router.get('/subtopic-content/:id', knowledgeMapController.getSubtopicContent);
router.get('/subtopic-content/slug/:slug', knowledgeMapController.getSubtopicContent);

// Card routes
router.get('/due-cards', knowledgeMapController.getDueCards);
router.get('/cards', knowledgeMapController.getCardsByIds);
router.post('/cards', knowledgeMapController.getCardsByIds);
router.post('/update-card-progress', knowledgeMapController.updateCardProgress);

// Notes routes
router.post('/update-notes', knowledgeMapController.updateNotes);
router.get('/notes', knowledgeMapController.getNotes);

module.exports = router;