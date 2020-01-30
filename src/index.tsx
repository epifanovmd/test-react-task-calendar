import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { loadableReady } from "@loadable/component";
import App from "./App";
import { createSimpleStore } from "./store/store";
import "./assets/global.module.scss";

const history = createBrowserHistory();

export const store = createSimpleStore();

const renderApp = (Comp?: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={"Loading..."}>
        <Router history={history}>
          <Comp />
        </Router>
      </Suspense>
    </Provider>,
    document.getElementById("root"),
  );
};

loadableReady(() => {
  renderApp(App);
}).finally();

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NewApp = require("./App").default;
    renderApp(NewApp);
  });
}
