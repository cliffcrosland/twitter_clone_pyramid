import Api from './api/api'
import React, { Component } from 'react';
import TweetsFeed from './views/tweets_feed/tweets_feed';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tweets: [], me: {}};
    this.fetchMe();
    this.fetchTweetFeed();
    Api.addChangeHandler('tweet_feed', () => this.fetchTweetFeed());
  }

  fetchMe() {
    Api.get('/api/me', (values) => {
      this.setState({me: values.me})
    });
  }

  fetchTweetFeed() {
    Api.get('/api/me/tweet_feed', (values) => {
      this.setState({tweets: values.tweets})
    });
  }

  render() {
    return (
      <TweetsFeed me={this.state.me} tweets={this.state.tweets} />
    );
  }
}

export default App;
