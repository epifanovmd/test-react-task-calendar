import { Route, Switch } from "react-router-dom";
import React, { FC } from "react";
import { routes } from "./routes";

const App: FC = () => {
  return (
    <div className="container">
      <Switch>
        {routes.map((route) => (
          <Route {...route} key={route.path} component={route.component} />
        ))}
      </Switch>
    </div>
  );
};

export default App;
