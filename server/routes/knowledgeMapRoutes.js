const express = require('express');
const router = express.Router();
const knowledgeMapController = require('../controllers/knowledgeMapController');

// Route for KnowledgeMap.jsx and SystemView
router.get('/knowledge-map', knowledgeMapController.getSystems);
router.get('/topics', knowledgeMapController.getKnowledgeMap);
router.get('/systems', knowledgeMapController.getSystems); 

// Topic routes
router.get('/topic-content/:slug', knowledgeMapController.getTopicContent);
router.get('/topic-cards-due/:slug', knowledgeMapController.getTopicCardsDueForReview);
router.get('/subtopic-content/:id', knowledgeMapController.getSubtopicContent);
router.get('/subtopic-content/slug/:slug', knowledgeMapController.getSubtopicContent);

// Card routes
router.get('/due-cards', knowledgeMapController.getDueCards);
router.post('/cards', knowledgeMapController.getTopicCards);
router.post('/update-card-progress', knowledgeMapController.updateCardProgress);
router.get('/user-card-progress', knowledgeMapController.getUserCardProgress);

// Notes routes
router.post('/update-notes', knowledgeMapController.updateNotes);
router.get('/notes', knowledgeMapController.getNotes);
// Study Settings routes
router.post('/study-settings', knowledgeMapController.setStudySessionSettings);

module.exports = router;