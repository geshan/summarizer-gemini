const express = require('express');
const scraper = require('./scraper');
const summaryGenerator = require('./gemini');

const app = express();
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.get('/summary', async (req, res) => {

  console.log(`req url`, req.query?.url);

  const url = req.query?.url || 'https://7news.com.au/news/travellers-arriving-in-nsw-urged-to-check-luggage-for-unwanted-stowaway-c-13642953';
  try {
    new URL(url); //validates if given string is a valid URL
  } catch (err) {
    return res.status(400).json({message: `provider URL ${url} is not a valid URL`});
  }
  console.log(`Getting summary for url: ${url} \n`);
  const pageContents = await scraper.getContents(url);
  if (pageContents.length === 0) {
    res.status(501).json({message: 'Could not get data properly from the given URL'});
  }
  const summary = await summaryGenerator.getSummary(pageContents);

  res.json({ summary });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
