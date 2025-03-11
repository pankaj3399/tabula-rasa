// server/controllers/knowledgeMapController.js
const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

exports.getKnowledgeMap = async (req, res) => {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/systems?populate[topics][populate]=subtopics`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching knowledge map:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge map' });
  }
};

exports.getSubtopicContent = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${STRAPI_URL}/api/subtopics/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching subtopic content:', error);
    res.status(500).json({ error: 'Failed to fetch subtopic content' });
  }
};

exports.updateSubtopicContent = async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;
  try {
    const response = await axios.put(
      `${STRAPI_URL}/api/subtopics/${id}`,
      { data: { notes } },
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error updating subtopic content:', error);
    res.status(500).json({ error: 'Failed to update subtopic content' });
  }
};