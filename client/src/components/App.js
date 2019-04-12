import React, { Fragment } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

// /* === PARTIALS === */
import Navbar from "./partials/Navbar";
/* === Routes === */
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import User from "./User";

// Main Website Routes
const App = () => {
  return (
    <Fragment>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} />
          <Route path="/user/:id" component={User} />
        </Switch>
      </HashRouter>
    </Fragment>
  );
};

export default App;
