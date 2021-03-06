import "./app.scss";

import React, { Component } from "react";

class AppContainer extends Component {
  render () {
    const { main, sidebar } = this.props;

    return (
      <div className={`c-application`}>
        <div className="inner">
          <div className="sidebar">
            { sidebar }
          </div>
          <div className="main">
            { main }
          </div>
        </div>
      </div>
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
