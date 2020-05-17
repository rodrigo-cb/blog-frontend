// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Card, Container, Image, Button, ButtonGroup, Form,
} from 'react-bootstrap';
import { fetchPost, deletePost, updatePost } from '../actions/index';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.elements['form-title'].value;
    const tags = event.target.elements['form-tags'].value;
    const content = event.target.elements['form-content'].value;
    const coverUrl = event.target.elements['form-cover-url'].value;

    const post = {
      title, tags, content, coverUrl,
    };
    this.props.updatePost(post, this.props.currentPost._id);
    this.setState({ isEditing: false });
  }

  renderAuthor = () => {
    const { author } = this.props.currentPost;
    if (author) {
      return author.username;
    } else {
      return '';
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <Container className="newpost-container">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group controlId="form-title">
              <Form.Label>Post title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" defaultValue={this.props.currentPost.title} />
            </Form.Group>
            <Form.Group controlId="form-tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" placeholder="Enter tags" defaultValue={this.props.currentPost.tags} />
            </Form.Group>
            <Form.Group controlId="form-cover-url">
              <Form.Label>Cover Url</Form.Label>
              <Form.Control type="text" placeholder="Enter cover url" defaultValue={this.props.currentPost.coverUrl} />
            </Form.Group>
            <Form.Group controlId="form-content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows="6" defaultValue={this.props.currentPost.content} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
    } else {
      return (
        <Container className="post-container">
          <Card style={{ width: '60rem', height: 'auto' }}>
            <div className="post-image-container">
              <Image className="post-image" src={this.props.currentPost.coverUrl} />
            </div>
            <Card.Body className="card-body">
              <Card.Title className="title-text">{this.props.currentPost.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{this.props.currentPost.tags}</Card.Subtitle>
              <Card.Text className="content-text">
                {this.props.currentPost.content}
              </Card.Text>
              <Card.Text className="author-text">
                Author: {this.renderAuthor()}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="card-bot">
              <ButtonGroup aria-label="Edit/Delete" className="card-button">
                <Button variant="primary" onClick={() => { this.setState({ isEditing: true }); }}>Edit</Button>
                <Button variant="danger" onClick={() => { this.props.deletePost(this.props.currentPost._id, this.props.history); }}>Delete</Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Container>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
