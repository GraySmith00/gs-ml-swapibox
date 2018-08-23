import React from 'react';
import PropTypes from 'prop-types';

const CategoryCard = ({ item }) => {
  const cards = Object.keys(item).map((itemKey, index) => {
    switch (itemKey) {
      case 'name':
        return <h3 key={`${itemKey}-${index}`}>{item[itemKey]}</h3>;
      case 'favorite':
        return item.favorite ? (
          <i className="fas fa-star dark-star" key={`${itemKey}-${index}`} />
        ) : (
          <i className="far fa-star light-star" key={`${itemKey}-${index}`} />
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
  item: PropTypes.object.isRequired
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
