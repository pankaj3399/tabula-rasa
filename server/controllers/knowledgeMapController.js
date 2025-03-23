const axios = require('axios');

exports.getKnowledgeMap = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  // Debug log to verify environment variables at runtime
  console.log('STRAPI_URL at runtime:', STRAPI_URL);
  console.log('STRAPI_TOKEN at runtime:', STRAPI_TOKEN);

  try {
    if (!STRAPI_URL || !STRAPI_TOKEN) {
      throw new Error('STRAPI_URL or STRAPI_TOKEN is not defined in environment variables');
    }
    const response = await axios.get(`${STRAPI_URL}/api/topics?populate=subtopics&publicationState=live`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });
    console.log('Strapi Response for /api/topics:', response.data); // Debug: Log the raw response from Strapi
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching knowledge map:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch knowledge map' });
  }
};

exports.getSubtopicContent = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { id } = req.params;
    console.log(`Fetching subtopic with id: ${id} from ${STRAPI_URL}/api/subtopics/${id}?populate=*`);
    const response = await axios.get(`${STRAPI_URL}/api/subtopics/${id}?populate=*&publicationState=live`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });
    console.log('Subtopic Content Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching subtopic content:', error);
    res.status(500).json({ error: 'Failed to fetch subtopic content' });
  }
};

exports.updateSubtopicNotes = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { id } = req.params;
    const { notes } = req.body;
    const response = await axios.put(
      `${STRAPI_URL}/api/subtopics/${id}`,
      {
        data: { notes },
      },
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error updating subtopic notes:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to update subtopic notes' });
  }
};