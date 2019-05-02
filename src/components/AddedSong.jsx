import React from "react";

class Song extends React.Component {
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
          <div class="extra">
            <div
              class="btn btn-outline-danger my-2 my-sm-0"
              onClick={song => this.props.onAddToPlaylist(song)}
            >
              X
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Song;
