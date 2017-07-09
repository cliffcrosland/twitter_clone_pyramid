import React, { Component } from 'react';
import Tweet from './tweet';
import TweetSubmitBox from './tweet_submit_box';
import './tweets_feed.css';

class TweetsFeed extends Component {
  render() {
    const tweets = this.props.tweets;
    const me = this.props.me;
    console.log('tweets', tweets);
    console.log('me', me);
    const tweetsList = tweets.map((tweet) => {
      return <Tweet key={tweet.id} tweet={tweet} />;
    });
    return (
      <div className='tweets-feed'>
        <TweetSubmitBox me={me} />
        {tweetsList}
      </div>
    );
  }
}

export default TweetsFeed;