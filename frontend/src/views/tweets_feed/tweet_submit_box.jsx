import React, { Component } from 'react';
import './tweet_submit_box.css';

class TweetSubmitBox extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  render() {
    const me = this.props.me;
    return (
      <div className="tweet-box">
        <div className="user-picture">
          <img src={me.picture_url} />
        </div>
        <div className="content">
          <div className="text-wrapper">
            <textarea className="tweet-textarea"
                      placeholder="What's happening?"
                      rows="3"
                      value={this.state.value}
                      onChange={this.handleChange}></textarea>
          </div>
          <div className="controls">
            <div className="tweet-button">
              <span className={this.charsLeftClassNames()}>
                {this.charsLeft()}
              </span>
              <button className="submit" disabled={this.isButtonDisabled()}>
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  charsLeft() {
    return 140 - this.state.text.length;
  }

  charsLeftClassNames() {
    let classNames = ['chars-left'];
    const charsLeft = this.charsLeft();
    if (charsLeft <= 20 && charsLeft > 10) {
      classNames.push('warn');
    } else if (charsLeft <= 10) {
      classNames.push('error');
    }
    return classNames.join(' ');
  }

  isButtonDisabled() {
    const charsLeft = this.charsLeft();
    return charsLeft == 140 || charsLeft <= 0
  }
};

export default TweetSubmitBox;