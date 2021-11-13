import React from "react";
import Weather from "./components/Weather";
import Recents from "./components/Recents";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import dotenv from "dotenv";
import HttpsRedirect from "react-https-redirect";

function App() {
  return (
    <HttpsRedirect>
      <Router>
        <Switch>
          <Route exact path={["/", "/home"]}>
            <Weather />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/recents">
            <Recents />
          </Route>
        </Switch>
      </Router>
    </HttpsRedirect>
  );
}

export default App;
