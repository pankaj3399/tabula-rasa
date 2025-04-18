const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../models/User');
const qs = require('qs');


exports.getKnowledgeMap = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    if (!STRAPI_URL || !STRAPI_TOKEN) {
      throw new Error('STRAPI_URL or STRAPI_TOKEN is not defined in environment variables');
    }
    const response = await axios.get(
      `${STRAPI_URL}/api/topics?populate=subtopics&publicationState=live&sort=order:asc`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );
    console.log('Strapi Response for /api/topics:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching knowledge map:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch knowledge map' });
  }
};

exports.getTopicContent = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { slug } = req.params;
    const response = await axios.get(
      `${STRAPI_URL}/api/topics?filters[slug][$eq]=${slug}&populate[types][populate]=*&populate[diagnosis][populate]=*&populate=cards&publicationState=live`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );
    console.log('Topic Content Response:', response.data);
    if (!response.data.data || response.data.data.length === 0) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching topic content:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch topic content' });
  }
};

exports.getSubtopicContent = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { id,slug } = req.params;
    console.log(`Attempting to fetch subtopic with ID: ${id} from ${STRAPI_URL}/api/subtopics/${id??slug}`);
    const response = await axios.get(
      `${STRAPI_URL}/api/subtopics/${id??slug}?populate=*&publicationState=live`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );
    console.log('Subtopic Content Response:', JSON.stringify(response.data, null, 2));
    if (!response.data.data) {
      return res.status(404).json({ error: `Subtopic with ID ${id} not found` });
    }
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching subtopic content:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response',
      status: error.response ? error.response.status : 'Unknown',
      config: error.config ? error.config.url : 'No config',
    });
    // Pass the original Strapi error status if available
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || 'Failed to fetch subtopic content',
    });
  }
};

exports.getDueCards = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const now = new Date();
    const dueCards = user.cardProgress
      .filter(card => card.dueDate <= now)
      .map(card => card.cardId.toString());
    
    res.json({ dueCardIds: dueCards });
  } catch (error) {
    console.error('Error fetching due cards:', error.message);
    res.status(500).json({ error: 'Failed to fetch due cards' });
  }
};

exports.getCardsByIds = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty card IDs' });
    }

    const query = qs.stringify({
      filters: {
        id: {
          $in: ids, // array of IDs
        },
      },
      populate: ['topic'],
      publicationState: 'live',
    }, {
      encodeValuesOnly: true,
    });

    console.log(`${STRAPI_URL}/api/cards?${query}`)
    const response = await axios.get(
      `${STRAPI_URL}/api/cards?${query}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );
    console.log('Cards Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cards:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

exports.updateCardProgress = async (req, res) => {
  try {
    const { userId, cardId, quality } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cardProgress = user.cardProgress.find(cp => cp.cardId.toString() === cardId);
    if (!cardProgress) {
      user.cardProgress.push({
        cardId,
        dueDate: new Date(),
        interval: 1,
        easeFactor: 2.5,
        lastReviewed: new Date(),
        quality,
      });
    } else {
      cardProgress.lastReviewed = new Date();
      cardProgress.quality = quality;

      if (quality >= 3) {
        if (cardProgress.interval === 1) {
          cardProgress.interval = 1;
        } else if (cardProgress.interval === 1) {
          cardProgress.interval = 6;
        } else {
          cardProgress.interval = Math.round(cardProgress.interval * cardProgress.easeFactor);
        }
        cardProgress.easeFactor = Math.max(1.3, cardProgress.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
      } else {
        cardProgress.interval = 1;
      }

      const now = new Date();
      cardProgress.dueDate = new Date(now.getTime() + cardProgress.interval * 24 * 60 * 60 * 1000);
    }

    await user.save();
    res.json({ message: 'Card progress updated' });
  } catch (error) {
    console.error('Error updating card progress:', error.message);
    res.status(500).json({ error: 'Failed to update card progress' });
  }
};

exports.updateSubtopicNotes = async (req, res) => {
  try {
    const { userId, subtopicId, notes } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const note = user.notes.find(n => n.subtopicId === subtopicId);
    if (note) {
      note.content = notes;
      note.updatedAt = new Date();
    } else {
      user.notes.push({ subtopicId, content: notes });
    }

    await user.save();
    res.json({ message: 'Notes updated successfully' });
  } catch (error) {
    console.error('Error updating subtopic notes:', error.message);
    res.status(500).json({ error: 'Failed to update subtopic notes' });
  }
};

exports.getSubtopicNotes = async (req, res) => {
  try {
    const { userId, subtopicId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const note = user.notes.find(n => n.subtopicId === subtopicId);
    res.json({ notes: note ? note.content : '' });
  } catch (error) {
    console.error('Error fetching subtopic notes:', error.message);
    res.status(500).json({ error: 'Failed to fetch subtopic notes' });
  }
};