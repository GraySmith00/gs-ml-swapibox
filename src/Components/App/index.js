import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
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
    currentCategory = currentCategory.slice(1);
    if (currentCategory) {
      this.setState({
        currentData: await initialFetchCall(currentCategory),
        currentCategory,
        loading: false
      });
    }
  };

  // handleNavClick = event => {
  //   this.setCurrentCategory(event.target.value);
  // };

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
          <NavLink exact to="/people" className="nav-link">
            People
          </NavLink>
          <NavLink exact to="/planets" className="nav-link">
            Planets
          </NavLink>
          <NavLink exact to="/vehicles" className="nav-link">
            Vehicles
          </NavLink>
        </nav>
        <Switch>
          <Route
            exact
            path="/people"
            render={({ match }) => {
              this.setCurrentCategory(match.path);
              return (
                <CategoryContainer
                  currentData={currentData}
                  toggleFavorite={this.toggleFavorite}
                />
              );
            }}
          />
          <Route
            exact
            path="/planets"
            render={({ match }) => {
              this.setCurrentCategory(match.path);
              return (
                <CategoryContainer
                  currentData={currentData}
                  toggleFavorite={this.toggleFavorite}
                />
              );
            }}
          />
          <Route
            exact
            path="/vehicles"
            render={({ match }) => {
              this.setCurrentCategory(match.path);
              return (
                <CategoryContainer
                  currentData={currentData}
                  toggleFavorite={this.toggleFavorite}
                />
              );
            }}
          />
        </Switch>
        {/* {!loading ? (
          <CategoryContainer
            currentData={currentData}
            toggleFavorite={this.toggleFavorite}
          />
        ) : null} */}
        <ScrollText />
      </div>
    );
  }
}

export default App;
