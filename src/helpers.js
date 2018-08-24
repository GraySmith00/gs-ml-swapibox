export const filmFetchCall = async () => {
  const url = 'https://swapi.co/api/films/';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { title, date, quote } = randomFilmData(data);
    return { title, date, quote };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const randomFilmData = filmData => {
  const openingCrawls = filmData.results.map(film => {
    return {
      title: film.title,
      date: film.release_date,
      quote: film.opening_crawl
    };
  });
  const index = Math.floor(Math.random() * openingCrawls.length);
  return openingCrawls[index];
};

export const initialFetchCall = async currentCategory => {
  const url = `https://swapi.co/api/${currentCategory}/`;
  const response = await fetch(url);
  const data = await response.json();
  return setCurrentData(currentCategory, data);
};

const setCurrentData = async (currentCategory, data) => {
  let currentData;
  switch (currentCategory) {
    case 'people':
      currentData = await peopleList(data);
      break;
    case 'planets':
      currentData = await planetList(data);
      break;
    case 'vehicles':
      currentData = vehicleList(data);
      break;
    default:
      break;
  }
  return currentData;
};

export const peopleList = data => {
  const unresolvedPromises = data.results.map(async person => {
    const homeWorldPromise = getHomeworldData(person);
    const speciesPromise = getSpeciesData(person);
    const response = await Promise.all([homeWorldPromise, speciesPromise]);
    const promiseData = response.reduce((promiseData, promise) => {
      return { ...promiseData, ...promise };
    }, {});
    return {
      name: person.name,
      favorite: false,
      ...promiseData
    };
  });

  return Promise.all(unresolvedPromises);
};

const getHomeworldData = async person => {
  const response = await fetch(person.homeworld);
  const data = await response.json();
  const { name: planet, population } = data;
  return { planet, population };
};

const getSpeciesData = async person => {
  const response = await fetch(person.species[0]);
  const data = await response.json();
  return { species: data.name };
};

export const planetList = data => {
  const unresolvedPromises = data.results.map(async planet => {
    const { name, terrain, population, climate } = planet;
    const residentsPromises = planet.residents.map(async resident => {
      const response = await fetch(resident);
      const data = await response.json();
      return data.name;
    });

    const residents = await Promise.all(residentsPromises);
    return {
      name,
      favorite: false,
      terrain,
      climate,
      population,
      residents
    };
  });
  return Promise.all(unresolvedPromises);
};

export const vehicleList = data => {
  return data.results.map(vehicle => {
    const { name, model, vehicle_class, passengers } = vehicle;
    return { name, favorite: false, model, vehicle_class, passengers };
  });
};
