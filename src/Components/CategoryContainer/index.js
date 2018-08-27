import React from 'react';
import PropTypes from 'prop-types';

import CategoryCard from '../CategoryCard';
import './CategoryContainer.css';

const CategoryContainer = ({
  currentData,
  toggleFavorite,
  favoritesNames,
  category
}) => {
  let displayCards;

  if (category === 'favorites' && currentData.length === 0) {
    displayCards = (
      <p className="no-favorites">
        You have not added any items to your favorites yet!
      </p>
    );
  } else {
    displayCards = currentData.map((item, index) => {
      const foundInFavorites = favoritesNames.find(name => name === item.name);
      if (foundInFavorites) {
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
  }

  return (
    <div
      className="category-container"
      style={currentData.length === 0 ? { gridTemplateColumns: '1fr' } : null}
    >
      {displayCards}
    </div>
  );
};

CategoryContainer.propTypes = {
  currentData: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favoritesNames: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired
};

export default CategoryContainer;
