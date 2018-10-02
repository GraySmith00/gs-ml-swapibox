import React from 'react';
import { shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from '../App';
import { mockPeopleFetch } from '../../MockData';

describe('App component', () => {
  let wrapper;
  let mockFavoriteOne;
  let mockFavoriteTwo;
  let mockFavoritesData;
  let mockFavoritesNames;

  beforeEach(() => {
    localStorage.clear();
    mockFavoriteOne = mockPeopleFetch.results[0];
    mockFavoriteTwo = mockPeopleFetch.results[1];
    mockFavoritesData = [
      {
        favorite: false,
        name: 'Luke Skywalker',
        planet: 'Tatooine',
        population: '200000',
        species: 'Human'
      },
      {
        favorite: false,
        name: 'C-3PO',
        planet: 'Tatooine',
        population: '200000',
        species: 'Droid'
      }
    ];
    mockFavoritesNames = ['Luke Skywalker', 'C-3PO'];
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

    it('should add favoritesData to local storage when toggleFavorite is called', () => {
      wrapper.instance().toggleFavorite(mockFavoriteOne);
      wrapper.instance().checkForFavorites();
      expect(wrapper.state().favoritesData).toEqual([mockFavoriteOne]);
    });

    it('should add favoritesNames to local storage when toggleFavorite is called', () => {
      wrapper.instance().toggleFavorite(mockFavoriteOne);
      wrapper.instance().checkForFavorites();
      expect(wrapper.state().favoritesNames).toEqual([mockFavoriteOne.name]);
    });
  });

  describe('checkForFavorites', () => {
    it('should populate favoritesData state if it exists in localStorage', () => {
      localStorage.setItem(
        'favoritesNames',
        JSON.stringify(mockFavoritesNames)
      );
      localStorage.setItem('favoritesData', JSON.stringify(mockFavoritesData));
      wrapper.instance().checkForFavorites();

      expect(wrapper.state().favoritesData).toEqual(mockFavoritesData);
    });

    it('should populate favoritesNames state if it exists in localStorage', () => {
      localStorage.setItem(
        'favoritesNames',
        JSON.stringify(mockFavoritesNames)
      );
      localStorage.setItem('favoritesData', JSON.stringify(mockFavoritesData));

      wrapper.instance().checkForFavorites();

      expect(wrapper.state().favoritesNames).toEqual(mockFavoritesNames);
    });

    it('should not set the state if there is nothing in local storage', () => {
      const originalState = wrapper.state();
      wrapper.instance().checkForFavorites();
      expect(wrapper.state().favoritesData).toEqual([]);
      expect(wrapper.state().favoritesNames).toEqual([]);
      expect(wrapper.state()).toEqual(originalState);
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

    it('should match Snapshot of favorites page', () => {
      render(
        <MemoryRouter initialEntries={['/favorites']}>
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
