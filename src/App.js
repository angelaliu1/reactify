import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Song from './components/Song'
import Playlist from './components/Playlist'
import Cloud from './components/Cloud'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateCloud = this.updateCloud.bind(this);
    this.state = {
      lyrics: {},
      authenticated: false,
      devices: [],
      songs: [],
      search: "",
      currentDevice: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  // async componentDidMount() {
  //   if (window.location.hash) {
  //     // Remove the "#"
  //     const queryString = window.location.hash.substring(1);
  //     // Parse the access_token out
  //     const accessToken = new URLSearchParams(queryString).get("access_token");
  //     this.spotifyClient = new Spotify();
  //     this.spotifyClient.setAccessToken(accessToken);
  //
  //     const { devices } = await this.spotifyClient.getMyDevices();
  //     // const devices = Object.keys(devicesResp).map(key => devicesResp[key]);
  //     this.setState({
  //       authenticated: true,
  //       devices,
  //       currentDevice: devices[0].id
  //     });
  //   }
  // }

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

  updateCloud(allLyrics) {
    this.setState({lyrics: allLyrics})
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <div className="App">
          <a
            href={`https://accounts.spotify.com/authorize/?client_id=ac9ec319b658424d8aa1e41317e7c70f&response_type=token&redirect_uri=${window
              .location.origin +
              window.location
                .pathname}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}
          >
          Login with Spotify
          </a>
          <Cloud allLyrics={this.state.lyrics}/>
          <Playlist onUpdateCloud={this.updateCloud}/>
        </div>
      );
    }
    return (
      <div className="ui container">
        <form className="ui form" onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={e => this.setState({ search: e.target.value })}
          />
          <input type="submit" value="Search" />
        </form>
        <div class="ui divided items">
          {this.state.songs.map(song => (
            <Song url={song.album.images[0].url} name={song.name} artists={song.artists.map(artist => artist.name).join(", ")} />
          ))}
        </div>
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
