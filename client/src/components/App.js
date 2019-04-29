import React, { Suspense, Fragment } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

// /* === PARTIALS === */
import Navbar from "./partials/Navbar";
/* === Routes === */
import Loading from "./Loading";
const Register = Loadable({
  loader: () => import("./Register"),
  loading: Loading
});
const Login = Loadable({
  loader: () => import("./Login"),
  loading: Loading
});
const Search = Loadable({
  loader: () => import("./Search"),
  loading: Loading
});
const User = Loadable({
  loader: () => import("./User"),
  loading: Loading
});
const Create = Loadable({
  loader: () => import("./Create"),
  loading: Loading
});
const Post = Loadable({
  loader: () => import("./Post"),
  loading: Loading
});

// Main Website Routes
const App = () => {
  return (
    <Fragment>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} />
          <Route path="/search" component={Search} exact />
          <Route path="/user/:id" component={User} />
          <Route path="/user/:id/create" component={Create} />
          <Route path="/blog/post/:id" component={Post} />
        </Switch>
      </HashRouter>
    </Fragment>
  );
};

export default App;
