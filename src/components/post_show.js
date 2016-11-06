import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost , deletePost } from '../actions/index.js';
import {Link} from 'react-router';

class PostShow extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then( () => {
        this.context.router.push('/');
      });
  }

  render() {
    const {post} = this.props;
    if (!post) {
      return <div>
        loading...
      </div>
    }
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick} >Delete Post</button>
        <h3>{post.title}</h3>
        <h6>{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {post:state.posts.post};
}

export default connect(mapStateToProps,{fetchPost,deletePost})(PostShow);
