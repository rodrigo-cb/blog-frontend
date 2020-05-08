import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
import {
  Navbar, Nav, Button,
} from 'react-bootstrap';
import Post from './post';
import Posts from './posts';
import NewPost from './newpost';

const Nav1 = (props) => {
  // Navbar based on example from react bootstrap website
  return (
    <Navbar className="fixed-top" bg="light" expand="lg">
      <NavLink exact to="/">  <Navbar.Brand>React Blog</Navbar.Brand> </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        <NavLink to="/posts/new"><Button variant="outline-success">New Post</Button></NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav1 />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:id" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>

      </div>
    </Router>
  );
};

export default App;
