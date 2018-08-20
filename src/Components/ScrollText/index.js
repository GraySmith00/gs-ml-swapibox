import React, { Component } from "react";
import "./ScrollText.css";
import { randomOpeningQuote } from "../../helpers";

class ScrollText extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: "",
      quote: ""
    };
  }

  componentDidMount() {
    const url = "https://swapi.co/api/films/";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { title, date, quote } = randomOpeningQuote(data);
        this.setState({ title, date, quote });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { title, date, quote } = this.state;
    return (
      <section className="scrolltext-container">
        <div className="crawl">
          <p>{quote}</p>
          <div className="film-info">
            <p>{title}</p>
            <h1>{date}</h1>
          </div>
        </div>
      </section>
    );
  }
}

export default ScrollText;
