// require the necessary modules
const express = require('express');
const axios = require('axios');
const router = express.Router();
//require('dotenv').config(); // to use .env variables

// AI Evaluation Route
router.post('/evaluate', async (req, res) => {
    const { pollutionControl, communityEngagement, waterRecycling } = req.body;

    try {
        // Call OpenAI API using GPT-4 to evaluate the answers
        const aiResponse = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-4', // Model used here is GPT-4
            prompt: `
                Evaluate the following answers and provide a score between -10 and 10:
                1. Pollution Control: ${pollutionControl}
                2. Community Engagement: ${communityEngagement}
                3. Water Recycling: ${waterRecycling}
                
                Give the scores in the format:
                pollution_control: score,
                food_sovereignty: score,
                water_recycling: score
            `,
            max_tokens: 100,
            temperature: 0.7, // Adjust this based on how creative you want the responses
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            }
        });

        // Parsing AI Response
        const responseText = aiResponse.data.choices[0].text;
        const scores = extractScoresFromResponse(responseText);

        // Return the scores back to the frontend
        res.status(200).json(scores);
    } catch (error) {
        console.error('Error evaluating with AI:', error);
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
