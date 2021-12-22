import { Link } from "gatsby";
import React, { useState } from "react";

export default function CommentForm({}) {

  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch("https://europe-west2-andypolhill.cloudfunctions.net/receive_comment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body, name }) 
      })
      console.log(response);
      return response.json(); // parses JSON response into native JavaScript objects
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}