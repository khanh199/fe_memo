import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routers from './routers'
import fakeAuth from './auth'


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class App extends Component {

  _showPages = (routers) => {
    var result = null;
    if (routers.length > 0) {
      result = routers.map((router, index) => {
        if (router.private)
          return (
            <PrivateRoute
              key={index}
              path={router.path}
              exact={router.exact}
              component={router.main}
            />
          )
        return (
          <Route
            key={index}
            path={router.path}
            exact={router.exact}
            component={router.main}
          />
        )
      });
    }
    return <Switch>{result}</Switch>
  }
  render() {
    return (
      <Router>
        {this._showPages(routers)}
      </Router>
    );
  }

}

export default App;
