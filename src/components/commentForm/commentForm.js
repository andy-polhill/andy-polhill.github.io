import { Link } from "gatsby";
import React, { useState } from "react";

export default function CommentForm({}) {

  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await fetch("https://europe-west2-andypolhill.cloudfunctions.net/comment-receiver", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ body, name }) 
    });
    return response.json(); // parses JSON response into native JavaScript objects
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