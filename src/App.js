import React, { Component } from 'react';
// import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routers from './routers'
import fakeAuth from './auth'
import axios from 'axios'
import {URL_API} from './constants/config'


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

  constructor(props) {
    super(props)
  
    this.state = {
    }
  }
  

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

  componentWillMount() {
    this._checkToken()
  }
  

  _checkToken = () => {
    let token = localStorage.getItem('memo-token');
    axios.post(`${URL_API}/users/check-token`, { token })
        .then(data => {
            if (!data.data.rs) {
                fakeAuth.signout();
                return;
            }
            fakeAuth.authenticate(() => {
              this.setState({a:1})
            });
        })
        .catch(err => console.log(err))
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
