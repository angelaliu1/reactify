import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import sw from 'stopword';

const PROXY_URL1 = "https://cors-anywhere.herokuapp.com/";
const PROXY_URL2 = "https://mysterious-thicket-83821.herokuapp.com/";
const LYRICS_API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;

class Cloud extends React.Component {
  constructor(props) {
    super(props);
    this.fetchLyrics = this.fetchLyrics.bind(this);
    this.addToCloud = this.addToCloud.bind(this)
    this.state = {
      allLyrics: {}, // for all songs in playlist, maps spotify song.id to string of lyrics
      data: [],
      fontSizeMapper: word => Math.log2(word.value*200) * 5,
      rotate: word => 0
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.songs !== prevProps.songs) {
      this.addToCloud(this.props.songs);
    }
  }

  async fetchLyrics(songs) {
    let newLyrics = {};
    for (const song of songs) {
      if (song.id in this.state.allLyrics) {
        newLyrics[song.id] = this.state.allLyrics[song.id];
      } else {
        let res = await fetch(
          PROXY_URL1 +
            `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=${LYRICS_API_KEY}`
        );
        let resText = await res.json();
        let lyrics = resText.message.body.lyrics.lyrics_body;

        lyrics = lyrics.replace(/(\r\n|\n|\r)/gm, " ");
        lyrics = lyrics.replace(/,/g, "");
        lyrics = lyrics.substring(0, lyrics.indexOf(" ...")); // lyrics get cut off after 30% :(

        newLyrics[song.id] = lyrics;
      }

    };

    this.setState({allLyrics: newLyrics});
  }

  addToCloud(songs) {
    this.fetchLyrics(songs);

    let newData = [];

    Object.keys(this.state.allLyrics).forEach((id) => {
      let lyrics = this.state.allLyrics[id];
      lyrics = lyrics.split(" ");
      lyrics = sw.removeStopwords(lyrics);
      console.log(lyrics);

      lyrics.forEach(word => {
        var found = false;
        for(var i = 0; i < newData.length; i++) {
          if (newData[i].text === word) {
            found = true;
            newData[i].value = newData[i].value + 1;
            break;
          }
        }
        if (!found) {
          newData = newData.concat([{text:word, value: 1}])
        }
      })
      this.setState({data: newData})
    })

    console.log(this.state.data);
  }

  render() {
    return (
      <WordCloud
        data={this.state.data}
        fontSizeMapper={this.state.fontSizeMapper}
        rotate={this.state.rotate}
      />
    );
  }
}

export default Cloud;
