const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../models/User');
const qs = require('qs');

exports.getKnowledgeMap = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    if (!STRAPI_URL || !STRAPI_TOKEN) {
      throw new Error(
        'STRAPI_URL or STRAPI_TOKEN is not defined in environment variables'
      );
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
    console.error(
      'Error fetching knowledge map:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Failed to fetch knowledge map' });
  }
};

exports.getTopicContent = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { slug } = req.params;

    console.log(`[getTopicContent] Fetching topic with slug: ${slug}`);
    console.log(`[getTopicContent] Strapi URL: ${STRAPI_URL}`);
    console.log(`[getTopicContent] Token exists: ${!!STRAPI_TOKEN}`);

    if (!STRAPI_URL || !STRAPI_TOKEN) {
      throw new Error(
        'STRAPI_URL or STRAPI_TOKEN is not defined in environment variables'
      );
    }

    // Build the query to get topic with subtopics
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: {
          subtopics: {
            populate: '*',
          },
        },
        publicationState: 'live',
      },
      {
        encodeValuesOnly: true,
      }
    );

    const endpoint = `${STRAPI_URL}/api/topics?${query}`;
    console.log(`[getTopicContent] Full endpoint: ${endpoint}`);

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`[getTopicContent] Response status: ${response.status}`);
    console.log(
      `[getTopicContent] Response data:`,
      JSON.stringify(response.data, null, 2)
    );

    if (!response.data.data || response.data.data.length === 0) {
      console.log(`[getTopicContent] No topic found with slug: ${slug}`);
      return res.status(404).json({
        error: 'Topic not found',
        slug: slug,
        available_topics: 'Check your seeded data for available topic slugs',
      });
    }

    console.log(
      `[getTopicContent] Successfully found topic: ${
        response.data.data[0].name || response.data.data[0].attributes?.name
      }`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      `[getTopicContent] Error fetching topic content for slug "${req.params.slug}":`,
      {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
        },
      }
    );

    // Return detailed error for debugging
    res.status(error.response?.status || 500).json({
      error:
        error.response?.data?.error?.message || 'Failed to fetch topic content',
      details: {
        message: error.message,
        slug: req.params.slug,
        strapiUrl: process.env.STRAPI_URL,
        hasToken: !!process.env.STRAPI_TOKEN,
      },
    });
  }
};

exports.getSubtopicContent = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { id, slug } = req.params;
    let endpoint;

    if (id && !isNaN(id)) {
      // If it's a numeric ID
      endpoint = `${STRAPI_URL}/api/subtopics/${id}?populate=*&publicationState=live`;
    } else if (slug) {
      // If it's a slug, we need to query it differently since slug is a UID field
      const query = qs.stringify(
        {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: '*',
          publicationState: 'live',
        },
        {
          encodeValuesOnly: true,
        }
      );
      endpoint = `${STRAPI_URL}/api/subtopics?${query}`;
    } else {
      return res.status(400).json({ error: 'Either ID or slug is required' });
    }

    console.log(`Attempting to fetch subtopic from: ${endpoint}`);

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    console.log(
      'Subtopic Content Response:',
      JSON.stringify(response.data, null, 2)
    );

    // Handle different response formats depending on whether we used ID or slug
    let subtopicData;
    if (slug && !id) {
      // When using slug filtering, we get an array
      if (!response.data.data || response.data.data.length === 0) {
        return res
          .status(404)
          .json({ error: `Subtopic with slug ${slug} not found` });
      }
      subtopicData = response.data.data[0]; // Take the first match
    } else {
      // When using ID, we get a single object
      if (!response.data.data) {
        return res
          .status(404)
          .json({ error: `Subtopic with ID ${id} not found` });
      }
      subtopicData = response.data.data;
    }

    res.json({ data: subtopicData });
  } catch (error) {
    console.error('Error fetching subtopic content:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response',
      status: error.response ? error.response.status : 'Unknown',
      config: error.config ? error.config.url : 'No config',
    });
    res.status(error.response?.status || 500).json({
      error:
        error.response?.data?.error?.message ||
        'Failed to fetch subtopic content',
    });
  }
};

