import React from "react";
import AddedSong from "./AddedSong";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: props.songs
    };
  }
  addSong(song) {
    this.setState(prevState => ({ songs: [...this.state.songs, song] }));
  }

  deleteSong(song) {
    this.setState(prevState => ({
      songs: prevState.songs.filter(currSong => currSong.id != song.id)
    }));
  }
  
  render() {
    return (
      <div>
        <div class="ui divided items">
          {this.state.songs.map(song => (
            <AddedSong
              url={song.album.images[0].url}
              name={song.name}
              artists={song.artists.map(artist => artist.name).join(", ")}
              onDeleteFromPlaylist={() => this.deleteSong(song)}
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
