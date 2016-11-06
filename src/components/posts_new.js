import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index.js';
import {Link} from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(()=>{
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const {fields:{title,categories,content},handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} >
        <h3> Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : null }
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : null }
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : null }
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger" >Cancel</Link>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter a category';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }
  return errors;
}

function mapStateToProps(state) {
  return {};
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form configuration, second argument is mapStateToProps, third is mapDispatchToProps

export default reduxForm({
  form: 'PostsNew',
  fields: ['title','categories','content'],
  validate
},null,{createPost})(PostsNew);
