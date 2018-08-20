export const randomOpeningQuote = filmData => {
  const openingCrawls = filmData.results.map(film => {
    return film.opening_crawl;
  });
  const index = Math.floor(Math.random() * openingCrawls.length) + 1;
  return openingCrawls[index];
};
