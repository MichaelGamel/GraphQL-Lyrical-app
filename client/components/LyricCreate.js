import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: { content: this.state.content, songId: this.props.songId },
      })
      .then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={event => this.onSubmit(event)}>
        <label>Add a Lyric</label>
        <input
          onChange={({ target }) => this.setState({ content: target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
