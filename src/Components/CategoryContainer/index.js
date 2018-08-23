import React from 'react';
import PropTypes from 'prop-types';

import CategoryCard from '../CategoryCard';

const CategoryContainer = ({ currentData, toggleFavorite }) => {
  let cards = currentData.map((item, index) => (
    <CategoryCard
      key={`${item}-${index}`}
      item={item}
      toggleFavorite={toggleFavorite}
    />
  ));

  return <div className="category-container">{cards}</div>;
};

CategoryContainer.propTypes = {
  currentData: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default CategoryContainer;
