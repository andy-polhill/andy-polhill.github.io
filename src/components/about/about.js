import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx"
import { StaticQuery, graphql } from "gatsby";

import * as styles from "./about.module.css";

export default function About() {
  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          mdx(slug: { eq: "" }) {
            body
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              slug
              title
            }
          }
        }
      `}
      render={({ mdx }) => (
        <section className={ styles.about }>
          <MDXRenderer>
            {mdx.body}
          </MDXRenderer>
        </section>
      )}
    />
  );
}
