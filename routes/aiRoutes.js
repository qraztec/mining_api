// require the necessary modules
const express = require('express');
const axios = require('axios');
const router = express.Router();

// AI Evaluation Route
router.post('/evaluate', async (req, res) => {
    const { pollutionControl, communityEngagement, waterRecycling } = req.body;

    try {
        // Call OpenAI API using GPT-4 to evaluate the answers
        const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini', // Model used here is GPT-4
            messages: [
                {
                    role: "system",
                    content: "You are an evaluator that scores responses on pollution control, food sovereignty, and water recycling on a scale from -10 to 10."
                },
                {
                    role: "user",
                    content: `
                        Evaluate the following answers and provide a score between -10 and 10:
                        1. Pollution Control: ${pollutionControl}
                        2. Community Engagement: ${communityEngagement}
                        3. Water Recycling: ${waterRecycling}
                        
                        Give the scores in the format:
                        pollution_control: score,
                        food_sovereignty: score,
                        water_recycling: score
                    `
                }
            ],
            max_tokens: 100,
            temperature: 0.7, // Adjust based on how creative you want the responses
        }, {
            headers: {
                'Authorization': 'Bearer sk-LhFPg2_JwLxkCP7rILO_kYTTWpWFnDVHwQV_m4fG5tT3BlbkFJeWY6l2JfRrXYB_RlXuoibpOvBqB6xzjNrkTs1h_mMA', // Use environment variable
                'Content-Type': 'application/json'
            }
        });

        // Parsing AI Response
        const responseText = aiResponse.data.choices[0].message.content;
        const scores = extractScoresFromResponse(responseText);

        // Return the scores back to the frontend
        res.status(200).json(scores);
    } catch (error) {
        console.error('Error evaluating with AI:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'AI evaluation failed' });
    }
});

// Function to extract scores from the AI response text
function extractScoresFromResponse(responseText) {
    const scores = {};
    
    const regex = /pollution_control:\s*(-?\d+),\s*food_sovereignty:\s*(-?\d+),\s*water_recycling:\s*(-?\d+)/;
    const matches = responseText.match(regex);

    if (matches) {
        scores.pollution_control = parseInt(matches[1], 10);
        scores.food_sovereignty = parseInt(matches[2], 10);
        scores.water_recycling = parseInt(matches[3], 10);
    }

    return scores;
}

module.exports = router;
