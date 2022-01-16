import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Page from "../../components/page";

export default function Blog({ data }) {
  const { posts } = data.blog;

  return (
    <Page>
      { posts.map(post => (
        <article key={post.id}>
          <h1>
            <Link to={`/${post.frontmatter.slug}`}>
              {post.frontmatter.title}
            </Link>
          </h1>
          <small>{post.frontmatter.author}, {post.frontmatter.date}</small>
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
    blog: allMdx(filter: {fileAbsolutePath: {regex: "/(blog)/"  }}) {
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