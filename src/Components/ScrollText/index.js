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
        console.log(data);
        // randomOpeningQuote(data);
      });
  }

  render() {
    return (
      <div>
        <h1>ScrollText</h1>
      </div>
    );
  }
}

export default ScrollText;
