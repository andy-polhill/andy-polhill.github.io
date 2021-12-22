import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Page from "../components/page";
import Hero from "../components/hero/hero";
import Post from "../components/post/post";
import CommentForm from "../components/commentForm/commentForm";

export default function BlogPost({ data }) {
  const { frontmatter, html} = data.markdownRemark;

  return (
    <Page>
      <Hero />
      <Post>
        <h1>{frontmatter.title}</h1>
        <small>{frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Post>
      <CommentForm />
    </Page>
  );
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`