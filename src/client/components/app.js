import "./app.scss";

import React, { Component } from "react";

class AppContainer extends Component {
  render () {
    return (
      <section>
        <h1>Hello world!</h1>
        <button onClick={this._click.bind(this)}>I am a button please click me</button>
      </section>
    );
  }

  _click() {
    console.log("Clicked!!");
  }

  componentDidMount() {
    console.log("HEY THERE");
  }
}

export default AppContainer;
