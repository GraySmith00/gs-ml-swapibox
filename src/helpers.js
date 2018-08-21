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
  return data.results.map(person => {
    let personData = {
      name: person.name
    };
    fetchData(person.homeworld)
      .then(res => res.json())
      .then(planetData => {
        personData.homeworld = planetData.name;
        personData.population = planetData.population;
      })
      .catch(error => console.log(error));
    fetchData(person.species[0])
      .then(res => res.json())
      .then(speciesData => {
        personData.species = speciesData.name;
        personData.language = speciesData.language;
      })
      .catch(error => console.log(error));
    return personData;
  });
};

export const fetchData = url => {
  return fetch(url);
};
