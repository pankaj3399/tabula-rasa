const express = require('express');
const router = express.Router();
const knowledgeMapController = require('../controllers/knowledgeMapController');

// Route for KnowledgeMap.jsx
router.get('/knowledge-map', knowledgeMapController.getKnowledgeMap);
router.get('/topics', knowledgeMapController.getKnowledgeMap);
router.get('/topic-content/:slug', knowledgeMapController.getTopicContent);
router.get('/subtopic-content/:id', knowledgeMapController.getSubtopicContent);
router.get('/due-cards', knowledgeMapController.getDueCards);
router.post('/cards', knowledgeMapController.getCardsByIds);
router.post('/update-card-progress', knowledgeMapController.updateCardProgress);
router.post('/update-subtopic-notes', knowledgeMapController.updateSubtopicNotes);
router.get('/subtopic-notes', knowledgeMapController.getSubtopicNotes);

module.exports = router;