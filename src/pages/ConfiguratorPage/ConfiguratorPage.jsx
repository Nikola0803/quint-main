import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import createStore from "./Users/nikolazivkovic/Downloads/window-app/src/store.js"; // Adjusted import path
import App from "../components/App"; // Adjusted import path

function ConfiguratorPage() {
  window.store = createStore();

  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <Provider store={window.store}>
      <App />
    </Provider>,
    rootElement
  );
}

export default ConfiguratorPage;
