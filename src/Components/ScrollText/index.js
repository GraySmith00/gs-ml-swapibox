import React, { Component } from "react";
import "./ScrollText.css";
import { randomOpeningQuote } from "../../helpers";

class ScrollText extends Component {
  constructor() {
    super();
    this.state = {
      currentQuote: ""
    };
  }

  componentDidMount() {
    const url = "https://swapi.co/api/films/";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const currentQuote = randomOpeningQuote(data);
        this.setState({ currentQuote });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <p>{this.state.currentQuote}</p>
      </div>
    );
  }
}

export default ScrollText;
