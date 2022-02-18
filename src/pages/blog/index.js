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
          <p>{post.excerpt}</p>
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
            date: PropTypes.string.isRequired
          }).isRequired
        })
      )
    })
  })
};


export const pageQuery = graphql`
  query MyQuery {
    blog: allMdx(
        filter: { fileAbsolutePath: {regex: "/(blog)/"  }}
        sort: { fields: [frontmatter___date, frontmatter___title], order: ASC }
      ) {
      posts: nodes {
        frontmatter {
          date(fromNow: true)
          title
          author
          slug
        }
        excerpt
        id
      }
    }
  }
`

// import * as React from 'react'
// import { Link, graphql } from 'gatsby'

// const BlogPage = ({ data }) => {
//   return (
//     <div>
//       {/* {
//         data.allMdx.nodes.map(node => (
//           <article key={node.id}>
//             <h2>
//               <Link to={`/blog/${node.slug}`}>
//                 {node.frontmatter.title}
//               </Link>
//             </h2>
//             <p>Posted: {node.frontmatter.date}</p>
//           </article>
//         ))
//       } */}
//     </div>
//   )
// }

// export const query = graphql`
//   query {
//     allMdx(sort: {fields: frontmatter___date, order: DESC}) {
//       nodes {
//         frontmatter {
//           date(formatString: "MMMM D, YYYY")
//           title
//         }
//         id
//         slug
//       }
//     }
//   }
// `

// export default BlogPage