exports.getDueCards = async (req, res) => {
  try {
    const userId = req.query.userId;
    const topicSlug = req.query.topicSlug; // Extract topic slug from query params

    console.log(
      `Getting due cards for user ${userId} with topic slug: ${topicSlug}`
    );

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const now = new Date();
    let dueCards = user.cardProgress
      .filter((card) => card.dueDate <= now)
      .sort((a, b) => {
        // Calculate days overdue
        const aDaysOverdue = Math.max(
          0,
          (now - a.dueDate) / (24 * 60 * 60 * 1000)
        );
        const bDaysOverdue = Math.max(
          0,
          (now - b.dueDate) / (24 * 60 * 60 * 1000)
        );

        // Calculate priority based on days overdue and ease factor
        const aPriority = aDaysOverdue * (1 / a.easeFactor);
        const bPriority = bDaysOverdue * (1 / b.easeFactor);

        // Sort by priority (highest first)
        return bPriority - aPriority;
      })
      .map((card) => card.cardId);

    // If we have a topic slug, we need to get cards only for that topic
    if (topicSlug) {
      console.log(`Filtering cards by topic: ${topicSlug}`);

      // First get the topic ID from Strapi
      const qs = require('qs');
      const axios = require('axios');
      const STRAPI_URL = process.env.STRAPI_URL;
      const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

      try {
        // Get the topic from Strapi
        const topicQuery = qs.stringify(
          {
            filters: {
              slug: {
                $eq: topicSlug,
              },
            },
          },
          {
            encodeValuesOnly: true,
          }
        );

        const topicResponse = await axios.get(
          `${STRAPI_URL}/api/topics?${topicQuery}`,
          {
            headers: {
              Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
          }
        );

        if (topicResponse.data.data && topicResponse.data.data.length > 0) {
          const topicId = topicResponse.data.data[0].id;
          console.log(`Found topic ID: ${topicId}`);

          // Get cards for this topic
          const cardsQuery = qs.stringify(
            {
              filters: {
                topic: {
                  id: {
                    $eq: topicId,
                  },
                },
              },
              fields: ['id'],
              pagination: {
                limit: 100,
              },
              publicationState: 'live',
            },
            {
              encodeValuesOnly: true,
            }
          );

          const cardsResponse = await axios.get(
            `${STRAPI_URL}/api/cards?${cardsQuery}`,
            {
              headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`,
              },
            }
          );

          if (cardsResponse.data.data && cardsResponse.data.data.length > 0) {
            // Extract card IDs from the topic
            const topicCardIds = cardsResponse.data.data.map((card) =>
              parseInt(card.id)
            );
            console.log(
              `Found ${topicCardIds.length} cards for topic ${topicSlug}:`,
              topicCardIds
            );

            // Filter due cards to only include cards from this topic
            if (dueCards.length > 0) {
              dueCards = dueCards.filter((cardId) =>
                topicCardIds.includes(parseInt(cardId))
              );
              console.log(
                `Filtered due cards for topic ${topicSlug}:`,
                dueCards
              );
            } else {
              // If no due cards but topic has cards, use the topic's cards
              dueCards = topicCardIds;
              console.log(
                `Using all topic cards since no due cards:`,
                dueCards
              );
            }
          } else {
            console.log(`No cards found for topic ${topicSlug}`);
          }
        } else {
          console.log(`Topic not found with slug: ${topicSlug}`);
        }
      } catch (error) {
        console.error('Error fetching topic cards:', error.message);
      }
    }

    // If no due cards and no progress, add the default card with ID 1
    if (dueCards.length === 0 && user.cardProgress.length === 0) {
      // Use numeric ID 1 instead of string ID
      const sampleCardId = 1;
      user.cardProgress.push({
        cardId: sampleCardId,
        dueDate: new Date(),
        interval: 1,
        easeFactor: 2.5,
        lastReviewed: new Date(),
        quality: 0,
      });
      await user.save();
      dueCards.push(sampleCardId);
    }

    console.log('Final Due Card IDs:', dueCards);
    res.json({ dueCardIds: dueCards });
  } catch (error) {
    console.error('Error fetching due cards:', error.message);
    res.status(500).json({ error: 'Failed to fetch due cards' });
  }
};

exports.getCardsByIds = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
  const qs = require('qs');

  try {
    let ids = [];
    // Get topic slug from both query params (GET) and request body (POST)
    let topicSlug = req.query.topicSlug || req.body.topicSlug;

    console.log('Request query:', req.query);
    console.log('Request body:', req.body);
    console.log('Topic slug from request:', topicSlug);

    // Handle GET request with filters[id][$in] query parameter
    if (req.method === 'GET') {
      const filterParams = req.query['filters[id][$in]'];
      ids = Array.isArray(filterParams)
        ? filterParams
        : filterParams
        ? [filterParams]
        : [];
    } else if (req.method === 'POST') {
      ids = req.body.ids || [];
    }

    console.log('Processing IDs:', ids, 'Topic slug:', topicSlug);

    // If we have a topic slug, prioritize fetching cards from that topic
    if (topicSlug) {
      console.log(`Fetching cards for topic: ${topicSlug}`);

      // First fetch the topic to get its ID
      const topicQuery = qs.stringify(
        {
          filters: {
            slug: {
              $eq: topicSlug,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const topicResponse = await axios.get(
        `${STRAPI_URL}/api/topics?${topicQuery}`,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
          },
        }
      );

      if (topicResponse.data.data && topicResponse.data.data.length > 0) {
        const topicId = topicResponse.data.data[0].id;
        console.log(`Found topic ID: ${topicId}`);

        // Now fetch cards for this topic
        const cardsQuery = qs.stringify(
          {
            filters: {
              topic: {
                id: {
                  $eq: topicId,
                },
              },
              ...(ids.length > 0
                ? {
                    id: {
                      $in: ids,
                    },
                  }
                : {}),
            },
            populate: 'topic',
            publicationState: 'live',
          },
          {
            encodeValuesOnly: true,
          }
        );

        console.log(
          `Fetching cards from: ${STRAPI_URL}/api/cards?${cardsQuery}`
        );

        const cardsResponse = await axios.get(
          `${STRAPI_URL}/api/cards?${cardsQuery}`,
          {
            headers: {
              Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
          }
        );

        console.log(
          'Topic-specific cards response:',
          JSON.stringify(cardsResponse.data, null, 2)
        );

        if (cardsResponse.data.data && cardsResponse.data.data.length > 0) {
          return res.json(cardsResponse.data);
        } else {
          console.log(
            `No cards found for topic ID ${topicId}. Falling back to regular card lookup.`
          );
        }
      } else {
        console.log(`No topic found with slug: ${topicSlug}`);
      }
    }

    // If no topic specified or no cards found for the topic, continue with original logic
    if (ids.length === 0) {
      // If no valid IDs provided, try to find a default card
      console.log('No valid card IDs provided, looking for a default card');
      const query = qs.stringify(
        {
          populate: 'topic',
          pagination: {
            limit: 1,
          },
          publicationState: 'live',
        },
        {
          encodeValuesOnly: true,
        }
      );

      const response = await axios.get(`${STRAPI_URL}/api/cards?${query}`, {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      });

      return res.json(response.data);
    }

    // Regular card lookup by IDs
    const query = qs.stringify(
      {
        filters: {
          id: {
            $in: ids,
          },
        },
        populate: 'topic',
        publicationState: 'live',
      },
      {
        encodeValuesOnly: true,
      }
    );

    console.log(`Fetching cards from: ${STRAPI_URL}/api/cards?${query}`);
    const response = await axios.get(`${STRAPI_URL}/api/cards?${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    console.log('Cards Response:', JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error(
      'Error fetching cards:',
      error.response ? error.response.data : error.message
    );

    // Fallback to return any card if error occurs
    try {
      const defaultQuery = qs.stringify(
        {
          pagination: { limit: 1 },
          populate: 'topic',
          publicationState: 'live',
        },
        { encodeValuesOnly: true }
      );

      const fallbackResponse = await axios.get(
        `${STRAPI_URL}/api/cards?${defaultQuery}`,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
          },
        }
      );

      return res.json(fallbackResponse.data);
    } catch (fallbackError) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error?.message || 'Failed to fetch cards',
      });
    }
  }
};
exports.getTopicCards = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: 'Topic slug is required' });
    }

    console.log(`Fetching cards for topic slug: ${slug}`);

    // Step 1: Get the topic ID from the slug
    const topicQuery = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const topicResponse = await axios.get(
      `${STRAPI_URL}/api/topics?${topicQuery}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );

    if (!topicResponse.data.data || topicResponse.data.data.length === 0) {
      return res
        .status(404)
        .json({ error: `Topic not found with slug: ${slug}` });
    }

    const topicId = topicResponse.data.data[0].id;
    console.log(`Found topic ID: ${topicId} for slug: ${slug}`);

    // Step 2: Fetch all cards for this topic
    const cardsQuery = qs.stringify(
      {
        filters: {
          topic: {
            id: {
              $eq: topicId,
            },
          },
        },
        populate: ['topic'],
        pagination: {
          limit: 100, // Increase if needed
        },
        publicationState: 'live',
      },
      {
        encodeValuesOnly: true,
      }
    );

    console.log(`Fetching cards from: ${STRAPI_URL}/api/cards?${cardsQuery}`);

    const cardsResponse = await axios.get(
      `${STRAPI_URL}/api/cards?${cardsQuery}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );

    if (!cardsResponse.data.data || cardsResponse.data.data.length === 0) {
      return res.json({
        data: [],
        meta: {
          pagination: {
            total: 0,
          },
          topic: topicResponse.data.data[0],
        },
      });
    }

    console.log(
      `Found ${cardsResponse.data.data.length} cards for topic: ${slug}`
    );

    return res.json({
      data: cardsResponse.data.data,
      meta: {
        ...cardsResponse.data.meta,
        topic: topicResponse.data.data[0],
      },
    });
  } catch (error) {
    console.error(
      'Error fetching topic cards:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Failed to fetch cards for this topic' });
  }
};

