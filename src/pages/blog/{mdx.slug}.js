
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

import Page from "../../components/page";
import Hero from "../../components/hero/hero";
import Post from "../../components/post/post";
import CommentForm from "../../components/commentForm/commentForm";
import Comments from "../../components/comments/comments";

export default function BlogPost({ data }) {
  const { body, comments, frontmatter } = data.mdx;
  const { discussionId } = frontmatter;

  return (
    <Page>
      <Hero />
      <Post>
        <h1>{frontmatter.title}</h1>
        <small>{frontmatter.date}</small>
        <MDXRenderer>
          {body}
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
      comments: PropTypes.shape({
        body: PropTypes.string.isRequired
      }).isRequired,
      frontmatter: PropTypes.shape({
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
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        discussionId
      }
    }
  }
`

// import * as React from 'react'
// import { graphql } from 'gatsby'
// import { MDXRenderer } from 'gatsby-plugin-mdx'

// const BlogPost = ({ data }) => {
//   return (
//     <div>
//       <p>{data.mdx.frontmatter.date}</p>
//       <MDXRenderer>
//         {data.mdx.body}
//       </MDXRenderer>
//     </div>
//   )
// }
// export const query = graphql`
//   query ($id: String) {
//     mdx(id: {eq: $id}) {
//       frontmatter {
//         title
//         date(formatString: "MMMM D, YYYY")
//       }
//       body
//     }
//   }
// `
// //TODO add comments
// export default BlogPost