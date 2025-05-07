// generate-topic-cards.js
const axios = require('axios');
const dotenv = require('dotenv');
const slugify = require('slugify');

// Load environment variables
dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

// Constants for retry logic
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const BATCH_SIZE = 5; // Process in small batches

if (!STRAPI_TOKEN) {
  console.error('STRAPI_TOKEN is not defined in your environment variables.');
  process.exit(1);
}

// Utility function to format rich text fields properly
function formatRichText(text) {
  if (!text) return null;
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: text }]
      }
    ]
  };
}

// Function to generate a slug from the card question
function generateCardSlug(question) {
  // Extract the first 50 characters of the question and create a slug
  const questionText = question.length > 50 ? question.substring(0, 50) : question;
  
  return slugify(questionText, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@?]/g,
  });
}

// Helper function for axios with retry logic
async function axiosWithRetry(config, retries = MAX_RETRIES) {
  try {
    return await axios(config);
  } catch (error) {
    if (retries <= 0) throw error;
    
    console.log(`Request failed. Retrying in ${RETRY_DELAY/1000}s... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return axiosWithRetry(config, retries - 1);
  }
}

async function fetchAllTopics() {
  console.log('Fetching all topics...');
  try {
    const response = await axiosWithRetry({
      method: 'get',
      url: `${STRAPI_URL}/api/topics`,
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      timeout: 15000,
    });

    const topics = [];
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      console.log(`Found ${response.data.data.length} topics in response`);
      
      for (const item of response.data.data) {
        // Properties are directly on the item, not in an attributes object
        if (item.id && item.title) {
          topics.push({
            id: item.id,
            title: item.title,
            introduction: item.introduction || '',
            management: item.management || ''
          });
          console.log(`Successfully extracted topic: ${item.title} (ID: ${item.id})`);
        } else {
          console.warn(`Missing required properties for topic ID: ${item.id}`);
        }
      }
    }
    
    console.log(`Successfully extracted ${topics.length} of ${response.data?.data?.length || 0} topics`);
    return topics;
  } catch (error) {
    console.error('Error fetching topics:', error.message);
    return [];
  }
}
// Generate a clinical vignette card for a topic
function generateCardForTopic(topic) {
  // Extract key information from the topic
  const topicTitle = topic.title;
  const introduction = topic.introduction;
  const management = topic.management;
  
  // Create a clinical scenario based on the topic
  const scenario = `A patient presents with symptoms consistent with ${topicTitle}. The clinical presentation includes typical features described in the medical literature.`;
  
  // Create a question based on the topic
  const question = `What is the most appropriate initial management for this patient with ${topicTitle}?`;
  
  // Extract management approach from the topic's content
  let correctAnswer = "a"; // Default to option A as correct
  
  // Generate four options (with the first one being correct)
  // Extract key management points from the topic content
  const managementSentences = management.split('.').filter(sentence => 
    sentence.length > 10 && 
    !sentence.toLowerCase().includes('understand') && 
    !sentence.toLowerCase().includes('familiar')
  );
  
  const firstSentence = managementSentences[0]?.trim() || `Implement evidence-based management for ${topicTitle}`;
  
  // Create the options
  const options = {
    a: firstSentence,
    b: `Order extensive diagnostic testing before initiating any treatment`,
    c: `Refer immediately to a specialist without initial management`,
    d: `Prescribe symptomatic treatment only without addressing the underlying cause`
  };
  
  // Create an explanation
  const explanation = `The correct approach for managing ${topicTitle} involves ${firstSentence.toLowerCase()}. This aligns with current clinical guidelines that emphasize the importance of prompt and appropriate intervention. Options B, C, and D represent suboptimal approaches that may delay proper care or fail to address the underlying condition adequately.`;
  
  // Return the card object with values as simple strings
  return {
    question_text: question, // Plain string
    scenario: scenario,      // Plain string
    card_type: 'clinical-vignette',
    options: options,
    correct_answer: correctAnswer,
    explanation: explanation, // Plain string
    topic: topic.id
  };
}

// Main function to create cards for all topics
async function createCardsForTopics() {
  try {
    // Fetch all topics
    const topics = await fetchAllTopics();
    if (topics.length === 0) {
      console.error('No topics found. Cannot create cards.');
      return;
    }
    
    console.log(`Starting to create cards for ${topics.length} topics...`);
    let cardsCreated = 0;
    let cardsSkipped = 0;
    
    // Process topics in batches
    for (let i = 0; i < topics.length; i += BATCH_SIZE) {
      const batch = topics.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(topics.length/BATCH_SIZE)} (topics ${i+1}-${Math.min(i+BATCH_SIZE, topics.length)})`);
      
      // Process each topic in the batch
      for (const topic of batch) {
        try {
          // Generate card data for this topic
          const cardData = generateCardForTopic(topic);
          
          // Generate a unique slug
          const uniqueSlug = `${generateCardSlug(cardData.question_text)}-${Date.now()}`;
          
      // Format the card payload (all text fields as simple strings, not rich text objects)
const cardPayload = {
  question_text: cardData.question_text,
  scenario: cardData.scenario,
  card_type: cardData.card_type,
  options: cardData.options,
  correct_answer: cardData.correct_answer,
  explanation: cardData.explanation,
  topic: cardData.topic,
  slug: uniqueSlug
};
          
          console.log(`Creating card for topic: ${topic.title}`);
          
          // Send the request to create the card
          const response = await axiosWithRetry({
            method: 'post',
            url: `${STRAPI_URL}/api/cards`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${STRAPI_TOKEN}`
            },
            data: { data: cardPayload }
          });
          
          if (response.data?.data?.id) {
            const cardId = response.data.data.id;
            console.log(`Successfully created card ID: ${cardId} for topic: ${topic.title}`);
            cardsCreated++;
          } else {
            console.error('Card creation returned unexpected response:', response.data);
            cardsSkipped++;
          }
        } catch (error) {
          console.error(`Error creating card for topic "${topic.title}":`, error.message);
          if (error.response?.data?.error) {
            console.error('API error details:', JSON.stringify(error.response.data.error, null, 2));
          }
          cardsSkipped++;
        }
      }
      
      // Pause between batches
      if (i + BATCH_SIZE < topics.length) {
        console.log(`Waiting before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    console.log('\n--- Card Creation Complete ---');
    console.log(`Created ${cardsCreated} cards successfully`);
    console.log(`Skipped ${cardsSkipped} cards due to errors`);
    
  } catch (error) {
    console.error('Fatal error during card creation:', error);
  }
}

// Execute the main function
createCardsForTopics()
  .then(() => console.log('Process completed!'))
  .catch(err => console.error('Error in main process:', err));