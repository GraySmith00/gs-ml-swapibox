import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ScrollText from '../ScrollText';
import Landing from '../Landing';
import CategoryContainer from '../CategoryContainer';

import { initialFetchCall } from '../../helpers';

import './App.css';
import Navigation from '../Navigation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favoritesData: [],
      favoritesNames: [],
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
      const favoritesNames = newFavorites.map(favorite => favorite.name);
      this.setState({
        favoritesData: newFavorites,
        favoritesNames
      });
      localStorage.setItem('favoritesData', JSON.stringify(newFavorites));
      localStorage.setItem('favoritesNames', JSON.stringify(favoritesNames));
    } else {
      const newFavorites = [...this.state.favoritesData, item];
      const favoritesNames = newFavorites.map(favorite => favorite.name);
      this.setState({
        favoritesData: newFavorites,
        favoritesNames
      });
      localStorage.setItem('favoritesData', JSON.stringify(newFavorites));
      localStorage.setItem('favoritesNames', JSON.stringify(favoritesNames));
    }
  };

  checkForFavorites = () => {
    const favoritesData = JSON.parse(localStorage.getItem('favoritesData'));

    const favoritesNames = JSON.parse(localStorage.getItem('favoritesNames'));
    if (favoritesData && favoritesNames) {
      this.setState({
        favoritesData,
        favoritesNames
      });
    }
  };

  render() {
    const {
      peopleData,
      planetsData,
      vehiclesData,
      favoritesData,
      favoritesNames
    } = this.state;
    return (
      <div className="app">
        <header className="header">
          <div className="header-container">
            <Navigation favoritesData={favoritesData} />
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
                      favoritesNames={favoritesNames}
                      category={'people'}
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
                      favoritesNames={favoritesNames}
                      category={'planets'}
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
                      favoritesNames={favoritesNames}
                      category={'vehicles'}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/favorites"
                render={() => (
                  <CategoryContainer
                    toggleFavorite={this.toggleFavorite}
                    currentData={favoritesData}
                    favoritesNames={favoritesNames}
                    category={'favorites'}
                  />
                )}
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
