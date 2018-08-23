import React, { Component } from 'react';

import './App.css';

import ScrollText from '../ScrollText';
import CategoryContainer from '../CategoryContainer';

import { initialFetchCall } from '../../helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: [],
      currentCategory: '',
      loading: true,
      favorites: []
    };
  }

  setCurrentCategory = async currentCategory => {
    if (currentCategory) {
      this.setState({
        currentData: await initialFetchCall(currentCategory),
        currentCategory,
        loading: false
      });
    }
  };

  handleNavClick = event => {
    this.setCurrentCategory(event.target.value);
  };

  toggleFavorite = item => {
    const alreadyFavorite = this.state.favorites.find(
      favorite => favorite.name === item.name
    );

    if (alreadyFavorite) {
      const newFavorites = this.state.favorites.filter(
        favorite => favorite.name !== item.name
      );
      this.setState({
        favorites: newFavorites
      });
    } else {
      const newFavorites = [...this.state.favorites, item];
      this.setState({
        favorites: newFavorites
      });
    }
  };

  render() {
    const { currentData, loading } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SWAPIbox</h1>
        </header>
        <nav className="nav-btns">
          <button
            onClick={this.handleNavClick}
            className="people-btn"
            value="people"
          >
            People
          </button>
          <button
            onClick={this.handleNavClick}
            className="planets-btn"
            value="planets"
          >
            Planets
          </button>
          <button
            onClick={this.handleNavClick}
            className="vehicles-btn"
            value="vehicles"
          >
            Vehicles
          </button>
        </nav>
        {!loading ? (
          <CategoryContainer
            currentData={currentData}
            toggleFavorite={this.toggleFavorite}
          />
        ) : null}
        <ScrollText />
      </div>
    );
  }
}

export default App;
