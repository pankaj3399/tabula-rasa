const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

exports.getKnowledgeMap = async (req, res) => {
  try {
    const response = await axios.get(`${STRAPI_URL}/topics?populate=subtopics`, {
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
    const response = await axios.get(`${STRAPI_URL}/subtopics/${id}?populate=*`, {
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