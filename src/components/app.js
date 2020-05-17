import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Post from './post';
import Posts from './posts';
import NewPost from './newpost';
import SignIn from './signin';
import SignUp from './signup';
import NavBar from './navbar';
import PrivateRoute from './privateRoute';


const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <PrivateRoute path="/posts/new" component={NewPost} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/posts/:id" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>

      </div>
    </Router>
  );
};

export default App;
