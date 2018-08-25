import React from 'react';
import {
  filmFetchCall,
  randomFilmData,
  initialFetchCall,
  setCurrentData,
  getHomeworldData
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
    it('should make a fetch call with the correct params', () => {
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

    it('should return an array of planets objects when the current category is planets', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPlanetFetch)
        })
      );
      const result = await initialFetchCall('planets');
      expect(result.length).toEqual(10);
    });
  });

  // describe('peopleList', () => {
  //   window.fetch = jest.fn().mockImplementation(() => (
  //     Promise.resolve({
  //       json: () => Promise.resolve()
  //     })
  //   ))
  //   it('should return an array of the correct length', () => {

  //   })
  // });

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
});
