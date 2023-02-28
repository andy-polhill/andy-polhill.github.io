import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Page from "../../components/page";
import Author from "../../components/author/author";
import Rule from "../../components/rule/rule";

export default function Blog({ data }) {
  const { posts } = data.blog;

  return (
    <Page>
      { posts.map(post => (
        <article key={post.id}>
          <h2>
            <Link to={`/${post.frontmatter.slug}`}>
              {post.frontmatter.title}
            </Link>
          </h2>
          <Author 
            author={ post.frontmatter.author }
            date={ post.frontmatter.date }
          />
          <Rule />
          <p>{ post.frontmatter.description }</p>
        </article>
      )) }
    </Page>
  );
}

Blog.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.shape({
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          excerpt: PropTypes.string.isRequired,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
          }).isRequired
        })
      )
    })
  })
};


export const pageQuery = graphql`
  query MyQuery {
    allMdx(filter: { gatsbyPath: {regex: "/(blog)/"} }) {
      totalCount
      edges {
        node {
          frontmatter {
            date
            description
            title
            author
            slug
          }
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query MyQuery {
//     blog: allMdx(
//         filter: { contentFilePath: {regex: "/(blog)/"  }}
//         sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
//       ) {
//       posts: nodes {
//         frontmatter {
//           date(fromNow: true)
//           description
//           title
//           author
//           slug
//         }
//         id
//       }
//     }
//   }
// `
