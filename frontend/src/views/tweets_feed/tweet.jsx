import React, { Component } from 'react';
import './tweet.css';

class Tweet extends Component {
  render() {
    const tweet = this.props.tweet;
    return (
      <div className="tweet">
        <div className="user-picture">
          <img src={tweet.user.picture_url} />
        </div>
        <div className="content">
          <div className="title">
            <span className="name">{ tweet.user.name }</span>
            <span className="handle">{ '@' + tweet.user.handle }</span>
            <span className="date">{ tweet.date }</span>
          </div>
          <div className="text">
            { tweet.text }
          </div>
          { this.renderUrl() }
          { this.renderPicture() }
        </div>
      </div>
    );
  }

  renderUrl() {
    const tweet = this.props.tweet;
    if (!tweet.url) return <div></div>;
    return (
      <div className="tweet-url">
        <a href={tweet.url}>
          {tweet.url_text}
        </a>
      </div>
    );
  }

  renderPicture() {
    const tweet = this.props.tweet;
    if (!tweet.picture_url) return <div></div>;
    return (
      <div className='tweet-picture'>
        <img src={tweet.picture_url} />
      </div>
    );

  }
}

export default Tweet;