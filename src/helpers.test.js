import {
  filmFetchCall,
  randomFilmData,
  initialFetchCall,
  setCurrentData,
  getHomeworldData,
  getSpeciesData,
  vehicleList,
  peopleList,
  planetList
} from './helpers';
import { mockPeopleFetch, mockPlanetFetch, mockVehicleFetch } from './MockData';

describe('helpers file', () => {
  let mockFilmResponse;
  let mockFilm;

  describe('filmFetchCall', () => {
    beforeEach(() => {
      mockFilmResponse = {
        results: [
          {
            release_date: '1980-05-17',
            title: 'The Empire Strikes Back',
            opening_crawl: 'It is a dark time for the Rebellion.'
          }
        ]
      };
      mockFilm = {
        date: '1980-05-17',
        quote: 'It is a dark time for the Rebellion.',
        title: 'The Empire Strikes Back'
      };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockFilmResponse)
        })
      );
    });

    it('should make a fetch call with the correct params', () => {
      filmFetchCall();
      expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/films/');
    });

    it('should return an object if the response is ok', async () => {
      const expected = mockFilm;
      const result = await filmFetchCall();
      expect(result).toEqual(expected);
    });

    it('should throw and error if the fetch fails', async () => {
      const expected = new Error('failed to fetch');
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('failed to fetch'));
      });

      await expect(filmFetchCall(mockFilmResponse)).rejects.toEqual(expected);
    });
  });

  describe('randomFilmData', () => {
    it('should return a random film object with a title, date, and quote', () => {
      mockFilmResponse = {
        results: [
          {
            release_date: '1980-05-17',
            title: 'The Empire Strikes Back',
            opening_crawl: 'It is a dark time for the Rebellion.'
          }
        ]
      };
      const result = randomFilmData(mockFilmResponse);
      expect(result.title).toEqual('The Empire Strikes Back');
    });
  });

  describe('initialFetchCall', () => {
    it('should make a fetch call with the correct params', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPeopleFetch)
        })
      );
      initialFetchCall('people');
      expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/people/');
    });

    it('should throw an error if the fetch fails', async () => {
      const expected = new Error('failed to fetch');

      window.fetch = jest
        .fn()
        .mockImplementation(() => Promise.reject(new Error('failed to fetch')));

      await expect(initialFetchCall('people')).rejects.toEqual(expected);
    });

    it('should return an array of people objects when the current category is people', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPeopleFetch)
        })
      );
      const result = await initialFetchCall('people');
      expect(result.length).toEqual(10);
    });
  });

  describe('setCurrentData', () => {
    it('should make a people fetch call with the correct params when the currentCategory is people', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPeopleFetch)
        })
      );
      setCurrentData('people', mockPeopleFetch);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/planets/20/'
      );
      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/species/1/'
      );
    });

    it('should make a planets fetch call with the correct params when the currentCategory is planets', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPlanetFetch)
        })
      );
      setCurrentData('planets', mockPlanetFetch);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/people/63/'
      );
    });

    it('should return an array of people objects when the current category is people', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPeopleFetch)
        })
      );
      const result = await setCurrentData('people', mockPeopleFetch);
      expect(result.length).toEqual(10);
    });

    it('should return an array of planets objects when the current category is planets', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPlanetFetch)
        })
      );
      const result = await setCurrentData('planets', mockPlanetFetch);
      expect(result.length).toEqual(10);
    });

    it('should return an array of vehicles objects when the current category is vehicles', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockVehicleFetch)
        })
      );
      const result = await initialFetchCall('vehicles');
      expect(result.length).toEqual(10);
    });

    it('should default if bad data is passed to it', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockVehicleFetch)
        })
      );
      const result = await initialFetchCall('poop');
      expect(result).toEqual(undefined);
    });
  });

  describe('peopleList', () => {
    it('should return an array of the correct length', async () => {
      const result = await peopleList(mockPeopleFetch);
      expect(result.length).toEqual(10);
    });
  });

  describe('getHomeWorldData', () => {
    let mockHomeworldData;
    beforeEach(() => {
      mockHomeworldData = {
        name: 'Naboo',
        rotation_period: '26',
        orbital_period: '312',
        diameter: '12120',
        climate: 'temperate',
        gravity: '1 standard',
        terrain: 'grassy hills, swamps, forests, mountains',
        surface_water: '12',
        population: '4500000000',
        residents: [
          'https://swapi.co/api/people/3/',
          'https://swapi.co/api/people/21/',
          'https://swapi.co/api/people/36/',
          'https://swapi.co/api/people/37/',
          'https://swapi.co/api/people/38/',
          'https://swapi.co/api/people/39/',
          'https://swapi.co/api/people/42/',
          'https://swapi.co/api/people/60/',
          'https://swapi.co/api/people/61/',
          'https://swapi.co/api/people/66/',
          'https://swapi.co/api/people/35/'
        ],
        films: [
          'https://swapi.co/api/films/5/',
          'https://swapi.co/api/films/4/',
          'https://swapi.co/api/films/6/',
          'https://swapi.co/api/films/3/'
        ],
        created: '2014-12-10T11:52:31.066000Z',
        edited: '2014-12-20T20:58:18.430000Z',
        url: 'https://swapi.co/api/planets/8/'
      };
    });

    it('should call fetch with the correct params', () => {
      const lukeSkywalker = mockPeopleFetch.results[0];

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockHomeworldData)
        })
      );

      getHomeworldData(lukeSkywalker);

      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/planets/1/'
      );
    });

    it('should return an object if the response is ok', async () => {
      const lukeSkywalker = mockPeopleFetch.results[0];
      const expected = {
        planet: 'Naboo',
        population: '4500000000'
      };

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockHomeworldData)
        })
      );
      const result = await getHomeworldData(lukeSkywalker);

      expect(result).toEqual(expected);
    });

    it('should throw an error if something went wrong', async () => {
      const expected = new Error('failed to fetch');
      const lukeSkywalker = mockPeopleFetch.results[0];
      window.fetch = jest
        .fn()
        .mockImplementation(() => Promise.reject(new Error('failed to fetch')));

      await expect(getHomeworldData(lukeSkywalker)).rejects.toEqual(expected);
    });
  });

  describe('getSpeciesData', () => {
    let mockSpeciesData;
    let lukeSkywalker;

    beforeEach(() => {
      lukeSkywalker = mockPeopleFetch.results[0];
      mockSpeciesData = {
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        skin_colors: 'caucasian, black, asian, hispanic',
        hair_colors: 'blonde, brown, black, red',
        eye_colors: 'brown, blue, green, hazel, grey, amber',
        average_lifespan: '120',
        homeworld: 'https://swapi.co/api/planets/9/',
        language: 'Galactic Basic',
        people: [
          'https://swapi.co/api/people/1/',
          'https://swapi.co/api/people/4/',
          'https://swapi.co/api/people/5/',
          'https://swapi.co/api/people/6/',
          'https://swapi.co/api/people/7/',
          'https://swapi.co/api/people/9/',
          'https://swapi.co/api/people/10/',
          'https://swapi.co/api/people/11/',
          'https://swapi.co/api/people/12/',
          'https://swapi.co/api/people/14/',
          'https://swapi.co/api/people/18/',
          'https://swapi.co/api/people/19/',
          'https://swapi.co/api/people/21/',
          'https://swapi.co/api/people/22/',
          'https://swapi.co/api/people/25/',
          'https://swapi.co/api/people/26/',
          'https://swapi.co/api/people/28/',
          'https://swapi.co/api/people/29/',
          'https://swapi.co/api/people/32/',
          'https://swapi.co/api/people/34/',
          'https://swapi.co/api/people/43/',
          'https://swapi.co/api/people/51/',
          'https://swapi.co/api/people/60/',
          'https://swapi.co/api/people/61/',
          'https://swapi.co/api/people/62/',
          'https://swapi.co/api/people/66/',
          'https://swapi.co/api/people/67/',
          'https://swapi.co/api/people/68/',
          'https://swapi.co/api/people/69/',
          'https://swapi.co/api/people/74/',
          'https://swapi.co/api/people/81/',
          'https://swapi.co/api/people/84/',
          'https://swapi.co/api/people/85/',
          'https://swapi.co/api/people/86/',
          'https://swapi.co/api/people/35/'
        ],
        films: [
          'https://swapi.co/api/films/2/',
          'https://swapi.co/api/films/7/',
          'https://swapi.co/api/films/5/',
          'https://swapi.co/api/films/4/',
          'https://swapi.co/api/films/6/',
          'https://swapi.co/api/films/3/',
          'https://swapi.co/api/films/1/'
        ],
        created: '2014-12-10T13:52:11.567000Z',
        edited: '2015-04-17T06:59:55.850671Z',
        url: 'https://swapi.co/api/species/1/'
      };
    });

    it('should call fetch with the correct params', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockSpeciesData)
        })
      );

      getSpeciesData(lukeSkywalker);

      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/species/1/'
      );
    });

    it('should return an object if the response was ok', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockSpeciesData)
        })
      );

      const expected = {
        species: 'Human'
      };

      const result = await getSpeciesData(lukeSkywalker);
      expect(result).toEqual(expected);
    });

    it('should throw an error if something went wrong', async () => {
      const expected = new Error('failed to fetch');
      window.fetch = jest
        .fn()
        .mockImplementation(() => Promise.reject(new Error('failed to fetch')));

      await expect(getSpeciesData(lukeSkywalker)).rejects.toEqual(expected);
    });
  });

  describe('planetList', () => {
    let mockResident;

    beforeEach(() => {
      mockResident = {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        hair_color: 'brown',
        skin_color: 'light',
        eye_color: 'brown',
        birth_year: '19BBY',
        gender: 'female',
        homeworld: 'https://swapi.co/api/planets/2/',
        films: [
          'https://swapi.co/api/films/2/',
          'https://swapi.co/api/films/6/',
          'https://swapi.co/api/films/3/',
          'https://swapi.co/api/films/1/',
          'https://swapi.co/api/films/7/'
        ],
        species: ['https://swapi.co/api/species/1/'],
        vehicles: ['https://swapi.co/api/vehicles/30/'],
        starships: [],
        created: '2014-12-10T15:20:09.791000Z',
        edited: '2014-12-20T21:17:50.315000Z',
        url: 'https://swapi.co/api/people/5/'
      };
    });

    it('should call fetch with the correct params', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResident)
        })
      );

      planetList(mockPlanetFetch);

      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/people/5/'
      );
    });

    it('should throw an error if something went wrong', async () => {
      const expected = new Error('failed to fetch');
      window.fetch = jest
        .fn()
        .mockImplementation(() => Promise.reject(new Error('failed to fetch')));
      await expect(planetList(mockPlanetFetch)).rejects.toEqual(expected);
    });

    it('should return an array of the correct length', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResident)
        })
      );
      const result = await planetList(mockPlanetFetch);
      expect(result.length).toEqual(10);
    });
  });

  describe('vehicleList', () => {
    it('should return a vehicle object with a name, model, vehicle class, and passengers', () => {
      const result = vehicleList(mockVehicleFetch);
      expect(result.length).toEqual(10);
    });
  });
});
