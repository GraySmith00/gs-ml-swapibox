import React from 'react';
import { shallow } from 'enzyme';

import CategoryContainer from '../CategoryContainer';
import CategoryCard from '../CategoryCard';

describe('CategoryContainer component', () => {
  let wrapper;
  let mockCurrentData;
  let mockToggleFavorite;
  let mockFavoritesNames;

  beforeEach(() => {
    mockToggleFavorite = jest.fn();
    mockCurrentData = [
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
    wrapper = shallow(
      <CategoryContainer
        currentData={mockCurrentData}
        toggleFavorite={mockToggleFavorite}
        favoritesNames={mockFavoritesNames}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render two cards if the currentData length is 2', () => {
    expect(wrapper.find(CategoryCard).length).toEqual(2);
  });
});
