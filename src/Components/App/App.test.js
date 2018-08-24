import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';

import { mockPeopleFetch } from '../../MockData';

describe('App component', () => {
  let wrapper;
  let mockFavoriteOne;
  let mockFavoriteTwo;

  beforeEach(() => {
    mockFavoriteOne = mockPeopleFetch.results[0];
    mockFavoriteTwo = mockPeopleFetch.results[1];

    wrapper = shallow(<App />);
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPeopleFetch)
      })
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
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

  it('should add categoryCard to favorites array', () => {
    wrapper.instance().toggleFavorite(mockFavoriteOne);
    wrapper.instance().toggleFavorite(mockFavoriteTwo);
    expect(wrapper.state().favorites.length).toEqual(2);
  });

  it('should remove categoryCard from favorites array if categoryCard already exists in favorites array', () => {
    wrapper.instance().toggleFavorite(mockFavoriteOne);
    expect(wrapper.state().favorites.length).toEqual(1);
    wrapper.instance().toggleFavorite(mockFavoriteOne);
    expect(wrapper.state().favorites.length).toEqual(0);
  });
});
