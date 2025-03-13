const express = require('express');
const router = express.Router();
const knowledgeMapController = require('../controllers/knowledgeMapController');

router.get('/topics', knowledgeMapController.getKnowledgeMap);
router.get('/subtopic/:id', knowledgeMapController.getSubtopicContent);

module.exports = router;