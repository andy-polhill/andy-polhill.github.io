import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";

export default function CommentForm({ discussionId }) {

  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setBody("");
    setName("");
    setUrl("");

    try {
      const response = await fetch("https://europe-west2-andypolhill.cloudfunctions.net/receive_comment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body,
          discussionId,
          name,
          url
        }) 
      })
      return response.json(); 
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
      </label>
      <label>
        Link
        <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
      </label>
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <input type="submit" value="Submit" />
    </form>
  )
}

CommentForm.propTypes = {
  discussionId: PropTypes.string.isRequired,
}
