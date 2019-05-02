import React from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";
import Song from "./components/Song";
import Playlist from "./components/Playlist";
import Cloud from "./components/Cloud";
import SearchBar from "./components/SearchBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateCloud = this.updateCloud.bind(this);
    this.state = {
      authenticated: false,
      devices: [],
      songs: [],
      playlist_songs: [],
      search: "",
      currentDevice: ""
    };
    this.playlist = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleAddToPlaylist(song) {
    this.playlist.current.addSong(song)
    this.setState(prevState => ({playlist_songs: prevState.playlist_songs.concat(song)}));
  }

  async componentDidMount() {
    if (window.location.hash) {
      // Remove the "#"
      const queryString = window.location.hash.substring(1);
      // Parse the access_token out
      const accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(accessToken);

      const { devices } = await this.spotifyClient.getMyDevices();
      console.log(devices);
      // const devices = Object.keys(devicesResp).map(key => devicesResp[key]);
      this.setState({
        authenticated: true,
        devices,
        currentDevice: devices[0].id
      });
    }
  }

  async startPlayback(songId) {
    await this.spotifyClient.play({
      device_id: this.state.currentDevice,
      uris: [`spotify:track:${songId}`]
    });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    const {
      tracks: { items: songs }
    } = await this.spotifyClient.searchTracks(this.state.search, {
      market: "us"
    });
    this.setState({ songs });
  }

  updateCloud(songs) {
    this.setState({playlist_songs: songs});
  }

  doUpdate(e) {
    this.setState({search: e.target.value});
  }
  render() {
    if (!this.state.authenticated) {
      const client_id = '238a016a9f704aa7ad170f9a5b85c8bb';
      const scopes = 'user-read-playback-state user-modify-playback-state user-top-read user-read-private user-library-read playlist-read-private'
      return (
        <div className="App">
          <a
            href={`https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${window
              .location.origin + window.location.pathname}&scope=${scopes}`}
          >
            Login with Spotify
          </a>
        </div>
      );
    }
    return (
      <div className="ui container">
        <SearchBar onSubmit={this.onSubmit.bind(this)} doSetState={this.doUpdate.bind(this)} />
        <div class="ui divided items">
          {this.state.songs.map(song => (
            <Song
              url={song.album.images[0].url}
              name={song.name}
              artists={song.artists.map(artist => artist.name).join(", ")}
              onAddToPlaylist={e => this.handleAddToPlaylist(song)}
              button
              key={song.id}
            />
          ))}
        </div>
        <Cloud songs={this.state.playlist_songs} />
        {
          <Playlist
            ref={this.playlist}
            songs={this.state.playlist_songs}
            onUpdateCloud={this.updateCloud}
          />
        }
        <select
          className="ui dropdown"
          onChange={e => this.setState({ currentDevice: e.target.value })}
        >
          {this.state.devices.map(device => (
            <option value={device.id}>{device.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default App;
