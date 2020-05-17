// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Card, CardColumns, Container,
} from 'react-bootstrap';
import { fetchPost, fetchPosts } from '../actions/index';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  openPost = (route, id) => {
    this.props.fetchPost(id);
    this.props.history.push(route);
  }

  renderAuthor = (post) => {
    if (post.author) {
      console.log(JSON.stringify(post.author));
      return post.author.username;
    } else {
      return 'loading';
    }
  }

  render() {
    const postItems = this.props.posts.map((post) => {
      const route = `/posts/${post._id}`;
      return (
        <Card className="post-list-item" onClick={() => { this.openPost(route, post._id); }} key={post._id}>
          <Card.Img variant="top" src={post.coverUrl} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.tags}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            Author: {this.renderAuthor(post)}
          </Card.Footer>
        </Card>
      );
    });
    return (
      <Container className="all-posts">
        <CardColumns>
          {postItems}
        </CardColumns>
      </Container>
    );
  }
}


function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts.all,
  };
}

export default connect(mapStateToProps, { fetchPosts, fetchPost })(Posts);
