import React from "react";

const Song = props => {
  let count = 0;
  function addToPlaylist(song) {
    alert("Add " + song.name +" in your playlist!")
  }
  return (

    <div class="item">
      <div class="ui tiny image">
        <img src={props.url} />
      </div>
      <div class="content">
        <a class="header">{props.name}</a>
        <div class="meta">
          <span class="cinema">{props.artists}</span>
        </div>
        <div class="description">
          <p></p>
        </div>
        <div class="extra">
          <div class="ui right floated primary button" onClick={p => addToPlaylist(props)}>
            Add to Playlist
            <i class="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Song;
