import React from 'react';
import { shallow } from 'enzyme';

import Navigation from '../Navigation';

describe('Navigation component', () => {
  let wrapper;
  let mockFavoritesData;

  beforeEach(() => {
    mockFavoritesData = [
      {
        favorite: true,
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
    wrapper = shallow(<Navigation favoritesData={mockFavoritesData} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
