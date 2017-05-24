import "./app.scss";

import React, { Component } from "react";

class AppContainer extends Component {
  render () {
    return <h1>Hello world!</h1>;
  }

  componentDidMount() {
    console.log("HEY THERE");
  }
}

export default AppContainer;
