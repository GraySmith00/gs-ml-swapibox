import React, { Component } from 'react';
import './ScrollText.css';
import { filmFetchCall } from '../../helpers';

class ScrollText extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      date: '',
      quote: ''
    };
  }

  componentDidMount() {
    this.setScrollState();
  }

  setScrollState = async () => {
    const { title, date, quote } = await filmFetchCall();
    this.setState({ title, date, quote });
  };

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
