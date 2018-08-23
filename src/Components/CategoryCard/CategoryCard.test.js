import React from 'react';
import { shallow } from 'enzyme';

import CategoryCard from '../CategoryCard';

describe('CategoryCard component', () => {
  let wrapper;
  let mockItem;

  beforeEach(() => {
    mockItem = {
      name: 'Luke Skywalker',
      planet: 'Tatooine',
      population: '200000',
      species: 'Human',
      favorite: false
    };
    wrapper = shallow(<CategoryCard item={mockItem} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
