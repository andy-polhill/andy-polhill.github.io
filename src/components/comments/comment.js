import React from "react";
import PropTypes from "prop-types";

const Comment = ({ body }) => {
  return (
    <li>
      { body }
    </li>
  )
}

Comment.propTypes = {
  body: PropTypes.string.isRequired
}


export default Comment;