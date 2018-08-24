import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

import ScrollText from '../ScrollText';
import Landing from '../Landing';
import CategoryContainer from '../CategoryContainer';

import { initialFetchCall } from '../../helpers';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      peopleData: [],
      planetsData: [],
      vehiclesData: []
    };
  }

  setCategoryState = async category => {
    if (this.state[`${category}Data`].length === 0) {
      try {
        const data = await initialFetchCall(category);
        this.setState({ [`${category}Data`]: data });
      } catch (error) {
        console.log(error.message);
      }
    }
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
    const { peopleData, planetsData, vehiclesData } = this.state;
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <h1 className="App-title">SWAPIbox</h1>
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
            </header>
            <main>
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
              </Switch>
            </main>
          </div>
        </Router>
        <footer>
          <ScrollText />
        </footer>
      </div>
    );
  }
}

export default App;
