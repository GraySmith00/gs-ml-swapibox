import React from 'react';
import { shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from '../App';

import { mockPeopleFetch } from '../../MockData';

import CategoryContainer from '../CategoryContainer';

describe('App component', () => {
  let wrapper;
  let mockFavoriteOne;
  let mockFavoriteTwo;

  beforeEach(() => {
    localStorage.clear();
    mockFavoriteOne = mockPeopleFetch.results[0];
    mockFavoriteTwo = mockPeopleFetch.results[1];

    wrapper = shallow(<App />);
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPeopleFetch)
      })
    );
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('setCategoryState', () => {
    it('should only fetch the data if the state has not already been set', () => {
      const mockPerson = {
        name: 'Alderaan',
        favorite: false,
        terrain: 'grasslands, mountains',
        climate: 'temperate',
        population: '2000000000',
        residents: ['Leia Organa', 'Bail Prestor Organa', 'Raymus Antilles']
      };

      wrapper.setState({ peopleData: [mockPerson] });
      wrapper.instance().setCategoryState('people');

      expect(window.fetch).not.toHaveBeenCalled();
      expect(wrapper.state().peopleData.length).toEqual(1);
    });

    it('should set the appropriate state when setCategoryState gets invoked', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPeopleFetch)
        })
      );

      await wrapper.instance().setCategoryState('people');
      expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/people/');
      expect(wrapper.state().peopleData.length).toEqual(10);
    });

    it('should set the errors state with the error message if something went wrong', async () => {
      window.fetch = jest
        .fn()
        .mockImplementation(() => Promise.reject(new Error('failed')));
      await wrapper.instance().setCategoryState('people');
      expect(wrapper.state('errors')).toEqual('failed');
    });
  });

  describe('toggleFavorite', () => {
    it('should add categoryCard to favorites array', () => {
      wrapper.instance().toggleFavorite(mockFavoriteOne);
      wrapper.instance().toggleFavorite(mockFavoriteTwo);
      expect(wrapper.state().favoritesData.length).toEqual(2);
    });

    it('should remove categoryCard from favorites array if categoryCard already exists in favorites array', () => {
      wrapper.instance().toggleFavorite(mockFavoriteOne);
      expect(wrapper.state().favoritesData.length).toEqual(1);
      wrapper.instance().toggleFavorite(mockFavoriteOne);
      expect(wrapper.state().favoritesData.length).toEqual(0);
    });
  });

  describe('router', () => {
    it('should match Snapshot of landing page', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should match Snapshot of people page', () => {
      render(
        <MemoryRouter initialEntries={['/people']}>
          <App />
        </MemoryRouter>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should match Snapshot of planets page', () => {
      render(
        <MemoryRouter initialEntries={['/planets']}>
          <App />
        </MemoryRouter>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should match Snapshot of vehicles page', () => {
      render(
        <MemoryRouter initialEntries={['/vehicles']}>
          <App />
        </MemoryRouter>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should call setCategoryState when the people NavLink is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/people']}>
          <App />
        </MemoryRouter>
      );

      expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/people/');
    });

    it('should call setCategoryState when the planets NavLink is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/planets']}>
          <App />
        </MemoryRouter>
      );

      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/planets/'
      );
    });

    it('should call setCategoryState when the vehicles NavLink is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/vehicles']}>
          <App />
        </MemoryRouter>
      );

      expect(window.fetch).toHaveBeenCalledWith(
        'https://swapi.co/api/vehicles/'
      );
    });

    it('should render a CategoryContainer component when the favorites NavLink is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/favorites']}>
          <App />
        </MemoryRouter>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
