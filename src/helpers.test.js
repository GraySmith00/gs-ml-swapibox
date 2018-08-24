import React from 'react';
import { filmFetchCall, randomFilmData } from './helpers';
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
});
