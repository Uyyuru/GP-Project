const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())


const seoHeadLines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Discover {name}: The Best in {location} This Year",
  "{name} – {location}'s Hidden Gem for Locals",
  "Experience Excellence at {name}, {location}",
  "{name}: Setting New Standards in {location}",
  "What Makes {name} Stand Out in {location}?",
  "2025 Spotlight: {name} in {location}",
  "Locals Love {name} – Here’s Why ({location})",
  "Your Guide to {name}, the Heart of {location}",
  "Why Everyone’s Talking About {name} in {location}",
];

const ratings = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9];
const reviewCounts = [87, 124, 156, 203, 245, 289, 334, 402, 467, 523];

const generateBusinessData = (name, location) => {
  const rating = ratings[Math.floor(Math.random() * ratings.length)];
  const reviews = reviewCounts[Math.floor(Math.random() * reviewCounts.length)];
  const headlineTemplate = seoHeadLines[Math.floor(Math.random() * seoHeadLines.length)];
  const headline = headlineTemplate.replace('{name}', name).replace('{location}', location);

  return { rating, reviews, headline };
};

app.post('/businessData', (req, res) => {
  const { businessName, location } = req.body;
  try {
    if (!businessName || !location) {
      return res.status(400).json({ error: 'Business name and location are required.' });
    }
    setTimeout(() => {
      const data = generateBusinessData(businessName, location);
      res.json(data);
    }, 1000);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.get('/seoHeadlineRegenerate', (req, res) => {
  const { businessName, location } = req.query;
  try {
    if (!businessName || !location) {
      return res.status(400).json({ error: 'Business name and location are required.' });
    }

    setTimeout(() => {
      const headlineTemplate = seoHeadLines[Math.floor(Math.random() * seoHeadLines.length)];
      const headline = headlineTemplate.replace('{name}', businessName).replace('{location}', location);
      res.json({ headline });
    }, 1000);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.get('/healthCheck', (req, res) => {
    res.json({ status: 'ok' , Timestamp :new Date().toISOString()});
});


app.listen(3000,()=>{
    console.log('Server is running on port 3000')   
});