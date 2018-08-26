import React from 'react';
import PropTypes from 'prop-types';

import { imgName } from '../../helpers';

import './CategoryCard.css';

const CategoryCard = ({ item, toggleFavorite }) => {
  const card = Object.keys(item).map((itemKey, index) => {
    let imageName;
    if (itemKey === 'name') imageName = imgName(item, itemKey);
    switch (itemKey) {
      case 'name':
        return (
          <div key={`${itemKey}-${index}`}>
            <img
              className="card-image"
              src={
                require(`../../images/people/${imageName}.jpg`)
                  ? require(`../../images/people/${imageName}.jpg`)
                  : require('../../images/default_image.jpg')
              }
              alt={imageName}
            />
            <h3>{item[itemKey]}</h3>
          </div>
        );
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
  return <div className="category-card">{card}</div>;
};

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default CategoryCard;
