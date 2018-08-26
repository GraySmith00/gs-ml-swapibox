import React from 'react';
import PropTypes from 'prop-types';

import CategoryCard from '../CategoryCard';
import './CategoryContainer.css';

const CategoryContainer = ({ currentData, toggleFavorite, favoritesNames }) => {
  let cards = currentData.map((item, index) => {
    const foundItem = favoritesNames.find(name => name === item.name);
    if (foundItem) {
      item.favorite = true;
    } else {
      item.favorite = false;
    }
    return (
      <CategoryCard
        key={`${item}-${index}`}
        item={item}
        toggleFavorite={toggleFavorite}
      />
    );
  });

  return <div className="category-container">{cards}</div>;
};

CategoryContainer.propTypes = {
  currentData: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favoritesNames: PropTypes.array.isRequired
};

export default CategoryContainer;
