import React from "react";

class Song extends React.Component {
  handleButtonDisplay() {
    if (this.props.button) {
      return (
        <div class="extra">
          <div
            class="btn btn-outline-success my-2 my-sm-0"
            onClick={song => this.props.onAddToPlaylist(song)}
          >
            Add to Playlist
            <i class="right chevron icon" />
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div class="item">
        <div class="ui tiny image">
          <img src={this.props.url} />
        </div>
        <div class="content">
          <a class="header">{this.props.name}</a>
          <div class="meta">
            <span class="cinema">{this.props.artists}</span>
          </div>
          <div class="description">
            <p />
          </div>
          {this.handleButtonDisplay()}
        </div>
      </div>
    );
  }
}

export default Song;
