// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { createPost } from '../actions/index';


class NewPost extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.elements['form-title'].value;
    const tags = event.target.elements['form-tags'].value;
    const content = event.target.elements['form-content'].value;
    const coverUrl = event.target.elements['form-cover-url'].value;

    const post = {
      title, tags, content, coverUrl,
    };
    this.props.createPost(post, this.props.history);
  }

  render() {
    // Code based on form example from react bootstrap website
    return (
      <Container className="newpost-container">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group controlId="form-title">
            <Form.Label>Post title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>
          <Form.Group controlId="form-tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="Enter tags" />
          </Form.Group>
          <Form.Group controlId="form-cover-url">
            <Form.Label>Cover Url</Form.Label>
            <Form.Control type="text" placeholder="Enter cover url" />
          </Form.Group>
          <Form.Group controlId="form-content">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows="6" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default connect(null, { createPost })(NewPost);
