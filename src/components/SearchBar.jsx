import React from "react";


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
  }
  async onSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(ev)
  }

  doSetState(e) {
    this.props.doSetState(e)
  }

  render() {
    return (
    <nav class="navbar navbar-light bg-light justify-content-between">
      <a class="navbar-brand">
        <h2>Reactify</h2>
      </a>
      <form
        className="form-inline"
        onSubmit={this.onSubmit.bind(this)}
        aria-label="Search"
      >
        <input
          class="form-control mr-sm-1"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={e => this.doSetState(e)}
        />
        <button class="btn btn-outline-primary" type="submit">
          Find Song
        </button>
      </form>
    </nav>)
  }
}

export default SearchBar;
