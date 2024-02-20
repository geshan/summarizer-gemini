const scraper = require('./scraper');
const summaryGenerator = require('./gemini');

(async () => {
  const url = process.argv[2] || 'https://7news.com.au/news/travellers-arriving-in-nsw-urged-to-check-luggage-for-unwanted-stowaway-c-13642953';
  console.log(`Getting summary for url: ${url} \n`);
  const pageContents = await scraper.getContents(url);
  if (pageContents.length === 0) {
    return 'Could not get data from the given URL';
  }
  console.log(await summaryGenerator.getSummary(pageContents));
})();
