import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
//firebase 
import firebase from './firebase/firebase.util';
//components
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';
import Spinner from './components/Spinner';
import 'semantic-ui-css/semantic.min.css';
///redux
import { createStore } from "redux";
import { connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers/reducers';
import { setUser, clearUser } from "./action/actions";
///redux-store-starts

export const store = createStore(rootReducer, composeWithDevTools());


//redux-store-ends

class App extends Component {
  componentDidMount() {
    console.log(this.props.isLoading)
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    })
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
        <Switch>
          <Route exact path="/" component={Chat} /> 
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

export default withRouter(connect(mapStateToProps, { setUser, clearUser })(App));
