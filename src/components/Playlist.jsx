import React from 'react';
import Song from './Song'
import Cloud from './Cloud'

const PROXY_URL1 = 'https://cors-anywhere.herokuapp.com/'
const PROXY_URL2 = 'https://mysterious-thicket-83821.herokuapp.com/'
const LYRICS_API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.fetchLyrics = this.fetchLyrics.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.state = {
      allLyrics: {}
    };
  }

  addToPlaylist() {
    this.fetchLyrics()
  }

  async fetchLyrics() {
    let res = await fetch(PROXY_URL1 + `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${LYRICS_API_KEY}`)
    let resText = await res.json();
    let lyrics = resText.message.body.lyrics.lyrics_body;
    let lyrics_id = resText.message.body.lyrics.lyrics_id.toString();
    console.log(lyrics_id);

    lyrics = lyrics.replace(/(\r\n|\n|\r)/gm, " ");
    lyrics = lyrics.replace(/,/g, '');
    lyrics = lyrics.substring(0, lyrics.indexOf(' ...')); // lyrics get cut off after 30% :(

    console.log(lyrics);

    this.setState(prevState => ({allLyrics: {...prevState.allLyrics, [lyrics_id]: lyrics}}));
    console.log(this.state.allLyrics);
  }

  render() {
    return (
      <div>
        <Song onAddToPlaylist={this.addToPlaylist}/>
        <button
          class="ui primary button"
          style={{ marginTop: "10px", width: "300px" }}
          onClick={() => this.props.onUpdateCloud(this.state.allLyrics)}
        >
        Generate Cloud
        </button>
      </div>
    )
  }

}

export default Playlist;
