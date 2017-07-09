import Api from '../../api/api';
import React, { Component } from 'react';
import './tweet_submit_box.css';

class TweetSubmitBox extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', focused: false};
    this.handleChange = this.handleChange.bind(this);
    this.submitTweet = this.submitTweet.bind(this);
    this.clickListener = this.clickListener.bind(this);
  }

  componentDidMount() {
    document.getElementById('root').addEventListener('click', this.clickListener);
  }

  componentWillUnmount() {
    document.getElementById('root').removeEventListener('click', this.clickListener);
  }

  clickListener(event) {
    let node = event.target;
    while (node) {
      const classList = node.classList || [];
      if (classList.contains('tweet-box')) return;
      node = node.parentElement;
    }
    this.setState({focused: false});
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  submitTweet(event) {
    console.log('submitTweet called');
    if (!this.isValid()) return;
    Api.post('api/tweet', {text: this.state.text}, (result) => Api.signalChange('tweet_feed'));
    this.setState({text: ''});
  }

  render() {
    const me = this.props.me;
    return (
      <div className="tweet-box">
        <div className="user-picture">
          <img src={me.picture_url} />
        </div>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    if (this.state.focused) {
      return this.renderTextArea();
    } else {
      return this.renderPlaceholder();
    }
  }

  renderPlaceholder() {
    return (
      <div className="content">
        <div className="placeholder-textarea" onClick={() => this.setState({focused: true})}>
          {"What's happening?"}
        </div>
      </div>
    );
  }

  renderTextArea() {
    return (
      <div className="content">
        <div className="text-wrapper">
          <textarea className="tweet-textarea"
                    placeholder="What's happening?"
                    rows="3"
                    value={this.state.text}
                    onChange={this.handleChange}
                    autoFocus></textarea>
        </div>
        <div className="controls">
          <div className="tweet-button">
            <span className={this.charsLeftClassNames()}>
              {this.charsLeft()}
            </span>
            <button className="submit" disabled={!this.isValid()} onClick={this.submitTweet}>
              Tweet
            </button>
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

  isValid() {
    const charsLeft = this.charsLeft();
    return charsLeft < 140 && charsLeft >= 0
  }
};

export default TweetSubmitBox;