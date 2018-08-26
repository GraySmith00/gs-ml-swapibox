import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import ScrollText from '../ScrollText';
import Landing from '../Landing';
import CategoryContainer from '../CategoryContainer';

import { initialFetchCall } from '../../helpers';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favoritesData: [],
      peopleData: [],
      planetsData: [],
      vehiclesData: [],
      errors: ''
    };
  }

  componentDidMount() {
    this.checkForFavorites();
  }

  setCategoryState = async category => {
    if (this.state[`${category}Data`].length === 0) {
      try {
        const data = await initialFetchCall(category);
        this.setState({ [`${category}Data`]: data });
      } catch (error) {
        this.setState({ errors: error.message });
      }
    }
  };

  toggleFavorite = item => {
    const alreadyFavorite = this.state.favoritesData.find(
      favorite => favorite.name === item.name
    );
    if (alreadyFavorite) {
      const newFavorites = this.state.favoritesData.filter(
        favorite => favorite.name !== item.name
      );
      this.setState({
        favoritesData: newFavorites
      });
    } else {
      const newFavorites = [...this.state.favoritesData, item];
      this.setState(
        {
          favoritesData: newFavorites
        },
        localStorage.setItem('favoritesData', JSON.stringify(newFavorites))
      );
    }
  };

  checkForFavorites = () => {
    const favoritesData =
      JSON.parse(localStorage.getItem('favoritesData')) || [];
    this.setState({
      favoritesData
    });
  };

  render() {
    const { peopleData, planetsData, vehiclesData, favoritesData } = this.state;
    return (
      <div className="app">
        <header className="header">
          <div className="header-container">
            <img
              className="brand-image"
              src={require('../../images/starWarsLogoOneLine.png')}
              alt="star wars logo"
            />
            <nav className="nav-btns">
              <NavLink exact to="/people" className="nav-link">
                People
              </NavLink>
              <NavLink exact to="/planets" className="nav-link">
                Planets
              </NavLink>
              <NavLink exact to="/vehicles" className="nav-link">
                Vehicles
              </NavLink>
              <NavLink exact to="/favorites" className="nav-link">
                {`Favorites (${favoritesData.length})`}
              </NavLink>
            </nav>
          </div>
        </header>
        <main>
          <div className="main-container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route
                path="/people"
                render={() => {
                  this.setCategoryState('people');
                  return (
                    <CategoryContainer
                      toggleFavorite={this.toggleFavorite}
                      currentData={peopleData}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/planets"
                render={() => {
                  this.setCategoryState('planets');
                  return (
                    <CategoryContainer
                      toggleFavorite={this.toggleFavorite}
                      currentData={planetsData}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/vehicles"
                render={() => {
                  this.setCategoryState('vehicles');
                  return (
                    <CategoryContainer
                      toggleFavorite={this.toggleFavorite}
                      currentData={vehiclesData}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/favorites"
                render={() => {
                  this.setCategoryState('favorites');
                  return (
                    <CategoryContainer
                      toggleFavorite={this.toggleFavorite}
                      currentData={favoritesData}
                    />
                  );
                }}
              />
            </Switch>
          </div>
        </main>
        <footer>
          <ScrollText />
        </footer>
      </div>
    );
  }
}

export default App;
