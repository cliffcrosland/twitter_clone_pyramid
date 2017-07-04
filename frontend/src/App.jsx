import React, { Component } from 'react';
import TweetsFeed from './views/tweets_feed/tweets_feed';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const me = {
      picture_url: 'https://pbs.twimg.com/profile_images/787739949793542144/0D4z_jYt_normal.jpg'
    };
    const tweets = [
      {
        id: 'foobar',
        user: {
          picture_url: 'https://pbs.twimg.com/profile_images/485754419271581696/UIyT6C0u_bigger.png',
          name: 'Max Roser',
          handle: 'MaxCRoser'
        },
        date: '3h',
        text: 'The rain in spain stays mainly in the plain',
        url: 'http://foo.com/bar/baz',
        url_text: 'http://foo.com/ba...',
        picture_url: 'https://pbs.twimg.com/media/DD0bmTCXoAAjzar.jpg',
      },
      {
        id: 'bashbaz',
        user: {
          picture_url: 'https://pbs.twimg.com/profile_images/1545739358/3Mt2Nb7x_bigger',
          name: 'Foo Bar',
          handle: 'foobar'
        },
        date: '6h',
        text: 'The rain in spain stays mainly in the plain',
        url: 'http://foo.com/bar/baz',
        url_text: 'http://foo.com/ba...',
        picture_url: 'https://pbs.twimg.com/media/DD0oefjVYAEvBVM.jpg',
      }
    ];
    return (
      <TweetsFeed me={me} tweets={tweets} />
    );
  }
}

export default App;
