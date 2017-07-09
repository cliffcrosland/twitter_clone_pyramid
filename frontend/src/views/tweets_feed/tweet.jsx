import React, { Component } from 'react';
import './tweet.css';

const kMonthNames = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun', 'Jul',
  'Aug', 'Sep', 'Oct',
  'Nov', 'Dec'
];

class Tweet extends Component {
  render() {
    const tweet = this.props.tweet;
    const author = tweet.author;
    return (
      <div className="tweet">
        <div className="user-picture">
          <img src={author.picture_url} />
        </div>
        <div className="content">
          <div className="title">
            <span className="name">{ author.name }</span>
            <span className="handle">{ author.handle }</span>
            <span className="date">{ this.renderDateTime(tweet.date_time) }</span>
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

  renderDateTime(dateTime) {
    // Show user friendly string.
    // < 10 seconds => "now"
    // < 1 minute ago => "34s"
    // < 1 hour ago => "34m"
    // < 24 hours ago => "5h"
    // else => "Jul 3"
    const date = new Date(dateTime);
    const secondsInPast = Math.floor((Date.now() - date.getTime()) / 1000);
    const minutesInPast = Math.floor(secondsInPast / 60);
    const hoursInPast = Math.floor(minutesInPast / 60);
    if (secondsInPast < 10) {
      return 'now';
    } else if (secondsInPast < 60) {
      return `${secondsInPast}s`;
    } else if (minutesInPast < 60) {
      return `${minutesInPast}m`;
    } else if (hoursInPast < 24) {
      return `${hoursInPast}h`;
    } else {
      return `${kMonthNames[date.getMonth()]} ${date.getDate()}`;
    }
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

}

export default Tweet;