exports.getTopicCardsDueForReview = async (req, res) => {
  const { slug } = req.params;
  const { userId, limit } = req.query;

  // --- Log Entry Point ---
  console.log(`\n--- [GetDueTopicCards] Start ---`);
  console.log(
    `[GetDueTopicCards] Request received for slug: "${slug}", userId: ${userId}, limit: ${limit}`
  );

  // --- Input Validation ---
  if (!userId) {
    console.error('[GetDueTopicCards] Missing userId query parameter.');
    return res
      .status(400)
      .json({ error: 'userId query parameter is required' });
  }
  if (!slug) {
    console.error('[GetDueTopicCards] Missing slug path parameter.');
    return res
      .status(400)
      .json({ error: 'Topic slug path parameter is required' });
  }
  let sessionLimit = null; // Default to no limit
  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      sessionLimit = parsedLimit;
      console.log(`[GetDueTopicCards] Applying session limit: ${sessionLimit}`);
    } else {
      console.warn(
        `[GetDueTopicCards] Invalid limit query parameter received: "${limit}". Ignoring limit.`
      );
    }
  }

  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  // Basic check for Strapi URL/Token
  if (!STRAPI_URL || !STRAPI_TOKEN) {
    console.error(
      '[GetDueTopicCards] STRAPI_URL or STRAPI_TOKEN missing from environment variables.'
    );
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    // --- 1. Find User ---
    console.log(`[GetDueTopicCards] Finding user with ID: ${userId}`);
    const user = await User.findById(userId).lean(); // Use .lean() for potentially faster reads if only reading progress
    if (!user) {
      console.error(`[GetDueTopicCards] User not found for ID: ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(`[GetDueTopicCards] User found: ${user.email}`);
    const userProgress = user.cardProgress || []; // Ensure array exists, even if empty

    // --- 2. Find Topic ID from Slug (using Strapi) ---
    console.log(`[GetDueTopicCards] Fetching topic ID for slug: ${slug}`);

    // Build the query to get topic (same as getTopicContent)
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        fields: ['id', 'name', 'slug'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const endpoint = `${STRAPI_URL}/api/topics?${query}`;
    console.log(`[GetDueTopicCards] Strapi Topic Query URL: ${endpoint}`);

    let topicId;
    let topicTitle = slug; // Default title to slug if fetch fails
    try {
      const topicResponse = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      });
      if (!topicResponse.data.data || topicResponse.data.data.length === 0) {
        console.error(
          `[GetDueTopicCards] Topic not found in Strapi with slug: ${slug}`
        );
        return res
          .status(404)
          .json({ error: `Topic not found with slug: ${slug}` });
      }
      const topicData = topicResponse.data.data[0];
      topicId = topicData.id;
      // Handle both flattened and nested structures
      topicTitle =
        topicData.attributes?.name ||
        topicData.name ||
        topicData.attributes?.title ||
        topicData.title ||
        slug;
      console.log(
        `[GetDueTopicCards] Found topic ID: ${topicId}, Title: "${topicTitle}"`
      );
    } catch (topicError) {
      console.error(
        `[GetDueTopicCards] Error fetching topic from Strapi for slug ${slug}:`,
        topicError.message
      );
      return res
        .status(500)
        .json({
          error: 'Failed to fetch topic details from Strapi',
          details: topicError.message,
        });
    }

    // --- 3. Fetch ALL Cards for this Topic from Strapi ---
    // Construct the query to mirror getTopicCards as closely as possible
    const cardsQueryObject = {
      filters: { topic: { id: { $eq: topicId } } },
      pagination: { limit: -1 }, // Fetch ALL cards
      publicationState: 'live',
      // *** CRITICAL: Ensure this matches the fields/populate needed/used by getTopicCards ***
      // If getTopicCards uses populate: ['topic'], add it here too for consistency.
      // If getTopicCards relies on flattened data with no specific fields/populate, keep it minimal here too.
      // Example: If flattened, no 'fields' or 'populate' needed.
      // Example: If 'topic' relation needed on card: populate: ['topic']
      // Let's assume flattened based on previous findings, so no extra fields/populate.
    };
    const cardsQueryString = qs.stringify(cardsQueryObject, {
      encodeValuesOnly: true,
    });
    console.log(
      `[GetDueTopicCards] CONSTRUCTED Strapi Card Query URL: ${STRAPI_URL}/api/cards?${cardsQueryString}`
    );

    let allTopicCardsRaw = [];
    try {
      console.log(`[GetDueTopicCards] Executing Strapi card query...`);
      const cardsResponse = await axios.get(
        `${STRAPI_URL}/api/cards?${cardsQueryString}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );
      console.log('[GetDueTopicCards] === Raw Strapi Card Response START ===');
      console.log(JSON.stringify(cardsResponse.data, null, 2)); // Log the FULL response
      console.log('[GetDueTopicCards] === Raw Strapi Card Response END ===');
      allTopicCardsRaw = cardsResponse.data.data || []; // Extract the data array
    } catch (cardError) {
      console.error(
        `[GetDueTopicCards] Error fetching cards from Strapi for topic ${topicId}:`,
        cardError.message
      );
      return res
        .status(500)
        .json({
          error: 'Failed to fetch card details from Strapi',
          details: cardError.message,
        });
    }

    console.log(
      `[GetDueTopicCards] Found ${allTopicCardsRaw.length} total cards in Strapi response for topic ${slug}`
    );
    if (allTopicCardsRaw.length === 0) {
      console.log(
        `[GetDueTopicCards] No cards associated with topic ${slug} in Strapi response.`
      );
      return res.json({ data: [] }); // Return empty if topic has no cards
    }

    // --- 4. Prepare User Progress Map ---
    const progressMap = new Map();
    userProgress.forEach((p) => {
      if (p.cardId) {
        progressMap.set(p.cardId.toString(), p);
      }
    });
    console.log(
      `[GetDueTopicCards] Created progress map with ${progressMap.size} entries.`
    );
    // console.log('[GetDueTopicCards] User Progress Items Used in Map:', JSON.stringify(Array.from(progressMap.values()), null, 2));

    // --- 5. Filter Cards for Due/New and Enhance ---
    const now = new Date();
    const dueOrNewCards = [];
    console.log(
      `[GetDueTopicCards] Filtering cards against current time: ${now.toISOString()}`
    );
    console.log(
      `[GetDueTopicCards] --- Start Card Filtering Loop (Processing ${allTopicCardsRaw.length} cards) ---`
    );

    for (const cardRaw of allTopicCardsRaw) {
      // Assuming flattened Strapi structure based on previous evidence
      const cardData = { ...cardRaw }; // Use the raw card object directly

      if (!cardData.id) {
        console.warn(
          `[GetDueTopicCards] Skipping card from Strapi due to missing ID:`,
          cardRaw
        );
        continue;
      }
      const cardIdStr = cardData.id.toString();
      const progress = progressMap.get(cardIdStr);

      const isNew = !progress;
      // Ensure dueDate from progress is parsed correctly, default to epoch for new
      const dueDate =
        progress && progress.dueDate ? new Date(progress.dueDate) : new Date(0);
      const easeFactor = progress ? progress.easeFactor : 2.5;
      const interval = progress ? progress.interval : 0;

      const isDue = isNew || dueDate <= now;

      console.log(
        `  [Card Check] ID: ${cardIdStr.padEnd(5)} | Progress: ${
          progress ? 'Yes' : 'No '
        } | Due Date: ${dueDate.toISOString().padEnd(25)} | isNew: ${isNew
          .toString()
          .padEnd(5)} | isDue: ${isDue.toString().padEnd(5)} ${
          isDue ? '<<< INCLUDED' : ''
        }`
      );

      if (isDue) {
        // Add the necessary calculated fields to the card data
        dueOrNewCards.push({
          ...cardData, // Include all original card fields (question_text, options etc.)
          isNew,
          dueDate,
          easeFactor,
          interval,
        });
      }
    }
    console.log(`[GetDueTopicCards] --- End Card Filtering Loop ---`);
    console.log(
      `[GetDueTopicCards] Found ${dueOrNewCards.length} due or new cards after filtering.`
    );
    console.log(
      `[GetDueTopicCards] Included Card IDs (Pre-sort): [${dueOrNewCards
        .map((c) => c.id)
        .join(', ')}]`
    );

    // --- 6. Sort the Due/New Cards ---
    if (dueOrNewCards.length > 0) {
      console.log('[GetDueTopicCards] Sorting due/new cards...');
      dueOrNewCards.sort((a, b) => {
        const aIsDueReviewed = !a.isNew;
        const bIsDueReviewed = !b.isNew;
        if (aIsDueReviewed && !bIsDueReviewed) return -1; // Reviewed due before new
        if (!aIsDueReviewed && bIsDueReviewed) return 1; // New after reviewed due
        if (aIsDueReviewed && bIsDueReviewed) return a.dueDate - b.dueDate; // Oldest due first
        return a.id - b.id; // Sort new cards by ID
      });
      console.log('[GetDueTopicCards] Sorting complete.');
      console.log(`[GetDueTopicCards] Sorted Due/New Cards (ID | Due Date):`);
      dueOrNewCards.forEach((c) =>
        console.log(
          `  - ID: ${c.id
            .toString()
            .padEnd(5)} | Due: ${c.dueDate.toISOString()}`
        )
      );
    }

    // --- 7. Apply Limit if Provided ---
    let finalSessionCards = dueOrNewCards;
    if (sessionLimit && finalSessionCards.length > sessionLimit) {
      finalSessionCards = finalSessionCards.slice(0, sessionLimit);
      console.log(
        `[GetDueTopicCards] Limited session cards to ${sessionLimit}.`
      );
      console.log(
        `[GetDueTopicCards] Final Session Card IDs (Post-limit): [${finalSessionCards
          .map((c) => c.id)
          .join(', ')}]`
      );
    } else {
      console.log(
        `[GetDueTopicCards] No limit applied or list shorter than limit.`
      );
    }

    // --- 8. Send Response ---
    console.log(
      `[GetDueTopicCards] Sending ${finalSessionCards.length} cards back to client.`
    );
    console.log(`--- [GetDueTopicCards] End ---`);
    res.json({ data: finalSessionCards }); // Send the final list
  } catch (error) {
    // Catch unexpected errors during the process
    console.error(
      '[GetDueTopicCards] !!! UNEXPECTED Error during processing:',
      error.message
    );
    console.error(error.stack);
    res
      .status(500)
      .json({
        error: 'Internal server error processing due cards',
        details: error.message,
      });
  }
};

