import React from 'react';
import { shallow } from 'enzyme';

import CategoryCard from '../CategoryCard';

describe('CategoryCard component', () => {
  let wrapper;
  let mockItem;
  let mockToggleFavorite;

  beforeEach(() => {
    mockToggleFavorite = jest.fn();
    mockItem = {
      name: 'Luke Skywalker',
      planet: 'Tatooine',
      population: '200000',
      species: 'Human',
      favorite: false
    };
    wrapper = shallow(
      <CategoryCard item={mockItem} toggleFavorite={mockToggleFavorite} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have a class of fas if the item is a favorite', () => {
    mockItem = {
      name: 'Luke Skywalker',
      planet: 'Tatooine',
      population: '200000',
      species: 'Human',
      favorite: true
    };
    wrapper = shallow(
      <CategoryCard item={mockItem} toggleFavorite={mockToggleFavorite} />
    );

    expect(wrapper.find('.fas').length).toEqual(1);
  });

  it('should have a class of far if the item is not a favorite', () => {
    expect(wrapper.find('.far').length).toEqual(1);
  });

  it('should call toggleFavorite method when favorite button clicked', () => {
    wrapper.find('.star').simulate('click');

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockItem);
  });
});
