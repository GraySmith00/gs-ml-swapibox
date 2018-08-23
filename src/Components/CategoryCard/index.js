import React from 'react';
import PropTypes from 'prop-types';

const CategoryCard = ({ item, toggleFavorite }) => {
  const cards = Object.keys(item).map((itemKey, index) => {
    switch (itemKey) {
      case 'name':
        return <h3 key={`${itemKey}-${index}`}>{item[itemKey]}</h3>;
      case 'favorite':
        return (
          <i
            onClick={() => toggleFavorite(item)}
            className={`star ${item.favorite ? 'fas fa-start' : 'far fa-star'}`}
            key={`${itemKey}-${index}`}
          />
        );
      default:
        return (
          <p key={`${itemKey}-${index}`}>{`${itemKey}: ${item[itemKey]}`}</p>
        );
    }
  });
  return <div>{cards}</div>;
};

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default CategoryCard;

// {
//   name,
//   planet,
//   population,
//   species,
//   favorite,
//   climate,
//   residents,
//   terrain,
//   model,
//   passengers,
//   vehicle_class
// }
