import React from "react";
import Song from "./Song";



class Playlist extends React.Component {
  constructor(props) {
    super(props);
    // this.addToPlaylist = this.addToPlaylist.bind(this);
    this.state = {
      songs: props.songs
    };
  }
  addSong(song) {
    this.setState(prevState => ({ songs: [...this.state.songs, song] }));
  }
  // addToPlaylist() {
  //   this.fetchLyrics();
  // }

  render() {
    return (
      <div>
        <div class="ui divided items">
          {this.state.songs.map(song => (
            <Song
              url={song.album.images[0].url}
              name={song.name}
              artists={song.artists.map(artist => artist.name).join(", ")}
              onAddToPlaylist={this.addToPlaylist}
              button={false}
              key={song.id}
            />
          ))}
        </div>
        <button
          class="btn btn-light"
          style={{ marginTop: "10px", width: "300px" }}
          onClick={() => this.props.onUpdateCloud(this.state.songs)}
        >
          Generate Cloud
        </button>
      </div>
    );
  }
}

export default Playlist;
