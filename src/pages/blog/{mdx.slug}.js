
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

import Page from "../../components/page";
import Post from "../../components/post/post";
import Comments from "../../components/comments/comments";
import Author from "../../components/author/author";
import SEO from "../../components/seo/seo";
import Rule from "../../components/rule/rule";

export default function BlogPost({ data }) {
  const { body, comments, frontmatter } = data.mdx;
  const { author, date, title, discussionId } = frontmatter;

  return (
    <Page>
      <SEO title={ `${author} - ${title}` } />
      <Post>
        <h1>{ title }</h1>
        <Author
          author={ author }
          date={ date } />
        <Rule />
        <MDXRenderer>
          { body }
        </MDXRenderer>
      </Post>
      <Comments
        comments={ comments }
        discussionId={ discussionId } />
    </Page>
  );
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string, /*.isRequired,*/
        url: PropTypes.string
      })).isRequired,
      frontmatter: PropTypes.shape({
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        discussionId: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      comments {
        body
        date(formatString: "MMMM DD, YYYY")
        author
        url
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        author
        slug
        title
        discussionId
      }
    }
  }
`