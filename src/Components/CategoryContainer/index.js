import React, { Component } from 'react';
import { fetchData, peopleList } from '../../helpers';

class CategoryContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentData: []
    };
  }
  componentDidUpdate() {
    const { currentCategory } = this.props;
    const url = `https://swapi.co/api/${currentCategory}/`;
    if (currentCategory) {
      fetchData(url)
        .then(res => res.json())
        .then(data => {
          let currentData;
          if (currentCategory === 'people') {
            currentData = peopleList(data);
            this.setState({
              currentData
            });
          }
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    if (this.props.currentCategory) {
      console.log(this.state.currentData);
    }

    return (
      <div className="category-container">
        <h1>CategoryContainer</h1>
      </div>
    );
  }
}

export default CategoryContainer;
