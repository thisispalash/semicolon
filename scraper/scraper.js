import scrape from 'website-scraper'; // only as ESM, no CommonJS
import fs from 'fs';

const options = {
  urls: ['https://semicolon.softr.app/'],
  directory: 'scraped'
};

fs.rmSync(options.directory, { recursive: true, force: true });

scrape(options).then((result) => {
  console.log(`Website Scraped: ${options.urls}`);
});