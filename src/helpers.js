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
  const unresolvedPromises = data.results.map(async person => {
    const homeWorldPromise = getHomeworldData(person);
    const speciesPromise = getSpeciesData(person);

    try {
      const response = await Promise.all([homeWorldPromise, speciesPromise]);
      const promiseData = response.reduce((promiseData, promise) => {
        return { ...promiseData, ...promise };
      }, {});
      return {
        name: person.name,
        ...promiseData,
        favorite: false
      };
    } catch (error) {
      console.log(error.message);
    }
  });

  return Promise.all(unresolvedPromises);
};

const getHomeworldData = async person => {
  try {
    const response = await fetchData(person.homeworld);
    const data = await response.json();
    const { name: planet, population } = data;
    return { planet, population };
  } catch (error) {
    console.log(error.message);
  }
};

const getSpeciesData = async person => {
  try {
    const response = await fetchData(person.species[0]);
    const data = await response.json();
    return { species: data.name };
  } catch (error) {
    console.log(error.message);
  }
};

export const planetList = data => {
  const unresolvedPromises = data.results.map(planet => {
    const { name, terrain, population, climate } = planet;
    const residentsPromises = planet.residents.map(resident => {
      return fetchData(resident)
        .then(res => res.json())
        .then(data => data.name);
    });
    return Promise.all(residentsPromises).then(residents => ({
      name,
      terrain,
      climate,
      population,
      residents,
      favorite: false
    }));
  });
  return Promise.all(unresolvedPromises);
};

export const vehicleList = data => {
  return data.results.map(vehicle => {
    const { name, model, vehicle_class, passengers } = vehicle;
    return { name, model, vehicle_class, passengers, favorite: false };
  });
};

export const fetchData = url => {
  return fetch(url);
};
