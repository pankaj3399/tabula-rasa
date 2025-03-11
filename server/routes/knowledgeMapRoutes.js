const express = require('express');
const router = express.Router();
const knowledgeMapController = require('../controllers/knowledgeMapController');

router.get('/knowledge-map', knowledgeMapController.getKnowledgeMap);
router.get('/subtopic-content/:id', knowledgeMapController.getSubtopicContent);
router.put('/subtopic-content/:id', knowledgeMapController.updateSubtopicContent);

module.exports = router;