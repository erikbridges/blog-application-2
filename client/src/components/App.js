import React, { Fragment } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

// /* === PARTIALS === */
import Navbar from "./partials/Navbar";
/* === Routes === */
import Register from "./Register";
import Login from "./Login";
import User from "./User";
import Create from "./Create";
import Post from "./Post";

// Main Website Routes
const App = () => {
  return (
    <Fragment>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} />
          <Route path="/user/:id" component={User} exact />
          <Route path="/user/:id/create" component={Create} />
          <Route path="/blog/post/:id" component={Post} />
        </Switch>
      </HashRouter>
    </Fragment>
  );
};

export default App;
