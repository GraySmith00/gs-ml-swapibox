import React from 'react';
import PropTypes from 'prop-types';

import CategoryCard from '../CategoryCard';

const CategoryContainer = ({ currentData }) => {
  let cards = currentData.map((item, index) => (
    <CategoryCard key={`${item}-${index}`} item={item} />
  ));

  return <div className="category-container">{cards}</div>;
};

CategoryContainer.propTypes = {
  currentData: PropTypes.array.isRequired
};

export default CategoryContainer;
