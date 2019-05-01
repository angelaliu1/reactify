import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

class Cloud extends React.Component {
  constructor(props) {
    super(props);
    var lyrics = this.props.lyrics.split(" ");
    console.log(lyrics);
    var arr = [];
    for (var x = 0; x < lyrics.length; x++) {
      var word = lyrics[x];
      var found = false;
      for(var i = 0; i < arr.length; i++) {
        if (arr[i].text === word) {
          found = true;
          arr[i].value = arr[i].value + 1;
          break;
        }
      }
      if (!found) {
        arr = arr.concat([{text:word, value: 1}])
      }
    }
    console.log(arr);
    this.state = {data: arr,
      fontSizeMapper: word => Math.log2(word.value*200) * 5,
      rotate: word => 0}
  }


  render() {
    return (<WordCloud
      data={this.state.data}
      fontSizeMapper={this.state.fontSizeMapper}
      rotate={this.state.rotate}
      />
    );
  }
}

export default Cloud;
