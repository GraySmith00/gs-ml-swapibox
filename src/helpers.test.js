import React from 'react';
import helpers from './helpers';
import { mockPeopleFetch, mockPlanetFetch, mockVehicleFetch } from './MockData';

describe('helpers file', () => {
  describe('filmFetchCall', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: Promise.resolve({})
        })
      );
    });
    it('should make a fetch call with the correct params', () => {});
  });
});
