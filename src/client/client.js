import "./client.scss";

import React from "react";
import ReactDom from "react-dom";

function main() {
  const AppContainer = require("./components/app").default;

  ReactDom.render(<AppContainer />, document.getElementById("mount"));
}

main();

if (module.hot) {
  module.hot.accept("./components/app", () => {
    main();
  });
}