exports.getUserCardProgress = async (req, res) => {
  try {
    const { userId, cardIds } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Parse card IDs if provided
    let cardIdArray = [];
    if (cardIds) {
      cardIdArray = cardIds.split(',').map((id) => id.trim());
      console.log(`Fetching progress for cards: ${cardIdArray.join(', ')}`);
    }

    // Filter the user's card progress to only include the requested card IDs
    // If no card IDs provided, return all progress
    let filteredProgress = user.cardProgress;
    if (cardIdArray.length > 0) {
      filteredProgress = user.cardProgress.filter((progress) =>
        cardIdArray.includes(progress.cardId.toString())
      );
    }

    return res.json({
      userId: user._id,
      cardProgress: filteredProgress,
    });
  } catch (error) {
    console.error('Error fetching user card progress:', error.message);
    res.status(500).json({ error: 'Failed to fetch user card progress' });
  }
};

exports.updateCardProgress = async (req, res) => {
  // --- Log Entry Point ---
  console.log('[UpdateCardProgress] Received request');
  console.log(
    '[UpdateCardProgress] Request Body:',
    JSON.stringify(req.body, null, 2)
  );

  try {
    const { userId, cardId, quality } = req.body;

    // Validate input slightly
    if (!userId || !cardId || quality === undefined || quality === null) {
      console.error('[UpdateCardProgress] Invalid input data:', {
        userId,
        cardId,
        quality,
      });
      return res
        .status(400)
        .json({ error: 'Missing or invalid userId, cardId, or quality' });
    }
    const qualityNum = Number(quality);
    if (isNaN(qualityNum) || qualityNum < 0 || qualityNum > 5) {
      console.error('[UpdateCardProgress] Invalid quality value:', quality);
      return res
        .status(400)
        .json({ error: 'Quality must be a number between 0 and 5' });
    }

    // --- Find User ---
    console.log(`[UpdateCardProgress] Finding user with ID: ${userId}`);
    const user = await User.findById(userId);
    if (!user) {
      console.error(`[UpdateCardProgress] User not found for ID: ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(`[UpdateCardProgress] User found: ${user.email}`);

    // Ensure cardProgress array exists
    if (!user.cardProgress) {
      console.log(
        '[UpdateCardProgress] Initializing cardProgress array for user.'
      );
      user.cardProgress = [];
    }

    // --- Find Card Progress ---
    console.log(
      `[UpdateCardProgress] Searching for existing progress for card ID: ${cardId}`
    );
    let cardProgress = user.cardProgress.find(
      (cp) => cp.cardId === cardId.toString()
    ); // Ensure comparison with string ID

    const now = new Date();
    let oldInterval = null;
    let oldEaseFactor = null;
    let oldDueDate = null;

    if (!cardProgress) {
      // --- Create New Progress ---
      console.log(
        `[UpdateCardProgress] No existing progress found for card ${cardId}. Creating new entry.`
      );
      const newProgressEntry = {
        cardId: cardId.toString(), // Store as string
        // Note: Initial calculation might be desired here based on quality, but current logic adds fixed defaults
        dueDate: now, // Start as due now
        interval: 1, // Initial interval
        easeFactor: 2.5, // Default ease
        lastReviewed: now,
        quality: qualityNum,
      };
      user.cardProgress.push(newProgressEntry);
      console.log(
        '[UpdateCardProgress] New progress entry pushed:',
        JSON.stringify(newProgressEntry, null, 2)
      );
      // Assign to cardProgress so save logic works
      cardProgress = newProgressEntry; // Not strictly needed for push, but good for consistency if logic changes
    } else {
      // --- Update Existing Progress ---
      console.log(
        `[UpdateCardProgress] Existing progress found for card ${cardId}. Updating.`
      );
      console.log(
        '[UpdateCardProgress] Old Progress:',
        JSON.stringify(cardProgress, null, 2)
      );

      // Store old values for logging comparison
      oldInterval = cardProgress.interval;
      oldEaseFactor = cardProgress.easeFactor;
      oldDueDate = cardProgress.dueDate;

      cardProgress.lastReviewed = now;
      cardProgress.quality = qualityNum;

      // --- Apply SRS Algorithm ---
      console.log(
        `[UpdateCardProgress] Applying SRS logic with quality: ${qualityNum}`
      );
      let calculatedInterval;
      let calculatedEaseFactor;

      if (qualityNum >= 3) {
        console.log('[UpdateCardProgress] Quality >= 3 (Good Recall)');
        if (cardProgress.interval <= 0) {
          // Interval shouldn't be 0, but handle defensively
          calculatedInterval = 1;
          console.log(
            `[UpdateCardProgress] Interval was <= 0, set to: ${calculatedInterval}`
          );
        } else if (cardProgress.interval === 1) {
          calculatedInterval = 6;
          console.log(
            `[UpdateCardProgress] Interval was 1, set to: ${calculatedInterval}`
          );
        } else {
          calculatedInterval = Math.round(
            cardProgress.interval * cardProgress.easeFactor
          );
          console.log(
            `[UpdateCardProgress] Calculated interval: round(${cardProgress.interval} * ${cardProgress.easeFactor}) = ${calculatedInterval}`
          );
        }
        // Calculate new ease factor using SM-2 formula adaptation
        calculatedEaseFactor =
          cardProgress.easeFactor +
          (0.1 - (5 - qualityNum) * (0.08 + (5 - qualityNum) * 0.02));
        calculatedEaseFactor = Math.max(1.3, calculatedEaseFactor); // Ensure ease factor doesn't drop below 1.3
        console.log(
          `[UpdateCardProgress] Calculated ease factor: max(1.3, ${
            cardProgress.easeFactor
          } + (0.1 - (${5 - qualityNum}) * (0.08 + (${
            5 - qualityNum
          }) * 0.02))) = ${calculatedEaseFactor}`
        );
      } else {
        console.log('[UpdateCardProgress] Quality < 3 (Poor Recall)');
        calculatedInterval = 1; // Reset interval
        console.log(
          `[UpdateCardProgress] Interval reset to: ${calculatedInterval}`
        );
        // Decrease ease factor, minimum 1.3
        calculatedEaseFactor = Math.max(1.3, cardProgress.easeFactor - 0.2);
        console.log(
          `[UpdateCardProgress] Calculated ease factor: max(1.3, ${cardProgress.easeFactor} - 0.2) = ${calculatedEaseFactor}`
        );
      }

      // Update the progress object
      cardProgress.interval = calculatedInterval;
      cardProgress.easeFactor = calculatedEaseFactor;

      // --- Calculate New Due Date ---
      const intervalMillis = cardProgress.interval * 24 * 60 * 60 * 1000;
      cardProgress.dueDate = new Date(now.getTime() + intervalMillis);
      console.log(
        `[UpdateCardProgress] Calculated new due date: ${now.toISOString()} + ${
          cardProgress.interval
        } days = ${cardProgress.dueDate.toISOString()}`
      );
    }

    // --- Save User Document ---
    console.log('[UpdateCardProgress] Attempting to save user document...');
    await user.save();
    console.log('[UpdateCardProgress] User document saved successfully.');

    // --- Send Response ---
    console.log('[UpdateCardProgress] Sending success response.');
    res.json({
      message: 'Card progress updated successfully',
      newProgress: cardProgress,
    }); // Optionally return the updated progress
  } catch (error) {
    console.error(
      '[UpdateCardProgress] !!! Error updating card progress:',
      error.message
    );
    console.error(error.stack); // Log stack trace for more details
    res.status(500).json({
      error: 'Failed to update card progress',
      details: error.message,
    });
  }
};

// Updated getSystems function - replace your existing one
exports.getSystems = async (req, res) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  try {
    if (!STRAPI_URL || !STRAPI_TOKEN) {
      throw new Error(
        'STRAPI_URL or STRAPI_TOKEN is not defined in environment variables'
      );
    }

    // Query to get systems with their topics
    const query = qs.stringify(
      {
        populate: {
          topics: {
            fields: ['id', 'name', 'slug', 'description'],
          },
        },
        publicationState: 'live',
        sort: ['order:asc'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    console.log(`Fetching systems from: ${STRAPI_URL}/api/systems?${query}`);

    // Fetch systems from Strapi
    const response = await axios.get(`${STRAPI_URL}/api/systems?${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    console.log(
      'Raw Strapi Systems Response:',
      JSON.stringify(response.data, null, 2)
    );

    // Check if we got systems
    if (response.data && response.data.data && response.data.data.length > 0) {
      console.log(`Successfully fetched ${response.data.data.length} systems`);

      // Log the structure of the first system to understand the format
      console.log(
        'First system structure:',
        JSON.stringify(response.data.data[0], null, 2)
      );

      // Count topics for each system
      response.data.data.forEach((system, index) => {
        const topicsCount = system.topics
          ? Array.isArray(system.topics)
            ? system.topics.length
            : system.topics.data
            ? system.topics.data.length
            : 0
          : 0;
        console.log(
          `System ${index + 1} (${system.name}): ${topicsCount} topics`
        );
      });

      res.json(response.data);
      return;
    }

    // If no systems found, log and try fallback
    console.log('No systems found, trying fallback approach...');

    // Fallback: Try to get topics and group them
    const topicsQuery = qs.stringify(
      {
        populate: ['system'],
        publicationState: 'live',
        sort: ['id:asc'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    console.log(
      `Fallback: Fetching topics from: ${STRAPI_URL}/api/topics?${topicsQuery}`
    );

    const topicsResponse = await axios.get(
      `${STRAPI_URL}/api/topics?${topicsQuery}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );

    console.log(
      'Fallback topics response:',
      JSON.stringify(topicsResponse.data, null, 2)
    );

    if (topicsResponse.data && topicsResponse.data.data) {
      // Group topics by system
      const systemsMap = new Map();

      topicsResponse.data.data.forEach((topic) => {
        // Handle both flattened and nested structures
        const topicData = topic.attributes || topic;
        const systemData =
          topicData.system?.data?.attributes || topicData.system || null;

        if (systemData) {
          const systemId = systemData.id || topicData.system?.data?.id;
          const systemKey = systemId || systemData.name;

          if (!systemsMap.has(systemKey)) {
            systemsMap.set(systemKey, {
              id: systemId || systemKey,
              name: systemData.name || 'Unknown System',
              slug: systemData.slug || '',
              percentage: systemData.percentage || 0,
              order: systemData.order || 0,
              topics: [],
            });
          }

          systemsMap.get(systemKey).topics.push({
            id: topic.id,
            name: topicData.name || topicData.title,
            slug: topicData.slug,
            description: topicData.description,
          });
        }
      });

      // Convert map to array and sort
      const systemsArray = Array.from(systemsMap.values()).sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return b.percentage - a.percentage;
      });

      console.log(
        `Fallback created ${systemsArray.length} systems from topics`
      );
      systemsArray.forEach((system) => {
        console.log(`- ${system.name}: ${system.topics.length} topics`);
      });

      res.json({ data: systemsArray });
      return;
    }

    // If everything fails, return empty response
    console.log('Both systems and topics endpoints returned no data');
    res.json({ data: [] });
  } catch (error) {
    console.error(
      'Error fetching systems:',
      error.response ? error.response.data : error.message
    );
    console.error('Error details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
    });

    // Try one more fallback - get any content
    try {
      console.log(
        'Final fallback: Trying to get any systems without populate...'
      );
      const simpleResponse = await axios.get(
        `${STRAPI_URL}/api/systems?publicationState=live&sort=order:asc`,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
          },
        }
      );

      if (simpleResponse.data && simpleResponse.data.data) {
        console.log(
          `Final fallback found ${simpleResponse.data.data.length} systems (without topics)`
        );
        // Add empty topics array to each system
        const systemsWithEmptyTopics = simpleResponse.data.data.map(
          (system) => ({
            ...system,
            topics: [],
          })
        );
        res.json({ data: systemsWithEmptyTopics });
        return;
      }
    } catch (finalError) {
      console.error('Final fallback also failed:', finalError.message);
    }

    res.status(500).json({
      error: 'Failed to fetch systems data',
      details: error.message,
    });
  }
};

// Rename these functions from subtopic-specific to more generic
exports.updateNotes = async (req, res) => {
  try {
    const { userId, contentId, contentType, notes } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find note by contentId and contentType
    const note = user.notes.find(
      (n) => n.contentId === contentId && n.contentType === contentType
    );

    if (note) {
      note.content = notes;
      note.updatedAt = new Date();
    } else {
      user.notes.push({
        contentId,
        contentType,
        content: notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await user.save();
    res.json({ message: 'Notes updated successfully' });
  } catch (error) {
    console.error('Error updating notes:', error.message);
    res.status(500).json({ error: 'Failed to update notes' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { userId, contentId, contentType } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const note = user.notes.find(
      (n) => n.contentId === contentId && n.contentType === contentType
    );

    res.json({ notes: note ? note.content : '' });
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

exports.setStudySessionSettings = async (req, res) => {
  try {
    const { userId, cardLimit, includeNewCards, enableTimer } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create or update study settings
    if (!user.studySettings) {
      user.studySettings = {};
    }
    user.studySettings.cardLimit = cardLimit || 10;
    user.studySettings.includeNewCards = includeNewCards || false;
    user.studySettings.enableTimer = enableTimer || false;

    await user.save();
    res.json({
      message: 'Study session settings updated',
      settings: user.studySettings,
    });
  } catch (error) {
    console.error('Error updating study settings:', error.message);
    res.status(500).json({ error: 'Failed to update study settings' });
  }
};
