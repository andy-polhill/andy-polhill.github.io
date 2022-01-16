import React from "react";
import PropTypes from "prop-types";

import Comment from "./comment";
import CommentForm from "../commentForm/commentForm";

const Comments = ({ comments, discussionId }) => {

  return (
    <section>
      <h3>Comments</h3>
      {comments.map(({body}, index) => (
        <Comment key={index} body={body} />
      ))}

      <CommentForm discussionId={ discussionId } />
    </section>
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired
    })
  )
}


export default Comments;