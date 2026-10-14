require('dotenv').config();
console.log('API key loaded:', Boolean(process.env.API_KEY));

const express = require('express');

const app = express();
const PORT = 3000;

// Configuration
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Get a joke from the Joke API
app.get('/api/joke', async (req, res) => {
    try {
        const response = await fetch(
            'https://official-joke-api.appspot.com/random_joke'
        );

        if (!response.ok) {
            throw new Error(`Joke API returned status ${response.status}`);
        }

        const joke = await response.json();

        res.json({
            setup: joke.setup,
            punchline: joke.punchline
        });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({
            error: 'Could not fetch a joke. Please try again.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});