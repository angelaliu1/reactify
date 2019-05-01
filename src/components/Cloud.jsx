import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import sw from 'stopword';

class Cloud extends React.Component {
  constructor(props) {
    super(props);
    this.addToCloud = this.addToCloud.bind(this)
    this.state = {
      data: [],
      fontSizeMapper: word => Math.log2(word.value*200) * 5,
      rotate: word => 0
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.allLyrics !== prevProps.allLyrics) {
      this.addToCloud(this.props.allLyrics);
    }
  }

  addToCloud(allLyrics) {
    let newData = [];

    Object.keys(allLyrics).forEach((id) => {
      let lyrics = allLyrics[id];
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
