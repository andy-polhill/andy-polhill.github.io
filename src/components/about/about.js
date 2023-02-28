import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useStaticQuery, graphql } from "gatsby";

import * as styles from "./about.module.css";

export default function About() {

  const data = useStaticQuery(graphql`
    query AboutQuery {
      mdx(frontmatter: { slug: { eq: null }}) {
        body
        frontmatter {
          date
          slug
          title
        }
      }
    }
  `)
  // date(formatString: "MMMM DD, YYYY")

  return (
    <section className={ styles.about }>
      <MDXRenderer>
        {mdx.body}
      </MDXRenderer>
    </section>
  );
}
