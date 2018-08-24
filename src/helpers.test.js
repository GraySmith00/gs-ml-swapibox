import React from 'react';
import helpers, { filmFetchCall } from './helpers';
import { mockPeopleFetch, mockPlanetFetch, mockVehicleFetch } from './MockData';

describe('helpers file', () => {
  let mockFilmResponse;

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
      const expected = {
        date: '1980-05-17',
        quote: 'It is a dark time for the Rebellion.',
        title: 'The Empire Strikes Back'
      };
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
});
