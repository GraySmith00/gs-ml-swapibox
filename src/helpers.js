export const randomFilmData = filmData => {
  const openingCrawls = filmData.results.map(film => {
    return {
      title: film.title,
      date: film.release_date,
      quote: film.opening_crawl
    };
  });
  const index = Math.floor(Math.random() * openingCrawls.length) + 1;
  return openingCrawls[index];
};

export const peopleList = data => {
  const unresolvedPromises = data.results.map(person => {
    const homeWorldPromise = fetchData(person.homeworld)
      .then(res => res.json())
      .then(data => ({ planet: data.name, population: data.population }));

    const speciesPromise = fetchData(person.species[0])
      .then(res => res.json())
      .then(data => ({ species: data.name }));

    return Promise.all([homeWorldPromise, speciesPromise])
      .then(res =>
        res.reduce((promiseData, promise) => {
          return { ...promiseData, ...promise };
        }, {})
      )
      .then(promiseData => ({ name: person.name, ...promiseData }));
  });

  return Promise.all(unresolvedPromises);
};

export const fetchData = url => {
  return fetch(url);
};
